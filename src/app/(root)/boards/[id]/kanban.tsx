import { getBoardInfoByIdAction } from "@/features/board/actions";
import { KanbanPlayground } from "@/features/board/components/kanban-playground";
import React from "react";

export type KanbanProps = {
	boardId: string;
};
export async function Kanban({ boardId }: KanbanProps) {
	const [data, error] = await getBoardInfoByIdAction({ boardId });
	if (error) throw error;

	const { tasks, columns, labels } = data;

	return (
		<div className="relative flex-grow">
			<KanbanPlayground {...{ tasks, columns, labels }} />
		</div>
	);
}
