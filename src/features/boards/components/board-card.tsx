import Link from "next/link";
import React from "react";

export type BoardCardProps = {
	id: string;
	title: string;
};
export function BoardCard({ title, id }: BoardCardProps) {
	return (
		<Link
			href={`/boards/${id}`}
			className="border rounded p-4 h-32 cursor-pointer hover:ring transition-all"
		>
			<h1 className="line-clamp-2">{title}</h1>
		</Link>
	);
}
