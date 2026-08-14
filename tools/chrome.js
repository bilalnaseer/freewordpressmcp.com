/* ==========================================================================
   tools/chrome.js — shared <head>, nav, footer and CSS for generated pages.

   The site is hand-written static HTML; only the /blog/ section is generated.
   This module holds the same chrome the hand-written pages use (topbar, theme
   toggle, closer, footer) so generated blog pages look identical to the rest
   of the site. Keep it in sync if the hand-written nav/footer changes.

   No dependencies. Node >= 18.
   ========================================================================== */

const SITE = 'https://freewordpressmcp.com';
const OG_IMAGE = SITE + '/og.png';
const REPO = 'https://github.com/bilalnaseer/wsp-wordpress-mcp';
const YOUTUBE = 'https://www.youtube.com/websensepro';

const PUBLISHER = {
  name: 'WebSensePro',
  url: 'https://websensepro.com',
  logo: SITE + '/assets/free-wordpress-mcp-icon-dark.svg',
};

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ---------------- CSS ----------------
   Base chrome copied from the tutorial pages, plus blog-only additions. */
const CSS = `
  :root {
    --ink: #0B1220;
    --ink-2: #131C2E;
    --paper: #F7F7F2;
    --paper-dim: #E8E6DD;
    --rule: #1F2A40;
    --rule-light: #D9D6CB;
    --blue: #2271B1;
    --blue-hover: #135E96;
    --amber: #F5A524;
    --muted: #5C6373;
    --muted-ink: #8A93A6;

    --serif: 'Fraunces', Georgia, 'Times New Roman', serif;
    --sans: 'IBM Plex Sans', system-ui, -apple-system, sans-serif;
    --mono: 'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace;
  }

  :root[data-theme="dark"] {
    --ink: #EAECF1;
    --ink-2: #FFFFFF;
    --paper: #0C1322;
    --paper-dim: #141D2F;
    --rule: #3A4A66;
    --rule-light: #26324A;
    --blue: #6FB2E8;
    --blue-hover: #98C8F0;
    --amber: #F5A524;
    --muted: #9AA3B4;
    --muted-ink: #8A93A6;
  }

  :root[data-theme="dark"] .closer { background: #060B15; color: var(--ink); }
  :root[data-theme="dark"] .closer h2 { color: var(--ink); }
  :root[data-theme="dark"] .closer p { color: var(--muted); }
  :root[data-theme="dark"] .closer .btn-secondary { border-color: var(--ink); color: var(--ink); }
  :root[data-theme="dark"] .closer .btn-secondary:hover { background: var(--ink); color: var(--paper); }

  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }

  body {
    margin: 0;
    background: var(--paper);
    color: var(--ink);
    font-family: var(--sans);
    font-size: 17px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  a { color: var(--blue); text-decoration: none; }
  a:hover { color: var(--blue-hover); text-decoration: underline; text-underline-offset: 3px; }
  a:focus-visible { outline: 2px solid var(--amber); outline-offset: 3px; border-radius: 2px; }

  .wrap { max-width: 1100px; margin: 0 auto; padding: 0 24px; }

  /* ----- top bar ----- */
  .topbar {
    border-bottom: 1px solid var(--rule-light);
    background: var(--paper);
    position: sticky; top: 0; z-index: 10;
    backdrop-filter: blur(8px);
  }
  .topbar-inner { display: flex; align-items: center; justify-content: space-between; height: 60px; }
  .topbar-right { display: flex; align-items: center; gap: 20px; }
  .brand {
    font-family: var(--serif);
    font-weight: 700;
    font-size: 19px;
    letter-spacing: -0.01em;
    color: var(--ink);
  }
  .brand .dot { color: var(--amber); }
  .topbar nav { display: flex; gap: 24px; font-size: 15px; align-items: center; }
  .topbar nav a { color: var(--ink); }
  .topbar nav a:hover { color: var(--blue); }
  .topbar nav a[aria-current="page"] { color: var(--blue); font-weight: 600; }

  .dropdown { position: relative; display: inline-block; }
  .dropdown-content {
    display: none; position: absolute; background-color: var(--paper);
    min-width: 220px; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.1);
    z-index: 11; border: 1px solid var(--rule-light); border-radius: 4px;
    top: 100%; left: 0; padding: 8px 0;
  }
  .dropdown-content a {
    color: var(--ink); padding: 8px 16px; text-decoration: none; display: block;
    white-space: normal; line-height: 1.4; font-weight: 400;
  }
  .dropdown-content a:hover { background-color: var(--paper-dim); color: var(--blue); text-decoration: none; }
  .dropdown:hover .dropdown-content { display: block; }
  .dropdown > a { cursor: pointer; display: flex; align-items: center; gap: 4px; }
  .dropdown > a::after { content: "▼"; font-size: 10px; }

  /* No hamburger here (blog pages are generated and stay dependency-free):
     below 640px the nav wraps onto a second row instead of disappearing. */
  @media (max-width: 640px) {
    .topbar-inner { height: auto; flex-direction: column; align-items: flex-start; gap: 10px; padding-top: 12px; padding-bottom: 12px; }
    .topbar-right { width: 100%; justify-content: space-between; align-items: flex-start; }
    .topbar nav { flex-wrap: wrap; gap: 14px; font-size: 14px; }
    .dropdown-content { display: none !important; }
    .dropdown > a::after { content: ""; }
  }

  .theme-toggle {
    display: inline-flex; align-items: center; justify-content: center;
    width: 38px; height: 38px; border-radius: 50%;
    border: 1px solid var(--rule-light); background: transparent; color: var(--ink);
    cursor: pointer; transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
  }
  .theme-toggle:hover { border-color: var(--amber); color: var(--amber); }
  .theme-toggle:focus-visible { outline: 2px solid var(--amber); outline-offset: 2px; }
  .theme-toggle svg { width: 18px; height: 18px; }
  .theme-toggle .icon-sun { display: none; }
  :root[data-theme="dark"] .theme-toggle .icon-moon { display: none; }
  :root[data-theme="dark"] .theme-toggle .icon-sun { display: inline; }

  /* ----- headings ----- */
  h1 {
    font-family: var(--serif);
    font-weight: 500;
    font-size: clamp(32px, 4.4vw, 50px);
    line-height: 1.08;
    letter-spacing: -0.02em;
    margin: 0 0 20px;
    color: var(--ink);
  }
  h2 {
    font-family: var(--serif);
    font-weight: 500;
    font-size: clamp(24px, 3.2vw, 34px);
    line-height: 1.15;
    letter-spacing: -0.015em;
    margin: 0 0 16px;
    color: var(--ink);
  }
  .eyebrow {
    font-family: var(--mono);
    font-size: 12px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 24px;
    display: inline-flex; align-items: center; gap: 10px;
  }
  .eyebrow::before { content: ""; width: 28px; height: 1px; background: var(--amber); }
  .lede { font-size: 19px; line-height: 1.55; color: var(--muted); max-width: 680px; margin: 0; }
  .muted { color: var(--muted); }

  /* ----- breadcrumbs ----- */
  .crumbs { font-size: 13px; color: var(--muted); padding: 24px 0 0; }
  .crumbs a { color: var(--muted); }
  .crumbs a:hover { color: var(--blue); }

  /* ----- blog index ----- */
  .blog-hero { padding: 48px 0 40px; border-bottom: 1px solid var(--rule-light); }
  .blog-section { padding: 56px 0 80px; }
  .blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 28px;
  }
  .blog-card {
    display: block;
    border: 1px solid var(--rule-light);
    border-radius: 12px;
    padding: 0 0 22px;
    overflow: hidden;
    background: var(--paper);
    color: var(--ink);
    transition: transform 0.12s ease, border-color 0.15s ease, box-shadow 0.15s ease;
  }
  .blog-card:hover {
    text-decoration: none;
    transform: translateY(-2px);
    border-color: var(--amber);
    box-shadow: 0 18px 36px -22px rgba(11,18,32,0.45);
  }
  .blog-card-cover { width: 100%; aspect-ratio: 16 / 9; object-fit: cover; display: block; margin-bottom: 18px; background: var(--paper-dim); }
  .blog-card h3 {
    font-family: var(--serif); font-weight: 500; font-size: 21px; line-height: 1.25;
    margin: 0 0 8px; padding: 0 22px; color: var(--ink);
  }
  .blog-card:not(:has(.blog-card-cover)) h3 { margin-top: 22px; }
  .blog-card-meta {
    font-family: var(--mono); font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--muted); margin: 0 0 10px; padding: 0 22px;
  }
  .blog-card p:last-child { margin: 0; padding: 0 22px; color: var(--muted); font-size: 15px; line-height: 1.6; }
  .blog-empty { color: var(--muted); }

  /* ----- post ----- */
  .post { padding: 32px 0 72px; }
  .post-head { max-width: 760px; }
  .post-meta {
    font-family: var(--mono); font-size: 12px; letter-spacing: 0.06em;
    color: var(--muted); margin: 0 0 28px;
  }
  .post-meta a { color: var(--muted); }
  /* Visible aggregate rating. Google requires the rating that appears in
     schema to be visible on the page — this is that visible copy. */
  .post-rating { display: flex; align-items: center; gap: 6px; font-size: 17px; margin: -18px 0 26px; color: var(--ink); }
  .post-rating-star { color: var(--amber); font-size: 1.15em; line-height: 1; }
  .post-tags { display: flex; flex-wrap: wrap; gap: 8px; margin: 0 0 28px; padding: 0; list-style: none; }
  .post-tags li {
    font-family: var(--mono); font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
    border: 1px solid var(--rule-light); border-radius: 999px; padding: 4px 10px; color: var(--muted);
  }
  .post-cover { width: 100%; max-width: 860px; border-radius: 12px; display: block; margin: 0 0 40px; }
  .prose { max-width: 760px; color: var(--muted); font-size: 17px; line-height: 1.75; }
  .prose > *:first-child { margin-top: 0; }
  .prose h2 { margin: 48px 0 14px; }
  .prose h3 {
    font-family: var(--sans); font-weight: 600; font-size: 19px;
    margin: 34px 0 10px; color: var(--ink); line-height: 1.35;
  }
  .prose h4 { font-family: var(--sans); font-weight: 600; font-size: 17px; margin: 26px 0 8px; color: var(--ink); }
  .prose p { margin: 0 0 20px; }
  .prose strong { color: var(--ink); }
  .prose ul, .prose ol { margin: 0 0 22px; padding-left: 22px; }
  .prose li { margin-bottom: 8px; }
  .prose img { max-width: 100%; height: auto; border-radius: 10px; display: block; margin: 28px 0; }
  .prose blockquote {
    margin: 28px 0; padding: 4px 0 4px 20px;
    border-left: 3px solid var(--amber); color: var(--ink); font-style: italic;
  }
  .prose hr { border: none; border-top: 1px solid var(--rule-light); margin: 44px 0; }
  .prose table { width: 100%; border-collapse: collapse; margin: 0 0 24px; font-size: 15px; }
  .prose th, .prose td { border: 1px solid var(--rule-light); padding: 10px 12px; text-align: left; }
  .prose th { background: var(--paper-dim); color: var(--ink); font-weight: 600; }
  code { font-family: var(--mono); background: var(--paper-dim); padding: 2px 6px; border-radius: 3px; font-size: 14px; }
  pre.code {
    background: var(--paper-dim); border: 1px solid var(--rule-light); border-radius: 10px;
    padding: 16px 18px; overflow-x: auto; margin: 0 0 24px;
  }
  pre.code code { background: none; padding: 0; font-size: 13.5px; line-height: 1.6; }

  /* ----- related / next links ----- */
  .band { padding: 56px 0 0; border-top: 1px solid var(--rule-light); margin-top: 64px; }
  .band h2 { font-size: clamp(22px, 3vw, 28px); }
  .link-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }
  .link-card {
    display: block; border: 1px solid var(--rule-light); border-radius: 10px;
    padding: 18px 20px; color: var(--ink);
    transition: border-color 0.15s ease, transform 0.12s ease;
  }
  .link-card:hover { text-decoration: none; border-color: var(--amber); transform: translateY(-2px); }
  .link-card strong { display: block; font-size: 16px; margin-bottom: 4px; }
  .link-card span { color: var(--muted); font-size: 14px; }

  /* ----- closer ----- */
  .closer { text-align: center; padding: 96px 24px; background: var(--ink); color: var(--paper); }
  .closer h2 { color: var(--paper); margin-bottom: 20px; }
  .closer p { color: var(--muted-ink); max-width: 540px; margin: 0 auto 36px; font-size: 18px; }
  .cta-row { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; }
  .btn {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 14px 22px; border-radius: 8px;
    font-family: var(--sans); font-weight: 500; font-size: 15px;
    transition: transform 0.08s ease, background 0.15s ease;
    border: 1px solid transparent;
  }
  .btn:hover { text-decoration: none; transform: translateY(-1px); }
  .btn-primary { background: var(--amber); color: var(--ink); }
  .btn-primary:hover { background: #ffb83d; color: var(--ink); }
  .btn-secondary { background: transparent; color: var(--paper); border-color: var(--paper); }
  .btn-secondary:hover { background: var(--paper); color: var(--ink); }
  .btn svg { width: 18px; height: 18px; }

  /* ----- footer ----- */
  footer { padding: 40px 0; border-top: 1px solid var(--rule-light); font-size: 14px; color: var(--muted); }
  .footer-inner { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; }
  .footer-links { display: flex; gap: 22px; flex-wrap: wrap; }
  footer a { color: var(--ink); }

  @media (prefers-reduced-motion: reduce) {
    * { transition: none !important; animation: none !important; }
    html { scroll-behavior: auto; }
  }
`;

