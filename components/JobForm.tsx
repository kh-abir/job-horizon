'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { trpc } from '@/trpc/client';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { JobType } from '@/trpc/constants';
import {useToast} from "@/hooks/use-toast";
import CountrySelect from "@/components/CountrySelect";

const jobSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, 'Title must be at least 3 characters'),
  company: z.string().min(2, 'Company name is required'),
  location: z.string().min(2, 'Location is required'),
  type: z.nativeEnum(JobType), 
  skills: z.string().min(5, 'Skills required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  responsibilities: z.string().min(5, 'Responsibilities required'),
  requirements: z.string().min(5, 'Requirements required'),
  salary: z.string().optional(),
  applicationUrl: z.string().url('Must be a valid URL').optional(),
});

type JobFormData = z.infer<typeof jobSchema>;

interface JobFormProps {
  jobId?: string;
}

export default function JobForm({ jobId }: JobFormProps) {
  const router = useRouter();
  const {toast} = useToast()
  const { data: existingJob, isLoading } = trpc.jobs.getById.useQuery(
    { id: jobId! },
    { enabled: !!jobId }
  );

  const { register, handleSubmit, setValue, reset, formState: { errors, isSubmitting } } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
  });

  const createMutation = trpc.jobs.create.useMutation({
    onSuccess: () => {
      toast({title: 'Job created successfully'});
      router.push('/admin');
    },
  });

  const updateMutation = trpc.jobs.update.useMutation({
    onSuccess: () => {
      toast({title: 'Job updated successfully'});
      router.push('/admin');
    },
  });

  useEffect(() => {
    if (existingJob) {
      reset({
        id: existingJob.id,
        title: existingJob.title,
        company: existingJob.company,
        location: existingJob.location,
        type: existingJob.type as JobType,
        description: existingJob.description,
        skills: existingJob.skills.join('\n'),
        responsibilities: existingJob.responsibilities.join('\n'),
        requirements: existingJob.requirements.join('\n'),
        salary: existingJob.salary || '',
        applicationUrl: existingJob.applicationUrl || '',
      });
    }
  }, [existingJob, reset]);

  const onSubmit = async (data: JobFormData) => {
    const formattedData = {
      ...data,
      responsibilities: data.responsibilities.split('\n'),
      requirements: data.requirements.split('\n'),
      skills: data.skills.split('\n'),
    };

    if (jobId) {
      updateMutation.mutate({ id: jobId, ...formattedData })
    } else {
      createMutation.mutate(formattedData);
    }
  };

  if (isLoading && jobId) return <p>Loading job data...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 my-20 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">{jobId ? 'Edit Job' : 'Create Job'}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        <Input placeholder="Job Title" {...register('title')} />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

        <Input placeholder="Company Name" {...register('company')} />
        {errors.company && <p className="text-red-500 text-sm">{errors.company.message}</p>}

        <Select onValueChange={(value) => setValue('type', value as JobType)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Job Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="FULL_TIME">Full-Time</SelectItem>
            <SelectItem value="PART_TIME">Part-Time</SelectItem>
            <SelectItem value="REMOTE">Remote</SelectItem>
            <SelectItem value="CONTRACT">Contract</SelectItem>
          </SelectContent>
        </Select>
        {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}

        <CountrySelect placeholder={"Country"} onChange={(value)=> setValue('location', value)}/>

        <Textarea placeholder="Job Description" {...register('description')} />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

        <Textarea placeholder="Responsibilities (one per line)" {...register('responsibilities')} />
        {errors.responsibilities && <p className="text-red-500 text-sm">{errors.responsibilities.message}</p>}

        <Textarea placeholder="Requirements (one per line)" {...register('requirements')} />
        {errors.requirements && <p className="text-red-500 text-sm">{errors.requirements.message}</p>}

         <Textarea placeholder="Skills (one per line)" {...register('skills')} />
         {errors.skills && <p className="text-red-500 text-sm">{errors.skills.message}</p>}

        <Input placeholder="Salary/mo (Optional)" {...register('salary')} />
        
        <Input placeholder="Application URL (Optional)" {...register('applicationUrl')} />
        {errors.applicationUrl && <p className="text-red-500 text-sm">{errors.applicationUrl.message}</p>}

        <div className="flex space-x-4">
          <Button type="button" variant="outline" onClick={() => router.push('/admin')} className="w-1/2 bg-gray-500 text-white">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} className="w-1/2">
            {isSubmitting ? 'Submitting...' : jobId ? 'Update Job' : 'Create Job'}
          </Button>
        </div>
      </form>
    </div>
  );
}
