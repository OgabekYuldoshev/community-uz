"use server";

import { prisma } from "@/lib/prisma";
import { protectedProducer } from "@/lib/server-action";
import { z } from "zod";
import type { CustomLabelType } from "../label/stores/label-store";
import { newBoardFormSchema } from "./schema";

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

		return {
			board,
		};
	});

export const getBoardInfoByIdAction = protectedProducer
	.input(z.object({ boardId: z.string() }))
	.handler(async ({ input }) => {
		const columns = await prisma.column.findMany({
			where: {
				boardId: input.boardId,
			},
			select: {
				id: true,
				title: true,
				position: true,
				boardId: true,
			},
			orderBy: {
				position: "asc",
			},
		});

		const tasks = await prisma.task.findMany({
			where: {
				boardId: input.boardId,
			},
			select: {
				id: true,
				title: true,
				position: true,
				columnId: true,
				labels: {
					select: {
						id: true,
						title: true,
						color: true,
					},
				},
			},
		});

		const labels = tasks.reduce(
			(acc, task) => {
				return {
					// biome-ignore lint/performance/noAccumulatingSpread: <explanation>
					...acc,
					[task.id]: task.labels,
				};
			},
			{} as Record<string, CustomLabelType[]>,
		);

		return { columns, tasks, labels };
	});
