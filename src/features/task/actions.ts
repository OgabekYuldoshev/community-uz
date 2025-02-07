"use server";

import { prisma } from "@/lib/prisma";
import { protectedProducer } from "@/lib/server-action";
import { z } from "zod";
import { ZSAError } from "zsa";
import { createNewTaskSchema } from "./schema";

export const createNewTaskAction = protectedProducer
	.input(createNewTaskSchema)
	.handler(async ({ input }) => {
		const column = await prisma.column.findUnique({
			where: {
				id: input.columnId,
			},
		});

		if (!column) {
			throw new ZSAError("ERROR", "Column not found");
		}
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

export const getTaskByIdAction = protectedProducer
	.input(z.object({ taskId: z.string() }))
	.handler(async ({ input }) => {
		const task = await prisma.task.findUnique({
			where: {
				id: input.taskId,
			},
		});
		if (!task) {
			throw new ZSAError("NOT_FOUND", "Task not found");
		}

		return task;
	});
