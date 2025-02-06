"use client";

import { Input } from "@/components/ui/input";
import type React from "react";

export function AddColumn({ boardId }: { boardId: string }) {
	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const values = new FormData(e.currentTarget);
		const title = values.get("title");
		if (title === "") return;
		console.log(title, boardId);
		e.currentTarget.reset();
	}
	return (
		<li className="block self-start h-full flex-shrink-0">
			<div className="border p-2 w-[200px]">
				<form onSubmit={onSubmit}>
					<Input name="title" />
				</form>
			</div>
		</li>
	);
}
