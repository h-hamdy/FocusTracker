"use client";

import React, { useEffect, useRef, useState } from "react";
import { Coffee, Pause, Play, RotateCcw } from "@geist-ui/icons";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import axios from "axios";

const POMODORO_TIMER = 25 * 60;
export default function FocusTime() {
	
	const [timeLeft, setTimeLeft] = useState(POMODORO_TIMER);
	const [isActive, setIsActive] = useState(false);
  const [currentMode, setCurrentMode] = useState<
    "work" | "shortBreak" | "longBreak"
	>("work");

	
  const [pomodoroTime, setPomodoroTime] = useState(0);
const [shortBreakTime, setShortBreakTime] = useState(0);
const [longBreakTime, setLongBreakTime] = useState(0);
const [longBreakInterval, setLongBreakInterval] = useState(4);

useEffect(() => {
	const fetchPomodoroSettings = async () => {
	  try {
		const response = await axios.get("http://localhost:3002/user/GetPomodoros", {
		  withCredentials: true,
		});
  
		if (response.data) {
		  setPomodoroTime((response.data.pomodoroTime ?? 25) * 60);
		  setShortBreakTime((response.data.shortBreakTime ?? 5) * 60);
		  setLongBreakTime((response.data.longBreakTime ?? 15) * 60);
		  setLongBreakInterval(response.data.longBreakInterval ?? 4);
		  setTimeLeft((response.data.pomodoroTime ?? 25) * 60);
		}
	  } catch (error) {
		console.error("Error fetching Pomodoro settings:", error);
	  }
	};
  
	fetchPomodoroSettings();
  }, []);
  


  const [sessions, setSessions] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeLeft === 0) {
      if (currentMode === "work") {
        setSessions((prev) => prev + 1);
        if (sessions > 0 && sessions % longBreakInterval === 0) {
          setCurrentMode("longBreak");
          setTimeLeft(longBreakTime);
        } else {
          setCurrentMode("shortBreak");
          setTimeLeft(shortBreakTime);
        }
      } else {
        setCurrentMode("work");
        setTimeLeft(pomodoroTime);
      }
      setIsActive(false);
    }
  }, [timeLeft, currentMode, sessions]);

  const toggleTimer = () => {
    setIsActive(!isActive);
    if (!isActive) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsActive(false);
    setCurrentMode("work");
    setTimeLeft(pomodoroTime);
    setSessions(0);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const getProgress = () => {
    switch (currentMode) {
      case "work":
        return ((pomodoroTime - timeLeft) / pomodoroTime) * 100;
      case "shortBreak":
        return ((shortBreakTime - timeLeft) / shortBreakTime) * 100;
      case "longBreak":
        return ((longBreakTime - timeLeft) / longBreakTime) * 100;
    }
  };

  return (
    <div className="md:w-1/2 w-full flex flex-col h-[300px] p-5 rounded-xl border shadow-sm">
      <div className="text-2xl font-bold text-center">
        <div className="font-semibold text-lg pb-5">
          {currentMode === "work"
            ? "Focus Time"
            : currentMode === "shortBreak"
            ? "Short Break"
            : "Long Break"}
        </div>
      </div>
      <div className="flex flex-col items-center space-y-6">
        <div className="text-6xl font-bold">{formatTime(timeLeft)}</div>
        <Progress value={getProgress()} className="w-full h-2" />
        <div className="flex space-x-4">
          <Button
            onClick={toggleTimer}
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
          <Button
            onClick={resetTimer}
            variant="outline"
            size="icon"
            className="w-12 h-12 rounded-full"
          >
            <RotateCcw className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
           <Coffee className="h-4 w-4" />
           <span>Sessions: {sessions}</span>
         </div>
      </div>
    </div>
  );
}
