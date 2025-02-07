import { Popover, PopoverTrigger } from "@/components/ui/popover";
import React, { type PropsWithChildren } from "react";

export default function LabelPopover({ children }: PropsWithChildren) {
	return (
		<Popover>
			<PopoverTrigger asChild>{children}</PopoverTrigger>
		</Popover>
	);
}
