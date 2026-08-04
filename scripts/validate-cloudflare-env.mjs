const required = ["CLOUDFLARE_D1_DATABASE_ID"];

const missing = required.filter((name) => !process.env[name]?.trim());

if (missing.length) {
  console.error(
    `Cloudflare deployment is missing: ${missing.join(", ")}. ` +
      "Add these values under Workers & Pages > sunnyland > Settings > Builds > Variables and secrets.",
  );
  process.exit(1);
}

const teamDomain = process.env.CF_ACCESS_TEAM_DOMAIN?.trim();
const audience = process.env.CF_ACCESS_AUD?.trim();

if (Boolean(teamDomain) !== Boolean(audience)) {
  console.error(
    "CF_ACCESS_TEAM_DOMAIN and CF_ACCESS_AUD must either both be set or both be omitted.",
  );
  process.exit(1);
}

if (teamDomain && !teamDomain.includes(".cloudflareaccess.com")) {
  console.error(
    "CF_ACCESS_TEAM_DOMAIN must be your Cloudflare Access team domain, for example sunnyland.cloudflareaccess.com.",
  );
  process.exit(1);
}

if (!teamDomain) {
  console.warn(
    "Cloudflare Access is not configured yet. The public site can deploy, but the content manager will remain locked until both Access values are added and the site is redeployed.",
  );
}

console.log("Cloudflare deployment settings are present.");
