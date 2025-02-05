"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { newListFormSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useListStore } from "../stores/list";
import { uid } from "radash";

export default function AddNewList() {
  return (
    <div className="w-[200px] flex-shrink-0">
      <ListForm />
    </div>
  );
}

type FormValue = z.infer<typeof newListFormSchema>;
function ListForm() {
  const addList = useListStore((state) => state.addList);

  const form = useForm<FormValue>({
    resolver: zodResolver(newListFormSchema),
    defaultValues: {
      title: "",
    },
  });

  function onSubmit(value: FormValue) {
    addList({
      id: uid(8),
      title: value.title,
    });

    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter list name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
