import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useOnClickOutside } from "usehooks-ts";
import type { z } from "zod";
import { taskFormSchema } from "../schema";
import type { StatusInferType } from "../type";

export type StatusCardProps = {
	item: StatusInferType[number];
};
export function StatusCard({ item }: StatusCardProps) {
	return (
		<div className="relative bg-sidebar border w-[275px] px-3 py-2 rounded-md whitespace-normal break-words flex flex-col box-border max-h-full">
			<div className="border-b pb-2 flex-grow-0 ">
				<h2 className="text-sm font-bold">{item.name}</h2>
			</div>
			<div className="flex-1 flex flex-col overflow-x-hidden overflow-y-auto scrollbar-thumb-border scrollbar-track-transparent scrollbar-thumb-rounded scrollbar-thin">
				<div>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi, ipsa?
				</div>
				<div>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi, ipsa?
				</div>
			</div>
			<div className="block pt-2 border-t">
				<CreateNewTaskForm />
			</div>
		</div>
	);
}

type FormValue = z.infer<typeof taskFormSchema>;
function CreateNewTaskForm() {
	const [open, setOpen] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);
	const form = useForm<FormValue>({
		resolver: zodResolver(taskFormSchema),
		defaultValues: {
			name: "",
		},
	});

	function onSubmit(values: FormValue) {
		console.log(values);
	}

	useOnClickOutside(formRef as any, () => {
		setOpen(false);
		form.reset();
	});

	if (!open) {
		return (
			<button
				onClick={() => setOpen(true)}
				type="button"
				className="h-9 border border-dashed px-2 rounded flex items-center justify-center hover:ring transition-all w-full"
				title="Add new task"
			>
				<Plus size={18} />
			</button>
		);
	}

	return (
		<Form {...form}>
			<form ref={formRef} onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									autoFocus
									placeholder="Hit 'Enter' to add a new task"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
}
