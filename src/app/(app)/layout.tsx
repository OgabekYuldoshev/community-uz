import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import AuthProvider from "@/providers/auth-provider";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
	const session = await auth();

	if (!session) redirect("/login");

	return (
		<AuthProvider session={session}>
			<SidebarProvider>
				<AppSidebar />
				{children}
			</SidebarProvider>
		</AuthProvider>
	);
}
