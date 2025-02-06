"use client";

import React from "react";
import { useColumnStore } from "../stores/column";
import { AddColumn } from "./add-column";
import { ColumnItem } from "./column-item";

export function Kanban({ boardId }: { boardId: string }) {
	const columns = useColumnStore((state) => state.columns);
	return (
		<div className="relative flex-grow">
			<ol className="absolute top-0 left-0 bottom-0 right-0 flex flex-row overflow-x-auto overflow-y-hidden space-x-4 p-2 whitespace-nowrap px-4 scrollbar scrollbar-thumb-border scrollbar-track-transparent scrollbar-thumb-rounded scrollbar-thin">
				{columns.map((column) => (
					<ColumnItem key={column.id} column={column} />
				))}
				<AddColumn boardId={boardId} />
			</ol>
		</div>
	);
}
