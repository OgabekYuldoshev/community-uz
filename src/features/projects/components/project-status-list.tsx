"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GripVertical, Loader2 } from "lucide-react";
import { uid } from "radash";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { createNewStatusAction, getStatusByProjectId } from "../action";
import { ENTITY } from "../constants";
import { useProject } from "../providers/project-provider";
import { statusFormSchema } from "../schema";

type FormValue = z.infer<typeof statusFormSchema>;

export function ProjectStatusList() {
	const { project } = useProject();
	const queryClient = useQueryClient();

	const queryKey = [ENTITY, "status", project.id];

	const { data, isFetched } = useQuery({
		queryKey,
		async queryFn() {
			const [data, error] = await getStatusByProjectId({ id: project.id });
			if (error) throw error;
			return data;
		},
		initialData: [],
	});

	const renderUi = useMemo(() => {
		if (!isFetched) {
			return Array.from({ length: 3 }).map(() => (
				<li className="py-2" key={uid(10)}>
					<Skeleton className="h-6 w-full" />
				</li>
			));
		}

		return data.map((item) => (
			<li key={item.id} className="border-b last:border-none py-2">
				<div className="flex items-center gap-2">
					<Button size="icon" variant="ghost" className="size-6">
						<GripVertical />
					</Button>
					<h3 className="font-bold text-sm">{item.name}</h3>
				</div>
			</li>
		));
	}, [isFetched, data]);

	const form = useForm<FormValue>({
		resolver: zodResolver(statusFormSchema),
		defaultValues: {
			name: "",
		},
	});

	async function onSubmit(values: FormValue) {
		const [item, error] = await createNewStatusAction({
			projectId: project.id,
			name: values.name,
			position: data.length,
		});
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success("Status created successfully!");
		queryClient.setQueryData(queryKey, (prevItems: any[]) => [
			...prevItems,
			item,
		]);
		form.reset();
	}

	return (
		<div className="w-full">
			<ul className="max-w-[500px] border rounded-md py-2 px-3 list-none">
				{renderUi}
				<li className="pt-2">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<div className="relative">
												<Input
													disabled={form.formState.isSubmitting}
													placeholder="Hit 'Enter' to add a new status"
													{...field}
												/>
												{form.formState.isSubmitting && (
													<Loader2
														size={20}
														className="animate-spin absolute top-2 right-2 "
													/>
												)}
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</form>
					</Form>
				</li>
			</ul>
		</div>
	);
}
