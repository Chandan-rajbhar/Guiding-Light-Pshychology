const fs = require('fs');
const path = require('path');

function clean(str) {
  if (!str) return '';
  return str
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

const files = fs.readdirSync('scraped_raw');
const result = {};

for (const file of files) {
  if (!file.endsWith('.html')) continue;
  const page = file.replace('.html', '');
  const html = fs.readFileSync(path.join('scraped_raw', file), 'utf-8');

  // Find all headings
  const headings = [];
  const hRe = /<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi;
  let hm;
  while ((hm = hRe.exec(html)) !== null) {
    const text = clean(hm[2]);
    if (text) headings.push({ level: hm[1], text });
  }

  // Find all text blocks in elementor widgets
  const blocks = [];
  const bRe = /<div class="[^"]*(?:elementor-widget-text-editor|elementor-widget-heading|elementor-icon-box-description|elementor-icon-box-title|elementor-tab-title|elementor-tab-content)[^"]*"[^>]*>([\s\S]*?)<\/div>/gi;
  let bm;
  while ((bm = bRe.exec(html)) !== null) {
    const text = clean(bm[1]);
    if (text && text.length > 3) blocks.push(text);
  }

  // Find form details
  const formMatches = [...html.matchAll(/<form[\s\S]*?<\/form>/gi)];
  const forms = [];
  for (const fm of formMatches) {
    const formHtml = fm[0];
    const action = (formHtml.match(/action="([^"]*)"/) || [])[1] || '';
    const inputs = [...formHtml.matchAll(/<input[^>]+name="([^"]*)"[^>]*>/gi)].map(m => m[1]);
    const textareas = [...formHtml.matchAll(/<textarea[^>]+name="([^"]*)"[^>]*>/gi)].map(m => m[1]);
    forms.push({ action, inputs, textareas });
  }

  result[page] = { headings, blocks, forms };
}

fs.writeFileSync('site_content.json', JSON.stringify(result, null, 2));
console.log('Successfully parsed all pages. Wrote site_content.json');

// Check faqs specifically
console.log('\n--- FAQS HEADINGS & BLOCKS ---');
console.log('Headings:', result['faqs']?.headings);
console.log('Blocks count:', result['faqs']?.blocks?.length);
result['faqs']?.blocks?.forEach((b, idx) => console.log(`[${idx}]: ${b.slice(0, 100)}...`));

console.log('\n--- MEET DR ANNA BLOCKS ---');
result['meet-dr-anna']?.blocks?.forEach((b, idx) => console.log(`[${idx}]: ${b.slice(0, 100)}...`));

console.log('\n--- ADHD TESTING BLOCKS ---');
result['adhd-testing']?.blocks?.forEach((b, idx) => console.log(`[${idx}]: ${b.slice(0, 100)}...`));

console.log('\n--- CONTACT BLOCKS & FORM ---');
console.log('Contact forms:', result['get-in-touch']?.forms);
result['get-in-touch']?.blocks?.forEach((b, idx) => console.log(`[${idx}]: ${b.slice(0, 100)}...`));
