import create from "zustand";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NoteAltIcon from "@mui/icons-material/NoteAlt";

const useNavStore = create((set, get) => ({
  activeNav: [
    {
      id: 1,
      name: "Dashboard",
      href: "/dashboard",
      active: true,
      icon: <DashboardIcon />,
    },
    {
      id: 2,
      name: "Uji Kompetensi",
      href: "uji-kompetensi",
      active: false,
      icon: <NoteAltIcon />,
    },
  ],
  findNav: (label) => {
    return get().activeNav.find((nav) => nav.name === label);
  },
  findActiveNav: () => {
    return get().activeNav.find((nav) => nav.active === true);
  },
  switchNav: (id) =>
    set(() => ({
      activeNav: get().activeNav.map((nav) => {
        if (nav.id === id) {
          return {
            ...nav,
            active: true,
          };
        } else {
          return {
            ...nav,
            active: false,
          };
        }
      }),
    })),
}));

export default useNavStore;
