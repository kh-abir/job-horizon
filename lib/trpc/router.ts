// lib/trpc/router.ts

import { initTRPC, TRPCError } from '@trpc/server';
import { clerkClient } from '@clerk/nextjs/server';
import superjson from 'superjson';
import { z } from 'zod';
import { TRPCContext } from './context';

const t = initTRPC.context<TRPCContext>().create({
  transformer: superjson,
});

// ─────────────────────────────────────────────────────────────
// 1. Reusable Middlewares / Procedures
// ─────────────────────────────────────────────────────────────

/** Public = no auth required */
export const publicProcedure = t.procedure;

/** Check if user is logged in */
export const middleware = t.middleware;
export const protectedProcedure = t.procedure.use(
  middleware(({ ctx, next }) => {
    if (!ctx.userId) {
      throw new TRPCError({ code: 'UNAUTHORIZED', message: 'You must be logged in' });
    }
    return next({
      ctx: { ...ctx },
    });
  }),
);

/** Admin-only = must be logged in AND have role='admin' in Clerk */
const adminMiddleware = middleware(async ({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'You must be logged in' });
  }
  const clerk = await clerkClient();
  // Fetch user from Clerk
  const user = await clerk.users.getUser(ctx.userId);

  // Check if user has admin role set
  if (user?.publicMetadata?.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Not an admin' });
  }

  return next({
    ctx: { ...ctx },
  });
});

// Extends "protectedProcedure" with admin check
export const adminProcedure = protectedProcedure.use(adminMiddleware);

// ─────────────────────────────────────────────────────────────
// 2. Main App Router
// ─────────────────────────────────────────────────────────────

export const appRouter = t.router({
  jobs: t.router({
    // Anyone can get all jobs
    getAll: publicProcedure
      .input(
        z.object({
          page: z.number().min(1).default(1),
          limit: z.number().min(1).max(20).default(5),
          search: z.string().optional(),
          location: z.string().optional(),
          jobType: z.array(z.enum(["FULL_TIME", "PART_TIME", "REMOTE"])).optional(), // ✅ Accept array
          experience: z.enum(["ENTRY", "INTERMEDIATE", "EXPERT"]).optional(),
        })
      )
      .query(async ({ ctx, input }) => {
        const { page, limit, search, location, jobType, experience } = input;
        const skip = (page - 1) * limit;

        const whereFilter: any = {};

        if (search) {
          whereFilter.OR = [
            { title: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
          ];
        }

        if (location) whereFilter.location = location;
        if (jobType && jobType.length > 0) {
          whereFilter.type = { in: jobType }; // ✅ Allow multiple job types
        }
        if (experience) whereFilter.experience = experience;

        const jobs = await ctx.prisma.job.findMany({
          where: whereFilter,
          skip,
          take: limit,
          orderBy: { postedDate: "desc" },
        });

        const totalJobs = await ctx.prisma.job.count({ where: whereFilter });

        return {
          jobs,
          totalJobs,
          totalPages: Math.ceil(totalJobs / limit),
          currentPage: page,
        };
      }),

    // Anyone can get job by ID
    getById: publicProcedure
      .input(z.object({ id: z.string() }))
      .query(({ ctx, input }) => {
        return ctx.prisma.job.findUnique({ where: { id: input.id } });
      }),

    // Only admin can create
    create: adminProcedure
      .input(
        z.object({
          title: z.string(),
          company: z.string(),
          location: z.string(),
          type: z.enum(["FULL_TIME", "PART_TIME", "REMOTE", "CONTRACT"]),
          description: z.string(),
          responsibilities: z.array(z.string()),
          requirements: z.array(z.string()),
          salary: z.string().optional(),
          applicationUrl: z.string().url().optional(),
        }),
      )
      .mutation(({ ctx, input }) => {
        return ctx.prisma.job.create({
          data: {
            ...input,
            postedDate: new Date(),
            updatedDate: new Date(),
          },
        });
      }),


    update: adminProcedure
      .input(
        z.object({
          id: z.string(),
          title: z.string().optional(),
          company: z.string().optional(),
          location: z.string().optional(),
          type: z.enum(["FULL_TIME", "PART_TIME", "REMOTE", "CONTRACT"]).optional(),
          description: z.string().optional(),
          responsibilities: z.array(z.string()).optional(),
          requirements: z.array(z.string()).optional(),
          salary: z.string().optional(),
          applicationUrl: z.string().optional(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        return ctx.prisma.job.update({
          where: { id: input.id },
          data: { ...input },
        });
      }),
    

    delete: adminProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ ctx, input }) => {
        return ctx.prisma.job.delete({
          where: { id: input.id },
        });
      }),


    // In the future, you can add "update" or "delete" with adminProcedure as well
    // update: adminProcedure
    // delete: adminProcedure
  }),
});

export type AppRouter = typeof appRouter;
