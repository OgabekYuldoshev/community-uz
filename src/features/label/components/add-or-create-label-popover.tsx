import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { AddLabelsToTask } from "./add-labels-to-task";
import CreateNewLabelForm from "./create-new-label-form";

export type CreateNewLabelFormProps = {
	taskId: string;
};
export function AddOrCreateLabelPopover({ taskId }: CreateNewLabelFormProps) {
	const [isEditable, setEditable] = useState(false);
	const searchParams = useParams<{ id: string }>();
	const boardId = searchParams.id;

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button className="size-6" size="icon" variant="outline">
					<Plus />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-fit">
				{isEditable ? (
					<CreateNewLabelForm
						boardId={boardId}
						onBackLabel={() => setEditable(false)}
					/>
				) : (
					<AddLabelsToTask
						taskId={taskId}
						boardId={boardId}
						onCreateLabel={() => setEditable(true)}
					/>
				)}
			</PopoverContent>
		</Popover>
	);
}
