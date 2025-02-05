import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";
export default async function Layout({ children }: PropsWithChildren) {
	const session = await auth();
	if (!session) redirect("/login");
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="flex flex-col w-full h-full">{children}</main>
		</SidebarProvider>
	);
}
