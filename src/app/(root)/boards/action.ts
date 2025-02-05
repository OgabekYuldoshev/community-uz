"use server";
import { authActionClient } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export const createBoardAction = authActionClient
	.schema(
		z.object({
			title: z.string(),
		}),
	)
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
