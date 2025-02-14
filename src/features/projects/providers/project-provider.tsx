"use client";

import type { Project } from "@prisma/client";
import React, { type PropsWithChildren } from "react";

export type ProjectContextValue = {
	project: Project;
};

const ProjectContext = React.createContext<ProjectContextValue>({
	project: {} as Project,
});

export const useProject = () => {
	const ctx = React.useContext(ProjectContext);

	if (!ctx)
		throw new Error(
			"[ProjectContext]: useProject should be inside ProjectProvider",
		);

	return ctx;
};

export type ProjectProviderProps = PropsWithChildren<{
	project: Project;
}>;

export default function ProjectProvider({
	project,
	children,
}: ProjectProviderProps) {
	return (
		<ProjectContext.Provider value={{ project }}>
			{children}
		</ProjectContext.Provider>
	);
}
