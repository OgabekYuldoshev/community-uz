"use client";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { uid } from "radash";
import React from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { newListFormSchema } from "../schema";
import { useListStore } from "../stores/list";

export default function AddNewList() {
	return (
		<li className="block self-start h-full flex-shrink-0">
			<div className="border p-2 w-[200px]">
				<ListForm />
			</div>
		</li>
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
