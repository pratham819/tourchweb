const fs = require('fs');
const html = fs.readFileSync('scratch_site.html', 'utf8');

// Also try to fetch products.json from Shopify if available!
async function getProducts() {
  try {
    const res = await fetch('https://touchstonecommercial.com/products.json?limit=50');
    if (res.ok) {
      const data = await res.json();
      fs.writeFileSync('scratch/shopify_products.json', JSON.stringify(data, null, 2));
      console.log('SUCCESS: Downloaded', data.products.length, 'products from products.json');
      data.products.forEach(p => {
        console.log(`- ${p.title} (${p.handle}): ${p.images.length} images`);
      });
      return;
    }
  } catch (e) {
    console.log('Error fetching products.json:', e.message);
  }

  // Fallback to HTML parsing
  const regex = /<img[^>]+src=["']([^"']+)["'][^>]*alt=["']([^"']*)["']/gi;
  let match;
  const items = [];
  while ((match = regex.exec(html)) !== null) {
    const src = match[1];
    const alt = match[2];
    items.push({ src: src.startsWith('//') ? 'https:' + src : src, alt });
  }
  console.log('Found', items.length, 'images with alt');
  fs.writeFileSync('scratch/scraped_images.json', JSON.stringify(items, null, 2));
}

getProducts();
