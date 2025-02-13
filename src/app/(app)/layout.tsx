import { AppSidebar } from "@/components/app-sidebar";
import { AppTopbar } from "@/components/app-topbar";
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
        <main className="relative flex min-h-svh flex-1 flex-col">
          <AppTopbar />
          {children}
        </main>
      </SidebarProvider>
    </AuthProvider>
  );
}
