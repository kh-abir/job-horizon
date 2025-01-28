import { prisma } from '@/lib/prisma';
import { getAuth } from '@clerk/nextjs/server';
import type { NextRequest } from 'next/server';

export function createTRPCContext({ req }: { req: NextRequest }) {
  const { userId } = getAuth(req);

  return {
    prisma,
    userId,
  };
}

export type TRPCContext = ReturnType<typeof createTRPCContext>;
