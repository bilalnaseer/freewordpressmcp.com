# freewordpressmcp.com

Landing page for the **Free WordPress MCP Plugin** — a free, open-source WordPress plugin that lets any MCP-compatible AI agent (Claude, ChatGPT, Cursor, Claude Code) perform real actions on your WordPress site.

🌐 **Live site:** https://freewordpressmcp.com
🔌 **Plugin repo:** https://github.com/bilalnaseer/wsp-wordpress-mcp
📺 **Tutorials:** https://www.youtube.com/websensepro

---

## 🧰 Tools / Abilities

The **WSP MCP – AI Agents Connector** plugin exposes **145 MCP tools** to any connected AI agent. Each tool is an "ability" the agent can call to read from or act on your WordPress site.

Browse the full, searchable list on the **[Abilities Directory »](https://freewordpressmcp.com/abilities-directory)**

| | Count |
|---|---|
| 🔧 **Total tools** | **145** |
| 🟢 Read (safe — list / fetch only) | 60 |
| 🟠 Write (create / update / delete) | 85 |
| ⚡ Core (always available) | 27 |
| 🧩 Plugin integrations | 7 |

> **Access** — `read` tools only list or fetch data; `write` tools create, update, or delete site data.
> Every write tool is **off by default** and must be enabled per-tool in the WordPress dashboard.

### Groups at a glance

| Group | Tools | 🟢 Read | 🟠 Write | Requires |
|---|---:|---:|---:|---|
| Posts | 4 | 1 | 3 | — (core) |
| Pages | 4 | 1 | 3 | — (core) |
| Taxonomy | 4 | 2 | 2 | — (core) |
| Comments | 3 | 1 | 2 | — (core) |
| Media | 8 | 3 | 5 | — (core) |
| Users | 1 | 1 | 0 | — (core) |
| Search | 1 | 1 | 0 | — (core) |
| Site | 2 | 2 | 0 | — (core) |
| Yoast SEO | 2 | 1 | 1 | Yoast SEO plugin |
| Rank Math SEO | 2 | 1 | 1 | Rank Math SEO plugin |
| WooCommerce | 15 | 7 | 8 | WooCommerce plugin |
| Elementor | 9 | 5 | 4 | Elementor plugin |
| Ultimate Addons for Elementor | 45 | 17 | 28 | Ultimate Addons for Elementor plugin |
| Gravity Forms | 18 | 6 | 12 | Gravity Forms plugin |
| Advanced Custom Fields (ACF) | 27 | 11 | 16 | Advanced Custom Fields (ACF) plugin |

### Core — always available

<details>
<summary><strong>Posts</strong> — 4 tools (1 read · 3 write)</summary>

| Tool | Access |
|---|---|
| `wsp/get-posts` — Read Posts | 🟢 read |
| `wsp/create-post` — Create Post | 🟠 write |
| `wsp/update-post` — Update Post | 🟠 write |
| `wsp/delete-post` — Delete Post | 🟠 write |

</details>

<details>
<summary><strong>Pages</strong> — 4 tools (1 read · 3 write)</summary>

| Tool | Access |
|---|---|
| `wsp/get-pages` — Read Pages | 🟢 read |
| `wsp/create-page` — Create Page | 🟠 write |
| `wsp/update-page` — Update Page | 🟠 write |
| `wsp/delete-page` — Delete Page | 🟠 write |

</details>

<details>
<summary><strong>Taxonomy</strong> — 4 tools (2 read · 2 write)</summary>

| Tool | Access |
|---|---|
| `wsp/get-categories` — Read Categories | 🟢 read |
| `wsp/create-category` — Create Category | 🟠 write |
| `wsp/get-tags` — Read Tags | 🟢 read |
| `wsp/create-tag` — Create Tag | 🟠 write |

</details>

<details>
<summary><strong>Comments</strong> — 3 tools (1 read · 2 write)</summary>

| Tool | Access |
|---|---|
| `wsp/get-comments` — Read Comments | 🟢 read |
| `wsp/approve-comment` — Approve Comment | 🟠 write |
| `wsp/delete-comment` — Delete Comment | 🟠 write |

</details>

<details>
<summary><strong>Media</strong> — 8 tools (3 read · 5 write)</summary>

| Tool | Access |
|---|---|
| `wsp/list-media` — List Media | 🟢 read |
| `wsp/get-media` — Get Media | 🟢 read |
| `wsp/count-media` — Count Media | 🟢 read |
| `wsp/update-media` — Update Media | 🟠 write |
| `wsp/delete-media` — Delete Media | 🟠 write |
| `wsp/upload-media` — Upload Media | 🟠 write |
| `wsp/upload-media-from-url` — Upload Media From URL | 🟠 write |
| `wsp/set-featured-image` — Set Featured Image | 🟠 write |

</details>

<details>
<summary><strong>Users</strong> — 1 tools (1 read · 0 write)</summary>

| Tool | Access |
|---|---|
| `wsp/get-users` — Read Users | 🟢 read |

</details>

<details>
<summary><strong>Search</strong> — 1 tools (1 read · 0 write)</summary>

| Tool | Access |
|---|---|
| `wsp/search` — Search Content | 🟢 read |

</details>

<details>
<summary><strong>Site</strong> — 2 tools (2 read · 0 write)</summary>

| Tool | Access |
|---|---|
| `wsp/get-site-info` — Read Site Info | 🟢 read |
| `wsp/get-plugins` — Read Plugins | 🟢 read |

</details>

### Plugin integrations — appear when the named plugin is active

<details>
<summary><strong>Yoast SEO</strong> — 2 tools (1 read · 1 write)</summary>

| Tool | Access |
|---|---|
| `wsp/yoast-get-seo` — Get Yoast SEO Meta | 🟢 read |
| `wsp/yoast-update-seo` — Update Yoast SEO Meta | 🟠 write |

</details>

<details>
<summary><strong>Rank Math SEO</strong> — 2 tools (1 read · 1 write)</summary>

| Tool | Access |
|---|---|
| `wsp/rankmath-get-seo` — Get Rank Math SEO Meta | 🟢 read |
| `wsp/rankmath-update-seo` — Update Rank Math SEO Meta | 🟠 write |

</details>

<details>
<summary><strong>WooCommerce</strong> — 15 tools (7 read · 8 write)</summary>

| Tool | Access |
|---|---|
| `wsp/woo-get-products` — List WooCommerce Products | 🟢 read |
| `wsp/woo-get-product` — Get Single Product | 🟢 read |
| `wsp/woo-create-product` — Create WooCommerce Product | 🟠 write |
| `wsp/woo-create-variation` — Create Product Variation | 🟠 write |
| `wsp/woo-update-product` — Update WooCommerce Product | 🟠 write |
| `wsp/woo-list-orders` — List WooCommerce Orders | 🟢 read |
| `wsp/woo-update-order-status` — Update WooCommerce Order | 🟠 write |
| `wsp/woo-refund-order` — Refund WooCommerce Order | 🟠 write |
| `wsp/woo-create-coupon` — Create WooCommerce Coupon | 🟠 write |
| `wsp/woo-list-coupons` — List WooCommerce Coupons | 🟢 read |
| `wsp/woo-create-order-note` — Create Order Note | 🟠 write |
| `wsp/woo-list-customers` — List Customers | 🟢 read |
| `wsp/woo-report-sales` — Get Sales Report | 🟢 read |
| `wsp/woo-get-low-stock` — Get Low Stock Alerts | 🟢 read |
| `wsp/woo-moderate-review` — Moderate Product Reviews | 🟠 write |

</details>

<details>
<summary><strong>Elementor</strong> — 9 tools (5 read · 4 write)</summary>

| Tool | Access |
|---|---|
| `wsp/elementor-list-pages` — List Elementor Pages | 🟢 read |
| `wsp/elementor-get-page` — Get Page Structure | 🟢 read |
| `wsp/elementor-get-element` — Get Element Settings | 🟢 read |
| `wsp/elementor-find-element` — Find Element | 🟢 read |
| `wsp/elementor-list-templates` — List Templates | 🟢 read |
| `wsp/elementor-update-element` — Update Element | 🟠 write |
| `wsp/elementor-add-widget` — Add Widget | 🟠 write |
| `wsp/elementor-add-container` — Add Container | 🟠 write |
| `wsp/elementor-remove-element` — Remove Element | 🟠 write |

</details>

<details>
<summary><strong>Ultimate Addons for Elementor</strong> — 45 tools (17 read · 28 write)</summary>

| Tool | Access |
|---|---|
| `wsp/uae-widgets-activate` — Activate Widget | 🟠 write |
| `wsp/uae-builder-add-column` — Add Column to Section | 🟠 write |
| `wsp/uae-builder-add-section` — Add Section/Container | 🟠 write |
| `wsp/uae-builder-build` — Build Complete Layout | 🟠 write |
| `wsp/uae-widgets-bulk-toggle` — Bulk Toggle All Widgets | 🟠 write |
| `wsp/uae-maintenance-clear-cache` — Clear Elementor Cache | 🟠 write |
| `wsp/uae-pages-create` — Create Page | 🟠 write |
| `wsp/uae-templates-create` — Create Template | 🟠 write |
| `wsp/uae-widgets-deactivate-unused` — Deactivate Unused Widgets | 🟠 write |
| `wsp/uae-widgets-deactivate` — Deactivate Widget | 🟠 write |
| `wsp/uae-pages-delete` — Delete Page | 🟠 write |
| `wsp/uae-templates-delete` — Delete Template | 🟠 write |
| `wsp/uae-templates-duplicate` — Duplicate Template | 🟠 write |
| `wsp/uae-active-get` — Get All Active Templates | 🟢 read |
| `wsp/uae-display-rules-get-locations` — Get Available Locations | 🟢 read |
| `wsp/uae-design-system-get-tokens` — Get Design Tokens | 🟢 read |
| `wsp/uae-builder-get-schema` — Get Element Schema | 🟢 read |
| `wsp/uae-info-get` — Get Plugin Info | 🟢 read |
| `wsp/uae-settings-get` — Get Plugin Settings | 🟢 read |
| `wsp/uae-builder-get-structure` — Get Post Structure | 🟢 read |
| `wsp/uae-templates-get` — Get Template Details | 🟢 read |
| `wsp/uae-theme-get-info` — Get Theme Info | 🟢 read |
| `wsp/uae-widgets-get-usage` — Get Widget Usage Map | 🟢 read |
| `wsp/uae-builder-insert-widget` — Insert Widget | 🟠 write |
| `wsp/uae-builder-list-widget-types` — List Available Widget Types | 🟢 read |
| `wsp/uae-extensions-list` — List Extensions | 🟢 read |
| `wsp/uae-pages-list` — List Pages | 🟢 read |
| `wsp/uae-templates-list` — List Templates | 🟢 read |
| `wsp/uae-widgets-list` — List Widgets | 🟢 read |
| `wsp/uae-builder-move-element` — Move Element | 🟠 write |
| `wsp/uae-builder-regenerate-css` — Regenerate CSS | 🟠 write |
| `wsp/uae-builder-remove-element` — Remove Element | 🟠 write |
| `wsp/uae-shortcode-render` — Render Template Shortcode | 🟢 read |
| `wsp/uae-pages-restore` — Restore Page | 🟠 write |
| `wsp/uae-templates-restore` — Restore Template from Trash | 🟠 write |
| `wsp/uae-theme-set-method` — Set Theme Compatibility Method | 🟠 write |
| `wsp/uae-extensions-toggle` — Toggle Extension | 🟠 write |
| `wsp/uae-pro-features` — UAE Pro Features Info | 🟢 read |
| `wsp/uae-builder-undo` — Undo Last Builder Change | 🟠 write |
| `wsp/uae-display-rules-update` — Update Display Rules | 🟠 write |
| `wsp/uae-pages-update-meta` — Update Page Meta | 🟠 write |
| `wsp/uae-pages-update-status` — Update Page Status | 🟠 write |
| `wsp/uae-settings-update` — Update Plugin Setting | 🟠 write |
| `wsp/uae-templates-update` — Update Template | 🟠 write |
| `wsp/uae-builder-update-widget` — Update Widget Settings | 🟠 write |

</details>

<details>
<summary><strong>Gravity Forms</strong> — 18 tools (6 read · 12 write)</summary>

| Tool | Access |
|---|---|
| `wsp/gravity-list-forms` — List Forms | 🟢 read |
| `wsp/gravity-get-form` — Get Form | 🟢 read |
| `wsp/gravity-create-form` — Create Form | 🟠 write |
| `wsp/gravity-update-form` — Update Form | 🟠 write |
| `wsp/gravity-delete-form` — Delete Form | 🟠 write |
| `wsp/gravity-list-entries` — List Entries | 🟢 read |
| `wsp/gravity-get-entry` — Get Entry | 🟢 read |
| `wsp/gravity-update-entry` — Update Entry | 🟠 write |
| `wsp/gravity-delete-entry` — Delete Entry | 🟠 write |
| `wsp/gravity-get-notifications` — Get Notifications | 🟢 read |
| `wsp/gravity-get-confirmations` — Get Confirmations | 🟢 read |
| `wsp/gravity-create-notification` — Create Notification | 🟠 write |
| `wsp/gravity-update-notification` — Update Notification | 🟠 write |
| `wsp/gravity-delete-notification` — Delete Notification | 🟠 write |
| `wsp/gravity-create-confirmation` — Create Confirmation | 🟠 write |
| `wsp/gravity-update-confirmation` — Update Confirmation | 🟠 write |
| `wsp/gravity-delete-confirmation` — Delete Confirmation | 🟠 write |
| `wsp/gravity-update-form-settings` — Update Form Settings | 🟠 write |

</details>

<details>
<summary><strong>Advanced Custom Fields (ACF)</strong> — 27 tools (11 read · 16 write)</summary>

| Tool | Access |
|---|---|
| `wsp/acf-list-field-groups` — List Field Groups | 🟢 read |
| `wsp/acf-get-field-group` — Get Field Group | 🟢 read |
| `wsp/acf-create-field-group` — Create Field Group | 🟠 write |
| `wsp/acf-update-field-group` — Update Field Group Settings | 🟠 write |
| `wsp/acf-delete-field-group` — Delete Field Group | 🟠 write |
| `wsp/acf-import-field-groups` — Import Field Groups | 🟠 write |
| `wsp/acf-list-fields` — List Fields inside Group | 🟢 read |
| `wsp/acf-get-field` — Get Field Config Details | 🟢 read |
| `wsp/acf-create-field` — Create Field Configuration | 🟠 write |
| `wsp/acf-update-field-config` — Update Field Configuration | 🟠 write |
| `wsp/acf-delete-field` — Delete Field Config | 🟠 write |
| `wsp/acf-duplicate-field` — Duplicate Field Config | 🟠 write |
| `wsp/acf-sync-fields` — Force Sync Fields JSON | 🟠 write |
| `wsp/acf-get-value-deep` — Get Field Value Deep | 🟢 read |
| `wsp/acf-update-value-deep` — Update Field Value Deep | 🟠 write |
| `wsp/acf-delete-value` — Delete Field Value | 🟠 write |
| `wsp/acf-get-all-values` — Get All Fields Values | 🟢 read |
| `wsp/acf-bulk-update-values` — Bulk Update Values | 🟠 write |
| `wsp/acf-get-field-object` — Get Value & Config Object | 🟢 read |
| `wsp/acf-list-post-types` — List Registered Post Types | 🟢 read |
| `wsp/acf-create-post-type` — Create Custom Post Type | 🟠 write |
| `wsp/acf-list-taxonomies` — List Registered Taxonomies | 🟢 read |
| `wsp/acf-create-taxonomy` — Create Custom Taxonomy | 🟠 write |
| `wsp/acf-list-options-pages` — List ACF Options Pages | 🟢 read |
| `wsp/acf-create-options-page` — Create Options Page | 🟠 write |
| `wsp/acf-get-option-value` — Get Option Value | 🟢 read |
| `wsp/acf-update-option-value` — Update Option Value | 🟠 write |

</details>

---

## Stack

Static HTML. No framework, no build step. Hosted on [Cloudflare Pages](https://pages.cloudflare.com/).

## Files

- `index.html` — the main landing page
- `abilities-directory.html` — searchable/filterable Abilities Directory (served at `/abilities-directory`)
- `abilities.md` — source-of-truth list of every plugin ability (mirrors the plugin's `registry.php`)
- `tutorials.html` — video tutorials page
- `free-connect-*.html` — per-agent setup tutorials (Claude AI, Codex, Antigravity, Cursor AI)
- `robots.txt` — crawler directives
- `sitemap.xml` — sitemap
- `_headers` — Cloudflare Pages security + cache headers
- `_redirects` — www → apex 301

## Deploy

Connect this repo to a Cloudflare Pages project. Build command: *none*. Output directory: `/` (root).

## License

MIT. See [LICENSE](./LICENSE).

---

Built by [WebSensePro](https://www.youtube.com/websensepro).
