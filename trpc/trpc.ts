import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { TRPCContext } from './context';
import { TRPCError } from '@trpc/server';
const t = initTRPC.context<TRPCContext>().create({
  transformer: superjson,
});

export const publicProcedure = t.procedure;
export const middleware = t.middleware;
export const protectedProcedure = t.procedure.use(middleware(({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'You must be logged in' });
  }
  return next({ ctx });
}))

export const adminProcedure = protectedProcedure.use(middleware(({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'You must be logged in' });
  }
  return next({ ctx });
}))

export default t;
