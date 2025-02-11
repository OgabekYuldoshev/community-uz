"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo, type Dispatch, type PropsWithChildren } from "react";
import { getTaskByIdAction } from "../actions";
import { ENTITY } from "../constants";
import { useTaskStore } from "../stores/task-store";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Loader2 } from "lucide-react";

export function TaskDetailsDialog() {
	const open = useTaskStore((state) => state.open);
	const setOpen = useTaskStore((state) => state.setOpen);
	const currentTaskId = useTaskStore((state) => state.currentTaskId);

	const { data, isFetched } = useQuery({
		queryKey: [ENTITY, "task", currentTaskId],
		queryFn: async () => {
			const [data, error] = await getTaskByIdAction({ taskId: currentTaskId });
			if (error) throw error;
			return data;
		},
		enabled: !!currentTaskId,
	});

	const renderDetails = useMemo(() => {
		if (!isFetched) {
			return (
				<>
					<VisuallyHidden>
						<DialogHeader>
							<DialogTitle>TaskInfo</DialogTitle>
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
	}, [data, isFetched]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="min-h-[200px]">{renderDetails}</DialogContent>
		</Dialog>
	);
}
