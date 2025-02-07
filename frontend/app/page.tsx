"use client"
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { BarChart } from '@geist-ui/icons'
import { Settings } from '@geist-ui/icons'



export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br">
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 xl:px-32">
        {" "}
        {/* Center content on xl screens */}
        <nav className="py-4">
          <div className="flex items-center text-semibold   shadow-sm h-[55px] border-[1px] border-red justify-between rounded-[100px] px-5">
            <div className="text-black flex items-center font-extrabold text-lg cursor-pointer">
				<img className="w-[40px]" src="/images.png"></img>
				FocusTracker</div>
			<div className="flex gap-2 items-center">
            <Button variant="ghost" className="flex gap-1 items-center text-sm text-black font-semibold cursor-pointer">
			<BarChart size={18}/>
				Reports
				</Button>
            <Button variant="ghost" className="flex gap-1 items-center text-sm text-black font-semibold cursor-pointer">
				<Settings size={16
				}/>
				Settings</Button>
			<Button onClick={() => redirect("/auth/signup")} variant="outline" className="text-black font-semibold rounded-[100px] shadow-sm bg-white hover:bg-gray-50">
				Sign up
			</Button>
				</div>
          </div>
        </nav>
		<div className="text-2xl flex items-center justify-center p-5 w-full font-semibold">Welcome to FocusTracker</div>
        {/* Your main content goes here */}
        <main className="py-8 flex md:flex-row flex-col  gap-3 asfasdf">
			<div className="md:w-1/2 w-full flex justify-center h-[300px] p-5 rounded-xl border shadow-sm">
				<div className="font-semibold text-lg">Focus Time</div>
			</div>
			<div className="md:w-1/2 w-full flex flex-col items-center h-[300px] p-5 rounded-xl border shadow-sm">
			<div className="font-semibold text-lg">Project Deadline</div>
			<div className="font-extrabold text-3xl">79 : 12 : 60</div>
			</div>
          {/* Add more content as needed */}
        </main>
      </div>
    </div>
  );
}
