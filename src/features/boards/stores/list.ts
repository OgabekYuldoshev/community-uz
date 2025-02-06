import { create } from "zustand";

export type Column = {
	id: string;
	title: string;
};
interface State {
	columns: Column[];
}

interface Action {
	setColumns: (columns: Column[]) => void;
	addColumn: (column: Column) => void;
}

type ListStore = State & Action;

export const useListStore = create<ListStore>((set) => ({
	columns: [],
	setColumns: (columns) => set(() => ({ columns })),
	addColumn: (column) =>
		set((state) => ({ columns: [...state.columns, column] })),
}));
