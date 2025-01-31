import { clerkMiddleware, createRouteMatcher, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define route matchers
const isAdminRoute = createRouteMatcher(['/admin', '/admin/jobs', '/admin/jobs/create', '/admin/jobs/edit/(.*)']);
const isHomeRoute = createRouteMatcher(['/']);
const isJobsRoute = createRouteMatcher(['/jobs']);

export default clerkMiddleware(async (auth, req) => {
    const { userId, redirectToSignIn } = await auth();

    // Redirect "/" to "/jobs" for all users
    if (!userId && (isHomeRoute(req) || isAdminRoute(req))) {
        return NextResponse.redirect(new URL('/jobs', req.url));
    }

    if (userId) {
        try {
            // Fetch user data from Clerk API
            const client = await clerkClient();
            const user = await client.users.getUser(userId);

            // Retrieve role from publicMetadata
            const userRole = user?.publicMetadata?.role || 'user'; // Default to "user"

            // Handle Admin Routes:
            if (userRole === 'admin') {
                // Redirect admin from "/" or "/jobs" to "/admin/jobs"
                if (isHomeRoute(req) || isJobsRoute(req)) {
                    return NextResponse.redirect(new URL('/admin/jobs', req.url));
                }
                // Allow admins to access "/admin/jobs" and its subpages without redirecting
            }

            // Handle User Routes:
            else if (userRole === 'user') {
                // Prevent users from accessing admin routes
                if (isAdminRoute(req)) {
                    return NextResponse.redirect(new URL('/jobs', req.url));
                }
                // Redirect users from "/" to "/jobs"
                if (isHomeRoute(req)) {
                    return NextResponse.redirect(new URL('/jobs', req.url));
                }
            }
        } catch (error) {
            return redirectToSignIn();
        }
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        // Skip Next.js internals and static files
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
