import React, { useState } from "react";
import Login from "./components/login.jsx";
import Wallet from "./components/wallet.jsx";

function App() {
  const [user, setUser] = useState(null);

  // Usuarios válidos para login simulado
  const users = [
    { username: "fabricio172", password: "Facribicio13425786." },
    { username: "joalprocrypto331", password: "Homercrazy43131#" }
  ];

  function handleLogin(username, password) {
    const found = users.find(
      (u) => u.username === username && u.password === password
    );
    if (found) {
      setUser({ username });
      return true;
    }
    return false;
  }

  function handleLogout() {
    setUser(null);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #e9f2ff 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
      className="fade-in"
    >
      <div className="card" style={{ maxWidth: 480, width: "100%", margin: "32px auto", boxShadow: "0 4px 28px rgba(41,134,250,0.11)" }}>
        {!user ? (
          <Login onLogin={handleLogin} />
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
              <div>
                <span style={{
                  fontWeight: 700,
                  color: "#2986fa",
                  fontSize: 18,
                  letterSpacing: "0.02em"
                }}>
                  👋 Bienvenido, {user.username}
                </span>
              </div>
              <button onClick={handleLogout} style={{
                background: "#e74c3c",
                color: "#fff",
                padding: "7px 18px",
                borderRadius: 6,
                border: "none",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 2px 6px rgba(231,76,60,0.07)"
              }}>
                Cerrar sesión
              </button>
            </div>
            <Wallet user={user} onLogout={handleLogout} />
          </>
        )}
      </div>
      <footer style={{ color: "#888", fontSize: 13, marginTop: 10 }}>
        Open Wallet &mdash; Open Trade, 2025
      </footer>
    </div>
  );
}

export default App;