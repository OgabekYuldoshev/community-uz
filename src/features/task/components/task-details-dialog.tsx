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

import { Badge } from "@/components/ui/badge";
import { AddOrCreateLabelPopover } from "@/features/label/components/add-or-create-label-popover";
import CreateNewLabelForm from "@/features/label/components/create-new-label-form";
import { useLabelStore } from "@/features/label/stores/label-store";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Loader2 } from "lucide-react";

export function TaskDetailsDialog() {
	const open = useTaskStore((state) => state.open);
	const setOpen = useTaskStore((state) => state.setOpen);
	const currentTaskId = useTaskStore((state) => state.currentTaskId);
	const labels = useLabelStore((state) => state.labels);

	const { data, isFetched } = useQuery({
		queryKey: [ENTITY, "task", currentTaskId],
		queryFn: async () => {
			const [data, error] = await getTaskByIdAction({ taskId: currentTaskId });
			if (error) throw error;
			return data;
		},
		enabled: !!currentTaskId,
	});
	const currentTaskLabels = labels[currentTaskId] || [];

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
				<ul className="block">
					<li className="flex w-full gap-2">
						<h2 className="text-sm w-[100px]">Labels:</h2>
						<div className="flex-1 flex flex-wrap gap-2">
							{currentTaskLabels.map((label) => (
								<Badge
									style={{ backgroundColor: label.color }}
									key={label.id}
									className="text-foreground"
								>
									{label.title}
								</Badge>
							))}
							<AddOrCreateLabelPopover taskId={currentTaskId} />
						</div>
					</li>
				</ul>
			</>
		);
	}, [data, isFetched, currentTaskLabels, currentTaskId]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="min-h-[200px] flex flex-col">
				{renderDetails}
			</DialogContent>
		</Dialog>
	);
}
