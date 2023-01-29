import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Fakultetet from "./pages/Fakultetet2";
import Login from "./pages/Login";
import Departamentet from "./pages/Departamentet";
import Programet from "./pages/Programet";
import Pedagoget from "./pages/Pedagoget";
import ProtectedRoute from "./pages/ProtectedRoute";
import ShtoFakultet from "./pages/ShtoFakultet";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Fakultetet />
              </ProtectedRoute>
            }
          />
    <Route path="/fakulteti/:id/deparartamenti" element={<Departamentet />}>
       
          <Route path="programet" element={<Programet />} />
          <Route path="pedagoget" element={<Pedagoget />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/krijofakultet" element={<ShtoFakultet />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
