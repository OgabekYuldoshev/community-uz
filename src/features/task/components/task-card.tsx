import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useLabelStore } from "@/features/label/stores/label-store";
import React from "react";
import { type CustomTaskType, useTaskStore } from "../stores/task-store";

export type TaskCardProps = {
	task: CustomTaskType;
};
export function TaskCard({ task }: TaskCardProps) {
	const setCurrentTaskId = useTaskStore((state) => state.setCurrentTaskId);
	const labels = useLabelStore((state) => state.labels);

	const setOpen = useTaskStore((state) => state.setOpen);

	function onSelectTask() {
		setOpen(true);
		setCurrentTaskId(task.id);
	}

	const currentTaskLabels = labels[task.id] || [];

	return (
		<li
			onClick={onSelectTask}
			onKeyUp={onSelectTask}
			className="relative p-2 bg-secondary rounded hover:ring transition-all cursor-pointer"
		>
			{currentTaskLabels.length > 0 && (
				<div className="flex flex-wrap mb-2 gap-1">
					{currentTaskLabels.map((label) => (
						<Badge
							style={{ backgroundColor: label.color }}
							key={label.id}
							className="text-foreground"
						>
							{label.title}
						</Badge>
					))}
				</div>
			)}
			<h3 className="font-semibold text-sm">{task.title}</h3>
		</li>
	);
}
