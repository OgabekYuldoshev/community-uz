import React from "react";
import type { TaskType } from "../stores/task";

export type TaskProps = {
	task: TaskType;
};
export function Task({ task }: TaskProps) {
	return (
		<div className="block p-2 bg-secondary rounded">
			<p className="text-sm break-words overflow-hidden">{task.title}</p>
		</div>
	);
}
