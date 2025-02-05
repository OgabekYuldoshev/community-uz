import PageHeader from "@/components/page-header";
import { boardSingleAction } from "@/features/boards/actions";
import React from "react";

interface PageProps {
	params: Promise<{ id: string }>;
}
export default async function Page({ params }: PageProps) {
	const { id } = await params;
	const result = await boardSingleAction({ id });
	console.log(result);

	return (
		<>
			<PageHeader breadcrumbs={[{ label: "Boards", url: "/boards" }]} />
		</>
	);
}
