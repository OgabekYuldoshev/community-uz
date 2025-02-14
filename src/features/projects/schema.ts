import { z } from "zod";

export const projectFormSchema = z.object({
	name: z.string().min(3),
	description: z.string().min(3),
});

export const statusFormSchema = z.object({
	name: z.string().min(3),
});
