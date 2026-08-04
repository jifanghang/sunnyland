# Sunnyland

Sunnyland's public company website, product catalogue, news pages and protected
content manager. The application runs on Cloudflare Workers and stores editable
content in Cloudflare D1.

## Local development

Node.js 22.13 or newer is required.

```bash
npm install
npm run dev
npm test
```

Local development uses a local D1 database and allows access to `/admin`
without Cloudflare Access.

## Cloudflare resources

Production requires:

- a Worker named `sunnyland`;
- a D1 database named `sunnyland-content`, bound as `DB`;
- a Cloudflare Access application protecting `/admin*`, `/api/content` and
  `/api/content/*`;
- the `CLOUDFLARE_D1_DATABASE_ID` build variable for the first deployment;
- two additional build variables after the Access application is created:
  - `CF_ACCESS_TEAM_DOMAIN`
  - `CF_ACCESS_AUD`

`CF_ACCESS_TEAM_DOMAIN` is the Access team domain, such as
`sunnyland.cloudflareaccess.com`. `CF_ACCESS_AUD` is the Application Audience
tag shown in the Access application's overview.

The application verifies the Access JWT and its email claim before permitting
content changes. A missing or invalid token is denied even if a request tries to
forge Cloudflare's email header.

## Cloudflare Builds

Connect the GitHub repository and use:

```text
Build command:  npm run build:cloudflare
Deploy command: npx wrangler deploy
```

The production branch is `main`. The Cloudflare build check deliberately fails
if the D1 setting is absent. The first deployment may omit the two Access values
so the Worker and custom domain can be created; the content manager stays locked
until both Access values are added and a second deployment completes.

The application initializes the D1 schema and seeds the current catalogue on
the first request to an empty database. D1 also retains all changes made through
the content manager.

## Manual deployment

After authenticating Wrangler and exporting the same three variables:

```bash
npm run deploy:cloudflare
```
