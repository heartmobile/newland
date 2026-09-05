import Link from 'next/link';

type ModelGroup = {
  name: string;
  models: string[];
};

type BrandFamily = {
  name: string;
  models?: string[];
  groups?: ModelGroup[];
};

type BrandMenu = {
  brand: string;
  families: BrandFamily[];
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
      {
        name: 'Galaxy S',
        groups: [
          { name: 'S25', models: ['Galaxy S25', 'Galaxy S25+', 'Galaxy S25 Ultra', 'Galaxy S25 Edge'] },
          { name: 'S24', models: ['Galaxy S24', 'Galaxy S24+', 'Galaxy S24 Ultra', 'Galaxy S24 FE'] },
          { name: 'S23', models: ['Galaxy S23', 'Galaxy S23+', 'Galaxy S23 Ultra', 'Galaxy S23 FE'] },
          { name: 'S22', models: ['Galaxy S22', 'Galaxy S22+', 'Galaxy S22 Ultra'] },
          { name: 'S21', models: ['Galaxy S21', 'Galaxy S21+', 'Galaxy S21 Ultra', 'Galaxy S21 FE'] },
          { name: 'S20', models: ['Galaxy S20', 'Galaxy S20+', 'Galaxy S20 Ultra', 'Galaxy S20 FE'] },
        ],
      },
      {
        name: 'Galaxy A',
        models: ['Galaxy A56', 'Galaxy A36', 'Galaxy A26', 'Galaxy A16'],
      },
      {
        name: 'Galaxy Z',
        models: ['Galaxy Z Fold', 'Galaxy Z Flip'],
      },
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

function ModelLinks({ brand, models }: { brand: string; models: string[] }) {
  return (
    <ul>
      {models.map((model) => (
        <li key={model}>
          <Link href={partsHref(brand, model)}>{model}</Link>
        </li>
      ))}
    </ul>
  );
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
              {families.map((family) =>
                family.groups ? (
                  <section key={family.name} style={{ gridColumn: '1 / -1' }}>
                    <h2>{family.name}</h2>
                    <div className="brand-menu-families">
                      {family.groups.map((group) => (
                        <section key={group.name}>
                          <h2>{group.name}</h2>
                          <ModelLinks brand={brand} models={group.models} />
                        </section>
                      ))}
                    </div>
                  </section>
                ) : (
                  <section key={family.name}>
                    <h2>{family.name}</h2>
                    <ModelLinks brand={brand} models={family.models ?? []} />
                  </section>
                ),
              )}
            </div>
          </div>
        </details>
      ))}
    </>
  );
}
