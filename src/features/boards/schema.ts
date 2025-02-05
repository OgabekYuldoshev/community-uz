import { z } from "zod";

export const newBoardFormSchema = z.object({
	title: z.string().min(3),
});

export const newListFormSchema = z.object({
	title: z.string().min(1),
});
