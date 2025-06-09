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
import MainLayout from "./components/Layout/MainLayout";
import { Toaster } from "sonner";
import Configuracion from "./components/Configuracion/Configuracion";
import CambiarPass from "./components/Configuracion/CambiarPass";
import ProtectedRoute from "./components/ProtectedRoute";
import Noticia from "./components/Noticia/Noticia";
import Novedades from "./components/Novedades/Novedades";
import NoticiaDetalle from "./components/Noticia/NoticiaDetalle";
import NoticiaEditar from "./components/Noticia/NoticiaEditar";
import Inscripciones from "./components/Inscripciones/Inscripciones";
import { useUserStore } from "./store/userStore";
import EditarDatos from "./components/Configuracion/EditarDatos";
import Servicios from "./components/Servicios/Servicios";
import GestionarUsuarios from "./components/Configuracion/GestionarUsuarios";

function InitUserStore() {
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  useEffect(() => {
    const storedUserStr = localStorage.getItem("user");
    if (storedUserStr) {
      const storedUser = JSON.parse(storedUserStr);
      setUser(storedUser);
    } else {
      clearUser();
    }
  }, []);

  return null;
}

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <>
      <InitUserStore />
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
              path="/configuracion"
              element={
                <ProtectedRoute>
                  <Configuracion></Configuracion>
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/cambiar-pass"
              element={
                <ProtectedRoute>
                  <CambiarPass></CambiarPass>
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/publicar-noticia"
              element={
                <ProtectedRoute>
                  <Noticia></Noticia>
                </ProtectedRoute>
              }
            ></Route>
            <Route path="/novedades" element={<Novedades></Novedades>}></Route>
            <Route
              path="/noticias/:id"
              element={<NoticiaDetalle></NoticiaDetalle>}
            ></Route>
            <Route
              path="/editar-noticia/:id"
              element={
                <ProtectedRoute>
                  <NoticiaEditar></NoticiaEditar>
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/inscripciones"
              element={
                <ProtectedRoute>
                  <Inscripciones></Inscripciones>
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/editar-datos"
              element={
                <ProtectedRoute>
                  <EditarDatos></EditarDatos>
                </ProtectedRoute>
              }
            ></Route>
            <Route path="/servicios" element={<Servicios></Servicios>}></Route>
            <Route
              path="/gestionar-usuarios"
              element={
                <ProtectedRoute>
                  <GestionarUsuarios></GestionarUsuarios>
                </ProtectedRoute>
              }
            ></Route>
          </Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
