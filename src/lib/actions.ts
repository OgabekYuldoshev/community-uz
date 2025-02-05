import { createSafeActionClient } from "next-safe-action";
import { auth } from "./auth";

export const actionClient = createSafeActionClient();

export const authActionClient = createSafeActionClient().use(
	async ({ next }) => {
		const session = await auth();

		if (!session) throw new Error("Invalid credentials.");

		return next({ ctx: { user: session.user } });
	},
);
