"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginAction } from "./action";

const formSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

type FormValue = z.infer<typeof formSchema>;

export default function Page() {
	const form = useForm<FormValue>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(data: FormValue) {
		try {
			await loginAction("credentials", data);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div className="w-full h-full min-h-screen flex items-center justify-center">
			<Card className="w-full max-w-[400px]">
				<CardHeader>
					<CardTitle>Welcome back!</CardTitle>
					<CardDescription>Please, enter your details.</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="grid grid-cols-1 gap-4"
						>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter your email"
												type="email"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter your password"
												type="password"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit">
								{form.formState.isSubmitting ? (
									<Loader2 className="animate-spin" />
								) : null}
								Sign in
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
