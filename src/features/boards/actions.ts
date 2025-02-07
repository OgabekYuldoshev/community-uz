"use server";

import { prisma } from "@/lib/prisma";
import { protectedProducer } from "@/lib/server-action";
import { z } from "zod";
import { columnFormSchema, newBoardFormSchema, taskFormSchema } from "./schema";

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

export const getBoardInfoByIdAction = protectedProducer
	.input(z.object({ boardId: z.string() }))
	.handler(async ({ input }) => {
		const columns = await prisma.column.findMany({
			where: {
				boardId: input.boardId,
			},
			orderBy: {
				position: "asc",
			},
		});

		const tasks = await prisma.task.findMany({
			where: {
				boardId: input.boardId,
			},
		});

		return { columns, tasks };
	});

export const createTaskAction = protectedProducer
	.input(taskFormSchema)
	.handler(async ({ input }) => {
		const column = await prisma.column.findUnique({
			where: {
				id: input.columnId,
			},
		});

		if (!column) throw "Column not found";

		const task = await prisma.task.create({
			data: {
				title: input.title,
				position: input.position,
				columnId: column.id,
				boardId: column.boardId,
			},
		});
		return task;
	});

export const updateColumnPositionAction = protectedProducer
	.input(z.record(z.string(), z.number()))
	.handler(async ({ input }) => {
		for (const [id, position] of Object.entries(input)) {
			await prisma.column.update({
				where: {
					id,
				},
				data: {
					position,
				},
			});
		}

		return "ok";
	});
