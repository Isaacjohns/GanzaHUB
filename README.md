# 🏡 Ganza Property Hub - Complete Real Estate Platform

A professional, SEO-friendly real estate website built with Next.js, TypeScript, Prisma, and PostgreSQL.

## ✨ Features

- 🏠 **Property Listings**: Cars, houses, and land
- 🔍 **Advanced Filtering**: Search by type, price range, and location
- 📱 **Responsive Design**: Mobile-first approach with Tailwind CSS
- 🔐 **Admin Dashboard**: Password-protected area for managing listings
- 📊 **Lead Management**: Capture and track customer inquiries
- 🎨 **Modern UI**: Clean design with navy, white, gray, and gold colors
- 🚀 **SEO Optimized**: Built with Next.js for excellent SEO performance

## 📋 Prerequisites

Before you begin, ensure you have:
- **Node.js** 18+ installed
- **PostgreSQL** database (local or cloud)
- **Git** (optional, for version control)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and add your configuration:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/ganza_property_hub"
JWT_SECRET="your-super-secret-jwt-key-minimum-32-characters-long"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

### 3. Initialize Database

Run Prisma migrations to create database tables:

```bash
npx prisma migrate dev --name init
```

### 4. Seed Sample Data

Add sample listings (3 cars, 3 houses, 3 land plots):

```bash
npx prisma db seed
```

Or alternatively:

```bash
npm run seed
```

### 5. Start Development Server

```bash
npm run dev
```

Visit **http://localhost:3000** in your browser! 🎉

## 🔑 Default Admin Credentials

```
Email: admin@ganzaproperty.com
Password: admin123
```

**⚠️ IMPORTANT**: Change these credentials in production!

## 📁 Project Structure

```
ganza-property-hub/
├── app/
│   ├── page.tsx                      # Home page
│   ├── layout.tsx                    # Root layout with navigation
│   ├── globals.css                   # Global styles
│   ├── listings/
│   │   ├── page.tsx                  # All listings with filters
│   │   └── [id]/page.tsx            # Single listing detail
│   ├── admin/
│   │   ├── page.tsx                  # Admin dashboard
│   │   └── listings/
│   │       ├── new/page.tsx         # Add new listing
│   │       └── [id]/edit/page.tsx   # Edit listing
│   └── api/
│       ├── listings/
│       │   ├── route.ts             # GET all, POST new
│       │   └── [id]/route.ts        # GET, PUT, DELETE
│       ├── leads/route.ts            # POST inquiry, GET all
│       └── auth/
│           ├── login/route.ts        # Admin login
│           └── me/route.ts          # Get current user
├── components/
│   ├── ImageGallery.tsx             # Image gallery component
│   └── InquiryForm.tsx              # Lead capture form
├── lib/
│   ├── prisma.ts                    # Prisma client singleton
│   └── auth.ts                      # Auth utilities
├── prisma/
│   ├── schema.prisma                # Database schema
│   └── seed.ts                      # Sample data
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## 🗄️ Database Schema

### Users
- `id`: Unique identifier
- `name`: User's full name
- `email`: Email (unique)
- `passwordHash`: Hashed password
- `role`: User role (admin/user)

### Listings
- `id`: Unique identifier
- `title`: Property title
- `type`: car | land | house
- `price`: Price in USD
- `location`: Property location
- `status`: available | sold
- `description`: Detailed description
- `ownerId`: Reference to User

### Images
- `id`: Unique identifier
- `listingId`: Reference to Listing
- `url`: Image URL

### Leads
- `id`: Unique identifier
- `listingId`: Reference to Listing
- `name`: Inquirer's name
- `email`: Inquirer's email
- `phone`: Phone number
- `message`: Inquiry message

## 🌐 Deployment to Vercel (Free)

### Step 1: Set Up Database

#### Option A: Supabase (Recommended - Free Tier)

1. Go to [supabase.com](https://supabase.com) and create an account
2. Click **"New Project"**
3. Fill in project details and create
4. Go to **Settings → Database**
5. Find **Connection String** (URI format)
6. Copy the connection string (replace `[YOUR-PASSWORD]` with your password)

#### Option B: Railway (Alternative - Free Tier)

1. Go to [railway.app](https://railway.app) and sign up
2. Click **"New Project" → "Provision PostgreSQL"**
3. Click on PostgreSQL service
4. Go to **Variables** tab
5. Copy the `DATABASE_URL` value

### Step 2: Deploy to Vercel

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com) and sign in
3. Click **"Add New" → "Project"**
4. Import your GitHub repository
5. Add environment variables:
   - `DATABASE_URL`: Your database connection string from Step 1
   - `JWT_SECRET`: A random secure string (minimum 32 characters)
   - `NEXT_PUBLIC_API_URL`: Your Vercel deployment URL (e.g., `https://ganza-property.vercel.app`)

