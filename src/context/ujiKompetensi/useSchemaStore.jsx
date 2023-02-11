import create from "zustand";
import { persist } from "zustand/middleware";

const useSchemaStore = create(
  persist(
    (set, get) => ({
      schema: null,
      setSchema: (schema) => set({ schema: schema }),
    }),
    {
      name: "schema-storage",
      getStorage: () => sessionStorage,
    }
  )
);

export default useSchemaStore;
