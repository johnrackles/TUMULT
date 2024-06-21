"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { insertPartySchema } from "@/db/party/schema";
import { UploadDropzone } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { CalendarIcon, Loader2, PlusCircle, Save, XCircle } from "lucide-react";
import { type Session } from "next-auth";
import Image from "next/image";
import { startTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { type ClientUploadedFileData } from "uploadthing/types";
import { type z } from "zod";
import { addParty, deleteImage } from "./actions";

dayjs.extend(LocalizedFormat);

export function AddPartyForm({ userId }: { userId: Session["user"]["id"] }) {
  const [flyer, setFlyer] = useState<ClientUploadedFileData<null>>();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof insertPartySchema>>({
    resolver: zodResolver(insertPartySchema),
    defaultValues: {
      name: "TUMULT",
      slug: "",
      location: undefined,
      begin: undefined,
      beginTime: "23:00",
      end: undefined,
      endTime: "10:00",
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
                    <FormLabel>Name*</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug*</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>Flyer</FormLabel>
                {flyer?.url ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          className="group relative block h-[100px] w-20"
                          type="button"
                          variant="outline"
                          disabled={isLoading}
                          onClick={() => {
                            setIsLoading(true);
                            setFlyer(undefined);
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            startTransition(async () => {
                              await deleteImage({ id: flyer.key });
                              setFlyer(undefined);
                              setIsLoading(false);
                            });
                          }}
                        >
                          <Image src={flyer.url} alt="flyer" fill sizes="80px" />
                          <XCircle className="absolute right-1 top-1 hidden group-hover:block" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-destructive text-destructive-foreground">
                        <p>Delete Image</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <UploadDropzone
                    className="ut-button:bg-primary ut-label:text-primary"
                    endpoint="imageUploader"
                    input={{ id: userId }}
                    onClientUploadComplete={(res) => {
                      if (res) {
                        const file = res[0];
                        setFlyer(file);
                      }
                    }}
                    onUploadError={(err) => {
                      console.error(err);
                    }}
                  />
                )}
                {flyer?.key ? (
                  <FormDescription>To upload different image, click on thumbnail</FormDescription>
                ) : null}
                <FormMessage />
              </FormItem>
              <FormField
                control={form.control}
                name="begin"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-[auto,1fr] gap-x-2 space-y-0">
                    <div className="flex flex-col space-y-2">
                      <FormLabel>Date*</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              type="button"
                              variant="outline"
                              className={cn(
                                "col-start-1 row-start-2 w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription className="row-start-3">
                        Start time of the party
                      </FormDescription>
                    </div>
                    <FormField
                      control={form.control}
                      name="beginTime"
                      render={({ field }) => (
                        <FormItem className="col-start-2 row-start-1 flex flex-col">
                          <FormLabel>Start Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="end"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-[auto,1fr] gap-x-2 space-y-0">
                    <div className="flex flex-col space-y-2">
                      <FormLabel>End</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              type="button"
                              variant="outline"
                              className={cn(
                                "col-start-1 row-start-2 w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription className="row-start-3">
                        End time of the party
                      </FormDescription>
                    </div>
                    <FormField
                      control={form.control}
                      name="endTime"
                      render={({ field }) => (
                        <FormItem className="col-start-2 row-start-1 flex flex-col">
                          <FormLabel>End Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormMessage />
                  </FormItem>
                )}
              />
              {Object.keys(form.formState.errors).length > 0 ? (
                <FormMessage>{JSON.stringify(form.formState.errors)}</FormMessage>
              ) : null}
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
