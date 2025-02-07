import { z } from "zod";

export const newBoardFormSchema = z.object({
	title: z.string().min(3),
});
