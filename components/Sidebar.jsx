"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  AlignJustify,
  AlignLeft,
  Bot,
  ChevronDown,
  Home,
  UtensilsCrossed,
  Truck,
  MapPinned,
  CircleGauge,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import logo from "@/public/logo.png";

export function SidebarPage() {
  const menuItems = [
    { icon: <Home />, label: "Dashboard", path: "/dashboard" },
    {
      icon: <UtensilsCrossed />,
      label: "Cafeteria Menu",
      path: "/caf-menu",
    },
    {
      icon: <Truck />,
      label: "Transportation",
      path: "/transportation",
    },
    {
      icon: <CircleGauge />,
      label: "Faculty & Schedules",
      path: "/classes",
    },
    {
      icon: <Bot />,
      label: "Event & Clubs",
      path: "/events-clubs",
    },
    {
      icon: <MapPinned />,
      label: "Navigation & Map",
      path: "/map",
    },
    {
      icon: <Bot />,
      label: "Uforia AI",
      path: "/ai-assistant",
    },
  ];

  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);
  const [dropdownStates, setDropdownStates] = useState(() => {
    const initialState = {};
    menuItems.forEach((item, index) => {
      if (
        item.isDropdown &&
        item.dropdownItems.some(
          (dropdownItem) => dropdownItem.path === pathname
        )
      ) {
        initialState[index] = true;
      }
    });
    return initialState;
  });

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  const toggleDropdown = (index) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <>
      <div
        className={`
          ${isExpanded ? "w-64" : "w-22"} 
          p-4 box-border 
          bg-white border-r 
          h-full flex flex-col transition-all duration-300
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between">
          <span
            className={`${isExpanded ? "block" : "hidden"} text-lg font-bold`}
          >
            <Link
              href="/"
              className="text-3xl font-bold items-center space-x-2"
            >
              <Image
                src={logo || "/placeholder.svg"}
                alt="logo"
                className="h-auto w-[12vh]"
              />
            </Link>
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="text-xl mt-5 ml-3"
            onClick={toggleSidebar}
          >
            {isExpanded ? <AlignLeft size={25} /> : <AlignJustify size={28} />}
          </Button>
        </div>
        <Separator className="mt-4 mb-8" />

        {/* Sidebar Menu */}
        <ul className="flex-1 space-y-4">
          {menuItems.map((item, index) => {
            const isActiveParent =
              item.isDropdown &&
              item.dropdownItems.some(
                (dropdownItem) => dropdownItem.path === pathname
              );

            return (
              <li key={index} className="flex flex-col">
                {item.isDropdown ? (
                  <Collapsible
                    open={dropdownStates[index]}
                    onOpenChange={() => toggleDropdown(index)}
                  >
                    <CollapsibleTrigger asChild>
                      <div
                        className={`flex items-center gap-4 px-4  py-2 cursor-pointer  ${
                          isActiveParent
                            ? "text-black font-bold"
                            : "text-gray-500 font-bold"
                        } hover:text-black`}
                      >
                        <span
                          className={`h-5 w-5 text-lg ${
                            isActiveParent ? "text-orange-600" : "text-black"
                          } hover:text-orange-600`}
                        >
                          {item.icon}
                        </span>
                        <span
                          className={` ${
                            isExpanded ? "block" : "hidden"
                          } flex-1`}
                        >
                          {item.label}
                        </span>
                        {isExpanded && (
                          <ChevronDown
                            className={`transition-transform ${
                              dropdownStates[index] ? "rotate-180" : ""
                            }`}
                            size={16}
                          />
                        )}
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      {isExpanded && (
                        <ul className="ml-8 space-y-2">
                          {item.dropdownItems.map(
                            (dropdownItem, dropdownIndex) => (
                              <li key={dropdownIndex}>
                                <Link href={dropdownItem.path} passHref>
                                  <div
                                    className={`px-4 py-2 cursor-pointer rounded ${
                                      pathname === dropdownItem.path
                                        ? "text-black font-bold"
                                        : "text-gray-500 font-bold"
                                    } hover:text-black`}
                                  >
                                    {dropdownItem.label}
                                  </div>
                                </Link>
                              </li>
                            )
                          )}
                        </ul>
                      )}
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <Link href={item.path} passHref>
                    <div
                      className={`flex items-center gap-4 px-4 py-2 cursor-pointer ${
                        pathname === item.path
                          ? "text-black font-bold"
                          : "text-gray-500 font-bold"
                      } hover:text-black`}
                    >
                      <span
                        className={`h-5 w-5 text-lg ${
                          pathname === item.path
                            ? "text-orange-600"
                            : "text-black"
                        } hover:text-orange-600`}
                      >
                        {item.icon}
                      </span>
                      <span
                        className={`${isExpanded ? "block" : "hidden"} flex-1`}
                      >
                        {item.label}
                      </span>
                    </div>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
