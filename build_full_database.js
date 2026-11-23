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

const homeHtml = fs.readFileSync('scraped_raw/home.html', 'utf-8');

// Parse all 12 services from home.html
// Find blocks containing Learn More and icon
const serviceSlugs = [
  { slug: 'individual-therapy-for-adults', path: 'individual-therapy-for-adults' },
  { slug: 'therapy-for-teenagers-adolescents', path: 'therapy-for-teenagers-adolescents' },
  { slug: 'adhd-therapy-executive-functioning-coaching', path: 'adhd-therapy-executive-functioning-coaching' },
  { slug: 'anxiety-stress', path: 'anxiety-stress' },
  { slug: 'trauma-informed-therapy', path: 'trauma-informed-therapy' },
  { slug: 'sleep-insomnia-support', path: 'sleep-insomnia-support' },
  { slug: 'relationship-interpersonal-therapy', path: 'relationship-interpersonal-therapy' },
  { slug: 'mindfulness-based-therapy', path: 'mindfulness-based-therapy' },
  { slug: 'burnout-life-transitions', path: 'burnout-life-transitions' },
  { slug: 'self-esteem-difficulties', path: 'self-esteem-difficulties' },
  { slug: 'anger-management', path: 'anger-management' },
  { slug: 'parent-support', path: 'parent-support' }
];

const services = [];

for (const s of serviceSlugs) {
  // Look for card in home.html
  const linkPattern = new RegExp(`href="[^"]*${s.slug}[^"]*"`, 'i');
  const linkPos = homeHtml.search(linkPattern);
  let shortDesc = '';
  let iconName = '';
  let title = '';

  if (linkPos !== -1) {
    const cardSnippet = homeHtml.slice(Math.max(0, linkPos - 1200), linkPos + 400);
    const imgMatch = cardSnippet.match(/src="[^"]*\/([a-zA-Z0-9_\-]+\.(png|jpg|webp|svg|avif))"/i);
    if (imgMatch) iconName = imgMatch[1];
    const hMatch = cardSnippet.match(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/i);
    if (hMatch) title = clean(hMatch[1]);
    const textEditorMatch = cardSnippet.match(/elementor-widget-text-editor[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
    if (textEditorMatch) shortDesc = clean(textEditorMatch[1]);
  }

  // Parse dedicated page HTML
  const pageHtml = fs.readFileSync(path.join('scraped_raw', s.path + '.html'), 'utf-8');
  const pageTitleMatch = pageHtml.match(/<h1[^>]*>(.*?)<\/h1>/i) || pageHtml.match(/<h2[^>]*class="elementor-heading-title[^"]*"[^>]*>(.*?)<\/h2>/i);
  if (!title && pageTitleMatch) title = clean(pageTitleMatch[1]);

  // Extract all paragraphs and sections from the service page
  // Notice Elementor content widgets
  const sectionMatches = [...pageHtml.matchAll(/<div class="[^"]*(?:elementor-widget-heading|elementor-widget-text-editor)[^"]*"[^>]*>([\s\S]*?)<\/div>/gi)];
  const sections = [];
  for (const sm of sectionMatches) {
    const text = clean(sm[1]);
    if (text && !text.includes('Quick Links') && !text.includes('Service Links') && !text.includes('Get In Touch') && !text.includes('Copyright') && !text.includes('Guiding Light Psychology') && text !== title) {
      // Check if it's a heading
      const isHeading = sm[1].includes('<h');
      sections.push({ isHeading, text });
    }
  }

  // Find page image
  const pageImgs = [...pageHtml.matchAll(/<img[^>]+src="([^">]+\/(?:[0-9]{4}\/[0-9]{2}\/)?([a-zA-Z0-9_\-\.]+))"/gi)]
    .map(m => m[2])
    .filter(name => !name.includes('guidings') && !name.includes('dr.') && !name.includes('icon-') && !name.includes('icn-') && !name.includes('icos') && !name.includes('icons') && !name.includes('dsd'));

  const detailImage = pageImgs[0] || '';

  services.push({
    slug: s.slug,
    title,
    shortDesc,
    icon: iconName,
    detailImage,
    sections
  });
}

// Extract FAQs
const faqsHtml = fs.readFileSync('scraped_raw/faqs.html', 'utf-8');
const faqItems = [];
const faqMatches = [...faqsHtml.matchAll(/<h2 class="elementor-heading-title[^"]*">([\s\S]*?)<\/h2>\s*<\/div>\s*<\/div>\s*<div[^>]*class="[^"]*elementor-widget-text-editor[^"]*"[^>]*>([\s\S]*?)<\/div>/gi)];

for (const fm of faqMatches) {
  const q = clean(fm[1]);
  const a = clean(fm[2]);
  if (q && a && !q.includes('Quick Links') && !q.includes('Service Links') && !q.includes('Get In Touch') && !q.includes('FAQs')) {
    faqItems.push({ question: q, answer: a });
  }
}

// Extract Mental Health Links (Resources)
const resHtml = fs.readFileSync('scraped_raw/mental-health-links.html', 'utf-8');
const resources = [];
const resMatches = [...resHtml.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)];
for (const rm of resMatches) {
  const url = rm[1];
  const name = clean(rm[2]);
  if (url.startsWith('http') && !url.includes('guidinglightnow.com') && name && !name.includes('BOOK AN APPOINTMENT') && !name.includes('Linkedin')) {
    // Determine category
    let category = 'General Mental Health';
    if (url.includes('apa.org') || url.includes('psychiatry.org') || url.includes('counseling.org') || url.includes('aamft.org')) category = 'Professional Associations';
    else if (url.includes('add.org') || url.includes('attention-deficit')) category = 'ADHD & Neurodivergence';
    else if (url.includes('suicide') || url.includes('save.org') || url.includes('metanoia') || url.includes('afsp')) category = 'Crisis & Suicide Prevention';
    else if (url.includes('depression') || url.includes('dbsalliance') || url.includes('bipolar') || url.includes('pendulum')) category = 'Depression & Mood Disorders';
    else if (url.includes('ocd') || url.includes('panic') || url.includes('adaa')) category = 'Anxiety & OCD';
    else if (url.includes('ptsd') || url.includes('trauma') || url.includes('childhelp') || url.includes('hotline')) category = 'Trauma & Abuse Support';
    else if (url.includes('sleepfoundation')) category = 'Sleep & Wellness';
    else if (url.includes('eatingdisorders') || url.includes('eatright')) category = 'Eating Disorders & Nutrition';
    resources.push({ name, url, category });
  }
}

const fullData = {
  services,
  faqs: faqItems,
  resources,
  contact: {
    phone: '941-977-5444',
    email: 'anna.hauptfleisch@guidinglightnow.com',
    location: 'I work virtually in most states.',
    almaBookingUrl: 'https://secure.helloalma.com/providers/anna-shtrauh/',
    linkedIn: 'https://www.linkedin.com/in/annashtrauh'
  }
};

fs.writeFileSync('full_site_database.json', JSON.stringify(fullData, null, 2));
console.log(`Generated full_site_database.json with ${services.length} services, ${faqItems.length} FAQs, ${resources.length} resources.`);
services.forEach(s => console.log(`Service: ${s.slug} -> Title: "${s.title}" | Icon: ${s.icon} | Img: ${s.detailImage}`));
console.log(`FAQs: ${faqItems.length}`);
faqItems.forEach((f, i) => console.log(`Q${i+1}: ${f.question}`));
