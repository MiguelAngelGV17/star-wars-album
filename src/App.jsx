import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/NavbarComponent";
import MiAlbum from "./pages/MiAlbumPage";
import ObtenerLaminas from "./pages/ObtenerLaminasPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MiAlbum />} />
        <Route path="/mi-album" element={<MiAlbum />} />
        <Route path="/obtener-laminas" element={<ObtenerLaminas />} />
      </Routes>
    </>
  );
}

export default App;
