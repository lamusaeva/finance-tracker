import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import { PrivateRoute, PublicRoute } from "./shared/components/ProtectedRoute";
import Layout from "./shared/components/Layout";
import { ModalProvider } from "./context/ModalContext";
function App() {
  return (
    <AuthProvider>
      <ModalProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/transactions"
              element={
                <PrivateRoute>
                  <Layout>
                    <Transactions />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </AuthProvider>
  );
}

export default App;
