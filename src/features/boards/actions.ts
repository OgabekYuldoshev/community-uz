"use server";

import { prisma } from "@/lib/prisma";
import { protectedProducer } from "@/lib/server-action";
import { z } from "zod";
import { columnFormSchema, newBoardFormSchema } from "./schema";

export const createBoardAction = protectedProducer
	.input(newBoardFormSchema)
	.handler(async ({ input, ctx }) => {
		const board = await prisma.board.create({
			data: {
				title: input.title,
				userId: ctx.user.id,
			},
		});

		return board;
	});

export const getBoardsAction = protectedProducer.handler(async ({ ctx }) => {
	const boards = await prisma.board.findMany({
		where: {
			userId: ctx.user.id,
		},
	});
	return boards;
});

export const getBoardByIdAction = protectedProducer
	.input(z.object({ id: z.string() }))
	.handler(async ({ input: { id }, ctx }) => {
		const board = await prisma.board.findFirst({
			where: {
				id,
				userId: ctx.user.id,
			},
		});

		if (!board) {
			throw "Board not found.";
		}

		return board;
	});

export const createColumnAction = protectedProducer
	.input(columnFormSchema)
	.handler(async ({ input }) => {
		const column = await prisma.column.create({
			data: input,
		});

		return column;
	});
