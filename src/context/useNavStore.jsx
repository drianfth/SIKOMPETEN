import create from "zustand";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import SettingsIcon from "@mui/icons-material/Settings";

const useNavStore = create((set, get) => ({
  activeNav: [
    {
      id: 1,
      name: "Configuration",
      href: "/configuration",
      active: false,
      asesi: true,
      asesor: true,
      admin: true,
      icon: <SettingsIcon />,
    },
    {
      id: 2,
      name: "Dashboard",
      href: "/dashboard",
      active: true,
      asesi: true,
      asesor: true,
      admin: true,
      icon: <DashboardIcon />,
    },
    {
      id: 3,
      name: "Uji Kompetensi",
      href: "/dashboard/uji-kompetensi",
      active: false,
      asesi: true,
      asesor: true,
      admin: false,
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
