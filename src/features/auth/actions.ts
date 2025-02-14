"use server";

import { signIn, signOut } from "@/lib/auth";

export const loginAction = signIn;

export const logOutAction = signOut;
