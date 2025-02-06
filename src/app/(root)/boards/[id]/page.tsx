import PageHeader from "@/components/page-header";
import { getBoardByIdAction } from "@/features/boards/actions";
import { Kanban } from "@/features/boards/components/kanban";
import React from "react";

interface PageProps {
	params: Promise<{ id: string }>;
}
export default async function Page({ params }: PageProps) {
	const { id } = await params;
	const [data, error] = await getBoardByIdAction({ id });

	if (error) throw error;

	return (
		<>
			<PageHeader
				title={data.title}
				breadcrumbs={[{ label: "Boards", url: "/boards" }, data.title]}
			/>
			<div className="flex flex-col flex-1">
				<Kanban />
			</div>
		</>
	);
}
