const baseUrl = process.env.MOBILESENTRIX_API_URL;
const token = process.env.MOBILESENTRIX_ACCESS_TOKEN;

if (!baseUrl) {
  console.error('Missing MOBILESENTRIX_API_URL');
  process.exit(1);
}

if (!token) {
  console.error('Missing MOBILESENTRIX_ACCESS_TOKEN');
  process.exit(1);
}

const url = new URL('/api/rest/products', baseUrl);
url.searchParams.set('page', '1');
url.searchParams.set('limit', '10');

const response = await fetch(url, {
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
  },
});

if (!response.ok) {
  const body = await response.text();
  console.error(`Request failed: ${response.status}`);
  console.error(body.slice(0, 500));
  process.exit(1);
}

const products = await response.json();

for (const product of products) {
  console.log('---');
  console.log('SKU:', product.sku);
  console.log('Name:', product.name);
  console.log('image_url:', product.image_url ?? '(none)');
  console.log('default_image:', product.default_image ?? '(none)');
}
