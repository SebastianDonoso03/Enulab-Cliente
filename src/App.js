import { Route, Routes } from "react-router-dom";
import "../src/styles/tailwind.css";
import Dashboard from "./components/Inicio";
import RestaurantMenu from "./components/RestauranteMenu";
import Reservations from "./components/Reservaciones";
import Comentarios from './components/Comentario'
//import Comments from "./components/Comentario";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/restaurant" element={<RestaurantMenu />}/>
      <Route path="/reserva" element={<Reservations />} />
      <Route path="/comentario" element={<Comentarios />} />
    </Routes>
  );
}

export default App;
