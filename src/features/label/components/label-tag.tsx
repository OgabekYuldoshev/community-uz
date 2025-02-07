import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React from "react";

export type LabelTagProps = {
	id: string;
	title: string;
};
export function LabelTag({ title }: LabelTagProps) {
	return (
		<Badge className="flex items-center gap-2 cursor-pointer select-none">
			{title}
		</Badge>
	);
}
