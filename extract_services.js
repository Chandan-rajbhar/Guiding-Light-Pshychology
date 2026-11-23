const fs = require('fs');
const path = require('path');

const servicePages = [
  'individual-therapy-for-adults',
  'therapy-for-teenagers-adolescents',
  'adhd-therapy-executive-functioning-coaching',
  'anxiety-stress',
  'trauma-informed-therapy',
  'sleep-insomnia-support',
  'relationship-interpersonal-therapy',
  'mindfulness-based-therapy',
  'burnout-life-transitions',
  'self-esteem-difficulties',
  'anger-management',
  'parent-support'
];

const siteContent = JSON.parse(fs.readFileSync('site_content.json', 'utf-8'));
const homeHtml = fs.readFileSync('scraped_raw/home.html', 'utf-8');

// Find service mapping on homepage
// In home.html, find sections with icon-1..icon-9, etc., and service headings
const serviceMap = {};
for (const sp of servicePages) {
  const content = siteContent[sp];
  const fileHtml = fs.readFileSync(path.join('scraped_raw', sp + '.html'), 'utf-8');
  const imgMatches = [...fileHtml.matchAll(/<img[^>]+src="([^">]+)"[^>]*>/gi)].map(m => m[1]);
  // Also check icon on homepage that links to this service
  const linkRegex = new RegExp(`href="[^"]*${sp}[^"]*"`, 'gi');
  serviceMap[sp] = {
    title: content?.headings?.find(h => h.level === 'h1' || h.level === 'h2')?.text || sp,
    headings: content?.headings || [],
    blocks: content?.blocks || [],
    images: imgMatches
  };
}

fs.writeFileSync('services_extracted.json', JSON.stringify(serviceMap, null, 2));

// Check homepage service cards
const cards = [...homeHtml.matchAll(/<div class="[^"]*elementor-widget-icon-box[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/gi)];
console.log('Home service icon boxes:', cards.length);

cards.forEach((c, idx) => {
  const title = (c[1].match(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/i) || [])[1];
  const img = (c[1].match(/<img[^>]+src="([^">]+)"/i) || [])[1];
  const link = (c[1].match(/href="([^">]+)"/i) || [])[1];
  const desc = (c[1].match(/<p[^>]*>(.*?)<\/p>/i) || [])[1];
  console.log(`[Card ${idx}]: Title: ${title} | Img: ${img} | Link: ${link}`);
});

console.log('\nServices extracted written to services_extracted.json');
