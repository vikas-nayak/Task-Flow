import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";
// import { ThemeProvider } from "@/providers/theme.provider";
import { DM_Sans } from "next/font/google";
import  Sidebar  from "@/components/global/sidebar";
import Navbar from "@/components/global/navbar";
import { ScrollArea } from "@/components/ui/scroll-area";


// const inter = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TaskFlow",
  description: "Automate your workflow",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
       <div className=" w-full h-[200vh] flex">
          <Sidebar />
        <div className="">
          <ScrollArea className="">{children}</ScrollArea>
        </div>
       </div>
    </div>
  );
}
