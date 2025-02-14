import {
	AppWindow,
	Calendar,
	CirclePlus,
	FolderGit2,
	LayoutDashboard,
	Projector,
	Search,
	Settings,
} from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { CreateNewProjectForm } from "@/features/projects/components/create-new-project-form";
import Link from "next/link";
import { Profile } from "./profile";
import { Button } from "./ui/button";

export function AppSidebar() {
	return (
		<Sidebar variant="floating">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuSubButton className="h-12" asChild>
							{/* biome-ignore lint/a11y/useValidAriaRole: <explanation> */}
							<Link role="h1" href="/" className="font-bold">
								Uz Community
							</Link>
						</SidebarMenuSubButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Application</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Link href="/">
										<LayoutDashboard />
										<span>Dashboard</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton
									className="flex items-center justify-between"
									asChild
								>
									<div>
										<div className="flex items-center gap-2">
											<FolderGit2 size={16} />
											<span>Projects</span>
										</div>
										<CreateNewProjectForm>
											<Button
												size="icon"
												className="size-6"
												variant="secondary"
											>
												<CirclePlus />
											</Button>
										</CreateNewProjectForm>
									</div>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<Profile />
			</SidebarFooter>
		</Sidebar>
	);
}
