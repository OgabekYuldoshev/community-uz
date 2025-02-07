import { uid } from "radash";
import { toast } from "sonner";
import { create } from "zustand";
import { createColumnAction } from "../actions";

export type ColumnType = {
	id: string;
	title: string;
	position: number;
};
interface State {
	columns: ColumnType[];
}

interface Action {
	setColumns: (columns: ColumnType[]) => void;
	addColumn: (value: { title: string; boardId: string }) => void;
	reset(): void;
}

type ColumnStore = State & Action;

export const useColumnStore = create<ColumnStore>((set, get) => ({
	columns: [],
	setColumns: (columns) => set({ columns }),

	addColumn: async ({ title, boardId }) => {
		const prevColumns = get().columns;
		try {
			const position = prevColumns.length + 1;

			const column: ColumnType = {
				id: `optimistic-${uid(8)}`,
				title,
				position,
			};

			set((state) => ({
				columns: [...state.columns, column],
			}));

			const [data, error] = await createColumnAction({
				title,
				position,
				boardId,
			});

			if (error) throw error;
			column.id = data.id;
		} catch (error: any) {
			toast.error(error.message);
			set({ columns: prevColumns });
		}
	},

	reset() {
		set({ columns: [] });
	},
}));
