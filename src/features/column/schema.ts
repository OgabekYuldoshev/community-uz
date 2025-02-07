import { z } from "zod";

export const createNewColumnSchema = z.object({
	title: z.string().min(1),
	position: z.number(),
	boardId: z.string().min(1),
});
