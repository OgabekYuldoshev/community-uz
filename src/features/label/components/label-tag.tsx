import { Badge } from "@/components/ui/badge";
import React from "react";
import type { CustomLabelType } from "../stores/label-store";
export type LabelTagProps = {
	label: CustomLabelType;
};
export function LabelTag({ label }: LabelTagProps) {
	return (
		<Badge
			style={{ backgroundColor: label.color }}
			className="flex items-center gap-2 cursor-pointer select-none text-white"
		>
			{label.title}
		</Badge>
	);
}
