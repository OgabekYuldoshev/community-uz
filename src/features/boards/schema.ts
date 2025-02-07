import { z } from "zod";

export const newBoardFormSchema = z.object({
	title: z.string().min(3),
});

export const columnFormSchema = z.object({
	title: z.string().min(1),
	position: z.number(),
	boardId: z.string().min(1),
});

export const taskFormSchema = z.object({
	title: z.string().min(1),
	position: z.number(),
	columnId: z.string().min(1),
});
