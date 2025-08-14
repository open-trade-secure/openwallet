import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const success = onLogin(username, password);
    if (!success) setError("Usuario o contraseña incorrectos.");
    else setError("");
  }

  return (
    <div
      className="card fade-in"
      style={{
        maxWidth: 340,
        margin: "48px auto 0 auto",
        background: "rgba(255,255,255,0.97)",
        padding: "32px 26px 26px 26px",
        borderRadius: 14,
        boxShadow: "0 6px 32px rgba(41,134,250,0.14), 0 1.5px 8px rgba(41,134,250,0.09)"
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <img
          src="https://img.icons8.com/color/48/000000/wallet--v2.png"
          alt="wallet"
          style={{ marginBottom: 12, filter: "drop-shadow(0 2px 8px #2986fa22)" }}
        />
        <h2 style={{
          margin: 0,
          color: "#2986fa",
          fontWeight: 700,
          letterSpacing: "0.01em",
          fontSize: 22
        }}>Open Wallet</h2>
        <span style={{
          fontSize: 13,
          color: "#38b6ff"
        }}>login</span>
      </div>
      <form onSubmit={handleSubmit}>
        <label className="label" htmlFor="user">Usuario</label>
        <input
          id="user"
          placeholder="Usuario"
          value={username}
          autoFocus
          onChange={e => setUsername(e.target.value)}
        />
        <label className="label" htmlFor="pass">Contraseña</label>
        <input
          id="pass"
          placeholder="Contraseña"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && (
          <div className="text-error" style={{
            background: "#fdecea",
            borderRadius: 6,
            padding: "7px 10px",
            marginTop: 10,
            marginBottom: 6,
            fontSize: 13,
            border: "1px solid #facfcf"
          }}>
            {error}
          </div>
        )}
        <button
          type="submit"
          style={{
            width: "100%",
            marginTop: 16,
            padding: "11px",
            background: "linear-gradient(90deg,#2986fa 60%,#38b6ff 100%)",
            color: "#fff",
            border: "none",
            borderRadius: 7,
            fontWeight: 700,
            fontSize: 16,
            boxShadow: "0 2px 8px rgba(41,134,250,0.09)",
            letterSpacing: "0.01em"
          }}
        >
          Ingresar
        </button>
      </form>
      <div style={{
        marginTop: 20,
        fontSize: 13,
        color: "#888",
        background: "#f3f8ff",
        borderRadius: 6,
        padding: "8px 10px"
      }}>
        <span style={{ color: "#27ae60", fontWeight: 600 }}>User :</span><br/>
        <span style={{ color: "#2986fa" }}>anonymity / security</span><br />
        <span style={{ color: "#2986fa" }}>open / wallet</span>
      </div>
    </div>
  );
}