"use client";

import { Button } from "@/components/ui/button";
import { MapPin, Clock, Building2 } from "lucide-react";
import { JobType } from '@/trpc/constants';
import {Badge} from "@/components/ui/badge";

interface JobDetailsProps {
  id: string;
  title: string;
  company: string;
  location: string;
  type: JobType;
    salaryRange: string;
  description: string;
  skills: string[];
  responsibilities?: string[];
  requirements?: string[];
  applicationUrl?: string | null;
}

export default function JobDetails({
  title,
  company,
  location,
  type, salaryRange,
  description,
    skills,
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
    <main className="rounded-[30px] text-white bg-background w-11/12 md:w-[60%] m-auto mt-2">
      <div
        className="relative rounded-[30px] bg-primary px-6 py-8 md:px-10 md:py-10
        "
      >

        <div className="mt-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">

          <div>
            <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
            <h3 className="text-gray-100">{salaryRange}</h3>
          </div>

          {applicationUrl && (
            <Button
              asChild
              className="bg-white font-bold text-black hover:bg-black hover:text-white transition-colors rounded-full"
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
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-sm text-gray-700">{location}</span>
          </div>

          <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span className="text-sm text-gray-700">{formatJobType(type)}</span>
          </div>

          <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              <span className="text-sm text-gray-700">On-site</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills?.map((skill, index) => (
                <Badge key={index} variant="outline" className={`text-sm px-3 py-1 font-medium rounded-md text-black bg-muted`}>
                  {skill}
                </Badge>
            ))}
          </div>
        </div>
        <div className="col-span-2 space-y-8">
          <section>
            <h2 className="mb-2 text-xl font-semibold  text-gray-700">Company overview</h2>
            <p className="leading-7 text-gray-500">
              {company} is committed to providing a seamless and stress-free
              experience for our clients. By leveraging advanced technology...
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold   text-gray-700">About the role</h2>
            <p className="leading-7 text-gray-500">{description}</p>
          </section>

          {responsibilities.length > 0 && (
            <section>
              <h2 className="mb-2 text-xl font-semibold text-gray-700">What you&apos;ll do</h2>
              <ul className="ml-4 list-disc space-y-2 text-gray-500">
                {responsibilities.map((resp, idx) => (
                  <li key={idx}>{resp}</li>
                ))}
              </ul>
            </section>
          )}

          {requirements.length > 0 && (
            <section>
              <h2 className="mb-2 text-xl font-semibold text-gray-700">Requirements</h2>
              <ul className="ml-4 list-disc space-y-2 text-gray-500">
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
