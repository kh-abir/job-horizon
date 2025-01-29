"use client";

import { useParams, useRouter } from "next/navigation";
import { trpc } from "@/trpc/client";
import JobDetails, { JobType } from "@/components/JobDetails";
import { Loader2 } from "lucide-react"; // shadcn recommended loader icon
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
        <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
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

  // Destructure the fields from your DB
  const {
    id,
    title,
    company,
    location,
    type,
    description,
    responsibilities,
    requirements,
    applicationUrl,
  } = data as {
    id: string;
    title: string;
    company: string;
    location: string;
    type: JobType;
    description: string;
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
      description={description}
      responsibilities={responsibilities}
      requirements={requirements}
      applicationUrl={applicationUrl}
    />
  );
}
