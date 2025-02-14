import { PageContent, PageHeader, PageWrapper } from "@/components/page";
import React from "react";

export default async function page() {
	return (
		<PageWrapper>
			<PageHeader title="Dashboard" breadcrumbs={["tstett"]} />
			<PageContent>This is dashboard page</PageContent>
		</PageWrapper>
	);
}
