"use client";
import SideNavbar from "@/app/components/side-navbar";
import { useState } from "react";
import ChatSection from "./components/chat-section";

export default function Home() {
  const [tabValue, setTabValue] = useState("chat");

  // if (isLoading) return (
  //     <div className="font-[sans-serif] bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D] to-[#0D0D0D] text-gray-800">
  //         <div className="min-h-screen flex items-center justify-center">
  //             Loading...
  //         </div>
  //     </div>
  // );
  return (
    <div className="lg:flex h-screen background-gradient">
      <div
        id="sidebar"
        className="lg:block hidden bg-white w-72 h-screen fixed rounded-none border-none"
      >
        <SideNavbar setTabValue={setTabValue} tabValue={tabValue} />
      </div>
      <ChatSection tabValue={tabValue} />
    </div>
  );
}
