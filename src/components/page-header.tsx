import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import type { ReactNode } from "react";
import { Fragment } from "react";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";

type PageHeaderProps = {
	breadcrumbs?: Array<string | { label: string; url: string }>;
	left?: ReactNode;
};

export default function PageHeader({
	breadcrumbs = [],
	left,
}: PageHeaderProps) {
	return (
		<div className="h-16 border-b flex-shrink-0 flex items-center group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 transition-all px-4 gap-2">
			<SidebarTrigger />
			<Separator orientation="vertical" className="h-4 mr-2" />
			<Breadcrumb>
				<BreadcrumbList>
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
			<div className="ml-auto">{left}</div>
		</div>
	);
}
