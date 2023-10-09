"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { de } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { DayPicker, type SelectSingleEventHandler } from "react-day-picker";
import { FormItem, FormLabel } from "./form";
import { Input } from "./input";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  timePicker?: boolean;
  onSelect: SelectSingleEventHandler;
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  timePicker = false,
  onSelect,
  ...props
}: CalendarProps) {
  const [timeValue, setTimeValue] = React.useState<string>("00:00");

  const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value;
    if (!selected) {
      setTimeValue(time);
      return;
    }
    const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
    const newSelectedDate = new Date(
      selected.getFullYear(),
      selected.getMonth(),
      selected.getDate(),
      hours,
      minutes,
    );
    setSelected(newSelectedDate);
    setTimeValue(time);
  };

  const handleDaySelect: SelectSingleEventHandler = (
    date: Date | undefined,
  ) => {
    if (!timeValue || !date) {
      onSelect(date);
      return;
    }
    const [hours, minutes] = timeValue
      .split(":")
      .map((str) => parseInt(str, 10));
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes,
    );

    onSelect(newDate);
  };

  return (
    <>
      <DayPicker
        weekStartsOn={1}
        locale={de}
        showOutsideDays={showOutsideDays}
        className={cn("p-3", className)}
        classNames={{
          months:
            "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell:
            "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
          ),
          day_selected:
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_today: "bg-accent text-accent-foreground",
          day_outside: "text-muted-foreground opacity-50",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle:
            "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
          IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
        }}
        onSelect={handleDaySelect}
        {...props}
      />
      {timePicker ? (
        <FormItem>
          <FormLabel htmlFor="time">Email</FormLabel>
          <Input type="time" id="start-time" onChange={handleTimeChange} />
        </FormItem>
      ) : null}
    </>
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
