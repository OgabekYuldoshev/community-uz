import { arrayMove } from "@dnd-kit/sortable";
import { uid } from "radash";
import { toast } from "sonner";
import { create } from "zustand";
import { createNewColumnAction, updateColumnPositionAction } from "../actions";

export type CustomColumnType = {
	id: string;
	title: string;
	position: number;
	boardId: string;
};

type State = {
	columns: CustomColumnType[];
};

type Action = {
	setColumns: (columns: CustomColumnType[]) => void;
	createNewColumn: (values: { title: string; boardId: string }) => void;
	updateColumnsPosition: (from: number, to: number) => void;

	resetColumnStore: () => void;
};

export type ColumnStore = State & Action;

const initialState: State = {
	columns: [],
};

export const useColumnStore = create<ColumnStore>((set, get) => ({
	...initialState,
	setColumns: (columns) => set({ columns }),
	updateColumnsPosition: async (from, to) => {
		const prevColumns = get().columns;
		try {
			const movedColumns = arrayMove(prevColumns, from, to);
			set({ columns: movedColumns });
			console.log(
				movedColumns.reduce(
					// biome-ignore lint/performance/noAccumulatingSpread: <explanation>
					(prev, item, index) => ({ ...prev, [item.id]: index + 1 }),
					{} as Record<string, number>,
				),
			);
			const [_, error] = await updateColumnPositionAction(
				movedColumns.reduce(
					// biome-ignore lint/performance/noAccumulatingSpread: <explanation>
					(prev, item, index) => ({ ...prev, [item.id]: index + 1 }),
					{} as Record<string, number>,
				),
			);

			if (error) throw error;
		} catch (error: any) {
			toast.error(error.message);
			set({ columns: prevColumns });
		}
	},

	createNewColumn: async ({ title, boardId }) => {
		const prevColumns = get().columns;
		try {
			const newColumn: CustomColumnType = {
				id: `optimistic-${uid(10)}`,
				title,
				position: prevColumns.length + 1,
				boardId,
			};

			set((state) => ({
				columns: [...state.columns, newColumn],
			}));

			const [data, error] = await createNewColumnAction({
				title: newColumn.title,
				position: newColumn.position,
				boardId: newColumn.boardId,
			});
			if (error) throw error;
			newColumn.id = data.id;
		} catch (error: any) {
			toast.error(error.message);
			set({ columns: prevColumns });
		}
	},
	resetColumnStore: () => set(initialState),
}));
