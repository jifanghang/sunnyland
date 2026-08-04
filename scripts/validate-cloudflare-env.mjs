const required = [
  "CLOUDFLARE_D1_DATABASE_ID",
  "CF_ACCESS_TEAM_DOMAIN",
  "CF_ACCESS_AUD",
];

const missing = required.filter((name) => !process.env[name]?.trim());

if (missing.length) {
  console.error(
    `Cloudflare deployment is missing: ${missing.join(", ")}. ` +
      "Add these values under Workers & Pages > sunnyland > Settings > Builds > Variables and secrets.",
  );
  process.exit(1);
}

const teamDomain = process.env.CF_ACCESS_TEAM_DOMAIN.trim();
if (!teamDomain.includes(".cloudflareaccess.com")) {
  console.error(
    "CF_ACCESS_TEAM_DOMAIN must be your Cloudflare Access team domain, for example sunnyland.cloudflareaccess.com.",
  );
  process.exit(1);
}

console.log("Cloudflare deployment settings are present.");
