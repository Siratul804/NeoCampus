"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  AlignJustify,
  AlignLeft,
  Home,
  UtensilsCrossed,
  Truck,
  MapPinned,
  Calendar,
  BookOpen,
  Bot,
  Megaphone ,
  MessageCircle 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import logo from "@/public/neoCam.png";

export function SidebarPage() {
  const menuItems = [
    { icon: <Home />, label: "Dashboard", path: "/Dashboard" },
    {
      icon: <UtensilsCrossed />,
      label: "Cafeteria Menu",
      path: "/Cafeteria-Menu",
    },
    { icon: <Truck />, label: "Transportation", path: "/transportation" },
    {
      icon: <BookOpen />,
      label: "Faculty & Schedules",
      path: "/Faculty-Schedules",
    },
    { icon: <Calendar />, label: "Event & Clubs", path: "/events-clubs" },
    { icon: <Megaphone  />, label: "Updates & Announcements", path: "/updates-announcements" },
    { icon: <MapPinned />, label: "Navigation & Map", path: "/Navigation" },
    { icon: <MessageCircle  />, label: "Messages", path: "/messages" },
    { icon: <Bot />, label: "NeoCampus AI", path: "/Neo-AI" },
  ];

  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  return (
    <div
      className={`
        ${isExpanded ? "w-64" : "w-22"} 
        p-3 box-border 
        bg-white 
        shadow-sm
        h-full flex flex-col transition-all duration-300
      `}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between">
        <span
          className={`${isExpanded ? "block" : "hidden"} text-lg font-bold`}
        >
          <Link
            href="/Dashboard"
            className="text-4xl font-bold items-center space-x-2"
          >
            <Image
              src={logo || "/placeholder.svg"}
              alt="logo"
              className="h-auto w-[15vh] my-2"
            />
          </Link>
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="text-slate-600 hover:text-slate-800 hover:bg-slate-100 mt-5 ml-3 cursor-pointer "
          onClick={toggleSidebar}
        >
          {isExpanded ? <AlignLeft size={22} /> : <AlignJustify size={22} />}
        </Button>
      </div>
      <Separator className="mt-4 mb-6 bg-slate-200" />

      {/* Sidebar Menu */}
      <ul className="flex-1 space-y-2">
        {menuItems.map((item, index) => (
          <li key={index} className="flex">
            <Link href={item.path} passHref className="w-full">
              <div
                className={`
                  flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-md transition-colors duration-200
                  ${
                    pathname === item.path
                      ? "bg-slate-100 text-slate-800 font-medium"
                      : "text-slate-600 font-medium"
                  }
                  hover:bg-slate-100
                `}
              >
                <span
                  className={`
                    flex items-center justify-center h-5 w-5 hover:text-slate-900
                    ${
                      pathname === item.path
                        ? "text-slate-900 font-bold"
                        : "text-slate-500"
                    }
                  `}
                >
                  {item.icon}
                </span>
                <span
                  className={`${
                    isExpanded ? "block" : "hidden"
                  } flex-1 text-sm`}
                >
                  {item.label}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
