#!/usr/bin/env node
/* ==========================================================================
   tools/build-blog.js — builds the /blog/ section from Markdown.

   Source of truth: content/blog/*.md (written via Sveltia CMS at /admin, or by
   hand). This script turns each post into a static, crawlable HTML page and
   builds the blog index. Nav/head/footer come from tools/chrome.js so the blog
   matches the hand-written pages exactly.

   Run:  node tools/build-blog.js
   On deploy, Cloudflare Pages runs this automatically (see BLOG-SETUP.md).
   Zero runtime/browser dependencies; a tiny built-in Markdown parser only.
   ========================================================================== */

const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const { SITE, PUBLISHER, esc, head, footer, breadcrumbJsonLd, linkCards } = require('./chrome.js');

const CONTENT_DIR = path.join(ROOT, 'content', 'blog');
const OUT_DIR = path.join(ROOT, 'blog');
const BLOG_NAME = 'Free WordPress MCP Blog';
const DEFAULT_AUTHOR = { name: 'Bilal Naseer', url: 'https://websensepro.com' };

/* Cards shown under every post and on the index, linking back into the site. */
const NEXT_CARDS = [
  { href: '/#setup', title: 'Install the plugin', desc: 'Free, MIT licensed, 5-minute setup.' },
  { href: '/abilities-directory', title: 'Abilities directory', desc: 'Every MCP tool the plugin exposes.' },
  { href: '/free-connect-claude-ai-wordpress-mcp', title: 'Claude AI tutorial', desc: 'Connect Claude to WordPress.' },
  { href: '/free-connect-cursor-ai-wordpress-mcp', title: 'Cursor AI tutorial', desc: 'Connect Cursor to WordPress.' },
];

/* Escape only for text nodes (leaves entities the author typed intact). */
function escText(s) {
  return String(s)
    .replace(/&(?![a-zA-Z#0-9]+;)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/* ---------------- front-matter parser (minimal YAML subset) ----------------
   Supports:  key: value  |  key: "value"  |  key:\n  - item  (list) */
function parseFrontMatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
  const data = {};
  const lines = m[1].split(/\r?\n/);
  let key = null;
  for (const line of lines) {
    if (!line.trim()) continue;
    const listItem = line.match(/^\s*-\s+(.*)$/);
    if (listItem && key) {
      if (!Array.isArray(data[key])) data[key] = [];
      data[key].push(unquote(listItem[1].trim()));
      continue;
    }
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (kv) {
      key = kv[1];
      const val = kv[2].trim();
      data[key] = val === '' ? '' : unquote(val);
    }
  }
  return { data, body: m[2] };
}
function unquote(s) {
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    return s.slice(1, -1);
  }
  return s;
}

/* Slugify a permalink/title into a clean URL slug, so the CMS Permalink field
   can be pasted in as free text: "My New Post!" -> "my-new-post". */
function slugify(s) {
  return String(s)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/* ---------------- inline Markdown ---------------- */
function inline(text) {
  let s = escText(text);
  // images  ![alt](src)
  s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g,
    (_, alt, src, title) => `<img src="${esc(src)}" alt="${esc(alt)}"${title ? ` title="${esc(title)}"` : ''} loading="lazy">`);
  // links  [text](href)
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g, (_, txt, href, title) => {
    const ext = /^https?:\/\//.test(href) && !href.includes('freewordpressmcp.com');
    const attrs = ext ? ' rel="noopener" target="_blank"' : '';
    return `<a href="${esc(href)}"${title ? ` title="${esc(title)}"` : ''}${attrs}>${txt}</a>`;
  });
  // inline code  `code`
  s = s.replace(/`([^`]+)`/g, (_, c) => `<code>${c}</code>`);
  // bold  **text**  __text__
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/__([^_]+)__/g, '<strong>$1</strong>');
  // italic  *text*  _text_
  s = s.replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>').replace(/(^|[^_\w])_([^_]+)_/g, '$1<em>$2</em>');
  return s;
}

/* ---------------- block Markdown ---------------- */
const BLOCK_START = /^(#{1,6}\s|>\s?|\s*[-*+]\s+|\s*\d+\.\s+|```|\|)/;

