"use client";

import React, { type PropsWithChildren } from "react";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

export default function AuthProvider({
	children,
	session,
}: PropsWithChildren<{ session: Session }>) {
	return <SessionProvider session={session}>{children}</SessionProvider>;
}
