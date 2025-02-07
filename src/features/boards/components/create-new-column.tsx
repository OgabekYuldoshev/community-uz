"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CircleCheck, Plus, X } from "lucide-react";
import type React from "react";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { useColumnStore } from "../stores/column";

export function CreateNewColumn({ boardId }: { boardId: string }) {
	const addColumn = useColumnStore((state) => state.addColumn);
	const [isEditable, setEditable] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const values = new FormData(e.currentTarget);
		const title = values.get("title")?.toString() || "";
		if (title === "") return;
		addColumn({
			title,
			boardId,
		});
		e.currentTarget.reset();
	}

	useOnClickOutside(formRef as any, () => setEditable(false));

	return (
		<li className="block self-start h-full flex-shrink-0">
			<div className="border w-[275px] rounded border-dashed">
				{isEditable ? (
					<form
						ref={formRef}
						onSubmit={onSubmit}
						className="flex flex-col gap-2  p-2"
					>
						<Input autoFocus name="title" placeholder="Enter column title" />
						<div className="flex items-center gap-2">
							<Button className="w-fit" type="submit">
								<CircleCheck />
								<span>Create column</span>
							</Button>
							<Button
								onClick={() => setEditable(false)}
								size="icon"
								variant="ghost"
								type="button"
							>
								<X />
							</Button>
						</div>
					</form>
				) : (
					// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
					<div
						onClick={() => setEditable(true)}
						className="flex gap-2 items-center justify-center w-full select-none cursor-pointer p-2 h-12"
					>
						<Plus size={20} />
						<span className="text-sm">Add another list</span>
					</div>
				)}
			</div>
		</li>
	);
}
