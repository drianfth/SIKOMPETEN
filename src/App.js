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
import DetailIa01 from "./pages/config/fourmulirAsesor/ia01/DetailIa01";
import DaftarIa07 from "./pages/config/fourmulirAsesor/ia07/DaftarIa07";
import FrIa07 from "./pages/config/fourmulirAsesor/ia07/FrIa07";
import FormulirIa07 from "./pages/config/fourmulirAsesor/ia07/FormulirIa07";
import DetailIa07 from "./pages/config/fourmulirAsesor/ia07/DetailIa07";
import DaftarIa03 from "./pages/config/fourmulirAsesor/ia03/DaftarIa03";
import FrIa03 from "./pages/config/fourmulirAsesor/ia03/FrIa03";
import FormulirIa03 from "./pages/config/fourmulirAsesor/ia03/FormulirIa03";
import DaftarTuk from "./pages/config/Tuk/DaftarTuk";
import DetailIa03 from "./pages/config/fourmulirAsesor/ia03/DetailIa03";
import ListFr from "./pages/result-asesi/ListFr";
import DetailApl01U from "./pages/result-asesi/DetailApl01U";
import DetailApl02U from "./pages/result-asesi/DetailApl02U";
import DetailAk01U from "./pages/result-asesi/DetailAk01U";
import DetailIA01U from "./pages/result-asesi/DetailIA01U";
import DetailIA03U from "./pages/result-asesi/DetailIA03U";
import DetailIA07U from "./pages/result-asesi/DetailIA07U";
import DaftarAK02 from "./pages/config/fourmulirAsesor/ak02/DaftarAK02";
import FrAk02 from "./pages/config/fourmulirAsesor/ak02/FrAk02";
import DetailAK02 from "./pages/config/fourmulirAsesor/ak02/DetailAK02";
import DetailAK02U from "./pages/result-asesi/DetailAK02U";
import DetailAK03 from "./pages/result-asesi/ak03/DetailAK03";
import FrAk03 from "./pages/result-asesi/ak03/FrAk03";
import FrIa11 from "./pages/config/fourmulirAsesor/ia11/FrIa11";
import DaftarIa11 from "./pages/config/fourmulirAsesor/ia11/DaftarIa11";
import FormulirIa11 from "./pages/config/fourmulirAsesor/ia07/FormulirIa11";
import DetailIa11 from "./pages/config/fourmulirAsesor/ia11/DetailIa11";
import DetailAk05 from "./pages/config/fourmulirAsesor/ak05/DetailAk05";
import FrAk05 from "./pages/config/fourmulirAsesor/ak05/FrAk05";
import DaftarAK06 from "./pages/config/fourmulirAsesor/ak06/DaftarAK06";
import DetailAk06 from "./pages/config/fourmulirAsesor/ak06/DetailAk06";
import FrAk06 from "./pages/config/fourmulirAsesor/ak06/FrAk06";
import FrIa02 from "./pages/uji-kompetensi/FrIa02";
import PdfApl01 from "./pages/config/DetailApl01/PdfApl01";

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
        <Route path="daftar-ia03/" element={<DaftarIa03 />} />
        <Route path="daftar-ia07/" element={<DaftarIa07 />} />
        <Route path="daftar-ia11/" element={<DaftarIa11 />} />
        <Route path="daftar-ak02/" element={<DaftarAK02 />} />

        <Route path="daftar-ak06/" element={<DaftarAK06 />} />

        <Route path="detail-peserta/:id" element={<DetailPeserta />} />
        {/* <Route path="daftar-mapa01/" element={<DaftarMapa01 />} /> */}
      </Route>
      <Route path="hasil" element={<ConfigurationLayout />}>
        <Route path="formulir/:id" element={<ListFr />} />
        <Route path="detailapl01/:id" element={<DetailApl01U />} />
        <Route path="detailapl02/:id" element={<DetailApl02U />} />
        <Route path="detailak01/:id" element={<DetailAk01U />} />
        <Route path="detailia01/:id" element={<DetailIA01U />} />
        <Route path="detailia03/:id" element={<DetailIA03U />} />
        <Route path="detailia07/:id" element={<DetailIA07U />} />
        <Route path="detailak02/:id" element={<DetailAK02U />} />
        <Route path="detailak03/:id" element={<DetailAK03 />} />
        <Route path="detailak05/" element={<DetailAk05 />} />
        <Route path="detailak06/" element={<DetailAk06 />} />
        <Route path="pdfapl01/" element={<PdfApl01 />} />
      </Route>

      <Route path="formulir" element={<DashboardLayout />}>
        <Route path="apl01/:id" element={<DetailApl01 />} />
        <Route path="apl02/:id" element={<DetailApl02 />} />
        <Route path="aka01/" element={<Ak01 />} />
        <Route path="detailak01/:id" element={<DetailAk01 />} />
        <Route path="frak01/" element={<FrAk01 />} />
        <Route path="fria01/" element={<FrIa01 />} />
        <Route path="fria03/" element={<FrIa03 />} />
        <Route path="fria07/" element={<FrIa07 />} />
        <Route path="fria11/" element={<FrIa11 />} />
        <Route path="frak02/" element={<FrAk02 />} />
        <Route path="frak03/:id" element={<FrAk03 />} />
        <Route path="frak05/" element={<FrAk05 />} />
        <Route path="frak06/" element={<FrAk06 />} />
        <Route path="fria02/" element={<FrIa02 />} />
        <Route path="ujian-fria01/" element={<FormulirIa01 />} />
        <Route path="ujian-fria03/" element={<FormulirIa03 />} />
        <Route path="ujian-fria07/" element={<FormulirIa07 />} />
        <Route path="ujian-fria11/" element={<FormulirIa11 />} />
        <Route path="detailia01/:id" element={<DetailIa01 />} />
        <Route path="detailia03/:id" element={<DetailIa03 />} />
        <Route path="detailia07/:id" element={<DetailIa07 />} />
        <Route path="detailak02/:id" element={<DetailAK02 />} />
        <Route path="detailia11/:id" element={<DetailIa11 />} />
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
