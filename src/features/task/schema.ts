import { z } from "zod";

export const createNewTaskSchema = z.object({
	title: z.string().min(1),
	position: z.number(),
	columnId: z.string().min(1),
});
