import { z } from "zod";

export const createNewLabelSchema = z.object({
	title: z.string().min(1),
	boardId: z.string().min(1),
});
