#!/usr/bin/env node
/* ==========================================================================
   tools/build-sitemap.js — regenerates sitemap.xml.

   The hand-written pages are listed below with their own lastmod dates (edit
   the date here when you edit a page — same rule AGENTS.MD already states).
   Blog URLs are appended automatically from content/blog/*.md.

   Run:  node tools/build-sitemap.js
   ========================================================================== */

const fs = require('fs');
const path = require('path');
const { SITE } = require('./chrome.js');
const { loadPosts } = require('./build-blog.js');

const today = new Date().toISOString().slice(0, 10);

/* Hand-written pages. Keep `lastmod` current when you edit one. */
const STATIC_URLS = [
  { loc: '/', lastmod: '2026-07-24', changefreq: 'weekly', priority: '1.0' },
  { loc: '/abilities-directory', lastmod: '2026-07-27', changefreq: 'weekly', priority: '0.9' },
  { loc: '/blog/', lastmod: today, changefreq: 'weekly', priority: '0.9' },
  { loc: '/tutorials', lastmod: '2026-06-17', changefreq: 'weekly', priority: '0.8' },
  { loc: '/free-connect-claude-ai-wordpress-mcp', lastmod: '2026-07-24', changefreq: 'weekly', priority: '0.8' },
  { loc: '/free-connect-codex-wordpress-mcp', lastmod: '2026-07-24', changefreq: 'weekly', priority: '0.8' },
  { loc: '/free-connect-antigravity-wordpress-mcp', lastmod: '2026-07-24', changefreq: 'weekly', priority: '0.8' },
  { loc: '/free-connect-cursor-ai-wordpress-mcp', lastmod: '2026-07-24', changefreq: 'weekly', priority: '0.8' },
];

const posts = loadPosts();
const postLastmod = (p) => {
  const d = new Date(p.updated || p.date);
  return isNaN(d) ? today : d.toISOString().slice(0, 10);
};

/* The blog index is only as fresh as its newest post. */
if (posts.length) {
  const blogIndex = STATIC_URLS.find((u) => u.loc === '/blog/');
  blogIndex.lastmod = posts.map(postLastmod).sort().pop();
}

const urls = [
  ...STATIC_URLS,
  ...posts.map((p) => ({ loc: p.url, lastmod: postLastmod(p), changefreq: 'monthly', priority: '0.7' })),
];

const body = urls.map((u) =>
  `  <url>\n    <loc>${SITE}${u.loc}</loc>\n    <lastmod>${u.lastmod || today}</lastmod>\n    <changefreq>${u.changefreq || 'monthly'}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

fs.writeFileSync(path.resolve(__dirname, '..', 'sitemap.xml'), xml);
console.log('wrote sitemap.xml with', urls.length, 'urls');
