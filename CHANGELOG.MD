# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- Added the missing **Gravity Forms** group (18 abilities) to `abilities.md`, bringing its body in sync with its `145` totals header and with `abilities-directory.html` (which already listed the group). The section documents form, entry, notification, and confirmation tools (6 read · 12 write).
- Rewrote `README.md` with a full **Tools / Abilities** section documenting all **145** MCP tools the plugin exposes: a summary table (145 total · 60 read · 85 write · 27 core · 7 plugin integrations), a per-group "at a glance" table with read/write splits, and collapsible `<details>` listings of every tool per group (Posts, Pages, Taxonomy, Comments, Media, Users, Search, Site, Yoast SEO, Rank Math SEO, WooCommerce, Elementor, Ultimate Addons for Elementor, Gravity Forms, ACF). Counts derived from `abilities-directory.html`.
- Brand icon `assets/free-wordpress-mcp-icon-dark.svg` now used as the **favicon** and the **nav logo** (shown before the "Free WordPress MCP" wordmark) across all pages, replacing the inline data-URI "W" favicon.
- **Abilities Directory** page (`abilities-directory.html`, served at `/abilities-directory`): a searchable, category-filterable directory of all **73** plugin abilities (MCP tools), with read/write badges, "on by default" markers, and "requires <plugin>" tags for the Yoast SEO, WooCommerce, Elementor, and Advanced Custom Fields groups. Rendered client-side from a vanilla-JS `ABILITIES` array — no framework, self-contained.
- `abilities.md` — source-of-truth list of every plugin ability, mirroring the plugin registry (`includes/registry.php`) in the wsp-wordpress-mcp repo.
- "Abilities" navigation link added to the main nav on `index.html`, `tutorials.html`, and all four tutorial pages.
- `/abilities-directory` added to `sitemap.xml` (priority 0.9).
- Documented the abilities-sync workflow in `AGENTS.MD`: whenever `abilities.md` changes, the `ABILITIES` array in `abilities-directory.html` must be updated to match.

### Changed
- Updated all four tutorial pages (Claude AI, Codex, Antigravity 2.0, Cursor AI) to reflect the new **single-plugin** setup: one `wsp-mcp-ai-agents-connector.zip` download (WSP MCP – AI Agents Connector, v2.3.0) with the MCP Adapter now bundled in, replacing the old two-plugin flow.
- Removed the manual "Generate a WordPress Application Password" step from all tutorials — the copied config snippet now includes the connection credentials. Renumbered the remaining setup steps accordingly.
- Updated visible FAQs and JSON-LD `FAQPage` answers across all four pages to match (one plugin, no manual credentials).
- Antigravity & Cursor pages: added notes that Elementor abilities only appear after the Elementor plugin is active, that generated pages use free Elementor widgets with Unsplash placeholder images, and refined the model guidance to Gemini 3.1 Pro (High), noting Flash models produce weaker output.
- Bumped `lastmod` dates for the four tutorial pages in `sitemap.xml`.
- Documented the single-plugin / no-application-password conventions and listed the tutorial pages in `AGENTS.MD`.

### Added
- Individual SEO-optimized pages for Claude AI and Codex video tutorials (`/free-connect-claude-ai-wordpress-mcp.html` and `/free-connect-codex-wordpress-mcp.html`).
- Video Schema and Aggregate Rating Schema to the new pages for better search visibility.
- CSS-based dropdown menu under the "Tutorials" navigation link.
- Full SEO content on both tutorial pages: 8-step setup guides derived from video transcripts, benefits sections, and 8-item FAQ sections.
- FAQPage JSON-LD schema on both tutorial pages for Google FAQ rich results.
- Updated `<title>`, meta description, and Open Graph/Twitter meta tags on both pages to be keyword-rich.
- Improved iframe `title` attributes for accessibility and crawlability.


### Added
- Created SEO-optimized landing page for Google Antigravity 2.0 tutorial (`/free-connect-antigravity-wordpress-mcp.html`).
- Added VideoSchema, FAQSchema, and step-by-step setup guide for Antigravity IDE and Elementor integration.
- Updated dropdown navigation across all pages to include the Antigravity tutorial link.


### Added
- Created SEO-optimized landing page for Cursor AI tutorial (`/free-connect-cursor-ai-wordpress-mcp.html`).
- Added VideoSchema, FAQSchema, and step-by-step setup guide for Cursor AI and WordPress MCP integration.
- Updated dropdown navigation across all pages to include the Cursor AI tutorial link.



## [1.0.0] - 2026-06-23

### Added
- Video Tutorials page with two YouTube embeds
- Initial project structure and static HTML files

### Changed
- Updated footer link


