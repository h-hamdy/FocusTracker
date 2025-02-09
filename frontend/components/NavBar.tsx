"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { BarChart } from "@geist-ui/icons";
import { Settings } from "@geist-ui/icons";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();
  const [loggedIn, _setIsLogged] = useState(false);

  return (
    <nav className="py-4">
      <div className="flex items-center text-semibold   shadow-sm h-[55px] border-[1px] border-red justify-between rounded-[100px] px-5">
        <div
          onClick={() => redirect("/")}
          className="text-black flex items-center font-extrabold text-lg cursor-pointer"
        >
          <img className="w-[40px]" src="/images.png"></img>
          FocusTracker
        </div>
        <div className="flex gap-2 items-center">
          <Button
            onClick={() => redirect("/reports")}
            variant="ghost"
            className={`flex gap-1 items-center text-sm font-semibold cursor-pointer ${
              pathname === "/reports" ? "bg-gray-100 text-black" : "text-black"
            }`}
          >
            <BarChart size={18} />
            Reports
          </Button>
          <Button
            onClick={() => redirect("settings")}
            variant="ghost"
            className={`flex gap-1 items-center text-sm font-semibold cursor-pointer ${
              pathname === "/settings" ? "bg-gray-100 text-black" : "text-black"
            }`}
          >
            <Settings size={16} />
            Settings
          </Button>
          {loggedIn ? (
            <img
              className=" w-[40px] h-[40px] object-center rounded-full"
              src="/profile.png"
            ></img>
          ) : (
            <Button
              onClick={() => redirect("/auth/signup")}
              variant="outline"
              className="text-black font-semibold rounded-[100px] shadow-sm bg-white hover:bg-gray-50"
            >
              Sign up
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
