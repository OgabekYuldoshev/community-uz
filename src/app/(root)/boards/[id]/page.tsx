import PageHeader from "@/components/page-header";
import React from "react";

interface PageProps {
	params: Promise<{ id: string }>;
}
export default async function Page({ params }: PageProps) {
	const { id } = await params;
	console.log(id);

	return (
		<>
			<PageHeader breadcrumbs={[{ label: "Boards", url: "/boards" }]} />
		</>
	);
}