function markdown(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    // fenced code block
    const fence = line.match(/^```(\w*)\s*$/);
    if (fence) {
      const buf = [];
      i++;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) { buf.push(lines[i]); i++; }
      i++; // closing fence
      out.push(`<pre class="code"><code>${esc(buf.join('\n'))}</code></pre>`);
      continue;
    }

    // blank
    if (!line.trim()) { i++; continue; }

    // heading
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) { const lvl = h[1].length; out.push(`<h${lvl}>${inline(h[2].trim())}</h${lvl}>`); i++; continue; }

    // horizontal rule
    if (/^(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) { out.push('<hr>'); i++; continue; }

    // pipe table:  | a | b |  /  | --- | --- |  /  rows
    if (/^\s*\|/.test(line) && i + 1 < lines.length && /^\s*\|[\s:|-]+\|\s*$/.test(lines[i + 1])) {
      const cells = (row) => row.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
      const header = cells(lines[i]);
      i += 2; // header + separator
      const body = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) { body.push(cells(lines[i])); i++; }
      out.push(
        '<table>\n  <thead><tr>' + header.map((c) => `<th>${inline(c)}</th>`).join('') + '</tr></thead>\n' +
        '  <tbody>\n' + body.map((r) => '    <tr>' + r.map((c) => `<td>${inline(c)}</td>`).join('') + '</tr>').join('\n') +
        '\n  </tbody>\n</table>'
      );
      continue;
    }

    // blockquote (consecutive > lines)
    if (/^>\s?/.test(line)) {
      const buf = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) { buf.push(lines[i].replace(/^>\s?/, '')); i++; }
      out.push(`<blockquote>${inline(buf.join(' ').trim())}</blockquote>`);
      continue;
    }

    // unordered list
    if (/^\s*[-*+]\s+/.test(line)) {
      const buf = [];
      while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) { buf.push(lines[i].replace(/^\s*[-*+]\s+/, '')); i++; }
      out.push('<ul>\n' + buf.map((it) => `  <li>${inline(it.trim())}</li>`).join('\n') + '\n</ul>');
      continue;
    }

    // ordered list
    if (/^\s*\d+\.\s+/.test(line)) {
      const buf = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) { buf.push(lines[i].replace(/^\s*\d+\.\s+/, '')); i++; }
      out.push('<ol>\n' + buf.map((it) => `  <li>${inline(it.trim())}</li>`).join('\n') + '\n</ol>');
      continue;
    }

    // paragraph (gather until blank / block start)
    const para = [];
    while (i < lines.length && lines[i].trim() &&
           !BLOCK_START.test(lines[i]) &&
           !/^(-{3,}|\*{3,}|_{3,})\s*$/.test(lines[i])) {
      para.push(lines[i]); i++;
    }
    out.push(`<p>${inline(para.join(' ').trim())}</p>`);
  }
  return out.join('\n');
}

/* ---------------- dates ---------------- */
function isoDate(d) {
  const dt = new Date(d);
  if (isNaN(dt)) return null;
  return dt.toISOString();
}
function humanDate(d) {
  const dt = new Date(d);
  if (isNaN(dt)) return '';
  return dt.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}

/* ---------------- FAQ extraction ----------------
   A post whose body ends with an "## FAQ"/"## Frequently asked questions"
   section gets a FAQPage node built from its H3 question/answer pairs. */
function extractFaqs(body) {
  const m = body.replace(/\r\n/g, '\n').match(/^##\s+(?:FAQs?|Frequently asked questions)\s*$([\s\S]*)/mi);
  if (!m) return [];
  const faqs = [];
  const section = m[1].split(/^##\s+/m)[0];
  // Each chunk after the split is "Question\nanswer lines…".
  for (const chunk of section.split(/^###\s+/m).slice(1)) {
    const lines = chunk.split('\n');
    const question = (lines.shift() || '').trim();
    const answer = lines
      .filter((l) => l.trim() && !/^[#>*\-|]/.test(l.trim()))
      .join(' ')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[*_`]/g, '')
      .trim();
    if (question && answer) faqs.push({ q: question, a: answer });
  }
  return faqs;
}

/* ---------------- load posts ---------------- */
function loadPosts() {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs.readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8');
      const { data, body } = parseFrontMatter(raw);
      const slug = slugify(data.slug || file.replace(/\.md$/, ''));
      return {
        slug,
        url: `/blog/${slug}/`,
        title: data.title || slug,
        desc: data.description || '',
        date: data.date || '',
        updated: data.updated || '',
        author: data.author || DEFAULT_AUTHOR.name,
        authorUrl: data.author_url || data.authorUrl || DEFAULT_AUTHOR.url,
        image: data.image || '',
        tags: Array.isArray(data.tags) ? data.tags : (data.tags ? [data.tags] : []),
        draft: String(data.draft) === 'true',
        faqs: extractFaqs(body),
        bodyHtml: markdown(body),
      };
    })
    .filter((p) => !p.draft)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

/* ---------------- JSON-LD ---------------- */
function prune(o) {
  if (Array.isArray(o)) return o.map(prune);
  if (o && typeof o === 'object') {
    const r = {};
    for (const k in o) { if (o[k] !== undefined && o[k] !== '') r[k] = prune(o[k]); }
    return r;
  }
  return o;
}
function jsonLd(obj) {
  return `<script type="application/ld+json">\n${JSON.stringify(prune(obj), null, 2)}\n</script>`;
}

