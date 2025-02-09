import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useState } from "react";
import CreateNewLabelForm from "./create-new-label-form";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { AddLabelsToTask } from "./add-labels-to-task";


export type CreateNewLabelFormProps = {
  taskId: string;
}
export function AddOrCreateLabelPopover({taskId}: CreateNewLabelFormProps) {
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
