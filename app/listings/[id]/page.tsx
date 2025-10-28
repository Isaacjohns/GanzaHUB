import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import InquiryForm from '@/components/InquiryForm';
import ImageGallery from '@/components/ImageGallery';

export default async function ListingDetailPage({ params }: { params: { id: string } }) {
  const listing = await prisma.listing.findUnique({
    where: { id: params.id },
    include: { images: true },
  });

  if (!listing) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <a
        href="/listings"
        className="inline-flex items-center text-navy-600 hover:text-navy-800 mb-6"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Listings
      </a>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Left Column */}
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          <ImageGallery images={listing.images} title={listing.title} />

          {/* Property Details */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-navy-700 mb-2">{listing.title}</h1>
                <p className="text-gray-600 flex items-center text-lg">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {listing.location}
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-gold-600">${listing.price.toLocaleString()}</p>
                <span className={`inline-block mt-2 px-4 py-1 rounded-full text-sm font-semibold ${
                  listing.status === 'available' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {listing.status === 'available' ? 'Available' : 'Sold'}
                </span>
              </div>
            </div>

            {/* Property Type Badge */}
            <div className="mb-6">
              <span className="inline-block bg-navy-700 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase">
                {listing.type}
              </span>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-navy-700 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {listing.description}
              </p>
            </div>

            {/* Additional Info */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-xl font-bold text-navy-700 mb-4">Property Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 text-sm">Property ID</p>
                  <p className="font-semibold text-navy-700">{listing.id.substring(0, 8).toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Type</p>
                  <p className="font-semibold text-navy-700 capitalize">{listing.type}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Status</p>
                  <p className="font-semibold text-navy-700 capitalize">{listing.status}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Listed Date</p>
                  <p className="font-semibold text-navy-700">
                    {new Date(listing.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Inquiry Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-2xl font-bold text-navy-700 mb-4">Interested?</h2>
            <p className="text-gray-600 mb-6">Fill out the form below and we'll get back to you shortly.</p>
            <InquiryForm listingId={listing.id} />
          </div>
        </div>
      </div>
    </main>
  );
}