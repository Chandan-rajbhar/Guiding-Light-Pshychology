const fs = require('fs');
const path = require('path');

// Helper to strip HTML tags and decode entities
function cleanText(html) {
  if (!html) return '';
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractElements(html) {
  // Extract headings
  const headings = [];
  const hMatches = [...html.matchAll(/<(h[1-6])[^>]*>(.*?)<\/\1>/gis)];
  for (const m of hMatches) {
    const text = cleanText(m[2]);
    if (text) headings.push({ tag: m[1], text });
  }

  // Extract paragraphs
  const paragraphs = [];
  const pMatches = [...html.matchAll(/<p[^>]*>(.*?)<\/p>/gis)];
  for (const m of pMatches) {
    const text = cleanText(m[1]);
    if (text && text.length > 5) paragraphs.push(text);
  }

  // Extract list items
  const listItems = [];
  const liMatches = [...html.matchAll(/<li[^>]*>(.*?)<\/li>/gis)];
  for (const m of liMatches) {
    const text = cleanText(m[1]);
    if (text) listItems.push(text);
  }

  // Extract accordion / FAQ items if present
  const accordions = [];
  const accMatches = [...html.matchAll(/elementor-tab-title[^>]*>(.*?)<\/div>.*?elementor-tab-content[^>]*>(.*?)<\/div>/gis)];
  for (const m of accMatches) {
    accordions.push({
      question: cleanText(m[1]),
      answer: cleanText(m[2])
    });
  }

  // Extract links
  const links = [];
  const aMatches = [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gis)];
  for (const m of aMatches) {
    const href = m[1];
    const text = cleanText(m[2]);
    if (text && href) links.push({ href, text });
  }

  // Extract images
  const images = [];
  const imgMatches = [...html.matchAll(/<img\b[^>]*src=["']([^"']+)["'][^>]*>/gis)];
  for (const m of imgMatches) {
    const src = m[1];
    const alt = (m[0].match(/alt=["']([^"']*)["']/i) || [])[1] || '';
    images.push({ src, alt });
  }

  return { headings, paragraphs, listItems, accordions, links, images };
}

const files = fs.readdirSync('scraped_raw');
const structured = {};

for (const file of files) {
  if (!file.endsWith('.html')) continue;
  const pageName = file.replace('.html', '');
  const html = fs.readFileSync(path.join('scraped_raw', file), 'utf-8');
  structured[pageName] = extractElements(html);
}

fs.writeFileSync('extracted_content.json', JSON.stringify(structured, null, 2));
console.log('Extracted content from', Object.keys(structured).length, 'pages');

// Print summary of key pages
console.log('\n--- HOME HEADINGS ---');
structured['home']?.headings.forEach(h => console.log(`${h.tag}: ${h.text}`));

console.log('\n--- FAQS ITEMS ---');
console.log('FAQ items found:', structured['faqs']?.accordions.length);
structured['faqs']?.accordions.forEach((a, i) => {
  console.log(`Q${i+1}: ${a.question}`);
});

console.log('\n--- MENTAL HEALTH LINKS ---');
structured['mental-health-links']?.links.forEach(l => {
  if (l.href.startsWith('http') && !l.href.includes('guidinglightnow.com')) {
    console.log(`External link: ${l.text} -> ${l.href}`);
  }
});
