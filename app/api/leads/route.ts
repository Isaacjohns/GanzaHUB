import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/leads - Create a new lead/inquiry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { listingId, name, email, phone, message } = body;

    // Validate required fields
    if (!listingId || !name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Verify listing exists
    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
    });

    if (!listing) {
      return NextResponse.json(
        { error: 'Listing not found' },
        { status: 404 }
      );
    }

    // Create lead
    const lead = await prisma.lead.create({
      data: {
        listingId,
        name,
        email,
        phone,
        message,
      },
    });

    return NextResponse.json(
      { message: 'Inquiry submitted successfully', lead },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json(
      { error: 'Failed to submit inquiry' },
      { status: 500 }
    );
  }
}

// GET /api/leads - Get all leads (admin only)
export async function GET(request: NextRequest) {
  try {
    const leads = await prisma.lead.findMany({
      include: {
        listing: {
          select: {
            id: true,
            title: true,
            type: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}