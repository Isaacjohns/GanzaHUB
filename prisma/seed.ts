import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@ganzaproperty.com' },
    update: {},
    create: {
      email: 'admin@ganzaproperty.com',
      name: 'Admin User',
      passwordHash: hashedPassword,
      role: 'admin',
    },
  });

  // Create sample cars
  const car1 = await prisma.listing.create({
    data: {
      title: 'Toyota RAV4 2022 - Excellent Condition',
      type: 'car',
      price: 35000,
      location: 'Kigali, Rwanda',
      status: 'available',
      description: 'Like-new Toyota RAV4 with only 15,000 km. Full service history, leather seats, navigation system, and backup camera. One owner, garage kept.',
      ownerId: admin.id,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=800' },
          { url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800' },
        ],
      },
    },
  });

  const car2 = await prisma.listing.create({
    data: {
      title: 'Mercedes-Benz C-Class 2021',
      type: 'car',
      price: 45000,
      location: 'Kigali, Rwanda',
      status: 'available',
      description: 'Luxury sedan in pristine condition. Premium package with sunroof, heated seats, and advanced safety features. Perfect for executives.',
      ownerId: admin.id,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800' },
        ],
      },
    },
  });

  const car3 = await prisma.listing.create({
    data: {
      title: 'Honda CR-V 2020 - Family SUV',
      type: 'car',
      price: 28000,
      location: 'Kigali, Rwanda',
      status: 'sold',
      description: 'Spacious and reliable family SUV. Well-maintained with regular service. Great fuel economy and lots of cargo space.',
      ownerId: admin.id,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800' },
        ],
      },
    },
  });

  // Create sample houses
  const house1 = await prisma.listing.create({
    data: {
      title: 'Modern 4-Bedroom Villa with Pool',
      type: 'house',
      price: 250000,
      location: 'Nyarutarama, Kigali',
      status: 'available',
      description: 'Stunning contemporary villa with 4 bedrooms, 3 bathrooms, swimming pool, and landscaped garden. High-end finishes throughout. Gated community with 24/7 security.',
      ownerId: admin.id,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800' },
          { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800' },
          { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800' },
        ],
      },
    },
  });

  const house2 = await prisma.listing.create({
    data: {
      title: 'Cozy 3-Bedroom Family Home',
      type: 'house',
      price: 120000,
      location: 'Kimihurura, Kigali',
      status: 'available',
      description: 'Charming family home in quiet neighborhood. 3 bedrooms, 2 bathrooms, spacious living areas, and lovely garden. Close to schools and amenities.',
      ownerId: admin.id,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800' },
        ],
      },
    },
  });

  const house3 = await prisma.listing.create({
    data: {
      title: 'Luxury 5-Bedroom Estate',
      type: 'house',
      price: 450000,
      location: 'Kacyiru, Kigali',
      status: 'available',
      description: 'Exceptional luxury estate with panoramic views. 5 bedrooms, 4.5 bathrooms, home theater, gym, wine cellar, and infinity pool. Smart home technology throughout.',
      ownerId: admin.id,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800' },
          { url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800' },
        ],
      },
    },
  });

  // Create sample land plots
  const land1 = await prisma.listing.create({
    data: {
      title: '500 sqm Residential Plot - Prime Location',
      type: 'land',
      price: 75000,
      location: 'Gacuriro, Kigali',
      status: 'available',
      description: 'Prime residential land in upscale neighborhood. 500 square meters with all utilities available. Perfect for building your dream home. Clean title.',
      ownerId: admin.id,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800' },
        ],
      },
    },
  });

  const land2 = await prisma.listing.create({
    data: {
      title: '2 Hectares Agricultural Land',
      type: 'land',
      price: 150000,
      location: 'Bugesera District',
      status: 'available',
      description: 'Fertile agricultural land ideal for farming or development. 2 hectares with road access and water source. Great investment opportunity.',
      ownerId: admin.id,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800' },
        ],
      },
    },
  });

  const land3 = await prisma.listing.create({
    data: {
      title: '1000 sqm Commercial Plot',
      type: 'land',
      price: 200000,
      location: 'Kigali CBD',
      status: 'available',
      description: 'Strategic commercial plot in the heart of Kigali. 1000 square meters zoned for commercial use. High visibility and excellent access. Perfect for retail or office development.',
      ownerId: admin.id,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800' },
        ],
      },
    },
  });

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
