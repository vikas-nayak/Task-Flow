import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme.provider";
import { DM_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";


const inter = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TaskFlow",
  description: "Automate your workflow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
        {children}
        </ThemeProvider>
        </body>
    </html>
    </ClerkProvider>
  );
}
