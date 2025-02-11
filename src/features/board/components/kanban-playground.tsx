"use client";

import { ColumnCard } from "@/features/column/components/column-card";
import { CreateNewColumnForm } from "@/features/column/components/create-new-column-form";
import {
	type CustomColumnType,
	useColumnStore,
} from "@/features/column/stores/column-store";
import {
	type CustomLabelType,
	useLabelStore,
} from "@/features/label/stores/label-store";
import {
	type CustomTaskType,
	useTaskStore,
} from "@/features/task/stores/task-store";
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
import React, { useEffect, useMemo } from "react";
import { useBoard } from "../context";

type DragAndDropData = SortableData & {
	type: "COLUMN";
};

export type KanbanPlaygroundProps = {
	tasks: CustomTaskType[];
	columns: CustomColumnType[];
	labels: Record<string, CustomLabelType[]>;
};
export function KanbanPlayground({
	tasks,
	columns,
	labels,
}: KanbanPlaygroundProps) {
	const { board } = useBoard();
	const currentColumns = useColumnStore((state) => state.columns);
	const setColumns = useColumnStore((state) => state.setColumns);
	const updateColumnsPosition = useColumnStore(
		(state) => state.updateColumnsPosition,
	);
	const setTasks = useTaskStore((state) => state.setTasks);
	const setLabels = useLabelStore((state) => state.setLabels);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	useEffect(() => {
		setColumns(columns);
		setTasks(tasks);
		setLabels(labels);
	}, [tasks, columns, labels, setColumns, setTasks, setLabels]);

	function onDragEnd(event: DragEndEvent) {
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
			onDragEnd={onDragEnd}
		>
			<ol className="absolute top-0 left-0 bottom-0 right-0 flex flex-row overflow-x-auto overflow-y-hidden space-x-4 p-2 whitespace-nowrap px-4  scrollbar-thumb-border scrollbar-track-transparent scrollbar-thumb-rounded scrollbar-thin">
				<SortableContext
					strategy={horizontalListSortingStrategy}
					items={currentColumns}
				>
					{currentColumns.map((column) => (
						<ColumnCard key={column.id} column={column} />
					))}
				</SortableContext>
				<CreateNewColumnForm boardId={board.id} />
			</ol>
		</DndContext>
	);
}
