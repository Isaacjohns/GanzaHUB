import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Ganza Property Hub - Cars, Houses & Land for Sale',
  description: 'Find your dream property in Rwanda. Browse cars, houses, and land for sale.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <nav className="bg-navy-700 text-white shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="text-2xl font-bold text-gold-400">
                Ganza Property Hub
              </Link>
              <div className="flex space-x-6">
                <Link href="/" className="hover:text-gold-400 transition">Home</Link>
                <Link href="/listings" className="hover:text-gold-400 transition">Listings</Link>
                <Link href="/admin" className="hover:text-gold-400 transition">Admin</Link>
              </div>
            </div>
          </div>
        </nav>
        {children}
        <footer className="bg-navy-800 text-white mt-16">
          <div className="container mx-auto px-4 py-8">
            <p className="text-center">© 2025 Ganza Property Hub. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}