"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { LoginForm } from "@/features/auth/components/login-form";

import React from "react";

export default function Page() {
	return (
		<div className="w-full h-full min-h-screen flex items-center justify-center">
			<Card className="w-full max-w-[400px]">
				<CardHeader>
					<CardTitle>Welcome back!</CardTitle>
					<CardDescription>Please, enter your details.</CardDescription>
				</CardHeader>
				<CardContent>
					<LoginForm />
				</CardContent>
			</Card>
		</div>
	);
}
