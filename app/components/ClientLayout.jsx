"use client";

import { Navbar } from "@/components/Navbar";
import { SidebarPage } from "@/components/Sidebar";
import { usePathname } from "next/navigation";


export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");
  const isFacultyRoute = pathname.startsWith("/faculty");

  return (
    <div className="flex h-screen bg-[#e5e7eb]">
      {!isAdminRoute && !isFacultyRoute && <SidebarPage />}
      <div className="flex flex-col flex-1 overflow-hidden">
        {!isAdminRoute && !isFacultyRoute && <Navbar />}
        <main className="flex-1 overflow-y-auto px-4 py-0">{children}</main>
      </div>
    </div>
  );
}
