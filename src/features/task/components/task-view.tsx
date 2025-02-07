"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React from "react";
import { getTaskByIdAction } from "../actions";
import { ENTITY } from "../constants";
import { useTaskStore } from "../stores/task-store";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
export function TaskView() {
	const currentTaskId = useTaskStore((state) => state.currentTaskId);
	const setCurrentTaskId = useTaskStore((state) => state.setCurrentTaskId);

	return (
		<Dialog open={!!currentTaskId} onOpenChange={() => setCurrentTaskId("")}>
			<DialogContent className="min-h-[300px]">
				<TaskViewDetails taskId={currentTaskId} />
			</DialogContent>
		</Dialog>
	);
}

type TaskViewDetailsProps = {
	taskId: string;
};
function TaskViewDetails({ taskId }: TaskViewDetailsProps) {
	const { data, isFetched } = useQuery({
		queryKey: [ENTITY, "task", taskId],
		queryFn: async () => {
			const [data, error] = await getTaskByIdAction({ taskId });
			if (error) throw error;
			return data;
		},
		retry: false,
		enabled: !!taskId,
	});

	if (!isFetched) {
		return (
			<>
				<VisuallyHidden>
					<DialogHeader>
						<DialogTitle>Task Info</DialogTitle>
					</DialogHeader>
				</VisuallyHidden>
				<div className="w-full h-full flex items-center justify-center">
					<Loader2 className="animate-spin" />
				</div>
			</>
		);
	}

	return (
		<>
			<DialogHeader>
				<DialogTitle>{data?.title}</DialogTitle>
			</DialogHeader>
		</>
	);
}
