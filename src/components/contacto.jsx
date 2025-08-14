import React, { useState } from "react";

export default function Contacto() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  }

  return (
    <div className="fade-in">
      <h3 style={{
        marginBottom: 16,
        color: "#2986fa",
        fontWeight: 700,
        fontSize: 20
      }}>
        Atención al Cliente <span style={{ color: "#38b6ff", fontWeight: 600 }}>Support</span>
      </h3>
      <form onSubmit={handleSubmit} style={{
        maxWidth: 370,
        margin: "0 auto",
        background: "#f5f6fa",
        borderRadius: 12,
        padding: "22px 18px",
        boxShadow: "0 2px 10px #2986fa11"
      }}>
        <label className="label" htmlFor="nombre">Nombre</label>
        <input
          type="text"
          name="nombre"
          id="nombre"
          placeholder="Tu nombre"
          required
        />
        <label className="label" htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Tu email"
          required
        />
        <label className="label" htmlFor="mensaje">Mensaje</label>
        <textarea
          name="mensaje"
          id="mensaje"
          placeholder="¿En qué podemos ayudarte?"
          required
          rows={3}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            marginTop: 10,
            padding: 12,
            background: "linear-gradient(90deg,#2986fa 60%,#38b6ff 100%)",
            color: "#fff",
            border: "none",
            borderRadius: 7,
            fontWeight: 700,
            fontSize: 16,
            boxShadow: "0 2px 8px rgba(41,134,250,0.09)"
          }}
        >
          Enviar mensaje
        </button>
        {sent && (
          <div style={{
            color: "#27ae60",
            marginTop: 14,
            background: "#eafaf3",
            borderRadius: 6,
            padding: "8px 10px",
            textAlign: "center",
            fontWeight: 600,
            border: "1px solid #c8fae9"
          }}>
            Mensaje enviado.
          </div>
        )}
      </form>
      <div style={{
        marginTop: 16,
        fontSize: 13,
        color: "#888",
        textAlign: "center"
      }}>
      </div>
    </div>
  );
}