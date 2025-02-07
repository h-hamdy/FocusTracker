import React from 'react'
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function SetDeadline() {
	const [date, setDate] = React.useState<Date>()

  return (
	<div className="flex flex-col ">
	<div className="text-lg flex items-center justify-center font-semibold pb-5">
	  Set your Deadline Date
	</div>
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
  <PopoverContent className="w-auto p-0" align="center">
	<Calendar
	  mode="single"
	  selected={date}
	  onSelect={setDate}
	  initialFocus
	/>
  </PopoverContent>
</Popover>
  </div>
  )
}
