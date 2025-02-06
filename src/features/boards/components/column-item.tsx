import React from "react";
import type { Column } from "../stores/list";

export type ListItemProps = {
	column: Column;
};
export function ColumnItem({ column }: ListItemProps) {
	return (
		<li className="block self-start h-full flex-shrink-0">
			<div className="border p-2 w-[200px]">{column.title}</div>
		</li>
	);
}
