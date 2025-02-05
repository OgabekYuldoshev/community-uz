import {
	DEFAULT_SERVER_ERROR_MESSAGE,
	createSafeActionClient,
} from "next-safe-action";
import { auth } from "./auth";

export const actionClient = createSafeActionClient({
	defaultValidationErrorsShape: "flattened",
	handleServerError(e) {
		// Log to console.
		console.error("Action error:", e.message);

		return DEFAULT_SERVER_ERROR_MESSAGE;
	},
});

export const authActionClient = actionClient.use(async ({ next }) => {
	const session = await auth();

	if (!session) throw new Error("Invalid credentials.");

	return next({ ctx: { user: session.user } });
});
