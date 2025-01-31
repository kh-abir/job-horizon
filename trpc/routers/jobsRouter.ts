import { publicProcedure, adminProcedure } from '../trpc';
import { z } from 'zod';
import { jobInputSchema, JobType } from '../constants';

export const jobsRouter = {
  getById: publicProcedure
      .input(z.object({ id: z.string() }))
      .query(({ ctx, input }) => ctx.prisma.job.findUnique({ where: { id: input.id } })),

  getAll: publicProcedure
  .input(
      z.object({
          page: z.number().min(1).default(1),
          limit: z.number().min(1).max(20).default(5),
          search: z.string().optional(),
          location: z.string().optional(),
          jobType: z.array(z.nativeEnum(JobType)).optional(),
          skills: z.array(z.string()).optional(),
          salary: z.string().optional(),
          postedDate: z.string().optional(),
      })
  )
  .query(async ({ ctx, input }) => {
      const { page, limit, search, location, jobType, skills, salary } = input;
      const skip = (page - 1) * limit;

      const whereFilter: Record<string, any> = {};

      // 🔍 Search Filter
      if (search) {
          whereFilter.OR = [
              { title: { contains: search, mode: 'insensitive' } },
              { description: { contains: search, mode: 'insensitive' } },
          ];
      }

      // 📍 Location Filter
      if (location) whereFilter.location = location;

      // 🏢 Job Type Filter
      if (jobType?.length) whereFilter.type = { in: jobType };

      // 🛠 Skills Filter
      if (skills?.length) whereFilter.skills = { hasSome: skills };
      const totalJobs = await ctx.prisma.job.count({ where: whereFilter });

      // ✅ Fetch jobs from Prisma
      let jobs = await ctx.prisma.job.findMany({
          where: whereFilter,
          skip,
          take: limit,
      });

      // 💰 Salary Filtering (since salary is stored as a string)
      if (salary) {
          // Extract the user-defined salary range (e.g., "$5,000 - $20,000")
          const salaryRange = salary.replace(/[^0-9-]/g, '') // Remove non-numeric characters except '-'
              .split('-')
              .map(s => parseInt(s.trim(), 10));

          if (salaryRange && salaryRange.length === 2) {
              const [minSalary, maxSalary] = salaryRange;
              console.log('Salary Range:', minSalary, maxSalary);
              // Filter jobs manually based on extracted salary range
              jobs = jobs.filter(job => {
                  if (!job.salary) return false; // Skip jobs without salary data

                  // Extract min and max salary from the job's salary string in DB
                  const jobSalaryRange = job.salary.replace(/[^0-9-]/g, '') // Remove non-numeric characters except '-'
                      .split('-')
                      .map(s => parseInt(s.trim(), 10));
                  if (!jobSalaryRange || jobSalaryRange.length !== 2) return false;

                  const [jobMinSalary, jobMaxSalary] = jobSalaryRange;

                  // ✅ Keep jobs that match the salary range
                  return jobMinSalary >= minSalary && jobMaxSalary <= maxSalary;
              });
          }
      }

      return { jobs, totalJobs, totalPages: Math.ceil(totalJobs / limit), currentPage: page };
  }),

  create: adminProcedure
  .input(jobInputSchema)
  .mutation(({ ctx, input }) =>
    ctx.prisma.job.create({ data: { ...input, postedDate: new Date(), updatedDate: new Date() } })
  ),

  update: adminProcedure
    .input(jobInputSchema.extend({ id: z.string() }).partial())
    .mutation(({ ctx, input }) =>
      ctx.prisma.job.update({ where: { id: input.id }, data: input })
    ),

  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) =>
      ctx.prisma.job.delete({ where: { id: input.id } })
    ),
};
