import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logomap from "/map1.png";
import userData from "../user.json"; 

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    setUsernameError(""); // Reiniciar el mensaje de error del usuario
    setPasswordError(""); // Reiniciar el mensaje de error de la contraseña

    // Verificar los datos del usuario
    const user = userData.users.find((user) => user.username === username);

    if (user) {
      if (user.password === password) {
        console.log("Usuario autenticado");
        // Realizar acciones para inicio de sesión exitoso
        localStorage.setItem("user", JSON.stringify({ username }));
        navigate("/app"); // Redirigir al usuario a la página de inicio
      } else {
        setPasswordError("Contraseña incorrecta");
      }
    } else {
      setUsernameError("Usuario incorrecto");
    }
  };

  return (
    <>
      <div className="login-container">
        <img className="logomap" src={logomap} alt="map" />
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            className="input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {usernameError && <p className="error-message">{usernameError}</p>}
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
