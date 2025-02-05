import PageHeader from "@/components/page-header";
import { boardListAction } from "@/features/boards/actions";
import { BoardCard } from "@/features/boards/components/board-card";
import { CreateNewBoard } from "@/features/boards/components/create-new-board";
import { AppWindow } from "lucide-react";
import React from "react";

export default async function Page() {
	const result = await boardListAction();
	return (
		<>
			<PageHeader breadcrumbs={["Boards"]} />
			<div className="p-4">
				<h1 className="text-lg">Boards</h1>
				<div className="grid grid-cols-4 gap-4 mt-6">
					<CreateNewBoard>
						<div className="border border-dashed p-4 rounded h-32 flex items-center justify-center cursor-pointer hover:ring transition-all text-muted-foreground hover:text-primary">
							<AppWindow className="mr-2" size={20} />
							<span>Create new board</span>
						</div>
					</CreateNewBoard>
					{result?.data?.map((board) => (
						<BoardCard id={board.id} key={board.id} title={board.title} />
					))}
				</div>
			</div>
		</>
	);
}
