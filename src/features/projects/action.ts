"use server";

import { prisma } from "@/lib/prisma";
import { protectedProducer } from "@/lib/server-action";
import { projectFormSchema } from "./schema";

export const createNewProjectAction = protectedProducer
	.input(projectFormSchema)
	.handler(async ({ ctx, input }) => {
		const userId = ctx.user.id;

		const project = await prisma.project.create({
			data: {
				name: input.name,
				description: input.description,
				userId,
			},
		});

		return project;
	});

export const getProjectsAction = protectedProducer.handler(async ({ ctx }) => {
	const userId = ctx.user.id;

	const projects = await prisma.project.findMany({
		where: {
			userId,
		},
		select: {
			id: true,
			name: true,
		},
	});

	return projects;
});
