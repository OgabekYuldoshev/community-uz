"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import React, { type PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { createBoardAction } from "./action";

export function CreateNewBoard({ children }: PropsWithChildren) {
	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create board</DialogTitle>
					<DialogDescription>Please, enter board title</DialogDescription>
				</DialogHeader>
				<BoardForm />
			</DialogContent>
		</Dialog>
	);
}

const formSchema = z.object({
	title: z.string().min(3),
});
type FormValue = z.infer<typeof formSchema>;

function BoardForm() {
	const form = useForm<FormValue>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
		},
	});

	async function onSubmit(values: FormValue) {
		const result = await createBoardAction(values);

		if (result?.serverError) {
			toast.error(result?.serverError || "");
			return;
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input placeholder="Enter board title" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-fit justify-self-end">
					{form.formState.isSubmitting ? (
						<Loader2 className="animate-spin" />
					) : null}
					Create a new board
				</Button>
			</form>
		</Form>
	);
}
