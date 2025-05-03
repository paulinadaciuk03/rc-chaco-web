import "./App.css";
import Inicio from "./components/Inicio/Inicio";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuienesSomos from "./components/QuienesSomos/QuienesSomos";
import { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";

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
          <Route path="/" element={<Inicio></Inicio>}></Route>
          <Route
            path="/quienes-somos"
            element={<QuienesSomos></QuienesSomos>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
