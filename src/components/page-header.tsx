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

type PageHeaderProps = {
	title: string;
	breadcrumbs?: Array<string | { label: string; url: string }>;
	left?: ReactNode;
};

export default function PageHeader({
	title,
	breadcrumbs = [],
	left,
}: PageHeaderProps) {
	return (
		<div className="p-4 flex items-end justify-between">
			<div className="block space-y-2">
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
				<h1 className="text-2xl font-semibold">{title}</h1>
			</div>

			<div className="ml-auto">{left}</div>
		</div>
	);
}