/* ---------------- <head> + topbar ----------------
   meta: { slug, title, desc, ogType, ogImage, robots }
   extraHead: raw HTML (JSON-LD scripts) injected before </head>. */
function head(meta, extraHead = '') {
  const url = SITE + meta.slug;
  const ogImage = meta.ogImage || OG_IMAGE;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<!-- Set theme before paint to avoid a flash of the wrong mode -->
<script>
  (function () {
    try {
      var t = localStorage.getItem('theme');
      if (t !== 'dark' && t !== 'light') {
        t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      document.documentElement.setAttribute('data-theme', t);
    } catch (e) {}
  })();
</script>
<title>${esc(meta.title)}</title>
<meta name="description" content="${esc(meta.desc)}">
<meta name="author" content="WebSensePro">
<meta name="theme-color" content="#0B1220">${meta.robots ? `\n<meta name="robots" content="${esc(meta.robots)}">` : ''}
<link rel="canonical" href="${esc(url)}">

<!-- Open Graph -->
<meta property="og:type" content="${esc(meta.ogType || 'website')}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:title" content="${esc(meta.title)}">
<meta property="og:description" content="${esc(meta.desc)}">
<meta property="og:image" content="${esc(ogImage)}">
<meta property="og:site_name" content="Free WordPress MCP">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(meta.title)}">
<meta name="twitter:description" content="${esc(meta.desc)}">
<meta name="twitter:image" content="${esc(ogImage)}">

<!-- Favicon -->
<link rel="icon" href="/assets/free-wordpress-mcp-icon-dark.svg" type="image/svg+xml">

<!-- Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,700&family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

<style>${CSS}</style>
${extraHead}
</head>
<body>

${topbar()}`;
}

function topbar() {
  return `<header class="topbar">
  <div class="wrap topbar-inner">
    <a class="brand" href="/"><img src="/assets/free-wordpress-mcp-icon-dark.svg" alt="" width="28" height="28" style="width:28px;height:28px;display:inline-block;vertical-align:-8px;margin-right:9px;">Free WordPress MCP<span class="dot">.</span></a>
    <div class="topbar-right">
    <nav>
      <a href="/#how">How it works</a>
      <a href="/#setup">Setup</a>
      <a href="/abilities-directory">Abilities</a>
      <a href="/blog/" aria-current="page">Blog</a>
      <a href="/#faq">FAQ</a>
      <div class="dropdown">
        <a href="/tutorials">Tutorials</a>
        <div class="dropdown-content">
          <a href="/free-connect-claude-ai-wordpress-mcp">Claude AI Tutorial</a>
          <a href="/free-connect-codex-wordpress-mcp">Codex Tutorial</a>
          <a href="/free-connect-antigravity-wordpress-mcp">Antigravity 2.0 Tutorial</a>
          <a href="/free-connect-cursor-ai-wordpress-mcp">Cursor AI Tutorial</a>
        </div>
      </div>
      <a href="${REPO}" rel="noopener">GitHub</a>
    </nav>
    <button class="theme-toggle" type="button" data-theme-toggle aria-label="Toggle dark mode">
      <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
      <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
    </button>
    </div>
  </div>
</header>`;
}

/* Dark CTA band + footer + theme-toggle script + closing tags. */
function footer() {
  return `<section class="closer">
  <div class="wrap">
    <h2>Connect your first AI agent in 5 minutes.</h2>
    <p>One free plugin. No API key, no subscription, no code.</p>
    <div class="cta-row">
      <a class="btn btn-primary" href="/#setup">Get the free WordPress MCP plugin</a>
      <a class="btn btn-secondary" href="${YOUTUBE}" rel="noopener">Watch the tutorials</a>
    </div>
  </div>
</section>

<footer>
  <div class="wrap footer-inner">
    <div>Built by <a href="${YOUTUBE}" rel="noopener">WebSensePro</a> · MIT licensed</div>
    <div class="footer-links">
      <a href="/">Free WordPress MCP plugin</a>
      <a href="/abilities-directory">Browse every WordPress MCP ability</a>
      <a href="/blog/">Blog</a>
      <a href="${REPO}" rel="noopener">GitHub</a>
      <a href="${YOUTUBE}" rel="noopener">YouTube</a>
    </div>
  </div>
</footer>

<script>
  (function () {
    var root = document.documentElement;
    var btn = document.querySelector('[data-theme-toggle]');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  })();
</script>

</body>
</html>
`;
}

/* BreadcrumbList JSON-LD. items: [{ name, slug }] */
function breadcrumbJsonLd(items) {
  const obj = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: SITE + it.slug,
    })),
  };
  return `<script type="application/ld+json">\n${JSON.stringify(obj, null, 2)}\n</script>`;
}

/* Small "go here next" cards. cards: [{ href, title, desc }] */
function linkCards(cards) {
  return cards
    .map(
      (c) => `<a class="link-card" href="${esc(c.href)}"><strong>${c.title}</strong><span>${c.desc}</span></a>`
    )
    .join('\n        ');
}

module.exports = { SITE, PUBLISHER, REPO, YOUTUBE, esc, head, footer, breadcrumbJsonLd, linkCards };
