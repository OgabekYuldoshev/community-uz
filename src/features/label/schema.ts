import { z } from "zod";

export const createNewLabelFormSchema = z.object({
	title: z.string().min(1),
	color: z.string().min(1),
});

export const createNewLabelSchema = createNewLabelFormSchema.extend({
	boardId: z.string().min(1),
});
