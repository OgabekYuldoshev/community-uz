import { uid } from "radash";
import type { z } from "zod";
import { create } from "zustand";
import { createColumnAction } from "../actions";
import type { columnFormSchema } from "../schema";

export type Column = {
	id: string;
	title: string;
};
interface State {
	columns: Column[];
}

interface Action {
	setColumns: (columns: Column[]) => void;
	addColumn: (column: z.infer<typeof columnFormSchema>) => void;
}

type ListStore = State & Action;

export const useListStore = create<ListStore>((set, get) => ({
	columns: [],
	setColumns: (columns) => set(() => ({ columns })),
	addColumn: async ({ title, boardId }) => {
		const prevColumns = get().columns;

		const optimisticId = `optimistic-${uid(8)}`;

		try {
			set((state) => ({
				columns: [
					...state.columns,
					{
						id: optimisticId,
						title,
					},
				],
			}));
			const [data, error] = await createColumnAction({
				title,
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
