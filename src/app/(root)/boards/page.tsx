import PageHeader from "@/components/page-header";
import { CreateNewBoard } from "@/features/boards/components/create-new-board";
import React from "react";

export default async function Page() {
	return (
		<>
			<PageHeader breadcrumbs={["Boards"]} />
			<div className="p-4">
				<h1 className="text-lg">Boards</h1>
				<div className="grid grid-cols-4 gap-4 mt-6">
					<CreateNewBoard>
						<div className="border border-dashed p-4 rounded">create board</div>
					</CreateNewBoard>
				</div>
			</div>
		</>
	);
}
