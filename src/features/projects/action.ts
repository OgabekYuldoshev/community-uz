"use server";

import { prisma } from "@/lib/prisma";
import { protectedProducer } from "@/lib/server-action";
import { z } from "zod";
import { ZSAError } from "zsa";
import { projectFormSchema, statusFormSchema } from "./schema";

export const createNewProjectAction = protectedProducer
	.input(projectFormSchema)
	.handler(async ({ ctx, input }) => {
		const userId = ctx.user.id;

		const project = await prisma.project.create({
			data: {
				name: input.name,
				description: input.description,
				userId,
				Status: {
					createMany: {
						data: [
							{
								name: "To do",
								position: 0,
							},
							{
								name: "In Progress",
								position: 1,
							},
							{
								name: "Done",
								position: 2,
							},
						],
					},
				},
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

export const getProjectByIdAction = protectedProducer
	.input(z.object({ id: z.string().cuid() }))
	.handler(async ({ input }) => {
		const project = await prisma.project.findUnique({
			where: {
				id: input.id,
			},
		});

		if (!project) {
			throw new ZSAError("NOT_FOUND", "Project not found");
		}

		return project;
	});

export const getStatusByProjectId = protectedProducer
	.input(z.object({ id: z.string().cuid() }))
	.handler(async ({ input }) => {
		const status = await prisma.status.findMany({
			where: {
				projectId: input.id,
			},
			orderBy: {
				position: "asc",
			},
			select: {
				id: true,
				name: true,
				position: true,
			},
		});

		return status;
	});

export const createNewStatusAction = protectedProducer
	.input(
		statusFormSchema.extend({
			projectId: z.string().cuid(),
			position: z.number(),
		}),
	)
	.handler(async ({ input }) => {
		const status = await prisma.status.create({
			data: {
				name: input.name,
				position: input.position,
				projectId: input.projectId,
			},
			select: {
				id: true,
				name: true,
				position: true,
			},
		});

		return status;
	});
