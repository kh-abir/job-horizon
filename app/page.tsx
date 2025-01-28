'use client';

import JobListing from '@/components/JobListing';

export default function HomePage() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Job Listings</h1>
      <JobListing />
    </div>
  );
}
