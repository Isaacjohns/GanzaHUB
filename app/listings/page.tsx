'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ListingsPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [typeFilter, setTypeFilter] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    fetchListings();
  }, [typeFilter, minPrice, maxPrice, location]);

  const fetchListings = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (typeFilter !== 'all') params.append('type', typeFilter);
    if (minPrice) params.append('minPrice', minPrice);
    if (maxPrice) params.append('maxPrice', maxPrice);
    if (location) params.append('location', location);

    const res = await fetch(`/api/listings?${params.toString()}`);
    const data = await res.json();
    setListings(data);
    setLoading(false);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-navy-700 mb-8">All Listings</h1>

      {/* Filters *\/}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4 text-navy-700">Filter Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Type Filter *\/}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-gold-500 focus:border-gold-500"
            >
              <option value="all">All Types</option>
              <option value="car">Cars</option>
              <option value="house">Houses</option>
              <option value="land">Land</option>
            </select>
          </div>

          {/* Min Price *\/}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Min Price ($)</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-gold-500 focus:border-gold-500"
            />
          </div>

          {/* Max Price *\/}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Max Price ($)</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="1000000"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-gold-500 focus:border-gold-500"
            />
          </div>

          {/* Location *\/}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Search location..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-gold-500 focus:border-gold-500"
            />
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading properties...</p>
        </div>
      )}

      {/* Listings Grid */}
      {!loading && listings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No properties found matching your criteria.</p>
        </div>
      )}

      {!loading && listings.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <Link
              key={listing.id}
              href={`/listings/${listing.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition group"
            >
              <div className="relative h-56 bg-gray-200">
                {listing.images?.[0] && (
                  <img
                    src={listing.images[0].url}
                    alt={listing.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                )}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-gold-500 text-navy-900 px-3 py-1 rounded-full text-xs font-bold uppercase">
                    {listing.type}
                  </span>
                  {listing.status === 'sold' && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
                      Sold
                    </span>
                  )}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-2 text-navy-700 group-hover:text-gold-600 transition">
                  {listing.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {listing.location}
                </p>
                <p className="text-2xl font-bold text-gold-600">
                  ${listing.price.toLocaleString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}