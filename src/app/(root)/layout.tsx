import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
	const session = await auth();
	if (!session) redirect("/login");
	return children;
}
