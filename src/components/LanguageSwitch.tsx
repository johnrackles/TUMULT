"use client";

import { cn } from "@/lib/utils";
import { useChangeLocale } from "@/locales/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function LanguageSwtich({
  className,
  values,
  placeholder,
  locale,
}: {
  className?: string;
  values: { name: string; value: string }[];
  placeholder: string;
  locale: string;
}) {
  const changeLocale = useChangeLocale();

  return (
    <Select onValueChange={(val) => changeLocale(val as "en" | "de")} defaultValue={locale}>
      <SelectTrigger
        className={cn("w-[180px] bg-transparent", className)}
        aria-label="Select Language"
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {values.map((value) => (
          <SelectItem key={value.value} value={value.value}>
            {value.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
