# Blog + CMS setup (Sveltia CMS)

The blog lets you (or anyone you invite) write posts in a friendly UI at
`https://freewordpressmcp.com/admin` — no Git or code knowledge needed. Sveltia
CMS commits Markdown to `content/blog/`; on deploy, Cloudflare Pages runs
`tools/build-blog.js` to turn each post into a static, crawlable HTML page under
`/blog/`, and `tools/build-sitemap.js` regenerates `sitemap.xml`.

Everything in the repo is already wired. The steps below are the one-time
**dashboard** setup that only you can do (accounts, OAuth, Cloudflare settings).

This mirrors the setup on [seoschemamarkup.com](https://github.com/bilalnaseer/seo-schema-markup),
so the same GitHub OAuth app and auth Worker can be reused — see step 3.

---

## How it works (once set up)

```
Write a post at /admin  →  Sveltia commits a .md to content/blog/
   →  (editorial workflow) approve it in the same /admin UI
   →  Cloudflare Pages runs the build  →  /blog/<slug>/ HTML + sitemap updated
   →  live on freewordpressmcp.com/blog
```

Posts go through **Draft → In review → Ready**. Nothing publishes until it is
approved — and you approve from inside the CMS, so you never touch GitHub.

---

## 1. Cloudflare Pages: add the build command

Cloudflare dashboard → the `freewordpressmcp.com` Pages project →
**Settings → Builds & deployments**:

- **Build command:**
  ```
  node tools/build-blog.js && node tools/build-sitemap.js
  ```
- **Build output directory:** `/`  (the site's HTML lives at the repo root)
- **Framework preset:** None
- **Node version:** set env var `NODE_VERSION` = `20` (or newer)

> The public site still ships as pure static HTML with zero runtime
> dependencies — the build only *generates* that HTML.

**Until this build command is set, the committed `/blog/` output is what gets
served.** Both scripts are committed along with their output, so the site is
never broken; a post added through `/admin` just will not appear until the build
command exists (or until someone runs the scripts locally and commits the
result).

## 2. GitHub OAuth App (so writers log in without using GitHub directly)

If you already created one for seoschemamarkup.com you can reuse it — skip to
step 3. Otherwise: GitHub → **Settings → Developer settings → OAuth Apps →
New OAuth App**:

- **Application name:** Free WordPress MCP CMS
- **Homepage URL:** `https://freewordpressmcp.com`
- **Authorization callback URL:** `https://<your-worker-subdomain>.workers.dev/callback`

Save the **Client ID** and generate a **Client Secret**.

## 3. The auth bridge (Cloudflare Worker)

`admin/config.yml` already points at the existing Worker:

```
https://sveltiacms.bilalnaseer01.workers.dev
```

**You must add this domain to that Worker's allow-list**, or login from
`/admin` will be rejected. In the Cloudflare dashboard → Workers →
`sveltiacms` → **Settings → Variables**, update:

| Variable | Value |
|---|---|
| `ALLOWED_DOMAINS` | `seoschemamarkup.com,freewordpressmcp.com` |

(The Worker is [`sveltia/sveltia-cms-auth`](https://github.com/sveltia/sveltia-cms-auth);
`GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` are already set on it. If you
prefer a separate Worker for this site, deploy a second copy and change
`base_url` in `admin/config.yml`.)

## 4. Give writers access

Each writer needs a **GitHub account**, invited as a **collaborator** with write
access: GitHub repo → **Settings → Collaborators → Add people**.

That invite is the only time they interact with GitHub. From then on they visit
`freewordpressmcp.com/admin`, click **Login with GitHub**, and write.

---

## Writing a post

1. Go to `https://freewordpressmcp.com/admin` and log in.
2. **Blog posts → New Blog post.**
3. Fill in Title, Meta description, Publish date, and write the content.
4. (Optional) add a cover image and tags.
5. Save as **Draft**, move to **In review** when ready.
6. Approve it → it publishes automatically in ~1–2 minutes.

### Writing tips that the build understands

- **FAQ schema is automatic.** End a post with an `## FAQ` (or
  `## Frequently asked questions`) section and put each question in an `###`
  heading. The build turns those pairs into `FAQPage` JSON-LD.
- **Tables** use standard Markdown pipe syntax.
- **Cover images** go to `assets/img/blog/` and are used for the card, the
  social preview and the `BlogPosting` schema image.
- **`draft: true`** hides a post from the site and the sitemap entirely.
- **Ratings are optional and must be real.** Filling in *Aggregate rating value*
  and *Number of ratings* adds a star rating to the page and to the schema (as a
  `CreativeWorkSeries` node — Google rejects `aggregateRating` on `BlogPosting`,
  so the `BlogPosting` node is swapped out when a rating is present). Leave them
  blank and no rating schema is emitted. Only use genuine numbers: invented
  ratings can get rich results removed across the whole domain.

---

## Working locally

```bash
node tools/build-blog.js      # regenerates /blog/
node tools/build-sitemap.js   # regenerates sitemap.xml
```

Then open `blog/index.html`, or serve the root with `python3 -m http.server 8000`.
No npm install, no dependencies — plain Node.

---

## Notes & maintenance

- **Approval on/off:** `publish_mode: editorial_workflow` in `admin/config.yml`
  enables the review gate. Remove that line to publish instantly.
- **Shared chrome:** `tools/chrome.js` holds the nav, footer and CSS used by the
  generated pages. If you change the nav on the hand-written pages, change it
  there too.
- **Updating Sveltia:** the editor bundle is vendored at `admin/sveltia-cms.js`
  (pinned, no CDN). To update:
  ```
  curl -sL "https://unpkg.com/@sveltia/cms@<version>/dist/sveltia-cms.js" -o admin/sveltia-cms.js
  ```
- **Scaling:** a single `sitemap.xml` is fine into the hundreds of URLs. If the
  blog grows very large, split it into `sitemap-blog.xml` + an index.
