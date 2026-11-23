const fs = require('fs');
const path = require('path');

function clean(s) {
  if (!s) return '';
  return s
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

const serviceSlugs = [
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

const results = {};

for (const slug of serviceSlugs) {
  const html = fs.readFileSync(path.join('scraped_raw', slug + '.html'), 'utf-8');
  // Find all headings
  const headings = [...html.matchAll(/<(h[1-6])[^>]*>(.*?)<\/\1>/gi)]
    .map(m => ({ level: m[1], text: clean(m[2]) }))
    .filter(h => !['Quick Links', 'Service Links', 'Get In Touch', 'Home'].includes(h.text));

  // Find all paragraphs
  const paragraphs = [...html.matchAll(/<p[^>]*>(.*?)<\/p>/gi)]
    .map(m => clean(m[1]))
    .filter(p => p.length > 20 && !p.includes('Copyright') && !p.includes('All Rights Reserved'));

  // Find all list items
  const listItems = [...html.matchAll(/<li[^>]*>(.*?)<\/li>/gi)]
    .map(m => clean(m[1]))
    .filter(li => li.length > 5 && !['Home', 'Meet Dr. Anna', 'ADHD Testing', 'FAQs', 'Get In Touch'].includes(li));

  // Find images
  const images = [...html.matchAll(/<img[^>]+src="([^">]+\/([a-zA-Z0-9_\-\.]+\.(png|jpg|webp|avif)))"/gi)]
    .map(m => m[2])
    .filter(img => !img.includes('guidings') && !img.includes('dr.') && !img.includes('icon-') && !img.includes('icn-') && !img.includes('icons') && !img.includes('icos') && !img.includes('dsd'));

  results[slug] = { headings, paragraphs, listItems, images: [...new Set(images)] };
}

fs.writeFileSync('detailed_services.json', JSON.stringify(results, null, 2));
console.log('Saved detailed_services.json');
serviceSlugs.forEach(slug => {
  console.log(`${slug}: ${results[slug].headings.length} headings, ${results[slug].paragraphs.length} paragraphs, ${results[slug].listItems.length} list items, img: ${results[slug].images[0]}`);
});
