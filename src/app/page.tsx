import { auth, signIn } from "@/lib/auth";
import React from "react";

export default async function page() {
	const session = await auth();
	console.log(session);
	return (
		<div>
			<form
				action={async () => {
					"use server";
					await signIn("credentials", {
						email: "yuldashoff1@gmail.com",
						password: "123456",
					});
				}}
			>
				<button type="submit">Sign in</button>
			</form>
		</div>
	);
}
