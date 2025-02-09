import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";

export default function SetDeadline() {
  const [date, setDate] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false)


  const setDeadline = async () => {
    if (!date) return

    setIsSubmitting(true)
    try {
      const endDate = date.toISOString()
      await axios.post(
        "http://localhost:3002/user/setDeadline",
        { endDate },
        { withCredentials: true },
      )
    } catch (error) {
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col ">
      <div className="text-lg flex items-center justify-center font-semibold pb-5">
        Set your Deadline Date
      </div>
			<div className="flex gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="">

          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
	  <Button onClick={setDeadline} className="w-full" type="submit" disabled={!date || isSubmitting}>
          {isSubmitting ? "Setting..." : "Set Your Deadline"}
        </Button>
			</div>
    </div>
  );
}
