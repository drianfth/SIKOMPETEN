import create from "zustand";
import { persist } from "zustand/middleware";

const useApl02Store = create(
  persist(
    (set, get) => ({
      validation: null,
      setValidation: (validation) => set({ validation: validation }),
    }),
    {
      name: "apl02-storage",
      getStorage: () => sessionStorage,
    }
  )
);

export default useApl02Store;
