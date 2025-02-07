import React from "react";
import { type CustomTaskType, useTaskStore } from "../stores/task-store";

export type TaskCardProps = {
	task: CustomTaskType;
};
export function TaskCard({ task }: TaskCardProps) {
	const setCurrentTaskId = useTaskStore((state) => state.setCurrentTaskId);

	return (
		<div
			onClick={() => setCurrentTaskId(task.id)}
			onKeyUp={() => setCurrentTaskId(task.id)}
			className="relative p-2 bg-secondary rounded hover:ring transition-all cursor-pointer"
		>
			<h3 className="font-semibold text-sm">{task.title}</h3>
		</div>
	);
}
