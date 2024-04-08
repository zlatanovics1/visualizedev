import Header from "@/components/ui/chat/Header";
import Sidebar from "@/components/ui/chat/Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Develop & Visualize | Global chat",
  description:
    "Take a place in building worldwise community using our global chat, visible to all users.",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-dvh grid grid-cols-1  md:grid-cols-[16rem,1fr] grid-rows-[5rem,1fr]">
      <Sidebar />
      <Header />
      <main className="overflow-y-scroll  bg-gray-100">{children}</main>
    </div>
  );
}
