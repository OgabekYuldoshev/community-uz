import { create } from "zustand";
import type { StatusInferType } from "../type";

type State = {
	statuses: StatusInferType;
};
type Action = {
	setStatuses(statuses: StatusInferType): void;
};

export type KanbanState = State & Action;

export const useKanban = create<KanbanState>((set) => ({
	statuses: [],
	setStatuses(statuses) {
		set({ statuses });
	},
}));
