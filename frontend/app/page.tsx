"use client";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { BarChart, Clock, Pause, Play } from "@geist-ui/icons";
import { Settings } from "@geist-ui/icons";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

export default function Home() {
  const [isActive, setIsActive] = useState(false);

  const endDate = new Date("2025-04-25T23:59:59");

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = endDate.getTime() - now.getTime();

    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br">
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 xl:px-32">
        {" "}
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
        <div className="text-2xl flex items-center justify-center p-5 w-full font-semibold">
          Welcome to FocusTracker
        </div>
        <main className="py-8 flex md:flex-row flex-col  gap-3 asfasdf">
          <div className="md:w-1/2 w-full flex flex-col h-[300px] p-5 rounded-xl border shadow-sm">
            <div className="text-2xl font-bold text-center">
              <div className="font-semibold text-lg pb-5">Focus Time</div>
            </div>
            <div className="flex flex-col items-center space-y-6">
              <div className="text-6xl font-bold">24 : 00</div>
              <Progress value={50} className="w-full h-2" />
              <div className="flex space-x-4">
                <Button
                  onClick={() => setIsActive(!isActive)}
                  variant="outline"
                  size="icon"
                  className="w-12 h-12 rounded-full"
                >
                  {isActive ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6" />
                  )}
                </Button>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>Sessions: 3</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 w-full relative flex flex-col items-center h-[300px] p-5 rounded-xl border shadow-sm">
            <div className="font-semibold text-lg pb-[70px]">
              Project Deadline
            </div>
            <div className="font-extrabold text-[45px]">
              {String(timeLeft.days).padStart(2, "0")} :{" "}
              {String(timeLeft.hours).padStart(2, "0")} :{" "}
              {String(timeLeft.minutes).padStart(2, "0")} :{" "}
              {String(timeLeft.seconds).padStart(2, "0")}
            </div>
            <div className="flex items-center absolute bottom-6 space-x-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <p>
                From {new Date().toLocaleDateString("en-US")} to{" "}
                {endDate.toLocaleDateString("en-US")}
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
