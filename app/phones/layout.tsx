import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Device Finder',
  description: 'Search current refurbished iPhone and Samsung Galaxy availability by model, storage, colour, and grade.',
};

export default function PhonesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
