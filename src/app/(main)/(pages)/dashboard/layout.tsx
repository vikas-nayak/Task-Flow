import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";
// import { ThemeProvider } from "@/providers/theme.provider";
import { DM_Sans } from "next/font/google";
import Sidebar from "@/components/global/sidebar";
import Navbar from "@/components/global/navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Topbar from "@/components/global/topbar";


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
      <Topbar heading="Dashboard" />
      <div className="w-full grid grid-cols-6">
        <div className="col-span-1">
          <Sidebar />
        </div>
        <div className="w-full col-span-5">
          <ScrollArea className="h-full w-full">{children}</ScrollArea>
        </div>
      </div>
    </div>
  );
}
