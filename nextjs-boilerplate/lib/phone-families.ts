export interface PhoneVariantProfile {
  name: string;
  image: string;
  screenSize: string;
  display: string;
  camera: string;
  fit: string;
}

export interface PhoneFamilyProfile {
  slug: string;
  brand: 'Samsung';
  name: string;
  year: number;
  eyebrow: string;
  summary: string;
  heroImage: string;
  highlights: string[];
  variants: PhoneVariantProfile[];
}

export const FEATURED_PHONE_FAMILIES: PhoneFamilyProfile[] = [
  {
    slug: 'galaxy-s23',
    brand: 'Samsung',
    name: 'Galaxy S23',
    year: 2023,
    eyebrow: 'Refined flagship performance',
    summary:
      'The Galaxy S23 generation pairs efficient Snapdragon performance with bright 120Hz displays, versatile cameras, and a clean floating-lens design.',
    heroImage: '/phones/galaxy-s23.webp',
    highlights: [
      'Snapdragon 8 Gen 2 for Galaxy',
      'Dynamic AMOLED 2X displays',
      'Premium cameras across the range',
      'S Pen built into the Ultra',
    ],
    variants: [
      {
        name: 'Galaxy S23',
        image: '/phones/galaxy-s23.webp',
        screenSize: '6.1"',
        display: 'FHD+ Dynamic AMOLED 2X, 120Hz',
        camera: '50 MP main camera with 3x optical zoom',
        fit: 'Compact flagship for comfortable one-handed use.',
      },
      {
        name: 'Galaxy S23+',
        image: '/phones/galaxy-s23-plus.webp',
        screenSize: '6.6"',
        display: 'FHD+ Dynamic AMOLED 2X, 120Hz',
        camera: '50 MP main camera with 3x optical zoom',
        fit: 'A larger display and battery without Ultra size.',
      },
      {
        name: 'Galaxy S23 Ultra',
        image: '/phones/galaxy-s23-ultra.avif',
        screenSize: '6.8"',
        display: 'QHD+ Dynamic AMOLED 2X, adaptive 120Hz',
        camera: '200 MP main camera with dual telephoto lenses',
        fit: 'Maximum camera reach, screen space, and built-in S Pen.',
      },
    ],
  },
  {
    slug: 'galaxy-s24',
    brand: 'Samsung',
    name: 'Galaxy S24',
    year: 2024,
    eyebrow: 'The first Galaxy AI generation',
    summary:
      'The Galaxy S24 series introduced Galaxy AI features such as Circle to Search and Live Translate, alongside brighter displays and seven years of software support.',
    heroImage: '/phones/galaxy-s24.jpg',
    highlights: [
      'Galaxy AI productivity tools',
      'Bright adaptive 120Hz displays',
      'Seven generations of OS upgrades',
      'Titanium frame on the Ultra',
    ],
    variants: [
      {
        name: 'Galaxy S24',
        image: '/phones/galaxy-s24.jpg',
        screenSize: '6.2"',
        display: 'FHD+ Dynamic AMOLED 2X, adaptive 120Hz',
        camera: '50 MP main camera with 3x optical zoom',
        fit: 'Compact dimensions with current-generation AI features.',
      },
      {
        name: 'Galaxy S24+',
        image: '/phones/galaxy-s24-plus.jpg',
        screenSize: '6.7"',
        display: 'QHD+ Dynamic AMOLED 2X, adaptive 120Hz',
        camera: '50 MP main camera with 3x optical zoom',
        fit: 'More screen and battery while retaining rounded ergonomics.',
      },
      {
        name: 'Galaxy S24 Ultra',
        image: '/phones/galaxy-s24-ultra.jpg',
        screenSize: '6.8"',
        display: 'QHD+ Dynamic AMOLED 2X, adaptive 120Hz',
        camera: '200 MP main camera with 5x and 3x optical zoom',
        fit: 'Titanium construction, anti-reflective glass, and built-in S Pen.',
      },
    ],
  },
  {
    slug: 'galaxy-s25',
    brand: 'Samsung',
    name: 'Galaxy S25',
    year: 2025,
    eyebrow: 'Smarter performance, refined',
    summary:
      'The Galaxy S25 generation advances on-device Galaxy AI with Snapdragon 8 Elite for Galaxy performance, 12 GB of memory across the range, and refined lightweight designs.',
    heroImage: '/phones/galaxy-s25.jpg',
    highlights: [
      'Snapdragon 8 Elite for Galaxy',
      '12 GB RAM across the range',
      'Advanced on-device Galaxy AI',
      'Rounded titanium Ultra design',
    ],
    variants: [
      {
        name: 'Galaxy S25',
        image: '/phones/galaxy-s25.jpg',
        screenSize: '6.2"',
        display: 'FHD+ Dynamic AMOLED 2X, adaptive 120Hz',
        camera: '50 MP main camera with 3x optical zoom',
        fit: 'The lightest and most compact S25 flagship.',
      },
      {
        name: 'Galaxy S25+',
        image: '/phones/galaxy-s25-plus.jpg',
        screenSize: '6.7"',
        display: 'QHD+ Dynamic AMOLED 2X, adaptive 120Hz',
        camera: '50 MP main camera with 3x optical zoom',
        fit: 'A spacious QHD+ display with a larger battery.',
      },
      {
        name: 'Galaxy S25 Ultra',
        image: '/phones/galaxy-s25-ultra.jpg',
        screenSize: '6.9"',
        display: 'QHD+ Dynamic AMOLED 2X, adaptive 120Hz',
        camera: '200 MP main camera with 5x and 3x optical zoom',
        fit: 'The largest display, most flexible cameras, and built-in S Pen.',
      },
    ],
  },
];

export function getPhoneFamily(slug: string): PhoneFamilyProfile | undefined {
  return FEATURED_PHONE_FAMILIES.find((family) => family.slug === slug);
}
