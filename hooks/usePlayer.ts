import { create } from "zustand";

interface State {
    ids: string[]
    activeId?: string 
}

interface Action {
    setId: (id: string) => void;
    setIds: (ids: string[]) => void;
    reset: () => void;
}

const usePlayer = create<State & Action>((set) => (
    {
        ids: [],
        activeId: undefined,
        setId: (id) => set({ activeId: id }),
        setIds: (ids) => set({ ids: ids }),
        reset: () => set({ ids: [], activeId: undefined })
    }
))

export default usePlayer
