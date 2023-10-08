import { badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type insertLocationsSchema } from "@/db/party/schema";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Plus } from "lucide-react";
import { useRef, type SyntheticEvent } from "react";
import { useFormContext } from "react-hook-form";
import { type z } from "zod";

export function FloorsInput() {
  const form = useFormContext<z.infer<typeof insertLocationsSchema>>();
  const floorInputRef = useRef<HTMLInputElement>(null);
  const handleAddFloor = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (floorInputRef.current?.value) {
      const floorsValue = form.getValues().floors ?? [];
      const newValue = floorInputRef.current?.value;
      floorsValue.push(newValue);
      form.setValue("floors", floorsValue);
      floorInputRef.current.value = "";
    } else {
      form.setError("floors", {
        message: "Please enter a floor",
        type: "manual",
      });
    }
  };

  return (
    <FormField
      control={form.control}
      name="floors"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Floors</FormLabel>
          <ul className="flex space-x-2">
            {field.value?.map((item) => (
              <li key={item}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        className={cn(
                          badgeVariants({ variant: "secondary" }),
                          "h-auto",
                        )}
                        onClick={() => {
                          // on click removes the floor from the list
                          const floorsValue = form.getValues().floors ?? [];
                          const index = floorsValue.indexOf(item);

                          if (index > -1) {
                            floorsValue.splice(index, 1);
                            form.setValue("floors", floorsValue);
                          }
                        }}
                      >
                        {item}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Remove floor</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
            ))}
          </ul>
          <div className="flex w-full items-center space-x-2">
            <Input ref={floorInputRef} />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddFloor}
                  >
                    <Plus />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add floor</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
