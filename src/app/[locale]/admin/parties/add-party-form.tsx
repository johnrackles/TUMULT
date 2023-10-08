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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { insertPartySchema } from "@/db/party/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PlusCircle, Save } from "lucide-react";
import { startTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { addParty } from "./actions";

export function AddPartyForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof insertPartySchema>>({
    resolver: zodResolver(insertPartySchema),
    defaultValues: {
      name: "TUMULT",
      location: undefined,
      begin: undefined,
      end: undefined,
      artists: [],
    },
  });

  function onSubmit(values: z.infer<typeof insertPartySchema>) {
    form.clearErrors();
    setIsLoading(true);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    startTransition(async () => {
      const error = await addParty(values);
      if (error) {
        setApiError(error.error);
      }
      setIsLoading(false);
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add new party
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <Form {...form}>
          <form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={form.handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <DialogHeader>
              <DialogTitle>Add new party</DialogTitle>
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
              <Button type="submit">
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
