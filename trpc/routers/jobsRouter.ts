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
        salary: z.number().optional(),
        postedDate: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { page, limit, search, location, jobType, skills } = input;
      const skip = (page - 1) * limit;

      const whereFilter: Record<string, any> = {};
      if (search) {
        whereFilter.OR = [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ];
      }
      if (location) whereFilter.location = location;
      if (jobType?.length) whereFilter.type = { in: jobType };
      if (skills?.length) whereFilter.skills = { hasSome: skills };

      const [jobs, totalJobs] = await Promise.all([
        ctx.prisma.job.findMany({
          where: whereFilter,
          skip,
          take: limit,
          orderBy: { postedDate: 'desc' },
        }),
        ctx.prisma.job.count({ where: whereFilter }),
      ]);

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
