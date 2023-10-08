"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { editArtistSchema } from "@/db/party/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Pen, Save } from "lucide-react";
import { startTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { editArtist } from "./actions";

export function EditArtistForm({
  initialValues,
}: {
  initialValues: z.infer<typeof editArtistSchema>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setIsOpen] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof editArtistSchema>>({
    resolver: zodResolver(editArtistSchema),
    defaultValues: initialValues,
  });

  function onSubmit(values: z.infer<typeof editArtistSchema>) {
    form.clearErrors();
    setIsLoading(true);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    startTransition(async () => {
      const error = await editArtist(values);
      if (error) {
        setApiError(error.error);
      }
      setIsOpen(false);
      setIsLoading(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Pen className="h-4 w-4" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit Artist</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="max-w-lg">
        <Form {...form}>
          <form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={form.handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <DialogHeader>
              <DialogTitle>Add new Artist</DialogTitle>
            </DialogHeader>
            <div className="my-4 space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {apiError ? <FormMessage>{apiError}</FormMessage> : null}
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
