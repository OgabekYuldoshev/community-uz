import { PageContent, PageHeader, PageWrapper } from "@/components/page";
import { getProjectByIdAction } from "@/features/projects/action";
import React from "react";

export type PageProps = {
	params: Promise<{ id: string }>;
};
export default async function Page({ params }: PageProps) {
	const { id } = await params;
	const [data, error] = await getProjectByIdAction({ id });
	if (error) throw error;

	console.log(data);
	return (
		<PageWrapper>
			<PageHeader breadcrumbs={["Project", data.name]} />
			<PageContent>Qalesan</PageContent>
		</PageWrapper>
	);
}
