import PageHeader from "@/components/page-header";
import React from "react";
import { boardListAction } from "./action";
import { CreateNewBoard } from "./create-new-board";

export default async function Page() {
	const result = await boardListAction();
	console.log(result?.data);
	return (
		<>
			<PageHeader breadcrumbs={["Boards"]} />
			<div className="p-4">
				<h1 className="text-lg">Boards</h1>
				<div className="grid grid-cols-4 gap-4 mt-6">
					{result?.data?.map((board) => {
						return (
							<div key={board.id} className="border border-dashed p-4 rounded">
								{board.title}
							</div>
						);
					})}
					<CreateNewBoard>
						<div className="border border-dashed p-4 rounded">create board</div>
					</CreateNewBoard>
				</div>
			</div>
		</>
	);
}
