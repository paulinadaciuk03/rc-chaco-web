import "./App.css";
import Inicio from "./components/Inicio/Inicio";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuienesSomos from "./components/QuienesSomos/QuienesSomos";
import { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import Register from "./components/Login/Register";
import Login from "./components/Login/Login";
import Cursos from "./components/Cursos/Cursos";
import ProfileAdmin from "./components/Profile/ProfileAdmin";
import ProfileUser from "./components/Profile/ProfileUser";
import MainLayout from "./components/Layout/MainLayout";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duración global de las animaciones
      once: true, // Animar solo una vez
    });
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Inicio></Inicio>}></Route>
            <Route
              path="/quienes-somos"
              element={<QuienesSomos></QuienesSomos>}
            ></Route>
            <Route path="/register" element={<Register></Register>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/cursos" element={<Cursos></Cursos>}></Route>
            <Route
              path="/admin"
              element={<ProfileAdmin></ProfileAdmin>}
            ></Route>
            <Route path="/perfil" element={<ProfileUser></ProfileUser>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
