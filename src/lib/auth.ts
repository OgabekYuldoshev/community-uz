import NextAuth, { type User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { omit } from "radash";
import { z } from "zod";
import { comparePassword } from "./password";
import { prisma } from "./prisma";

const authSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

declare module "next-auth" {
	interface Session {
		user: User & {
			id: string;
			role: string;
		};
	}
}

export const { handlers, signIn, signOut, auth } = NextAuth({
	session: { strategy: "jwt" },
	secret: process.env.AUTH_SECRET,
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
	callbacks: {
		async session({ token, session }) {
			if (token) {
				session.user.id = token.sub as string;
				session.user.email = token.email as string;
				session.user.name = token.name as string;
				session.user.image = token.picture as string;
			}
			return session;
		},
	},
});
