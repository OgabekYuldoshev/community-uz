import { PageContent, PageHeader, PageWrapper } from "@/components/page";
import { getProjectByIdAction } from "@/features/projects/action";
import { ProjectTabs } from "@/features/projects/components/project-tabs";
import ProjectProvider from "@/features/projects/providers/project-provider";
import React, { type PropsWithChildren } from "react";

export type PageLayoutProps = PropsWithChildren<{
	params: Promise<{ id: string }>;
}>;
export default async function ProjectLayout({
	children,
	params,
}: PageLayoutProps) {
	const { id } = await params;
	const [data, error] = await getProjectByIdAction({ id });
	if (error) throw error;
	return (
		<ProjectProvider project={data}>
			<PageWrapper>
				<PageHeader breadcrumbs={["Project", data.name]} />
				<PageContent>
					<div className="flex items-center justify-between">
						<div className="grid gap-1">
							<h1 className="font-bold text-xl">{data.name}</h1>
							<p className="text-xs text-muted-foreground">
								{data.description}
							</p>
						</div>
					</div>
					<ProjectTabs />
					{children}
				</PageContent>
			</PageWrapper>
		</ProjectProvider>
	);
}
