"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Kanban, List, Settings } from "lucide-react";
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
			<TabsList>
				<TabsTrigger value="kanban" asChild>
					<Link href={`/project/${project.id}`}>
						<Kanban size={16} className="mr-2" />
						Kanban
					</Link>
				</TabsTrigger>
				<TabsTrigger value="list" asChild>
					<Link href={`/project/${project.id}/list`}>
						<List size={16} className="mr-2" />
						List
					</Link>
				</TabsTrigger>
				<TabsTrigger value="settings" asChild>
					<Link href={`/project/${project.id}/settings`}>
						<Settings size={16} className="mr-2" />
						Settings
					</Link>
				</TabsTrigger>
			</TabsList>
		</Tabs>
	);
}
