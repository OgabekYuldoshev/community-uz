"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { z } from "zod";
import { useProject } from "../providers/project-provider";

export function ProjectTabs() {
	const { project } = useProject();
	const pathname = usePathname();
	const pathnameParsed = pathname.split("/");
	const currentTab = pathnameParsed.at(-1);
	const { success } = z.string().cuid().safeParse(currentTab);

	return (
		<Tabs className="mt-4 w-fit" defaultValue={success ? "kanban" : currentTab}>
			<TabsList className="grid w-full grid-cols-2">
				<TabsTrigger value="kanban" asChild>
					<Link href={`/project/${project.id}`}>Kanban</Link>
				</TabsTrigger>
				<TabsTrigger value="list" asChild>
					<Link href={`/project/${project.id}/list`}>List</Link>
				</TabsTrigger>
			</TabsList>
		</Tabs>
	);
}