6. Click **"Deploy"**

### Step 3: Run Migrations on Production

After deployment, run migrations:

```bash
# Install Vercel CLI
npm i -g vercel

# Link your project
vercel link

# Run migration
vercel env pull .env.local
npx prisma migrate deploy
npx prisma db seed
```

## 🛠️ Useful Commands

```bash
# Development
npm run dev                 # Start dev server
npm run build              # Build for production
npm start                  # Start production server

# Database
npx prisma studio          # Open Prisma Studio (GUI)
npx prisma migrate dev     # Create new migration
npx prisma migrate deploy  # Deploy migrations
npx prisma db seed         # Seed database
npx prisma generate        # Generate Prisma Client

# Maintenance
npm run lint               # Lint code
```

## 🎨 Customization

### Change Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  navy: {
    // Your custom navy colors
  },
  gold: {
    // Your custom gold colors
  },
}
```

### Add New Property Types

1. Update the listing form dropdowns in admin pages
2. Update the filter options in `/app/listings/page.tsx`
3. Optionally update the database enum if using strict types

### Modify Email Notifications

Add email service in `/app/api/leads/route.ts` after lead creation:

```typescript
// Example with SendGrid, Resend, or Nodemailer
await sendEmail({
  to: 'admin@ganzaproperty.com',
  subject: 'New Inquiry',
  body: `New inquiry from ${name}...`
});
```

## 🔒 Security Best Practices

1. **Change default credentials** immediately
2. **Use strong JWT_SECRET** (32+ characters, random)
3. **Enable HTTPS** in production (automatic on Vercel)
4. **Implement rate limiting** for API routes
5. **Validate all inputs** on server side
6. **Keep dependencies updated**: `npm audit fix`

## 📝 API Documentation

### Public Endpoints

#### GET /api/listings
Get all listings with optional filters
```
Query params: type, minPrice, maxPrice, location, status
```

#### GET /api/listings/[id]
Get single listing by ID

#### POST /api/leads
Submit inquiry form
```json
{
  "listingId": "string",
  "name": "string",
  "email": "string",
  "phone": "string",
  "message": "string"
}
```

### Admin Endpoints (Require Authentication)

#### POST /api/listings
Create new listing

#### PUT /api/listings/[id]
Update listing

#### DELETE /api/listings/[id]
Delete listing

#### GET /api/leads
Get all inquiries

## 🐛 Troubleshooting

### Database Connection Issues
- Verify DATABASE_URL is correct
- Check PostgreSQL is running
- Ensure database exists
- Check firewall settings for remote databases

### Build Errors
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

### Prisma Issues
```bash
# Regenerate Prisma Client
npx prisma generate

# Reset database (⚠️ deletes all data)
npx prisma migrate reset
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vercel Deployment](https://vercel.com/docs)

## 🤝 Support

For issues or questions:
1. Check this README first
2. Review the code comments
3. Check the documentation links above
4. Search for similar issues online

## 📄 License

This project is provided as-is for educational and commercial use.

---

Built with ❤️ using Next.js, TypeScript, Prisma, PostgreSQL, and Tailwind CSS

**Happy Building! 🚀**