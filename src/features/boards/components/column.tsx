import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GripVertical } from "lucide-react";
import React, { useCallback } from "react";
import type { ColumnType } from "../stores/column";
import { useTaskStore } from "../stores/task";
import { CreateNewTask } from "./create-new-task";
import { Task } from "./task";

export type ColumnProps = {
	column: ColumnType;
};
export function Column({ column }: ColumnProps) {
	const tasks = useTaskStore((state) => state.tasks);

	const getTasksByColumnId = useCallback(
		(columnId: string) => {
			return tasks.filter((task) => task.columnId === columnId);
		},
		[tasks],
	);

	const taskList = getTasksByColumnId(column.id);

	return (
		<li className="block self-start h-full flex-shrink-0">
			<div className="w-[275px]">
				<div className="p-2  h-12 rounded bg-secondary flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Button size="icon" className="size-6" variant="ghost">
							<GripVertical />
						</Button>
						<span className="text-sm font-semibold">
							{column.title}
							<Badge className="ml-2">{taskList.length}</Badge>
						</span>
					</div>
					<CreateNewTask columnId={column.id} />
				</div>
				<div className="grid grid-cols-1 gap-2 mt-4">
					{taskList.map((task) => (
						<Task key={task.id} task={task} />
					))}
				</div>
			</div>
		</li>
	);
}
