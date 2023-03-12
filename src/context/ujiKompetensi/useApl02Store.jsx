import create from "zustand";
import { persist } from "zustand/middleware";

const useApl02Store = create(
  persist(
    (set, get) => ({
      validation: null,
      historyApl01: null,
      setValidation: (validation) => set({ validation: validation }),
      setHistoryApl01: (historyApl01) => set({ historyApl01: historyApl01 }),
    }),
    {
      name: "apl02-storage",
      getStorage: () => sessionStorage,
    }
  )
);

export default useApl02Store;
