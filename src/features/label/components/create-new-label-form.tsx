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
import React from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { createNewLabelSchema } from "../schema";

const formSchema = createNewLabelSchema.omit({ boardId: true });

type FormValue = z.infer<typeof formSchema>;

export default function CreateNewLabelForm() {
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
		},
	});

	function onSubmit(values: FormValue) {
		console.log(values);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="Enter your email" type="email" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
}
