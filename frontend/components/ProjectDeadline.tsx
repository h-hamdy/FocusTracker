"use client";

import axios from "axios";
import { Clock } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function ProjectDeadline() {
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchDeadline = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3002/user/getDeadline",
          { withCredentials: true }
        );
        console.log(" response data = " + response.data);
        setEndDate(new Date(response.data));
      } catch (error) {
        console.error("Error fetching deadline:", error);
      }
    };

    fetchDeadline();
  }, []);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeLeft = () => {
    if (!endDate) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

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

  useEffect(() => {
    if (endDate) {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [endDate]);
  return (
    <div className="md:w-1/2 w-full relative flex flex-col items-center h-[300px] p-5 rounded-xl border shadow-sm">
      <div className="font-semibold text-lg pb-[70px]">Project Deadline</div>
      <div className="font-extrabold text-[45px]">
        {String(timeLeft?.days).padStart(2, "0")} :{" "}
        {String(timeLeft?.hours).padStart(2, "0")} :{" "}
        {String(timeLeft?.minutes).padStart(2, "0")} :{" "}
        {String(timeLeft?.seconds).padStart(2, "0")}
      </div>
      <div className="flex items-center absolute bottom-6 space-x-2 text-sm text-gray-500">
        <Clock className="h-4 w-4" />
        <p>
          From {new Date().toLocaleDateString("en-US")} to{" "}
          {endDate?.toLocaleDateString("en-US")}
        </p>
      </div>
    </div>
  );
}
