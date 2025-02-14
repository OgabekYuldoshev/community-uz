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
import { cn } from "@/lib/utils";
import { DndContext, type DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
	SortableContext,
	type SortableData,
	arrayMove,
	useSortable,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GripVertical, Loader2, Trash } from "lucide-react";
import { uid } from "radash";
import type React from "react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import {
	createNewStatusAction,
	deleteStatusAction,
	getStatusByProjectId,
	updateStatusPositionAction,
} from "../action";
import { ENTITY } from "../constants";
import { useProject } from "../providers/project-provider";
import { statusFormSchema } from "../schema";
import type { StatusInferType } from "../type";
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

		return (
			<SortableContext strategy={verticalListSortingStrategy} items={data}>
				{data.map((item) => (
					<Draggable key={item.id} name={item.name} id={item.id} />
				))}
			</SortableContext>
		);
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
		queryClient.setQueryData<StatusInferType>(queryKey, (prevItems) => [
			...(prevItems || []),
			item,
		]);
		form.reset();
	}

	async function onDragEnd(event: DragEndEvent) {
		console.log(event);
		const { over, active } = event;
		if (!over) return;
		const overData = over.data.current as SortableData;
		const activeData = active.data.current as SortableData;

		const currentItems =
			queryClient.getQueryData<StatusInferType>(queryKey) || [];

		let cloneItems = [...currentItems];

		cloneItems = arrayMove(
			cloneItems,
			activeData.sortable.index,
			overData.sortable.index,
		);
		const mappedItems = cloneItems.map((item, position) => ({
			id: item.id,
			position,
		}));

		queryClient.setQueryData<StatusInferType>(queryKey, cloneItems);

		const [, error] = await updateStatusPositionAction({ items: mappedItems });

		if (error) {
			queryClient.setQueryData<StatusInferType>(queryKey, currentItems);
			toast.error(error.message);
		}
	}

	return (
		<DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
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
		</DndContext>
	);

	function Draggable({ name, id }: { name: string; id: string }) {
		const { mutate } = useMutation({
			mutationKey: queryKey,
			async mutationFn({ id }: { id: string }) {
				const [item, error] = await deleteStatusAction({ id });
				if (error) throw error;
				return item;
			},
			onError(error) {
				toast.error(error.message);
			},
			onSuccess(item) {
				queryClient.setQueryData(queryKey, (prevItems: any[]) => {
					return prevItems.filter((i) => i.id !== item.id);
				});
			},
		});

		const {
			setNodeRef,
			listeners,
			attributes,
			transition,
			transform,
			isDragging,
		} = useSortable({
			id,
		});

		const style: React.CSSProperties = {
			transform: CSS.Transform.toString(transform),
			transition,
		};

		return (
			<li
				style={style}
				ref={setNodeRef}
				className="border-b last:border-none py-2 flex items-center justify-between group relative z-[200] bg-background"
			>
				<div className="flex items-center gap-2">
					<Button
						{...listeners}
						{...attributes}
						size="icon"
						variant="ghost"
						className="size-6"
					>
						<GripVertical />
					</Button>
					<h3 className="font-bold text-sm">{name}</h3>
				</div>
				<Button
					onClick={() => mutate({ id })}
					size="icon"
					variant="ghost"
					className={cn(
						"size-6 invisible",
						!isDragging && "group-hover:visible",
					)}
				>
					<Trash size={16} />
				</Button>
			</li>
		);
	}
}
