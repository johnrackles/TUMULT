"use client";

import { badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Loader2, Plus, XCircle } from "lucide-react";
import { startTransition, useRef, useState, type SyntheticEvent } from "react";
import { z } from "zod";
import { deleteFloor, editFloor } from "./actions";

export const editFloorSchema = z.object({
  name: z.string(),
  locationId: z.number(),
});

export function EditFloorsForm({
  id,
  floors,
}: {
  id: number;
  floors: { id: number; name: string }[];
}) {
  const [isLoading, setIsLoading] = useState(false);
  const floorInputRef = useRef<HTMLInputElement>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleAddFloor = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setApiError(null);
    setIsLoading(true);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    startTransition(async () => {
      const floorName = floorInputRef.current?.value;
      if (floorName) {
        const error = await editFloor({
          locationId: id,
          name: floorName,
        });

        if (error) {
          setApiError(error.error);
        }
        setIsLoading(false);
        floorInputRef.current.value = "";
      }
    });
  };

  const handleDeleteFloor = (id: number) => {
    setApiError(null);
    setIsLoading(true);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    startTransition(async () => {
      const error = await deleteFloor(id);

      if (error) {
        setApiError(error.error);
      }

      setIsLoading(false);
    });
  };

  return (
    <>
      <FormItem>
        <FormLabel>Floors</FormLabel>
        <ul className="flex space-x-2">
          {floors?.map((item) => (
            <li key={item.id}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      className={cn(
                        badgeVariants({ variant: "secondary" }),
                        "group h-auto transition-colors hover:bg-primary",
                      )}
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteFloor(item.id);
                      }}
                    >
                      {item.name}{" "}
                      {isLoading ? (
                        <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                      ) : (
                        <XCircle className="ml-2 hidden h-4 w-4 group-hover:block" />
                      )}
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
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : <Plus />}
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
      {apiError ? <FormMessage>{apiError}</FormMessage> : null}
    </>
  );
}
