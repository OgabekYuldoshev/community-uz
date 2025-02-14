"use client";
import React, { useEffect } from "react";
import { useKanban } from "../states/kanban-state";
import type { StatusInferType } from "../type";
import { StatusCard } from "./status-card";

export type KanbanProps = {
	statuses: StatusInferType;
};
export function Kanban({ statuses }: KanbanProps) {
	const setStatuses = useKanban((state) => state.setStatuses);
	const currentStatuses = useKanban((state) => state.statuses);

	useEffect(() => {
		setStatuses(statuses);
	}, [statuses, setStatuses]);

	return (
		<ol className="absolute top-0 left-0 right-0 bottom-0 overflow-y-hidden overflow-x-auto flex flex-row scrollbar-thumb-border scrollbar-track-transparent scrollbar-thumb-rounded scrollbar-thin gap-4">
			{currentStatuses.map((item) => (
				<li
					key={item.id}
					className="block flex-shrink-0 items-start whitespace-nowrap h-full w-fit"
				>
					<StatusCard {...{ item }} />
				</li>
			))}
		</ol>
	);
}
