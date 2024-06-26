import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "EnderMeet",
  description: "Enderman Efficient Video Conferencing Platform",
};

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <section className="flex flex-1 min-h-screen flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
          <div className="w-full">{children}</div>
        </section>
      </div>
      <div className="flex flex-center flex-col text-sm gap-2 text-white">
        <p>
          All rights reserved.
        </p>
        <p>
          Mader with ❤️ by Srinjay
        </p>
        
      </div>
    </main>
  );
};

export default HomeLayout;
