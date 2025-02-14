"use client";
import { logOutAction } from "@/features/auth/actions";
import { ChevronDown, LogOut, User } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";

export function Profile() {
	const { data } = useSession();
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton className="h-12 flex items-center justify-between">
							<div className="flex items-center gap-2">
								<User size={20} />
								<div className="grid grid-cols-1">
									<p className="text-sm">{data?.user.name}</p>
									<span className="text-xs text-muted-foreground">
										{data?.user.email}
									</span>
								</div>
							</div>
							<ChevronDown />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start" side="right">
						<DropdownMenuGroup>
							<DropdownMenuItem
								onClick={() => logOutAction({ redirectTo: "/login" })}
							>
								<LogOut />
								Log out
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
