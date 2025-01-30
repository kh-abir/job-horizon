import { clerkMiddleware, createRouteMatcher, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define protected routes
const isAdminRoute = createRouteMatcher(['/admin(.*)']);
const isApiRoute = createRouteMatcher(['/api(.*)']);
const isHomeRoute = createRouteMatcher(['/']);

export default clerkMiddleware(async (auth, req) => {
    const { userId, redirectToSignIn } = await auth();

    // Redirect unauthenticated users trying to access protected routes
    if (!userId && (isAdminRoute(req) || isApiRoute(req))) {
        return redirectToSignIn();
    }

    if (userId) {
        try {
            // Fetch user data from Clerk API
            const client = await clerkClient()
            const user = await  client.users.getUser(userId);
            console.log("Fetched User:", user);

            // Retrieve role from publicMetadata
            const userRole = user?.publicMetadata?.role || 'user'; // Default to "user" if not set

            console.log(`User Role: ${userRole}`);

            // Restrict admin routes to only "admin" users
            if (isAdminRoute(req) && userRole !== 'admin') {
                return NextResponse.redirect(new URL('/', req.url)); // Redirect unauthorized users
            }

            if (isHomeRoute(req) && userRole === 'admin') {
                return NextResponse.redirect(new URL('/admin', req.url));
            }

        } catch (error) {
            console.error('Error fetching user from Clerk:', error);
            return redirectToSignIn();
        }
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}