import React, { useState } from "react";
import Cotizaciones from "./cotizaciones.jsx";
import Historial from "./historial.jsx";
import DepositosRetiros from "./depositosretiros.jsx";
import Contacto from "./contacto.jsx";

const SALDO = 42714.2;
const HISTORIAL = [
  {
    date: "2024-08-07",
    type: "Depósito",
    amount: 40133.37,
    currency: "USDT",
    status: "Congelado",
    details: "40,133.37 USDT depositados y congelados el 7 de agosto de 2024"
  }
];

export default function Wallet({ user, onLogout }) {
  const [tab, setTab] = useState("balance");

  return (
    <div
      className="card fade-in"
      style={{
        maxWidth: 480,
        margin: "32px auto",
        background: "rgba(255,255,255,0.97)",
        padding: "34px 26px 30px 26px",
        borderRadius: 18,
        boxShadow: "0 8px 44px rgba(41,134,250,0.15), 0 2px 12px rgba(41,134,250,0.10)"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 18
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img
            src="https://img.icons8.com/color/40/000000/wallet--v2.png"
            alt="wallet"
            style={{ filter: "drop-shadow(0 1px 6px #2986fa33)" }}
          />
          <h2
            style={{
              margin: 0,
              color: "#2986fa",
              fontWeight: 700,
              fontSize: 22,
              letterSpacing: "0.02em"
            }}
          >
            Open Wallet
          </h2>
        </div>
        <button
          onClick={onLogout}
          style={{
            background: "linear-gradient(90deg,#e74c3c 60%,#ffb4a2 100%)",
            color: "#fff",
            border: "none",
            borderRadius: 7,
            padding: "6px 22px",
            fontWeight: 600,
            fontSize: 15,
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(231,76,60,0.07)"
          }}
        >
          Salir
        </button>
      </div>
      <div
        style={{
          margin: "18px 0 18px",
          padding: "20px 18px",
          background: "linear-gradient(90deg, #f0f6fe 60%, #e9f2ff 100%)",
          borderRadius: 12,
          border: "1px solid #c0dafc",
          boxShadow: "0 1.5px 6px #2986fa12"
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 700, color: "#2986fa" }}>
          Balance total
        </div>
        <div
          style={{
            fontSize: 36,
            color: "#38b6ff",
            fontWeight: 700,
            textShadow: "0 2px 8px #2986fa11"
          }}
        >
          {SALDO.toLocaleString()} USDT
        </div>
        <div
          style={{
            color: "#e67e22",
            marginTop: 6,
            fontSize: 15,
            fontWeight: 600,
            background: "#fff6e8",
            borderRadius: 6,
            padding: "7px 11px",
            border: "1px solid #ffe9c8"
          }}
        >
          Tus activos están <span style={{ fontWeight: 700 }}>congelados</span>.
        </div>
      </div>
      <nav
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 18,
          flexWrap: "wrap",
          background: "#f4f9fe",
          borderRadius: 8,
          padding: "8px",
          boxShadow: "0 1px 4px #2986fa12"
        }}
      >
        <TabButton active={tab === "balance"} onClick={() => setTab("balance")}>
          Balance
        </TabButton>
        <TabButton active={tab === "cotizaciones"} onClick={() => setTab("cotizaciones")}>
          Cotizaciones
        </TabButton>
        <TabButton active={tab === "depositos"} onClick={() => setTab("depositos")}>
          Depósitos/Retiros
        </TabButton>
        <TabButton active={tab === "historial"} onClick={() => setTab("historial")}>
          Historial
        </TabButton>
        <TabButton active={tab === "contacto"} onClick={() => setTab("contacto")}>
          Contacto
        </TabButton>
      </nav>
      <div>
        {tab === "balance" && (
          <div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 16,
                color: "#2986fa",
                marginBottom: 4
              }}
            >
              Activo principal: USDT
            </div>
            <div style={{ color: "#888", fontSize: 14 }}>
              No puedes operar ni retirar. Activos congelados.
            </div>
          </div>
        )}
        {tab === "cotizaciones" && <Cotizaciones />}
        {tab === "depositos" && <DepositosRetiros />}
        {tab === "historial" && <Historial historial={HISTORIAL} />}
        {tab === "contacto" && <Contacto />}
      </div>
    </div>
  );
}

function TabButton({ active, children, ...props }) {
  return (
    <button
      {...props}
      style={{
        flex: 1,
        background: active
          ? "linear-gradient(90deg,#2986fa 60%,#38b6ff 100%)"
          : "#f5f6fa",
        color: active ? "#fff" : "#2986fa",
        border: active ? "1.5px solid #2986fa" : "1.5px solid #c0dafc",
        borderRadius: 7,
        padding: "9px 0",
        fontWeight: 600,
        boxShadow: active ? "0 1.5px 8px #2986fa20" : undefined,
        cursor: "pointer",
        fontSize: 15,
        transition: "all 0.15s"
      }}
    >
      {children}
    </button>
  );
}