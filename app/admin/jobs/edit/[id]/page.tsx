'use client';

import { useParams } from 'next/navigation';
import JobForm from '@/components/JobForm';

export default function EditJobPage() {
    const { id } = useParams();

    if (!id || typeof id !== 'string') {
        return <p className="text-red-500 text-sm">Invalid job ID</p>;
    }

    return <JobForm jobId={id} />;
}
