"use client";

import type { Board } from "@prisma/client";
import { type PropsWithChildren, createContext, useContext } from "react";

export type BoardContextType = {
	board: Board;
};

export const BoardContext = createContext<BoardContextType>({
	board: {} as Board,
});

export const useBoard = () => {
	const ctx = useContext(BoardContext);

	if (!ctx) {
		throw new Error("useBoard must be used within a BoardProvider");
	}

	return ctx;
};

export type BoardProviderProps = PropsWithChildren<{
	board: Board;
}>;
export const BoardProvider = ({ children, board }: BoardProviderProps) => {
	return (
		<BoardContext.Provider value={{ board }}>{children}</BoardContext.Provider>
	);
};
