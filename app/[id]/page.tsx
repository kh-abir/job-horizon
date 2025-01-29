"use client";

import JobDetails from "@/components/JobDetails";
import { trpc } from "@/lib/trpc/client";
import Loading from "@/components/Loading";
import { useParams } from "next/navigation";

export default function page() {
    const params = useParams();
    const id = params?.id as string;

    const { data: existingJob, isLoading } = trpc.jobs.getById.useQuery(
        { id },
        { enabled: !!id } // ✅ Prevents running query if `id` is undefined
    );

    if (!id) return <p className="text-red-500 text-center">Invalid job ID.</p>;

    if (isLoading) return <Loading />;

    return <JobDetails job={existingJob} />;
}
