"use client";

import { Button } from "@/components/ui/button";
import {
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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "@radix-ui/react-dialog";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, type PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { createNewProjectAction } from "../action";
import { projectFormSchema } from "../schema";

type FormValue = z.infer<typeof projectFormSchema>;

export type CreateNewProjectFormProps = PropsWithChildren;
export function CreateNewProjectForm({ children }: CreateNewProjectFormProps) {
	const [open, setOpen] = useState(false);
	const router = useRouter();

	const form = useForm<FormValue>({
		resolver: zodResolver(projectFormSchema),
		defaultValues: {
			name: "",
			description: "",
		},
	});

	async function onSubmit(values: FormValue) {
		const [_, error] = await createNewProjectAction(values);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success("Project created successfully");
		setOpen(false);
		router.refresh();
		form.reset();
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="w-full max-w-[400px]">
				<DialogHeader>
					<DialogTitle>Create new project</DialogTitle>
					<DialogDescription>
						Create new project easily and quickly
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="grid grid0-cols-1 gap-4"
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Project name</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea cols={6} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							disabled={form.formState.isSubmitting}
							type="submit"
							className="w-fit ml-auto"
						>
							{form.formState.isSubmitting && (
								<Loader2 className="animate-spin" />
							)}
							Submit
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
