const fs = require('fs');
const html = fs.readFileSync('scratch_site.html', 'utf8');

// Find logo
const logoRegex = /<img[^>]+(?:class|id|alt)?[^>]*src=["']([^"']+)["'][^>]*>/gi;
const imgs = [];
let match;
while ((match = logoRegex.exec(html)) !== null) {
  imgs.push(match[0]);
}

console.log('=== FOUND ' + imgs.length + ' IMG TAGS ===');
imgs.filter(img => img.toLowerCase().includes('logo') || img.toLowerCase().includes('touchstone')).forEach(img => console.log('LOGO/BRAND:', img));

// Find collection or product titles
const titlesRegex = /<(?:h1|h2|h3|h4|span|a)[^>]*class=["'][^"']*(?:product|card|title|heading)[^"']*["'][^>]*>(.*?)<\/(?:h1|h2|h3|h4|span|a)>/gi;
const titles = [];
while ((match = titlesRegex.exec(html)) !== null) {
  const text = match[1].replace(/<[^>]+>/g, '').trim();
  if (text && !titles.includes(text)) {
    titles.push(text);
  }
}
console.log('=== TITLES / PRODUCTS ===');
console.log(titles.slice(0, 40));

// Find products JSON or shopify collections
const productMatches = [...html.matchAll(/\/products\/([a-zA-Z0-9_-]+)/g)].map(m => m[1]);
console.log('=== PRODUCT SLUGS ===');
console.log([...new Set(productMatches)]);

// Find collection slugs
const collMatches = [...html.matchAll(/\/collections\/([a-zA-Z0-9_-]+)/g)].map(m => m[1]);
console.log('=== COLLECTION SLUGS ===');
console.log([...new Set(collMatches)]);
