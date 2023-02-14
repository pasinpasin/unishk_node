import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Fakultetet from "./pages/Fakultetet2";
import Login from "./pages/Login";
import Departamentet from "./pages/Departamentet";
import Programet from "./pages/Programet";
import Pedagoget from "./pages/Pedagoget";
import DepartmentContent from "./pages/DepartmentContent";
import ProtectedRoute from "./pages/ProtectedRoute";
import ShtoFakultet from "./pages/ShtoFakultet";
import PedagogetContent from "./pages/PedagogetContent";
import WelcomePage from "./pages/WelcomePage";
import Users from "./pages/Users";
import ModifikoUser from "./pages/ModifikoUser";
import ShtoUser from "./pages/ShtoUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <ProtectedRoute>
                <WelcomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="fakultetet"
            element={
              <ProtectedRoute>
                <Fakultetet />
              </ProtectedRoute>
            }
          />

          <Route
            path="departamenti/:id/programi"
            element={
              <ProtectedRoute>
                <DepartmentContent />
              </ProtectedRoute>
            }
          />
          <Route
            path="pedagoget"
            element={
              <ProtectedRoute>
                <Pedagoget />
              </ProtectedRoute>
            }
          />
          <Route
            path="fakulteti/:id/departamenti"
            element={
              <ProtectedRoute>
                <Departamentet />
              </ProtectedRoute>
            }
          />
          <Route
            path="users/:id/"
            element={
              <ProtectedRoute>
                <PedagogetContent />
              </ProtectedRoute>
            }
          />

          <Route
            path="users/:id/edit"
            element={
              <ProtectedRoute>
                <ModifikoUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="users/shtouser"
            element={
              <ProtectedRoute>
                <ShtoUser/>
              </ProtectedRoute>
            }
          />

          <Route
            path="users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/krijofakultet" element={<ShtoFakultet />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
