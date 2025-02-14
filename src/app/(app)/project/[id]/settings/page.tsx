"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectStatusList } from "@/features/projects/components/project-status-list";
import React, { useState } from "react";

export default function Page() {
	const [state, setState] = useState("status");
	return (
		<div className="block mt-4 flex-1">
			<Tabs
				orientation="vertical"
				defaultValue={state}
				onValueChange={setState}
				className="flex items-start gap-4"
			>
				<TabsList className="w-full max-w-[300px] h-fit flex flex-col">
					<TabsTrigger
						value="status"
						className="w-full whitespace-normal !flex flex-col justify-start items-start gap-2 p-4"
					>
						<h1 className="text-start font-bold">Status</h1>
						<p className="text-start text-xs text-muted-foreground">
							Lorem ipsum, dolor sit amet consectetur adipisicing elit?
						</p>
					</TabsTrigger>
				</TabsList>
				<TabsContent value="status" asChild>
					<ProjectStatusList />
				</TabsContent>
			</Tabs>
		</div>
	);
}
