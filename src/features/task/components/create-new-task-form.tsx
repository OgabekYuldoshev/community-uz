"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CircleCheck, Plus, X } from "lucide-react";
import type React from "react";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { useTaskStore } from "../stores/task-store";
export type CreateNewTaskFormProps = {
	columnId: string;
};
export default function CreateNewTaskForm({
	columnId,
}: CreateNewTaskFormProps) {
	const [isEditable, setEditable] = useState(false);
	const containerRef = useRef<HTMLLIElement>(null);
	const createNewTask = useTaskStore((state) => state.createNewTask);

	useOnClickOutside(containerRef as any, () => setEditable(false));
	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const form = new FormData(e.currentTarget);
		const title = form.get("title")?.toString() || "";
		if (title === "") return;

		createNewTask({
			title,
			columnId,
		});

		setEditable(false);
	}

	function onToggleView() {
		if (isEditable) return;

		setEditable(true);
	}

	return (
		<li
			ref={containerRef}
			onClick={onToggleView}
			onKeyUp={onToggleView}
			className={cn(
				"p-2 border border-dashed rounded hover:ring transition-all",
				!isEditable ? "cursor-pointer" : "ring",
			)}
		>
			{isEditable ? (
				<form onSubmit={onSubmit} className="flex flex-col gap-2">
					<Input autoFocus name="title" placeholder="Enter task title" />
					<div className="flex flex-1 gap-2">
						<Button type="submit" className="w-fit">
							<CircleCheck />
							<span>Create task</span>
						</Button>
						<Button
							onClick={() => setEditable(false)}
							size="icon"
							type="button"
							variant="ghost"
							className="flex-shrink-0"
						>
							<X />
						</Button>
					</div>
				</form>
			) : (
				<div className="flex items-center gap-2">
					<Plus size={20} />
					<span className="text-sm">Add new task</span>
				</div>
			)}
		</li>
	);
}
