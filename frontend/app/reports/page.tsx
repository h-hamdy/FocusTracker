"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { month: "January", desktop: 0 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
	desktop: {
	  label: "Desktop",
	  color: "hsl(var(--chart-1))",
	},
	mobile: {
	  label: "Mobile",
	  color: "hsl(var(--chart-2))",
	},
  } satisfies ChartConfig

export default function Reports() {
  return (
	<>
	<div className="text-2xl flex items-center justify-center p-5 pb-[50px] w-full font-semibold">
  Reports Overview
</div>

    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Multiple</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={5}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
			  />
            <Bar dataKey="desktop" fill="gray" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
			  </>
  )
}

