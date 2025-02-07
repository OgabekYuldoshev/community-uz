"use server";

import { prisma } from "@/lib/prisma";
import { protectedProducer } from "@/lib/server-action";
import { z } from "zod";
import { createNewColumnSchema } from "./schema";

export const createNewColumnAction = protectedProducer
	.input(createNewColumnSchema)
	.handler(async ({ input }) => {
		const column = await prisma.column.create({
			data: input,
		});

		return column;
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
