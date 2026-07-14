# AI Agent Instructions

**CRITICAL: All AI agents MUST read this file and `CHANGELOG.MD` before modifying this codebase.**

This file provides the necessary context and technical constraints for working on the Free WordPress MCP Plugin landing page.

## Core Guidelines

1. **Keep It Static**: This project is built entirely as a static HTML website. Do NOT use or introduce any frontend frameworks (such as React, Vue, Angular, Next.js, etc.) or complex build steps.
2. **Prioritize Speed**: Website speed and performance are top priorities. Do not compromise on load times. Avoid adding external dependencies, heavy scripts, or bulky CSS frameworks unless explicitly approved.
3. **Use Vanilla Web Tech**: Stick to plain HTML and CSS as much as possible to keep the footprint small.

## Workflow Rules

- **Check History**: Always read the `CHANGELOG.MD` to familiarize yourself with recent work.
- **Record Changes**: You must update the `CHANGELOG.MD` using the [Keep a Changelog](https://keepachangelog.com/) format whenever you make any notable changes to the project.
- **Abilities are data-driven**: `abilities.md` is the source of truth for the plugin's tools/abilities. It mirrors the plugin registry (`includes/registry.php`) in the [wsp-wordpress-mcp](https://github.com/bilalnaseer/wsp-wordpress-mcp) repo. **Whenever `abilities.md` changes (an ability added, removed, or edited), you MUST update the `ABILITIES` array (and, if needed, the `GROUPS` map) in `abilities-directory.html` to match, then bump that page's `lastmod` in `sitemap.xml`.** Do not hand-edit ability cards anywhere else — keep `abilities.md` and `abilities-directory.html` in sync.

## Content Conventions

- **Single plugin setup**: The setup is now a **single plugin** — `wsp-mcp-ai-agents-connector.zip` (WSP MCP – AI Agents Connector), with the MCP Adapter bundled inside. Do NOT reintroduce the old two-plugin flow (separate "MCP Adapter" + "WSP WordPress MCP" downloads).
- **No manual Application Password step**: The config snippet copied from `MCP → Config Files` already includes the connection credentials. Do NOT add a "generate an Application Password" step to the tutorials.
- Keep these facts consistent across all tutorial pages (visible steps, visible FAQs, and JSON-LD `FAQPage`/`VideoObject` blocks).

## Important Files

- `index.html`: The main landing page.
- `abilities-directory.html`: The searchable/filterable Abilities Directory page (served at `/abilities-directory`). Rendered client-side from an `ABILITIES` array — keep it in sync with `abilities.md`.
- `abilities.md`: Source-of-truth list of every plugin ability (mirrors the plugin's `registry.php`).
- `tutorials.html`: The video tutorials page.
- `free-connect-claude-ai-wordpress-mcp.html`: Claude AI tutorial page.
- `free-connect-codex-wordpress-mcp.html`: Codex tutorial page.
- `free-connect-antigravity-wordpress-mcp.html`: Google Antigravity 2.0 tutorial page.
- `free-connect-cursor-ai-wordpress-mcp.html`: Cursor AI tutorial page.
- `sitemap.xml`: Sitemap — update `lastmod` when editing a page.
- `CHANGELOG.MD`: Record of all project changes.
- `AGENTS.MD`: This instruction file.