function articleJsonLd(p) {
  return jsonLd({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.desc || undefined,
    image: p.image ? [SITE + p.image] : undefined,
    datePublished: isoDate(p.date) || undefined,
    dateModified: isoDate(p.updated || p.date) || undefined,
    keywords: p.tags.length ? p.tags.join(', ') : undefined,
    author: { '@type': 'Person', name: p.author, url: p.authorUrl || undefined },
    publisher: {
      '@type': 'Organization',
      name: PUBLISHER.name,
      url: PUBLISHER.url,
      logo: { '@type': 'ImageObject', url: PUBLISHER.logo },
    },
    isPartOf: { '@type': 'Blog', name: BLOG_NAME, '@id': SITE + '/blog/' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': SITE + p.url },
  });
}

function faqJsonLd(faqs) {
  if (!faqs.length) return '';
  return jsonLd({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  });
}

/* ---------------- post page ---------------- */
function postPage(p) {
  const crumbs = breadcrumbJsonLd([
    { name: 'Home', slug: '/' },
    { name: 'Blog', slug: '/blog/' },
    { name: p.title, slug: p.url },
  ]);
  const meta = {
    slug: p.url,
    title: `${p.title} — Free WordPress MCP`,
    desc: p.desc || p.title,
    ogType: 'article',
    ogImage: p.image ? SITE + p.image : undefined,
  };
  const dateLine = [
    p.date ? `<time datetime="${esc(isoDate(p.date))}">${humanDate(p.date)}</time>` : '',
    `by <a href="${esc(p.authorUrl)}" rel="noopener">${esc(p.author)}</a>`,
    p.updated ? `Updated ${humanDate(p.updated)}` : '',
  ].filter(Boolean).join(' · ');
  const extraHead = [crumbs, articleJsonLd(p), faqJsonLd(p.faqs)].filter(Boolean).join('\n');

  return `${head(meta, extraHead)}

<main>
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <a href="/blog/">Blog</a> › ${esc(p.title)}</nav>
    <article class="post">
      <div class="post-head">
        <h1>${esc(p.title)}</h1>
        <p class="post-meta">${dateLine}</p>
      </div>
      ${p.image ? `<img class="post-cover" src="${esc(p.image)}" alt="${esc(p.title)}" loading="eager">` : ''}
      ${p.tags.length ? `<ul class="post-tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}
      <div class="prose">
${p.bodyHtml}
      </div>
    </article>

    <section class="band">
      <h2>Where to go next</h2>
      <div class="link-grid">
        ${linkCards(NEXT_CARDS)}
      </div>
    </section>
  </div>
</main>

${footer()}`;
}

/* ---------------- blog index ---------------- */
function postCard(p) {
  return `<a class="blog-card" href="${p.url}">
        ${p.image ? `<img class="blog-card-cover" src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy">` : ''}
        <h3>${esc(p.title)}</h3>
        <p class="blog-card-meta">${p.date ? humanDate(p.date) : ''}${p.date ? ' · ' : ''}${esc(p.author)}</p>
        <p>${esc(p.desc)}</p>
      </a>`;
}

function indexPage(posts) {
  const crumbs = breadcrumbJsonLd([{ name: 'Home', slug: '/' }, { name: 'Blog', slug: '/blog/' }]);
  const listJsonLd = jsonLd({
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: BLOG_NAME,
    url: SITE + '/blog/',
    description: 'Guides and updates on connecting AI agents to WordPress with the free WordPress MCP plugin.',
    publisher: { '@type': 'Organization', name: PUBLISHER.name, url: PUBLISHER.url },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: SITE + p.url,
      datePublished: isoDate(p.date) || undefined,
    })),
  });
  const meta = {
    slug: '/blog/',
    title: 'Blog — WordPress MCP Guides & AI Agent Tips | Free WordPress MCP',
    desc: 'Guides, tips and updates on connecting AI agents to WordPress with MCP — from the team behind the free WordPress MCP plugin.',
  };
  const cards = posts.length
    ? posts.map(postCard).join('\n      ')
    : '<p class="blog-empty">No posts yet — check back soon.</p>';

  return `${head(meta, crumbs + '\n' + listJsonLd)}

<main>
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> › Blog</nav>
  </div>
  <section class="blog-hero">
    <div class="wrap">
      <span class="eyebrow">Free WordPress MCP · Blog</span>
      <h1>WordPress MCP guides &amp; AI agent tips</h1>
      <p class="lede">Practical writing on connecting <strong>Claude, Cursor, Codex and any other MCP agent</strong> to WordPress — what the abilities do, how to set them up safely, and what the plugin can automate for you.</p>
    </div>
  </section>
  <section class="blog-section">
    <div class="wrap">
      <div class="blog-grid">
      ${cards}
      </div>
    </div>
  </section>
</main>

${footer()}`;
}

/* ---------------- write ---------------- */
function write(rel, html) {
  const dir = path.join(OUT_DIR, rel);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log('wrote /blog/' + (rel ? rel + '/' : ''));
}

function build() {
  const posts = loadPosts();
  // Clear /blog/ first so posts deleted or renamed in the CMS don't leave stale
  // orphan pages behind. Everything under /blog/ is generated, so this is safe.
  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });
  write('', indexPage(posts));
  posts.forEach((p) => write(p.slug, postPage(p)));
  console.log(`done. ${posts.length} post(s).`);
}

// Only build when run directly, not when required by build-sitemap.js.
if (require.main === module) build();

module.exports = { loadPosts, build };
