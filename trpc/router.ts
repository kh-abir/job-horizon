import t from './trpc'; 
import { jobsRouter } from './routers/jobsRouter';

export const appRouter = t.router({
  jobs: t.router(jobsRouter),
});

export type AppRouter = typeof appRouter;
