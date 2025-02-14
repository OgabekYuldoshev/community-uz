import { z } from "zod";

export const projectFormSchema = z.object({
	name: z.string().min(3),
	description: z.string().min(3),
});

export const statusFormSchema = z.object({
	name: z.string().min(3),
});

export const statusPositionSchema = z.object({
	items: z.array(
		z.object({
			id: z.string().cuid(),
			position: z.number(),
		}),
	),
});

export const taskFormSchema = z.object({
	name: z.string().min(3),
});
