"use client";

import { Button } from "@/components/ui/button";
import { MapPin, Clock, Building2 } from "lucide-react";
import { JobType } from '@/trpc/constants';

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
      <div
        className="relative rounded-[30px] bg-green-100 px-6 py-8 md:px-10 md:py-10
        "
      >

        <div className="mt-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">

          <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
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

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 py-10 md:grid-cols-3 md:px-8">
        
        <div className="col-span-1 space-y-6">
        <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-green-500" />
            <span className="text-sm text-gray-700">{location}</span>
        </div>

        <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-green-500" />
            <span className="text-sm text-gray-700">{formatJobType(type)}</span>
        </div>

        <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-green-500" />
            <span className="text-sm text-gray-700">On-site</span>
        </div>
        </div>

        <div className="col-span-2 space-y-8">
          <section>
            <h2 className="mb-2 text-xl font-semibold">Company overview</h2>
            <p className="leading-7 text-gray-700">
              {company} is committed to providing a seamless and stress-free
              experience for our clients. By leveraging advanced technology...
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold">About the role</h2>
            <p className="leading-7 text-gray-700">{description}</p>
          </section>

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
