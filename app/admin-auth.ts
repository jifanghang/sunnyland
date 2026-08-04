import { env } from "cloudflare:workers";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export type AdminUser = {
  displayName: string;
  email: string;
  fullName: string | null;
};

type AuthEnv = {
  CF_ACCESS_AUD?: string;
  CF_ACCESS_TEAM_DOMAIN?: string;
};

const OAI_EMAIL_HEADER = "oai-authenticated-user-email";
const OAI_FULL_NAME_HEADER = "oai-authenticated-user-full-name";
const OAI_FULL_NAME_ENCODING_HEADER =
  "oai-authenticated-user-full-name-encoding";
const PERCENT_ENCODED_UTF8 = "percent-encoded-utf-8";
const CF_ACCESS_EMAIL_HEADER = "cf-access-authenticated-user-email";
const CF_ACCESS_JWT_HEADER = "cf-access-jwt-assertion";

const keySets = new Map<string, ReturnType<typeof createRemoteJWKSet>>();

export async function getAdminUser(): Promise<AdminUser | null> {
  if (process.env.NODE_ENV !== "production") {
    return {
      displayName: "Local editor",
      email: "preview@sunnyland.local",
      fullName: "Local editor",
    };
  }

  const requestHeaders = await headers();

  // Retain compatibility with the private Sites preview while production moves
  // to Cloudflare Access.
  const workspaceEmail = requestHeaders.get(OAI_EMAIL_HEADER);
  if (workspaceEmail) {
    const encodedFullName = requestHeaders.get(OAI_FULL_NAME_HEADER);
    const fullName =
      encodedFullName &&
      requestHeaders.get(OAI_FULL_NAME_ENCODING_HEADER) === PERCENT_ENCODED_UTF8
        ? safeDecodeURIComponent(encodedFullName)
        : null;

    return {
      displayName: fullName ?? workspaceEmail,
      email: workspaceEmail,
      fullName,
    };
  }

  const accessToken = requestHeaders.get(CF_ACCESS_JWT_HEADER);
  const accessEmail = requestHeaders.get(CF_ACCESS_EMAIL_HEADER);
  if (!accessToken || !accessEmail) return null;

  const runtimeEnv = env as unknown as AuthEnv;
  const audience = runtimeEnv.CF_ACCESS_AUD?.trim();
  const teamDomain = normaliseTeamDomain(
    runtimeEnv.CF_ACCESS_TEAM_DOMAIN ?? "",
  );
  if (!audience || !teamDomain) return null;

  try {
    const jwksUrl = `${teamDomain}/cdn-cgi/access/certs`;
    let keySet = keySets.get(jwksUrl);
    if (!keySet) {
      keySet = createRemoteJWKSet(new URL(jwksUrl));
      keySets.set(jwksUrl, keySet);
    }

    const { payload } = await jwtVerify(accessToken, keySet, {
      audience,
      issuer: teamDomain,
    });
    const verifiedEmail =
      typeof payload.email === "string" ? payload.email.trim() : "";

    if (
      !verifiedEmail ||
      verifiedEmail.toLowerCase() !== accessEmail.trim().toLowerCase()
    ) {
      return null;
    }

    return {
      displayName: verifiedEmail,
      email: verifiedEmail,
      fullName: null,
    };
  } catch {
    return null;
  }
}

export async function requireAdminUser(): Promise<AdminUser> {
  const user = await getAdminUser();
  if (user) return user;

  // Cloudflare Access should challenge the request before it reaches the app.
  // Falling back to the public homepage keeps an unprotected deployment closed.
  redirect("/");
}

export function adminSignOutPath(): string {
  return "/cdn-cgi/access/logout";
}

function normaliseTeamDomain(value: string): string | null {
  const trimmed = value.trim().replace(/\/$/, "");
  if (!trimmed) return null;

  const candidate = trimmed.startsWith("https://")
    ? trimmed
    : `https://${trimmed}`;

  try {
    const url = new URL(candidate);
    if (url.protocol !== "https:" || !url.hostname.endsWith(".cloudflareaccess.com")) {
      return null;
    }
    return url.origin;
  } catch {
    return null;
  }
}

function safeDecodeURIComponent(value: string): string | null {
  try {
    return decodeURIComponent(value);
  } catch {
    return null;
  }
}
