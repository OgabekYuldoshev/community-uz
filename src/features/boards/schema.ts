import { z } from "zod";

export const newBoardFormSchema = z.object({
	title: z.string().min(3),
});

export const columnFormSchema = z.object({
	title: z.string().min(1),
	boardId: z.string().min(1),
});
