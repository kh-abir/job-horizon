"use client";

import { useParams, useRouter } from "next/navigation";
import { trpc } from "@/trpc/client";
import JobDetails from "@/components/JobDetails";
import { JobType } from '@/trpc/constants';
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function JobDetailsPage() {
  const params = useParams() as { id: string };
  const router = useRouter();

  const { data, isLoading, isError } = trpc.jobs.getById.useQuery({
    id: params.id,
  });

  if (isLoading) {
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center space-y-4">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <p>Loading job details...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center space-y-4">
        <p>Job not found.</p>
        <Button variant="outline" onClick={() => router.push("/jobs")}>
          Back to Careers
        </Button>
      </div>
    );
  }

  const {
    id,
    title,
    company,
    location,
    type,
    salary,
    description,
      skills,
    responsibilities,
    requirements,
    applicationUrl,
  } = data as {
    id: string;
    title: string;
    company: string;
    location: string;
    type: JobType;
    salary: string;
    description: string;
    skills: string[];
    responsibilities: string[];
    requirements: string[];
    applicationUrl: string | null;
  };

  return (
    <JobDetails
      id={id}
      title={title}
      company={company}
      location={location}
      type={type}
      salaryRange={salary ? `${salary}/mo` : "Salary not listed"}
      description={description}
      skills={skills}
      responsibilities={responsibilities}
      requirements={requirements}
      applicationUrl={applicationUrl}
    />
  );
}
