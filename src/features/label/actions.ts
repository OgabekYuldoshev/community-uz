"use server";

import { protectedProducer } from "@/lib/server-action";
import { createNewLabelSchema } from "./schema";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export const createNewLabelAction = protectedProducer
	.input(createNewLabelSchema)
	.handler(async ({ input }) => {
		const label = await prisma.label.create({
			data: input
		})

		return {
			id: label.id,
			title: label.title,
			color: label.color,
			boardId: label.boardId,
		};
	});


export const getLabelsByBoardIdAction = protectedProducer
	.input(z.object({ boardId: z.string() }))
	.handler(async ({ input }) => {
		const labels = await prisma.label.findMany({
			where: {
				boardId: input.boardId,
			},
		});

		return labels;
	});

export const setLabelsToTaskAction = protectedProducer
	.input(z.object({ taskId: z.string(), labelIds: z.array(z.string()) }))
	.handler(async ({ input }) => {
		console.log(input.labelIds);
		await prisma.task.update({
			where: {
				id: input.taskId,
			},
			data: {
				labels: {
					set: [],
					connect: input.labelIds.map((id) => ({ id })),
				},
			},
		});

		return "ok"
	});