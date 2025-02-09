"use client";

import { Skeleton } from "@/components/ui/skeleton";

import { ColumnCard } from "@/features/column/components/column-card";
import { CreateNewColumnForm } from "@/features/column/components/create-new-column-form";
import { useColumnStore } from "@/features/column/stores/column-store";
import { useTaskStore } from "@/features/task/stores/task-store";
import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  type SortableData,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useQuery } from "@tanstack/react-query";
import { uid } from "radash";
import React, { useEffect, useMemo } from "react";
import { getBoardInfoByIdAction } from "../actions";
import { ENTITY } from "../constants";
import { useLabelStore } from "@/features/label/stores/label-store";

type DragAndDropData = SortableData & {
  type: "COLUMN";
};

export function Kanban({ boardId }: { boardId: string }) {
  const columns = useColumnStore((state) => state.columns);
  const setColumns = useColumnStore((state) => state.setColumns);
  const updateColumnsPosition = useColumnStore(
    (state) => state.updateColumnsPosition
  );
  const setTasks = useTaskStore((state) => state.setTasks);
  const setLabelsByTaskId = useLabelStore((state) => state.setLabelsByTaskId);

  const { data, isFetched } = useQuery({
    queryKey: [ENTITY, "board", boardId],
    queryFn: async () => {
      const [data, error] = await getBoardInfoByIdAction({ boardId });
      if (error) throw error;
      return data;
    },
    retry: false,
    initialData: {
      columns: [],
      tasks: [],
    },
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (data) {
      setColumns(data.columns);
      setTasks(data.tasks);
      data.tasks.map((task) => {
        setLabelsByTaskId(task.id, task.labels);
      });
    }
  }, [data, setColumns, setTasks, setLabelsByTaskId]);

  const renderColumns = useMemo(() => {
    if (!isFetched) {
      return Array.from({ length: 5 }).map(() => (
        <Skeleton key={uid(5)} className="w-[275px] flex-shrink-0" />
      ));
    }

    return (
      <SortableContext items={columns} strategy={horizontalListSortingStrategy}>
        {columns.map((column) => (
          <ColumnCard key={column.id} column={column} />
        ))}
      </SortableContext>
    );
  }, [isFetched, columns]);

  function handleDragEnd(event: DragEndEvent) {
    const { over, active } = event;
    if (!over) return;
    const overData = over.data.current as DragAndDropData;
    const activeData = active.data.current as DragAndDropData;
    if (overData.type === "COLUMN" && activeData.type === "COLUMN") {
      updateColumnsPosition(activeData.sortable.index, overData.sortable.index);
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="relative flex-grow">
        <ol className="absolute top-0 left-0 bottom-0 right-0 flex flex-row overflow-x-auto overflow-y-hidden space-x-4 p-2 whitespace-nowrap px-4 scrollbar scrollbar-thumb-border scrollbar-track-transparent scrollbar-thumb-rounded scrollbar-thin">
          {renderColumns}
          <CreateNewColumnForm boardId={boardId} />
        </ol>
      </div>
    </DndContext>
  );
}
