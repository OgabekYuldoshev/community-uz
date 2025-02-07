import PageHeader from "@/components/page-header";
import { getBoardsAction } from "@/features/board/actions";
import { BoardCard } from "@/features/board/components/board-card";
import { CreateNewBoard } from "@/features/board/components/create-new-board";
import { AppWindow } from "lucide-react";
import React from "react";

export default async function Page() {
	const [data, error] = await getBoardsAction();

	if (error) throw error;

	return (
		<>
			<PageHeader title="Boards" breadcrumbs={["Boards"]} />
			<div className="px-4">
				<div className="grid grid-cols-4 gap-4">
					<CreateNewBoard>
						<div className="border border-dashed p-4 rounded h-32 flex items-center justify-center cursor-pointer hover:ring transition-all text-muted-foreground hover:text-primary">
							<AppWindow className="mr-2" size={20} />
							<span>Create new board</span>
						</div>
					</CreateNewBoard>
					{data.map((board) => (
						<BoardCard id={board.id} key={board.id} title={board.title} />
					))}
				</div>
			</div>
		</>
	);
}
