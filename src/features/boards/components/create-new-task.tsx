import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Plus } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useTaskStore } from "../stores/task";

export function CreateNewTask({ columnId }: { columnId: string }) {
	const [isEditable, setEditable] = useState(false);
	const addTask = useTaskStore((state) => state.addTask);
	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const form = new FormData(e.currentTarget);
		const title = form.get("title")?.toString() || "";
		if (title === "") return;
		addTask({ title, columnId });
		setEditable(false);
	}

	return (
		<Popover onOpenChange={setEditable} open={isEditable}>
			<PopoverTrigger asChild>
				<Button size="icon" className="size-6">
					<Plus />
				</Button>
			</PopoverTrigger>
			<PopoverContent align="end">
				<form onSubmit={onSubmit} className="flex flex-col gap-2">
					<Input autoFocus name="title" placeholder="Enter task title" />
					<Button type="submit" className="w-fit ml-auto">
						<span>Create task</span>
					</Button>
				</form>
			</PopoverContent>
		</Popover>
	);
}
