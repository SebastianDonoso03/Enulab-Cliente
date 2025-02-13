import { Route, Routes } from "react-router-dom";
import "../src/styles/tailwind.css";
import Dashboard from "./components/Inicio";
import RestaurantMenu from "./components/RestauranteMenu";
import Reservations from "./components/Reservaciones";
import Comments from "./components/Comentario";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/restaurant/:id" element={<RestaurantMenu />}>
        <Route path="" element={<RestaurantMenu />} /> {/* Esto carga el menú por defecto */}
        <Route path="reservations" element={<Reservations />} />
        <Route path="comments" element={<Comments />} />
      </Route>
    </Routes>
  );
}

export default App;
