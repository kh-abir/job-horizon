// lib/trpc/router.ts
import t from './trpc'; // ✅ Import TRPC core
import { jobsRouter } from './routers/jobsRouter';

export const appRouter = t.router({
  jobs: t.router(jobsRouter),
});

export type AppRouter = typeof appRouter;
