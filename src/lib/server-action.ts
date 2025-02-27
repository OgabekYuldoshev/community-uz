import { ZSAError, createServerAction, createServerActionProcedure } from "zsa";
import { auth } from "./auth";

const authProducer = createServerActionProcedure().handler(async () => {
	try {
		const session = await auth();

		if (!session) {
			throw new ZSAError("NOT_AUTHORIZED", "Invalid credentials.");
		}

		return {
			user: session.user,
		};
	} catch (error) {
		console.error(error);
		throw new ZSAError("INTERNAL_SERVER_ERROR", "Internal Server Error");
	}
});

export const publicProducer = createServerAction();

export const protectedProducer = authProducer.createServerAction();
