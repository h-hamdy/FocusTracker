"use client";

import React, { useState } from "react";
import { BarChart, Clock, Pause, Play } from "@geist-ui/icons";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export default function FocusTime() {
  const [isActive, setIsActive] = useState(false);

  return (
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
  );
}
