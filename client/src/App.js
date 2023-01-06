import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Fakultetet from "./pages/Fakultetet";
import Login from "./pages/Login";
import Departamentet from "./pages/Departamentet";
import Programet from "./pages/Programet";
import Pedagoget from "./pages/Pedagoget";
import ProtectedRoute from "./pages/ProtectedRoute";

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
          <Route path="departamentet" element={<Departamentet />} />
          <Route path="programet" element={<Programet />} />
          <Route path="pedagoget" element={<Pedagoget />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
