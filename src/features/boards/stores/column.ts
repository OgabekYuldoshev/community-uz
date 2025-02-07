import { arrayMove } from "@dnd-kit/sortable";
import { uid } from "radash";
import { toast } from "sonner";
import { create } from "zustand";
import { createColumnAction, updateColumnPositionAction } from "../actions";

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
	reset: () => void;
	moveColumns: (from: number, to: number) => void;
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
	moveColumns: async (from, to) => {
		const prevColumns = get().columns;
		try {
			const movedColumns = arrayMove(prevColumns, from, to).map(
				(item, index) => ({
					...item,
					position: index + 1,
				}),
			);

			set({
				columns: movedColumns,
			});
			const [_, error] = await updateColumnPositionAction(
				movedColumns.reduce(
					// biome-ignore lint/performance/noAccumulatingSpread: <explanation>
					(prev, item) => ({ ...prev, [item.id]: item.position }),
					{} as Record<string, number>,
				),
			);
			if (error) throw error;
		} catch (error: any) {
			toast.error(error.message);
			set({
				columns: prevColumns,
			});
		}
	},
	reset() {
		set({ columns: [] });
	},
}));
