"use server";

import { authActionClient } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
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

export const boardListAction = authActionClient.action(async ({ ctx }) => {
	const boards = await prisma.board.findMany({
		where: {
			userId: ctx.user.id,
		},
	});
	return boards;
});

export const boardSingleAction = authActionClient
	.schema(z.object({ id: z.string() }))
	.action(async ({ ctx, parsedInput: { id } }) => {
		const board = await prisma.board.findFirst({
			where: {
				id,
				userId: ctx.user.id,
			},
		});

		if (!board) {
			throw new Error("Board not found.");
		}

		return board;
	});
