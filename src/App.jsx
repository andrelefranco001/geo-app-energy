import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import userData from "../src/user.json";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<PrivateRoute />} />
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

// Componente para manejar rutas privadas
function PrivateRoute() {
  const isAuthenticated = checkAuthentication(); // Verifica si el usuario está autenticado

  return isAuthenticated ? <Home /> : <Navigate to="/home" />;
}

// Función para verificar si el usuario está autenticado
function checkAuthentication() {
  const storedUser = localStorage.getItem("user"); // Obtiene el usuario almacenado en el almacenamiento local

  if (storedUser) {
    const user = JSON.parse(storedUser);
    const foundUser = userData.users.find(
      (u) => u.username === user.username && u.password === user.password
    );
    return !!foundUser; // Devuelve true si se encuentra el usuario, de lo contrario, false
  }

  return false;
}

export default App;
