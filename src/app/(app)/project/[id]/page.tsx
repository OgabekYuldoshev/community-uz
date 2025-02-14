import { getStatusByProjectId } from "@/features/projects/action";
import { Kanban } from "@/features/projects/components/kanban";
import React from "react";

export default async function Page({
	params,
}: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const [statuses, error] = await getStatusByProjectId({ id });

	if (error) throw error;

	return (
		<div className="relative flex-grow mt-4">
			<Kanban statuses={statuses} />
		</div>
	);
}
