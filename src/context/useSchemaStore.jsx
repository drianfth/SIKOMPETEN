import create from "zustand";
import { persist } from "zustand/middleware";


const useSchemaStore = create((set, get) => ({
  schema: null,
  setSchema: (schema) => set({ schema: schema }),
}));

export default useSchemaStore;
