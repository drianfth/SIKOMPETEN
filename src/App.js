import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./pages/Home";
import UjiKompetensi from "./pages/uji-kompetensi/UjiKompetensi";
import Apl01 from "./pages/uji-kompetensi/Apl01";
import NotFound from "./pages/NotFound";
import Configuration from "./pages/Configuration";
import Jadwal from "./components/maseterJadwal/Jadwal";
import Paket from "./pages/config/Paket";
import TambahPaket from "./components/TambahPaket";
import Apl02Layout from "./layouts/Apl02Layout";
import Apl02 from "./pages/uji-kompetensi/Apl02";
import FormApl02 from "./components/apl02/FormApl02";
import DetailPeserta from "./pages/config/DetailPeserta";
import DetailApl01 from "./pages/config/DetailApl01/DetailApl01";
import ConfigurationLayout from "./layouts/ConfigurationLayout";
import Sesi from "./pages/config/Sesi";
import Formulir from "./pages/config/Formulir";
import DetailApl02 from "./pages/config/DetailApl02/DetailApl02";
import FormulirAsesor from "./pages/config/FormulirAsesor";
import DaftarAK01 from "./pages/config/fourmulirAsesor/ak01/DaftarAK01";
import Ak01 from "./pages/config/fourmulirAsesor/ak01/Ak01";
import FrAk01 from "./pages/uji-kompetensi/FrAk01";
import DetailAk01 from "./pages/config/DetailAk01/DetailAk01";
import DaftarIa01 from "./pages/config/fourmulirAsesor/ia01/DaftarIa01";
import FrIa01 from "./pages/config/fourmulirAsesor/ia01/FrIa01";
import FormulirIa01 from "./pages/config/fourmulirAsesor/ia01/FormulirIa01";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<LandingPage />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="login" element={<Login />} />
      <Route path="dashboard" element={<DashboardLayout />}>
        <Route index element={<Home />} />
        <Route path="uji-kompetensi" element={<UjiKompetensi />} />
        <Route path="apl01" element={<Apl01 />} />
        <Route path="jadwal" element={<Jadwal />} />
        <Route path="tambahpaket" element={<TambahPaket />} />
      </Route>
      <Route path="configuration" element={<ConfigurationLayout />}>
        <Route index element={<Configuration />} />
        <Route path="paket" element={<Paket />} />
        <Route path="sesi/:id" element={<Sesi />} />
        <Route path="formulir/:id" element={<Formulir />} />
        <Route path="formulir-asesor/:id" element={<FormulirAsesor />} />
        <Route path="mapa01/:id" element={<FormulirAsesor />} />
        <Route path="daftar-ak01/" element={<DaftarAK01 />} />
        <Route path="daftar-ia01/" element={<DaftarIa01 />} />
        {/* <Route path="daftar-mapa01/" element={<DaftarMapa01 />} /> */}
        <Route path="detail-peserta/:id" element={<DetailPeserta />} />
      </Route>

      <Route path="formulir" element={<DashboardLayout />}>
        <Route path="apl01/:id" element={<DetailApl01 />} />
        <Route path="apl02/:id" element={<DetailApl02 />} />
        <Route path="aka01/" element={<Ak01 />} />
        <Route path="detailak01/:id" element={<DetailAk01 />} />
        <Route path="frak01/" element={<FrAk01 />} />
        <Route path="fria01/" element={<FrIa01 />} />
        <Route path="ujian-fria01/" element={<FormulirIa01 />} />
      </Route>

      <Route path="apl02" element={<Apl02Layout />}>
        <Route index element={<Apl02 />} />
        <Route path="ujian" element={<FormApl02 />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    <div className="App font-poppins">
      <main>
        <RouterProvider router={router} />
      </main>
    </div>
  );
}

export default App;
