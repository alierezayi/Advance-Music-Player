import { create } from "zustand";

interface OpenPlayerContentStore {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useOpenPlayerContent = create<OpenPlayerContentStore>((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
}));

export default useOpenPlayerContent;
