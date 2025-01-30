import { clerkMiddleware, createRouteMatcher, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isAdminRoute = createRouteMatcher(['/admin(.*)']);
const isApiRoute = createRouteMatcher(['/api(.*)']);
const isHomeRoute = createRouteMatcher(['/']);

export default clerkMiddleware(async (auth, req) => {
    const { userId, redirectToSignIn } = await auth();

    if (!userId && (isAdminRoute(req) || isApiRoute(req))) {
        return redirectToSignIn();
    }

    if (userId) {
        try {
            const client = await clerkClient()
            const user = await client.users.getUser(userId);

            const userRole = user?.publicMetadata?.role || 'user'; 

            if (isAdminRoute(req) && userRole !== 'admin') {
                return NextResponse.redirect(new URL('/', req.url)); 
            }

            if (isHomeRoute(req) && userRole === 'admin') {
                return NextResponse.redirect(new URL('/admin', req.url));
            }

        } catch (error) {
            return redirectToSignIn();
        }
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
}