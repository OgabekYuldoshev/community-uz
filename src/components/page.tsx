import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type React from "react";
import { Fragment, type ReactNode } from "react";
import { SidebarTrigger } from "./ui/sidebar";

export type PageWrapperProps = React.ComponentPropsWithoutRef<"main">;

export function PageWrapper({ className, ...props }: PageWrapperProps) {
	return (
		<main
			className={cn("flex flex-col w-full min-h-screen h-full", className)}
			{...props}
		/>
	);
}

export type PageHeaderProps = {
	title: string;
	breadcrumbs?: Array<string | { label: string; url: string }>;
	left?: ReactNode;
};
export function PageHeader({ title, breadcrumbs = [], left }: PageHeaderProps) {
	return (
		<div className="h-16 p-2 flex-shrink-0">
			<div className="bg-sidebar rounded-lg border flex items-center justify-between h-full px-2">
				<div className="flex items-center gap-2">
					<SidebarTrigger />
					<Breadcrumb>
						<BreadcrumbList className="text-xs !gap-1">
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<Link href="/">Dashboard</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							{breadcrumbs.length > 0 && <BreadcrumbSeparator />}
							{breadcrumbs.map((breadcrumb) => {
								if (typeof breadcrumb === "object") {
									return (
										<BreadcrumbItem key={breadcrumb.label}>
											<BreadcrumbLink asChild>
												<Link href={breadcrumb.url}>{breadcrumb.label}</Link>
											</BreadcrumbLink>
										</BreadcrumbItem>
									);
								}
								return (
									<Fragment key={breadcrumb}>
										{breadcrumbs.length > 1 && <BreadcrumbSeparator />}
										<BreadcrumbItem>
											<BreadcrumbPage>{breadcrumb}</BreadcrumbPage>
										</BreadcrumbItem>
									</Fragment>
								);
							})}
						</BreadcrumbList>
					</Breadcrumb>
				</div>
				{left}
			</div>
		</div>
	);
}

export type PageContentProps = React.ComponentPropsWithoutRef<"section">;

export function PageContent({ className, ...props }: PageContentProps) {
	return <section className={cn("block flex-1 p-2", className)} {...props} />;
}
