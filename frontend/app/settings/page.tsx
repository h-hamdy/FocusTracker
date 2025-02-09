"use client";

import * as React from "react";

import SetDeadline from "@/components/SetDeadline";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";

export default function ProfilePictureUpload() {

	const [focusTime, setFocusTime] = useState<string>("")
	const [shortBreakTime, setShortBreakTime] = useState<string>("")
	const [longBreakTime, setLongBreakTime] = useState<string>("")
  
	const handleInputChange =
	  (setter: React.Dispatch<React.SetStateAction<string>>, maxValue: number) =>
	  (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		if (value === "" || (Number(value) >= 0 && Number(value) <= maxValue)) {
		  setter(value)
		}
	  }
  
	const handleSubmit = async (type: "focus" | "shortBreak" | "longBreak") => {
	  const endpoint =
		type === "focus"
		  ? "http://localhost:3002/user/updatePomodoroTime"
		  : type === "shortBreak"
		  ? "http://localhost:3002/user/updateShortBreakTime"
		  : "http://localhost:3002/user/updateLongBreakTime"
  
	  const timeValue =
		type === "focus" ? focusTime : type === "shortBreak" ? shortBreakTime : longBreakTime
  
	  try {
		await axios.post(endpoint, { time: Number(timeValue) }, { withCredentials: true })
		alert(`${type} time updated successfully!`)
	  } catch (error) {
		console.error(`Error updating ${type} time:`, error)
		alert(`Failed to update ${type} time.`)
	  }
	}
  return (
    <div className="flex flex-col items-center  justify-center pt-10 gap-16">
      <div className="w-1/2">
      <div className="flex flex-col">
        <div className="text-lg flex items-center justify-center font-semibold pb-5">
          Set your Pomodoros Times
        </div>
        <div className="flex flex-col gap-2 w-full max-w-sm items-center space-x-2">
			<div className="flex gap-2 w-full">
 
          <Input
            type="number"
            placeholder="1 - 60 mininute"
            value={focusTime}
            onChange={handleInputChange(setFocusTime, 60)}
            max={60}
			/>
		  <Button onClick={() => handleSubmit("focus")} className="w-full" type="submit" disabled={!focusTime}>
            Set Focus Time
          </Button>
			</div>
			<div className="flex gap-2 w-full">

          <Input
            type="number"
			placeholder="1 - 10 mininute"
            value={shortBreakTime}
            onChange={handleInputChange(setShortBreakTime, 10)}
            max={10}

			/>
		  <Button onClick={() => handleSubmit("shortBreak")} className="w-full" type="submit" disabled={!shortBreakTime}>
            Set Short Break
          </Button>
			</div>
			<div className="flex gap-2 w-full">
          <Input
            type="number"
			placeholder="1 - 30 mininute"
            value={longBreakTime}
            onChange={handleInputChange(setLongBreakTime, 30)}
            max={30}
			min={1}

			/>
			<Button onClick={() => handleSubmit("longBreak")} className="w-full" type="submit" disabled={!longBreakTime}>
            Set Long Break
          </Button>
			</div>
          
        </div>
      </div>
    </div>
      <div className="w-1/2">
        <SetDeadline />
      </div>
    </div>
  );
}
