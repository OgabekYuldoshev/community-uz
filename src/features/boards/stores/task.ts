import { uid } from "radash";
import { toast } from "sonner";
import { create } from "zustand";
import { createTaskAction } from "../actions";

export type TaskType = {
	id: string;
	title: string;
	position: number;
	columnId: string;
};

type State = {
	tasks: TaskType[];
};

type Action = {
	setTasks: (tasks: TaskType[]) => void;
	addTask: (value: { title: string; columnId: string }) => void;
	reset(): void;
};

type TaskStore = State & Action;

export const useTaskStore = create<TaskStore>((set, get) => ({
	tasks: [],
	setTasks: (tasks: TaskType[]) => set({ tasks }),
	addTask: async ({ title, columnId }) => {
		const prevTasks = get().tasks;

		try {
			const task: TaskType = {
				id: uid(8),
				title,
				position: prevTasks.length + 1,
				columnId,
			};

			set((state) => ({
				tasks: [...state.tasks, task],
			}));

			const [data, error] = await createTaskAction({
				title,
				position: task.position,
				columnId,
			});

			if (error) throw error;
			task.id = data.id;
		} catch (error: any) {
			toast.error(error.message);
			set(() => ({ tasks: prevTasks }));
		}
	},
	reset() {
		set({ tasks: [] });
	},
}));
