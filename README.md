# Simple Job Board

A Simple job board application built with Next.js 15, leveraging the power of tRPC, Prisma, PostgreSQL and Clerk for authentication. This full-stack application demonstrates implementation of type-safe APIs, database operations, and secure user management.

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **API Layer**: tRPC for end-to-end type safety
- **Database**: PostgreSQL
- **Database ORM**: Prisma
- **Authentication**: Clerk
- **Type Safety**: TypeScript
- **Styling**: Tailwind CSS
- **Form Validation**: Zod

## Key Features

- **Job Listings Management**

  - Create, read, update, and delete job postings
  - Advanced filtering and search capabilities
  - Pagination support
  - Role-based access control (Admin/Public)

- **Search & Filter Functionality**

  - Full-text search across job titles
  - Filter by location, job type
  - Salary-based filtering

- **Admin Dashboard**
  - Secure admin routes for job management
  - Job posting creation and editing interface

# Application Routes

## Public Routes

1. `/`: Home page displaying featured job listings
2. `/jobs`: Main job listings page with search and filters
3. `/jobs/[id]`: Individual job details page

## Admin Routes (Protected)

1. `/admin`: Admin dashboard
2. `/admin/jobs`: Job management page
3. `/admin/jobs/create`: Create new job listing
4. `/admin/jobs/edit/[id]`: Edit existing job listing
5. `/admin/jobs/[id]`: View job details with admin controls

## API Structure

The application implements five main API endpoints through tRPC routers:

1. `getById`: Retrieve specific job details
2. `getAll`: Fetch paginated job listings with filtering
3. `create`: Add new job listings (admin only)
4. `update`: Modify existing job postings (admin only)
5. `delete`: Remove job listings (admin only)

## Run Locally

1. Clone the repository:

   ```bash
   git clone [repository-url]
   cd job-horizon
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up PostgreSQL:

   - Install PostgreSQL if not already installed
   - Create a new PostgreSQL database
   - Note down your database credentials

4. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

   Configure the following variables:

   - `DATABASE_URL`
   - `CLERK_SECRET_KEY`
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`

5. Initialize the database:

   ```bash
   npx prisma generate
   npx prisma db push
   ```

6. Run the development server:
   ```bash
   npm run dev
   ```
