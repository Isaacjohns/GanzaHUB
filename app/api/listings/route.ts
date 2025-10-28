import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/listings - Get all listings with optional filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Build filter object based on query parameters
    const where: any = {};
    
    const type = searchParams.get('type');
    if (type && type !== 'all') {
      where.type = type;
    }
    
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }
    
    const location = searchParams.get('location');
    if (location) {
      where.location = {
        contains: location,
        mode: 'insensitive',
      };
    }

    const status = searchParams.get('status');
    if (status) {
      where.status = status;
    }

    // Fetch listings with filters
    const listings = await prisma.listing.findMany({
      where,
      include: {
        images: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(listings);
  } catch (error) {
    console.error('Error fetching listings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch listings' },
      { status: 500 }
    );
  }
}

// POST /api/listings - Create a new listing (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, type, price, location, description, images, ownerId } = body;

    // Validate required fields
    if (!title || !type || !price || !location || !description || !ownerId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create listing with images
    const listing = await prisma.listing.create({
      data: {
        title,
        type,
        price: parseFloat(price),
        location,
        description,
        ownerId,
        status: 'available',
        images: {
          create: images?.map((url: string) => ({ url })) || [],
        },
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json(listing, { status: 201 });
  } catch (error) {
    console.error('Error creating listing:', error);
    return NextResponse.json(
      { error: 'Failed to create listing' },
      { status: 500 }
    );
  }
}