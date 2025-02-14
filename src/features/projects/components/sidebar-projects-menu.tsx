import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { FileText } from "lucide-react";
import Link from "next/link";
import React from "react";
import { getProjectsAction } from "../action";

export async function SidebarProjectsMenu() {
	const [data, error] = await getProjectsAction();

	if (error) throw error;

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				{data.map((project) => (
					<SidebarMenuButton asChild key={project.id}>
						<Link href={`/project/${project.id}`}>
							<FileText />
							<span>{project.name}</span>
						</Link>
					</SidebarMenuButton>
				))}
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
