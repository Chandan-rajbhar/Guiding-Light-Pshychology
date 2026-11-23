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
  { slug: 'individual-therapy-for-adults', title: 'Individual Therapy for Adults', icon: 'icon-1.png' },
  { slug: 'therapy-for-teenagers-adolescents', title: 'Therapy for Teenagers & Adolescents', icon: 'icon-2.png' },
  { slug: 'adhd-therapy-executive-functioning-coaching', title: 'ADHD Therapy & Executive Functioning Coaching', icon: 'icn-3.png' },
  { slug: 'anxiety-stress', title: 'Anxiety & Stress Management', icon: 'icon-4.png' },
  { slug: 'trauma-informed-therapy', title: 'Trauma-Informed Therapy', icon: 'icon-5.png' },
  { slug: 'sleep-insomnia-support', title: 'Sleep & Insomnia Support', icon: 'icon-6.png' },
  { slug: 'relationship-interpersonal-therapy', title: 'Relationship & Interpersonal Therapy', icon: 'icon-7.png' },
  { slug: 'mindfulness-based-therapy', title: 'Mindfulness-Based Therapy', icon: 'icon-8.png' },
  { slug: 'burnout-life-transitions', title: 'Burnout & Life Transitions', icon: 'icon-9.png' },
  { slug: 'self-esteem-difficulties', title: 'Self Esteem Difficulties', icon: 'icons.png' },
  { slug: 'anger-management', title: 'Anger Management', icon: 'icos.png' },
  { slug: 'parent-support', title: 'Parent Support', icon: 'dsd.png' }
];

const fullServices = [];

for (const s of serviceSlugs) {
  const html = fs.readFileSync(path.join('scraped_raw', s.slug + '.html'), 'utf-8');
  
  // Extract all widgets in order
  const widgetRe = /<div class="[^"]*(elementor-widget-heading|elementor-widget-text-editor|elementor-widget-image)[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/gi;
  let wm;
  const items = [];
  let detailImage = '';

  while ((wm = widgetRe.exec(html)) !== null) {
    const type = wm[1];
    const inner = wm[2];
    
    if (type === 'elementor-widget-image') {
      const imgMatch = inner.match(/src="([^">]+\/([a-zA-Z0-9_\-\.]+\.(png|jpg|webp|avif)))"/i);
      if (imgMatch) {
        const file = imgMatch[2];
        if (!file.includes('guidings') && !file.includes('dr.') && !file.includes('icon-') && !file.includes('icn-') && !file.includes('icons') && !file.includes('icos') && !file.includes('dsd')) {
          if (!detailImage) detailImage = file;
        }
      }
    } else if (type === 'elementor-widget-heading') {
      const text = clean(inner);
      if (text && !['Quick Links', 'Service Links', 'Get In Touch', 'Home', 'Ready To Begin Your Journey ?'].includes(text)) {
        items.push({ type: 'heading', text });
      }
    } else if (type === 'elementor-widget-text-editor') {
      const text = clean(inner);
      if (text && !text.includes('Copyright') && !text.includes('I work virtually in most states') && !text.includes('941-977-5444')) {
        items.push({ type: 'text', text });
      }
    }
  }

  // Also check lists in the html
  const lists = [];
  const listRe = /<ul[^>]*>([\s\S]*?)<\/ul>/gi;
  let lm;
  while ((lm = listRe.exec(html)) !== null) {
    const lis = [...lm[1].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
      .map(m => clean(m[1]))
      .filter(t => t.length > 5 && !t.includes('Home') && !t.includes('Meet Dr. Anna') && !t.includes('ADHD Testing') && !t.includes('FAQs') && !t.includes('Get In Touch'));
    if (lis.length > 0) lists.push(lis);
  }

  fullServices.push({
    slug: s.slug,
    title: s.title,
    icon: s.icon,
    detailImage,
    items,
    lists
  });
}

fs.writeFileSync('full_services_parsed.json', JSON.stringify(fullServices, null, 2));
console.log('Saved full_services_parsed.json');
fullServices.forEach(s => {
  console.log(`\n=== ${s.title} (${s.slug}) ===`);
  console.log(`Image: ${s.detailImage}, Icon: ${s.icon}`);
  console.log(`Items count: ${s.items.length}, Lists count: ${s.lists.length}`);
  s.items.slice(0, 5).forEach((item, idx) => console.log(`  [${item.type}]: ${item.text.slice(0, 80)}...`));
});
