"use client";

import { Skeleton } from "@/components/ui/skeleton";
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
import { useColumnStore } from "../stores/column";
import { useTaskStore } from "../stores/task";
import { Column } from "./column";
import { CreateNewColumn } from "./create-new-column";

export function Kanban({ boardId }: { boardId: string }) {
	const columns = useColumnStore((state) => state.columns);
	const setColumns = useColumnStore((state) => state.setColumns);
	const moveColumns = useColumnStore((state) => state.moveColumns);

	const setTasks = useTaskStore((state) => state.setTasks);

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

	useEffect(() => {
		if (data) {
			setColumns(
				data.columns.map((item) => ({
					id: item.id,
					title: item.title,
					position: item.position,
				})),
			);
			setTasks(
				data.tasks.map((item) => ({
					id: item.id,
					title: item.title,
					position: item.position,
					columnId: item.columnId,
				})),
			);
		}
	}, [data, setColumns, setTasks]);

	const renderColumns = useMemo(() => {
		if (!isFetched) {
			return Array.from({ length: 5 }).map(() => (
				<Skeleton key={uid(5)} className="w-[275px] flex-shrink-0" />
			));
		}

		return (
			<SortableContext items={columns} strategy={horizontalListSortingStrategy}>
				{columns.map((column) => (
					<Column key={column.id} column={column} />
				))}
			</SortableContext>
		);
	}, [isFetched, columns]);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	function handleDragEnd(event: DragEndEvent) {
		const { over, active } = event;
		if (!over) return;
		console.log(over.id, active.id);
		const overData = over.data.current as SortableData;
		const activeData = active.data.current as SortableData;

		moveColumns(activeData.sortable.index, overData.sortable.index);
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
					<CreateNewColumn boardId={boardId} />
				</ol>
			</div>
		</DndContext>
	);
}
