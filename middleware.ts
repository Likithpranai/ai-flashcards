import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Create a matcher to define public routes
const isPublicRoute = createRouteMatcher([
  "/", // Allow access to the root route
  "/sign-in(.*)", // Allow access to sign-in routes
  "/sign-up(.*)", // Allow access to sign-up routes
]);

export default clerkMiddleware((auth, request) => {
    // Protect all routes except for public routes
    if (!isPublicRoute(request)) {
      auth().protect();
    }
  });

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
