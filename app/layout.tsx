import { ReactNode } from "react";
import "./globals.css";
import localFont from "next/font/local";
import DarkModeProvider from "@/context/DarkModeProvider";
import { Toaster } from "react-hot-toast";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import { Metadata, Viewport } from "next";
import ReduxStoreProvider from "@/components/providers/ReduxStoreProvider";

const interVar = localFont({ src: "../Inter-roman-latin.var.18496762.woff2" });

export const metadata: Metadata = {
  title: "Develop & Visualize",
  description:
    "Learn and visualize basic data structures and algorithms, chat with other developers, and establish longlasting connections.",
  keywords:
    "data structures and algorithms, chat, visualization, social media, coding",
};
export const viewport: Viewport = {
  themeColor: "#18212f",
};
export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-us">
      <head></head>
      <body
        className={`${interVar.className} text-gray-700 h-dvh bg-gray-50 dark`}
      >
        <ReactQueryProvider>
          <ReduxStoreProvider>
            <DarkModeProvider>
              <Toaster
                position="top-center"
                reverseOrder={false}
                toastOptions={{
                  duration: 3000,
                  style: {
                    background: "#1f2937",
                    color: "#fff",
                    padding: 20,
                    gap: 10,
                  },
                }}
              />
              {children}
            </DarkModeProvider>
          </ReduxStoreProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
