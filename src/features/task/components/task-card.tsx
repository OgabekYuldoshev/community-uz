import React from "react";
import type { CustomTaskType } from "../stores/task-store";

export type TaskCardProps = {
	task: CustomTaskType;
};
export function TaskCard({ task }: TaskCardProps) {
	return (
		<div className="relative p-2 bg-secondary rounded hover:ring transition-all cursor-pointer">
			<h3 className="font-semibold text-sm">{task.title}</h3>
		</div>
	);
}
