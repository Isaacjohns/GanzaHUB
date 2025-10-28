import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';

export default async function Home() {
  // Fetch featured listings (latest 6)
  const featured = await prisma.listing.findMany({
    take: 6,
    orderBy: { createdAt: 'desc' },
    include: { images: true },
    where: { status: 'available' },
  });

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-navy-700 to-navy-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Find Your Dream Property</h1>
          <p className="text-xl mb-8">Cars, Houses & Land for Sale in Rwanda</p>
          <Link
            href="/listings"
            className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold py-3 px-8 rounded-lg inline-block transition"
          >
            Browse All Listings
          </Link>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-navy-700 mb-8 text-center">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((listing) => (
            <Link
              key={listing.id}
              href={`/listings/${listing.id}`}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              <div className="relative h-48 bg-gray-200">
                {listing.images[0] && (
                  <img
                    src={listing.images[0].url}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <span className="absolute top-2 right-2 bg-gold-500 text-navy-900 px-3 py-1 rounded-full text-sm font-semibold">
                  {listing.type.toUpperCase()}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 text-navy-700">{listing.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{listing.location}</p>
                <p className="text-2xl font-bold text-gold-600">${listing.price.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-navy-700 mb-12 text-center">Why Choose Ganza Property Hub?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gold-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-navy-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Verified Listings</h3>
              <p className="text-gray-600">All properties are verified for authenticity and quality</p>
            </div>
            <div className="text-center">
              <div className="bg-gold-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-navy-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Best Prices</h3>
              <p className="text-gray-600">Competitive pricing on all our properties</p>
            </div>
            <div className="text-center">
              <div className="bg-gold-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-navy-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Expert Support</h3>
              <p className="text-gray-600">Professional assistance throughout your journey</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}