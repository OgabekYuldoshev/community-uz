import { uid } from "radash";
import type { z } from "zod";
import { create } from "zustand";
import { createColumnAction } from "../actions";
import type { columnFormSchema } from "../schema";

export type Column = {
	id: string;
	title: string;
	position: number;
};
interface State {
	columns: Column[];
}

interface Action {
	setColumns: (columns: Column[]) => void;
	addColumn: (value: { title: string; boardId: string }) => void;
}

type ListStore = State & Action;

export const useColumnStore = create<ListStore>((set, get) => ({
	columns: [],
	setColumns: (columns) => set(() => ({ columns })),
	addColumn: async ({ title, boardId }) => {
		const prevColumns = get().columns;

		const optimisticId = `optimistic-${uid(8)}`;
		const position = prevColumns.length + 1;

		try {
			set((state) => ({
				columns: [
					...state.columns,
					{
						id: optimisticId,
						title,
						position,
					},
				],
			}));
			const [data, error] = await createColumnAction({
				title,
				position,
				boardId,
			});

			if (error) throw error;
			console.log(data);
		} catch (error) {
			console.log(error);
			set(() => ({ columns: prevColumns }));
		}
	},
}));
