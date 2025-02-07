import { uid } from "radash";
import { toast } from "sonner";
import { create } from "zustand";
import { createNewTaskAction } from "../actions";

export type CustomTaskType = {
	id: string;
	title: string;
	position: number;
	columnId: string;
};

type State = {
	tasks: CustomTaskType[];
};

type Action = {
	setTasks: (tasks: CustomTaskType[]) => void;
	createNewTask: (values: { title: string; columnId: string }) => void;
	resetTaskStore: () => void;
};

export type TaskStore = State & Action;

const initialState: State = {
	tasks: [],
};

export const useTaskStore = create<TaskStore>((set, get) => ({
	...initialState,
	setTasks: (tasks: CustomTaskType[]) => set({ tasks }),
	createNewTask: async ({ title, columnId }) => {
		const prevTasks = get().tasks;
		try {
			const newTask: CustomTaskType = {
				id: `optimistic-${uid(10)}`,
				title,
				position: prevTasks.length + 1,
				columnId,
			};

			set((state) => ({
				tasks: [...state.tasks, newTask],
			}));

			const [data, error] = await createNewTaskAction({
				title: newTask.title,
				position: newTask.position,
				columnId: newTask.columnId,
			});

			if (error) throw error;
			newTask.id = data.id;
		} catch (error: any) {
			toast.error(error.message);
			set({ tasks: prevTasks });
		}
	},
	resetTaskStore: () => set(initialState),
}));
