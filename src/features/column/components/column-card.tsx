"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CreateNewTaskForm from "@/features/task/components/create-new-task-form";
import { TaskCard } from "@/features/task/components/task-card";
import { useTaskStore } from "@/features/task/stores/task-store";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import React, { useCallback } from "react";
import type { CustomColumnType } from "../stores/column-store";

export type ColumnCardProps = {
	column: CustomColumnType;
};
export function ColumnCard({ column }: ColumnCardProps) {
	const {
		setNodeRef,
		transform,
		transition,
		attributes,
		listeners,
		isDragging,
	} = useSortable({
		id: column.id,
		data: {
			type: "COLUMN",
		},
	});

	const tasksList = useTaskStore((state) => state.tasks);

	const getTasksByColumnId = useCallback(
		(columnId: string) => {
			return tasksList.filter((task) => task.columnId === columnId);
		},
		[tasksList],
	);

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	const tasks = getTasksByColumnId(column.id);

	return (
		<li
			ref={setNodeRef}
			style={style}
			className={cn(
				"block self-start h-full flex-shrink-0",
				isDragging && "z-50",
			)}
		>
			<div className="w-[275px]">
				<div className="p-2 h-12 rounded bg-secondary flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Button
							size="icon"
							className={cn(
								"size-6",
								isDragging ? "cursor-grabbing" : "cursor-grab",
							)}
							variant="ghost"
							{...attributes}
							{...listeners}
						>
							<GripVertical />
						</Button>
						<span className="text-sm font-semibold">
							{column.title}
							<Badge className="ml-2">{tasks.length}</Badge>
						</span>
					</div>
				</div>
				<ul className="mt-4 h-full flex flex-col gap-2">
					{tasks.map((task) => (
						<TaskCard key={task.id} task={task} />
					))}
					<CreateNewTaskForm columnId={column.id} />
				</ul>
			</div>
		</li>
	);
}
