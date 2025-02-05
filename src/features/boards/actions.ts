"use server";

import { authActionClient } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import { newBoardFormSchema } from "./schema";

export const createBoardAction = authActionClient
	.schema(newBoardFormSchema)
	.action(async ({ ctx, parsedInput }) => {
		const board = await prisma.board.create({
			data: {
				title: parsedInput.title,
				userId: ctx.user.id,
			},
		});
		return board;
	});
