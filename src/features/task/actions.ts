"use server";

import { prisma } from "@/lib/prisma";
import { protectedProducer } from "@/lib/server-action";
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
