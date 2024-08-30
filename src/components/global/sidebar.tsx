"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { HiOutlineHome } from "react-icons/hi2";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { PiPlugsConnected } from "react-icons/pi";
import { BsCreditCard2Front } from "react-icons/bs";
import { LuLayoutTemplate } from "react-icons/lu";
import { RiTodoLine } from "react-icons/ri";


function Sidebar() {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    }
  }, []);

  const menuItems = [
    { href: "/dashboard", icon: HiOutlineHome, label: "Home" },
    { href: "/dashboard/workflows", icon: AiOutlineThunderbolt, label: "Workflows" },
    { href: "/dashboard/settings", icon: IoSettingsOutline, label: "Settings" },
    { href: "/dashboard/connections", icon: PiPlugsConnected, label: "Connections" },
    { href: "/dashboard/billing", icon: BsCreditCard2Front, label: "Billing" },
    { href: "/dashboard/templates", icon: LuLayoutTemplate, label: "Templates" },
    { href: "/dashboard/logs", icon: RiTodoLine, label: "Logs" },
  ];

  return (
    <div className="h-screen  border-r">
      <div className="space-y-1 px-4">
        <ul className="flex flex-col space-y-2 font-roobert pt-6">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex gap-2 rounded-lg px-4 py-2 text-sm
                  ${pathname === item.href
                    ? `bg-primary font-bold ${isDarkMode ? "text-black" : "text-white"}`
                    : `text-gray-500 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-500 hover:text-gray-700`}
                `}
              >
                <item.icon
                  className={`w-5 h-5 ${pathname === item.href ? (isDarkMode ? "text-black" : "text-white") : ""}`}
                />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
