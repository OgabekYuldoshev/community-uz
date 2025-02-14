import React from "react";
import type { StatusInferType } from "../type";

export type StatusCardProps = {
	item: StatusInferType[number];
};
export function StatusCard({ item }: StatusCardProps) {
	return (
		<div className="relative bg-sidebar border w-[275px] px-3 py-2 rounded-md">
			<div>
				<h2 className="text-sm font-bold">{item.name}</h2>
			</div>
		</div>
	);
}
