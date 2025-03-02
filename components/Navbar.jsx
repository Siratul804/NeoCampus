"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Bell, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  SignedIn,
  UserButton,
  useUser,
} from "@clerk/nextjs";

export function Navbar() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Get user detail from Clerk
  const { user } = useUser();

  // Prevent hydration errors and wait for user data to load
  if (!isMounted || !user) {
    return null;
  }

  // Format the current path into a breadcrumb string
  const formatPath = (path) => {
    const segments = path
      .split("/")
      .filter(Boolean)
      .map((segment) =>
        segment
          .replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase())
      );
    return segments.join(" / ");
  };

  // Extract user details from Clerk
  const username = user.firstName || "User";
  const email =
    user.emailAddresses && user.emailAddresses.length > 0
      ? user.emailAddresses[0].emailAddress
      : "user@example.com";
  const profileImage = user.profileImageUrl || "";
  // XP is optional and may not be provided by Clerk
  const xp = user.xp;
  const userInitial = username.charAt(0).toUpperCase() || "U";

  return (
    <div className="w-full bg-transparent py-0 px-4 mt-4">
      <nav className="w-full px-8 bg-white mx-auto rounded-xl py-4 flex justify-between items-center shadow-sm">
        {/* Left side - Breadcrumb */}
        <div className="flex items-center gap-2 pl-2">
          <Home className="h-5 w-5 text-slate-500" />
          <span className="text-slate-400 font-medium text-base">/</span>
          <span className="text-slate-800 font-medium text-base">
            {formatPath(pathname)}
          </span>
        </div>

        {/* Right side - Notifications and Profile */}
        <div className="flex items-center space-x-4">
          {/* Notification Button */}
          <Button
            variant="ghost"
            size="icon"
            className="relative text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-full h-9 w-9"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </Button>

          {/* Profile Dropdown */}
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
              afterSignOutUrl="/sign-in"
            />
          </SignedIn>
        </div>
      </nav>
    </div>
  );
}
