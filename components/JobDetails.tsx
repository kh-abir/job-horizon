"use client";

import Link from "next/link";
// shadcn/ui components
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Building2 } from "lucide-react";
// If you added the typography components (via shadcn/ui add typography):

// If you have not generated typography components, you can just use <h1>, <p>, etc.

export type JobType = "FULL_TIME" | "PART_TIME" | "REMOTE" | "CONTRACT";

interface JobDetailsProps {
  id: string;
  title: string;
  company: string;
  location: string;
  type: JobType;
  description: string;
  responsibilities?: string[];
  requirements?: string[];
  applicationUrl?: string | null;
}

/**
 * JobDetails - A presentational component that closely matches the reference:
 *   - Swirl/curved background at the top
 *   - "Back to Careers" + "Apply Now" button
 *   - Sub-sections: Company overview, About the role, and responsibilities
 */
export default function JobDetails({
  id,
  title,
  company,
  location,
  type,
  description,
  responsibilities = [],
  requirements = [],
  applicationUrl,
}: JobDetailsProps) {
  // Convert enum to user-friendly text
  const formatJobType = (jobType: JobType) => {
    switch (jobType) {
      case "FULL_TIME":
        return "Full Time";
      case "PART_TIME":
        return "Part Time";
      case "REMOTE":
        return "Remote";
      case "CONTRACT":
        return "Contract";
      default:
        return jobType;
    }
  };

  return (
    <main className="text-gray-900 w-[60%] m-auto mt-2">
      {/*
        TOP SECTION with swirl-like background
        - You’d replace `bg-[url('/images/swirl-bg.svg')]` with your actual swirl image
      */}
      <div
        className="relative rounded-[30px] bg-green-100 px-6 py-8 md:px-10 md:py-10
        "
      >
        {/* <Link
          href="/jobs"
          className="mb-6 inline-block text-sm font-medium text-primary-600 hover:underline"
        >
          &larr; Back to Jobs
        </Link> */}

        <div className="mt-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          {/* Title (e.g., "Credit Manager") */}
          {/* If using shadcn typography: <H1>{title}</H1> */}
          <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>

          {/* Apply button */}
          {applicationUrl && (
            <Button
              asChild
              className="bg-green-600 hover:bg-green-700 rounded-full"
              size="lg"
            >
              <a
                href={applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply Now
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* 
         MAIN CONTENT (2 columns) 
         - Column 1: Location, Job Type, On-Site 
         - Column 2: Company Overview, About the Role, Responsibilities, Requirements
      */}
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 py-10 md:grid-cols-3 md:px-8">
        
        <div className="col-span-1 space-y-6">
        {/* Location row */}
        <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-green-500" />
            <span className="text-sm text-gray-700">{location}</span>
        </div>

        {/* Job Type row */}
        <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-green-500" />
            <span className="text-sm text-gray-700">{formatJobType(type)}</span>
        </div>

        {/* On-site / Remote row */}
        <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-green-500" />
            <span className="text-sm text-gray-700">On-site</span>
            {/* Or conditionally “Remote” with a different icon/text if needed */}
        </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-span-2 space-y-8">
          {/* Company Overview */}
          <section>
            <h2 className="mb-2 text-xl font-semibold">Company overview</h2>
            <p className="leading-7 text-gray-700">
              {company} is committed to providing a seamless and stress-free
              experience for our clients. By leveraging advanced technology...
            </p>
          </section>

          {/* About the role */}
          <section>
            <h2 className="mb-2 text-xl font-semibold">About the role</h2>
            <p className="leading-7 text-gray-700">{description}</p>
          </section>

          {/* Responsibilities: "What you'll do" */}
          {responsibilities.length > 0 && (
            <section>
              <h2 className="mb-2 text-xl font-semibold">What you&apos;ll do</h2>
              <ul className="ml-4 list-disc space-y-2 text-gray-700">
                {responsibilities.map((resp, idx) => (
                  <li key={idx}>{resp}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Requirements */}
          {requirements.length > 0 && (
            <section>
              <h2 className="mb-2 text-xl font-semibold">Requirements</h2>
              <ul className="ml-4 list-disc space-y-2 text-gray-700">
                {requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
