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
import DetailApl01 from "./pages/config/DetailApl01";

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
        <Route path="configuration" element={<Configuration />} />
        <Route path="jadwal" element={<Jadwal />} />
        <Route path="paket" element={<Paket />} />
        <Route path="detail-peserta/:id" element={<DetailPeserta />} />
        <Route path="tambahpaket" element={<TambahPaket />} />
      </Route>
      <Route path="formulir" element={<DashboardLayout />}>
        <Route path="apl01/:id" element={<DetailApl01 />}/>
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
