import Link from 'next/link';

type BrandMenu = {
  brand: string;
  families: { name: string; models: string[] }[];
};

const BRAND_MENUS: BrandMenu[] = [
  {
    brand: 'Apple',
    families: [
      { name: 'iPhone 17', models: ['iPhone 17', 'iPhone Air', 'iPhone 17 Pro', 'iPhone 17 Pro Max'] },
      { name: 'iPhone 16', models: ['iPhone 16', 'iPhone 16 Plus', 'iPhone 16 Pro', 'iPhone 16 Pro Max'] },
      { name: 'iPhone 15', models: ['iPhone 15', 'iPhone 15 Plus', 'iPhone 15 Pro', 'iPhone 15 Pro Max'] },
      { name: 'iPhone 14', models: ['iPhone 14', 'iPhone 14 Plus', 'iPhone 14 Pro', 'iPhone 14 Pro Max'] },
      { name: 'iPhone 13', models: ['iPhone 13 mini', 'iPhone 13', 'iPhone 13 Pro', 'iPhone 13 Pro Max'] },
    ],
  },
  {
    brand: 'Samsung',
    families: [
      { name: 'Galaxy S25', models: ['Galaxy S25', 'Galaxy S25 Edge', 'Galaxy S25+', 'Galaxy S25 Ultra'] },
      { name: 'Galaxy S24', models: ['Galaxy S24', 'Galaxy S24+', 'Galaxy S24 Ultra', 'Galaxy S24 FE'] },
      { name: 'Galaxy S23', models: ['Galaxy S23', 'Galaxy S23+', 'Galaxy S23 Ultra'] },
      { name: 'Galaxy S22', models: ['Galaxy S22', 'Galaxy S22+', 'Galaxy S22 Ultra'] },
      { name: 'Galaxy S21', models: ['Galaxy S21', 'Galaxy S21+', 'Galaxy S21 Ultra', 'Galaxy S21 FE'] },
      { name: 'Galaxy A', models: ['Galaxy A56', 'Galaxy A36', 'Galaxy A26', 'Galaxy A16'] },
    ],
  },
  {
    brand: 'Google',
    families: [
      { name: 'Pixel 11', models: ['Pixel 11', 'Pixel 11 Pro', 'Pixel 11 Pro XL', 'Pixel 11 Pro Fold'] },
      { name: 'Pixel 10', models: ['Pixel 10', 'Pixel 10 Pro', 'Pixel 10 Pro XL', 'Pixel 10 Pro Fold', 'Pixel 10a'] },
      { name: 'Pixel 9', models: ['Pixel 9', 'Pixel 9 Pro', 'Pixel 9 Pro XL', 'Pixel 9 Pro Fold', 'Pixel 9a'] },
      { name: 'Pixel 8', models: ['Pixel 8', 'Pixel 8 Pro', 'Pixel 8a'] },
      { name: 'Pixel 7', models: ['Pixel 7', 'Pixel 7 Pro', 'Pixel 7a'] },
    ],
  },
];

function partsHref(brand: string, model: string) {
  return `/parts?brand=${encodeURIComponent(brand)}&model=${encodeURIComponent(model)}`;
}

export function BrandNavigation() {
  return (
    <>
      {BRAND_MENUS.map(({ brand, families }) => (
        <details className="brand-menu" key={brand}>
          <summary>{brand}</summary>
          <div className="brand-menu-panel">
            <span className="brand-menu-title">{brand} replacement screens</span>
            <div className="brand-menu-families">
              {families.map((family) => (
                <section key={family.name}>
                  <h2>{family.name}</h2>
                  <ul>
                    {family.models.map((model) => (
                      <li key={model}>
                        <Link href={partsHref(brand, model)}>{model}</Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </details>
      ))}
    </>
  );
}
