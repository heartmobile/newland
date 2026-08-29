import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Device Finder',
  description: 'Search a supplied refurbished-device index by model, storage, colour, and grade without displaying stock totals.',
};

export default function PhonesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
