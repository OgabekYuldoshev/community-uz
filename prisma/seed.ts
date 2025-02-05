import { hashPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";
import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();

loadEnvConfig(projectDir);

(async () => {
	try {
		const email = process.env.ADMIN_EMAIL || "admin@admin.com";
		const password = await hashPassword(
			process.env.ADMIN_PASSWORD || "admin1234",
		);

		const user = await prisma.user.create({
			data: {
				name: "Admin",
				email,
				password,
				role: "ADMIN",
			},
		});
		console.log(user);
	} catch (error) {
		console.log(error);
	}
})();
