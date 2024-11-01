import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme.provider";
import { DM_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { FlowProvider } from "@/providers/flow-provider";
import { Toaster } from "sonner";
import NextTopLoader from 'nextjs-toploader';
import ResponsiveWarning from "@/components/global/responsive-warning";


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
      <ResponsiveWarning/>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <FlowProvider>
                {children}
                <NextTopLoader 
               color="#FFFFFF"
               initialPosition={0.08}
               crawlSpeed={200}
               height={3}
               crawl={true}
               showSpinner={false}
               easing="ease"
               speed={200}
               shadow="0 0 10px #2299DD,0 0 5px #2299DD"
               template='<div class="bar" role="bar"><div class="peg"></div></div> 
               <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
               zIndex={1600}
               showAtBottom={false}/>
                <Toaster richColors expand={true} position="bottom-left"/>
            </FlowProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
