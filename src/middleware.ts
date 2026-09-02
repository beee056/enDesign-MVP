import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  '/',
  '/check(.*)',
  '/support(.*)',
  '/legal(.*)',
  '/terms(.*)',
  '/privacy(.*)',
  '/sign-in(.*)',
  '/api/webhook(.*)',
]);

const protectedMiddleware = clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

/**
 * Preview deployments do not always have Clerk credentials. In that case,
 * public pages remain reviewable while every non-public route fails closed.
 */
export default function middleware(req: NextRequest, event: NextFetchEvent) {
  const hasClerkConfig = Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
      process.env.CLERK_SECRET_KEY
  );

  if (!hasClerkConfig) {
    if (isPublicRoute(req)) return NextResponse.next();
    return NextResponse.redirect(new URL("/", req.url));
  }

  return protectedMiddleware(req, event);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
