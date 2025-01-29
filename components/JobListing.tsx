'use client';

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { trpc } from "@/trpc/client";
import JobCard from "@/components/JobCard";
import Loading from "@/components/Loading";
import SearchBar from "@/components/SearchBar";
import JobFilterSidebar from "@/components/JobFilterSidebar"; 
import { Button } from "@/components/ui/button";

export default function JobListing() {
  const { user } = useUser();
  const [page, setPage] = useState(1);
  const limit = 5;
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    location: undefined as string | undefined,
    jobType: [] as Array<"FULL_TIME" | "PART_TIME" | "REMOTE">,
    experience: undefined as "ENTRY" | "INTERMEDIATE" | "EXPERT" | undefined,
    salary: undefined as number | undefined,
  });

  const trpcContext = trpc.useContext();
  const { data, isLoading } = trpc.jobs.getAll.useQuery({
    page,
    limit,
    search,
    location: filters.location || undefined,
    jobType: filters.jobType.length > 0 ? filters.jobType : undefined,
    experience: filters.experience || undefined,
    salary: filters.salary || undefined,
  });

  const deleteMutation = trpc.jobs.delete.useMutation({
    onSuccess: () => {
      trpcContext.jobs.getAll.invalidate();
    },
  });

  const jobs = data?.jobs || [];
  const totalPages = data?.totalPages || 1;

  const handleDelete = (jobId: string) => {
    if (confirm("Are you sure you want to delete this job?")) {
      deleteMutation.mutate({ id: jobId });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* ✅ Column 1: Sidebar */}
      <div className="col-span-1">
        <JobFilterSidebar filters={filters} setFilters={setFilters} />
      </div>

      {/* ✅ Column 2: Search Bar & Job Listings */}
      <div className="col-span-3 space-y-6">
        {/* Search Bar */}
        <SearchBar onSearch={setSearch} />

        {/* Job Listings */}
        <div className="space-y-4">
          { isLoading ? (<Loading/>) : jobs.length === 0 ? (
            <p className="text-center text-gray-500">No jobs available.</p>
          ) : (
            jobs.map((job: any) => (
              <JobCard
                key={job.id}
                id={job.id}
                title={job.title}
                location={job.location}
                salaryRange={job.salary ? `$${job.salary}/mo` : "Salary not listed"}
                applicants={Math.floor(Math.random() * 50)}
                description={job.description}
                skills={["Kotlin", "iOS Developer", "Software Engineer"]}
                postedTime="5 mins ago"
                onDelete={handleDelete}
              />
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center space-x-4 py-6">
            <Button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
              Previous
            </Button>
            <span>Page {page} of {totalPages}</span>
            <Button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} disabled={page >= totalPages}>
              Next
            </Button>
          </div>
      </div>
    </div>
  );
}
