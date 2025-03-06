import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/Dashboard(.*)",
  "/Cafeteria-Menu(.*)",
  "/transportation(.*)",
  "/Faculty-Schedules(.*)",
  "/Navigation(.*)",
  "/events-clubs(.*)",
  "/Neo-AI(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const url = new URL(req.url);

  // If the user is not signed in and trying to access a protected route, redirect to sign-in.
  if (!userId && isProtectedRoute(req)) {
    return NextResponse.redirect(
      new URL(process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || "/sign-in", req.url)
    );
  }

  // If the user is signed in and trying to access the sign-in page, redirect them to /dashboard.
  if (
    userId &&
    url.pathname === (process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || "/sign-in")
  ) {
    return NextResponse.redirect(
      new URL(
        process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL || "/Dashboard",
        req.url
      )
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
