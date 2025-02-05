import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { omit } from "radash";
import { z } from "zod";
import { comparePassword } from "./password";
import { prisma } from "./prisma";

const authSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
	session: { strategy: "jwt" },
	providers: [
		Credentials({
			id: "credentials",
			name: "credentials",
			credentials: {
				email: {
					type: "email",
				},
				password: {
					type: "password",
				},
			},
			async authorize(values) {
				try {
					const result = await authSchema.parseAsync(values);
					const user = await prisma.user.findUnique({
						where: {
							email: result.email,
						},
					});

					if (!user) {
						throw new Error("Invalid credentials.");
					}

					const isCorrect = await comparePassword(
						result.password,
						user.password || "",
					);

					if (!isCorrect) {
						throw new Error("Invalid credentials.");
					}

					return omit(user, ["password"]);
				} catch (error) {
					console.error(error);
					return null;
				}
			},
		}),
	],
});
