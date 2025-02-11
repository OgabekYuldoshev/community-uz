import { buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { uid } from "radash";
import React, { useMemo } from "react";
import { getLabelsByBoardIdAction } from "../actions";
import { ENTITY } from "../constants";
import { useLabelStore } from "../stores/label-store";

export type LabelListsProps = {
	taskId: string;
	boardId: string;
	onCreateLabel?: () => void;
};
export function AddLabelsToTask({
	taskId,
	boardId,
	onCreateLabel,
}: LabelListsProps) {
	const { data, isFetched } = useQuery({
		queryKey: [ENTITY, "labels", boardId],
		queryFn: async () => {
			const [data, error] = await getLabelsByBoardIdAction({ boardId });
			if (error) {
				throw error;
			}

			return data;
		},
		initialData: [],
	});

	const toggleLabel = useLabelStore((state) => state.toggleLabel);
	const labels = useLabelStore((state) => state.labels);
	const currentTaskLabels = labels[taskId] || [];
	const labelIds = currentTaskLabels.map((label) => label.id);

	const renderData = useMemo(() => {
		if (!isFetched) {
			return Array.from({ length: 3 }).map((_, index) => (
				<li key={uid(9)}>
					<Skeleton className="h-8" />
				</li>
			));
		}

		return data.map((label) => (
			<li
				key={label.id}
				className="flex items-center gap-2 p-2 rounded"
				style={{ backgroundColor: label.color }}
			>
				<Checkbox
					id={label.id}
					className="flex-shrink-0"
					checked={labelIds.includes(label.id)}
					onCheckedChange={(value: boolean) =>
						toggleLabel(taskId, label, value)
					}
				/>
				<Label htmlFor={label.id} className="flex-1">
					{label.title}
				</Label>
			</li>
		));
	}, [isFetched, data, toggleLabel, taskId, labelIds]);

	return (
		<div className="flex flex-col min-w-[200px]">
			<div className="block">
				<h1 className="text-xs">Labels</h1>
			</div>
			<ul className="block space-y-2 mt-4">
				{renderData}
				<li
					onClick={() => onCreateLabel?.()}
					onKeyUp={() => onCreateLabel?.()}
					className={buttonVariants({
						variant: "outline",
						className: "w-full !h-8",
					})}
				>
					<Plus />
					Create new label
				</li>
			</ul>
		</div>
	);
}
