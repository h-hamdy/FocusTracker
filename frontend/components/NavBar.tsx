"use client";

import React from 'react'
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { BarChart } from "@geist-ui/icons";
import { Settings } from "@geist-ui/icons";

export default function NavBar() {
  return (
	<nav className="py-4">
          <div className="flex items-center text-semibold   shadow-sm h-[55px] border-[1px] border-red justify-between rounded-[100px] px-5">
            <div className="text-black flex items-center font-extrabold text-lg cursor-pointer">
              <img className="w-[40px]" src="/images.png"></img>
              FocusTracker
            </div>
            <div className="flex gap-2 items-center">
              <Button
                variant="ghost"
                className="flex gap-1 items-center text-sm text-black font-semibold cursor-pointer"
              >
                <BarChart size={18} />
                Reports
              </Button>
              <Button
                variant="ghost"
                className="flex gap-1 items-center text-sm text-black font-semibold cursor-pointer"
              >
                <Settings size={16} />
                Settings
              </Button>
              <Button
                onClick={() => redirect("/auth/signup")}
                variant="outline"
                className="text-black font-semibold rounded-[100px] shadow-sm bg-white hover:bg-gray-50"
              >
                Sign up
              </Button>
            </div>
          </div>
        </nav>
  )
}
