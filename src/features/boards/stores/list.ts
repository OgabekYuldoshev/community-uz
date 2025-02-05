import { create } from "zustand";

export type List = {
  id: string,
  title: string
}
interface State {
  lists: List[]
}

interface Action {
  setLists: (lists: List[]) => void
  addList: (list: List) => void
}

type ListStore = State & Action

export const useListStore = create<ListStore>((set) => ({
  lists: [],
  setLists: (lists) => set(() => ({ lists })),
  addList: (list) => set((state) => ({ lists: [...state.lists, list] }))
}))