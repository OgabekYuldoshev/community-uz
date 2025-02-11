import { toast } from "sonner";
import { create } from "zustand";
import { setLabelsToTaskAction } from "../actions";

export type CustomLabelType = {
	id: string;
	title: string;
	color: string;
};
type State = {
	labels: Record<string, CustomLabelType[]>;
};

type Action = {
	setLabels(labels: Record<string, CustomLabelType[]>): void;
	toggleLabel(
		taskId: string,
		label: CustomLabelType,
		isRemovable: boolean,
	): void;
};

export type LabelStore = State & Action;

export const useLabelStore = create<LabelStore>((set, get) => ({
	labels: {},
	async toggleLabel(taskId, label, isRemovable) {
		const prevLabels = get().labels;

		if (!isRemovable) {
			set((state) => ({
				labels: {
					...state.labels,
					[taskId]: [...(state.labels[taskId] || [])].filter(
						(l) => l.id !== label.id,
					),
				},
			}));
		} else {
			set((state) => ({
				labels: {
					...state.labels,
					[taskId]: [...(state.labels[taskId] || []), label],
				},
			}));
		}
		try {
			const labels = get().labels;
			const labelsByTaskId = labels[taskId] || [];

			const [_, error] = await setLabelsToTaskAction({
				taskId,
				labelIds: labelsByTaskId.map((l) => l.id),
			});
			if (error) throw error;
		} catch (error: any) {
			toast.error(error.message);
			set({ labels: prevLabels });
		}
	},
	setLabels: (labels) => set({ labels }),
}));
