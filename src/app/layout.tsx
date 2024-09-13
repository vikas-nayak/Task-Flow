import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme.provider";
import { DM_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { FlowProvider } from "@/providers/flow-provider";
import { ToastProvider } from "@/components/ui/toast"; // Import ToastProvider
import { Toast } from "@/components/ui/toast"; // Import the Toast component
import { Toaster } from "@/components/ui/toaster";

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
            <FlowProvider>
              <ToastProvider>
                {children}
                <Toast />
              </ToastProvider>
            </FlowProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
