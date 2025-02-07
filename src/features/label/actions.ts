"use server";

import { protectedProducer } from "@/lib/server-action";
import { createNewLabelSchema } from "./schema";

export const createNewLabelAction = protectedProducer
	.input(createNewLabelSchema)
	.handler(async ({ input }) => {
		console.log(input);
		return {};
	});
