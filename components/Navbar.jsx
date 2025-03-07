"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Bell, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { socket } from "@/socket";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";

export function Navbar() {
  const pathname = usePathname();
  const { user } = useUser();
  const [notification, setNotification] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Handle incoming socket notifications
  useEffect(() => {
    const handleNotification = (message) => {
      setNotification(message);
    };

    socket.on("menuAdded", handleNotification);
    return () => {
      socket.off("menuAdded", handleNotification);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  // Ensure user is loaded before rendering
  if (!user) return null;

  // Format the current path into a readable breadcrumb string
  const formatPath = (path) =>
    path
      .split("/")
      .filter(Boolean)
      .map(
        (segment) =>
          segment
            .replace(/-/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize words
      )
      .join(" / ");

  return (
    <div className="w-full bg-transparent py-0 px-4 mt-4">
      <nav className="w-full px-8 bg-white mx-auto rounded-xl py-4 flex justify-between items-center shadow-sm">
        {/* Left Side - Breadcrumb */}
        <div className="flex items-center gap-2 pl-2">
          <Home className="h-5 w-5 text-slate-500" />
          <span className="text-slate-400 font-medium text-base">/</span>
          <span className="text-slate-800 font-medium text-base">
            {formatPath(pathname)}
          </span>
        </div>

        {/* Right Side - Notifications and Profile */}
        <div className="flex items-center space-x-4">
          {/* Notification Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-full h-9 w-9"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              <Bell className="h-5 w-5" />
              {notification && (
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              )}
            </Button>

            {/* Dropdown Content */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md overflow-hidden z-50 border">
                <div className="p-3">
                  <p className="text-sm text-gray-700 font-medium">
                    {notification || "No new notifications"}
                  </p>
                </div>
              </div>
            )}
          </div>

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
              afterSignInUrl="/dashboard"
            />
          </SignedIn>
        </div>
      </nav>
    </div>
  );
}
