import { middleware } from './trpc';
import { clerkClient } from '@clerk/nextjs/server';
import { TRPCError } from '@trpc/server';

export const protectedMiddleware = middleware(({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'You must be logged in' });
  }
  return next({ ctx });
});

export const adminMiddleware = middleware(async ({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'You must be logged in' });
  }

  const clerk = await clerkClient();
  const user = await clerk.users.getUser(ctx.userId);
  if (user?.publicMetadata?.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Not an admin' });
  }

  return next({ ctx });
});
