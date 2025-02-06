"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import { useListStore } from "../stores/list";
import AddNewList from "./add-new-list";
import { ColumnItem } from "./column-item";

export function Kanban() {
	const columns = useListStore((state) => state.columns);
	return (
		<div className="relative flex-grow">
			<ol className="absolute top-0 left-0 bottom-0 right-0 flex flex-row overflow-x-auto overflow-y-hidden space-x-4 p-2 whitespace-nowrap px-4 scrollbar scrollbar-thumb-border scrollbar-track-transparent scrollbar-thumb-rounded scrollbar-thin">
				{columns.map((column) => (
					<ColumnItem key={column.id} column={column} />
				))}
				<AddNewList />
			</ol>
		</div>
	);
}
