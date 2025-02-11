import PageHeader from "@/components/page-header";
import { getBoardByIdAction } from "@/features/board/actions";
import { BoardProvider } from "@/features/board/context";
import React from "react";
import { Kanban } from "./kanban";

interface PageProps {
	params: Promise<{ id: string }>;
}
export default async function Page({ params }: PageProps) {
	const { id } = await params;
	const [data, error] = await getBoardByIdAction({ id });

	if (error) throw error;

	const { board } = data;

	return (
		<BoardProvider {...{ board }}>
			<PageHeader
				title={board.title}
				breadcrumbs={[{ label: "Boards", url: "/boards" }, board.title]}
			/>
			<div className="flex flex-col flex-1">
				<Kanban boardId={board.id} />
			</div>
		</BoardProvider>
	);
}
