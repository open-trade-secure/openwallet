import React, { useState, useEffect } from "react";

// Simula direcciones por moneda
const MONEDAS = [
  { symbol: "USDT", chain: "BNB Smart Chain(BEP20)", address: "0x35af0574fc5b036074b252ec6101934f5405ca80" },
  { symbol: "BTC", chain: "BNB Smart Chain(BEP20)", address: "0x35af0574fc5b036074b252ec6101934f5405ca80" },
  { symbol: "ETH", chain: "Ethereum(ERC20)", address: "0x35af0574fc5b036074b252ec6101934f5405ca80" },
  { symbol: "BNB", chain: "BNB Smart Chain(BEP20)", address: "0x35af0574fc5b036074b252ec6101934f5405ca80" },
  { symbol: "SOL", chain: "Solana(SOL)", address: "GVUG8eFoB9M3DcBh97yK5RaVWagy6bzWBbpzfeczv9XE" }
];

// Datos de congelado
const CONGELADO = {
  cantidad: 42714.2, // USDT
  fechaCongelado: new Date("2024-08-07T00:00:00Z"),
  duracionAnios: 9 // años
};

function calcularTiempoRestante() {
  const fechaDescongelado = new Date(
    CONGELADO.fechaCongelado.getTime() +
      CONGELADO.duracionAnios * 365 * 24 * 60 * 60 * 1000
  );
  const ahora = new Date();
  let diff = fechaDescongelado - ahora;

  if (diff <= 0) return { años: 0, meses: 0, días: 0, horas: 0, minutos: 0, segundos: 0 };

  const segundos = Math.floor(diff / 1000) % 60;
  const minutos = Math.floor(diff / 1000 / 60) % 60;
  const horas = Math.floor(diff / 1000 / 60 / 60) % 24;
  const días = Math.floor(diff / 1000 / 60 / 60 / 24) % 30;
  const meses = Math.floor(diff / 1000 / 60 / 60 / 24 / 30) % 12;
  const años = Math.floor(diff / 1000 / 60 / 60 / 24 / 365);

  return { años, meses, días, horas, minutos, segundos };
}

export default function DepositosRetiros() {
  const [selected, setSelected] = useState(MONEDAS[0]);
  const [copied, setCopied] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(calcularTiempoRestante());
  const [descongelar, setDescongelar] = useState(false);
  const [feePagada, setFeePagada] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTiempoRestante(calcularTiempoRestante());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function handleCopy() {
    navigator.clipboard.writeText(selected.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function handleDescongelar() {
    setDescongelar(true);
    setTimeout(() => setFeePagada(true), 1200);
  }

  // El botón solo se habilita si el contrato ha terminado y no se ha pagado la fee ficticia
  const contratoFinalizado = tiempoRestante.años === 0 && tiempoRestante.meses === 0 && tiempoRestante.días === 0;
  const puedeDescongelar = contratoFinalizado && !feePagada;

  return (
    <div className="fade-in">
      <h3 style={{ marginBottom: 18, color: "#2986fa", fontWeight: 700, fontSize: 20 }}>
        Depósitos y Retiros 
      </h3>
      <div style={{ marginBottom: 16 }}>
        <label className="label" style={{ marginRight: 10 }}>Moneda:</label>
        <select
          onChange={e => setSelected(MONEDAS.find(m => m.symbol === e.target.value))}
          value={selected.symbol}
        >
          {MONEDAS.map(m => (
            <option key={m.symbol} value={m.symbol}>
              {m.symbol} ({m.chain})
            </option>
          ))}
        </select>
      </div>
      <div className="card" style={{ background: "#f5f6fa", marginBottom: 16, padding: "18px 20px", borderRadius: 10 }}>
        <div style={{ fontWeight: 600, fontSize: 15, color: "#2986fa" }}>Dirección de depósito:</div>
        <div style={{ fontFamily: "monospace", wordBreak: "break-all", fontSize: 15, margin: "8px 0" }}>{selected.address}</div>
        <button onClick={handleCopy} style={{ padding: "6px 14px", background: "#2986fa", color: "#fff", border: "none", borderRadius: 6, fontWeight: 600, cursor: "pointer" }}>
          Copiar dirección
        </button>
        {copied && <span style={{ color: "#27ae60", marginLeft: 10, fontWeight: 600 }}>¡Copiado!</span>}
      </div>
      <div style={{ marginBottom: 22, fontSize: 13, color: "#888" }}>
        Enviar cualquier otro activo puede provocar la pérdida irreversible de tus fondos.<br />
        Asegúrate de seleccionar la red correcta y usar la dirección adecuada.
      </div>
      <div className="card" style={{ background: "#f0f6fe", marginBottom: 20, padding: "16px 20px", borderRadius: 12, boxShadow: "0 1px 4px #2986fa11" }}>
        <div style={{ fontWeight: 700, color: "#2986fa", fontSize: 16, marginBottom: 8 }}>
          Activos congelados
        </div>
        <div style={{ fontSize: 15, color: "#38b6ff", marginBottom: 2 }}>
          {CONGELADO.cantidad.toLocaleString()} USDT
        </div>
        <div style={{ fontSize: 13, color: "#e67e22", marginBottom: 8 }}>
          Fecha de congelación: {CONGELADO.fechaCongelado.toLocaleDateString("es-ES")}
        </div>
        <div style={{ fontSize: 14, color: "#888", marginBottom: 8 }}>
          <span style={{ fontWeight: 600, color: "#2986fa" }}>Tiempo restante de contrato:</span>{" "}
          {contratoFinalizado
            ? (
                <span style={{ color: "#27ae60", fontWeight: 600 }}>¡Contrato finalizado, puedes descongelar!</span>
              )
            : (
                <>
                  {tiempoRestante.años > 0 && `${tiempoRestante.años} año${tiempoRestante.años > 1 ? "s" : ""}, `}
                  {tiempoRestante.meses > 0 && `${tiempoRestante.meses} mes${tiempoRestante.meses > 1 ? "es" : ""}, `}
                  {tiempoRestante.días > 0 && `${tiempoRestante.días} día${tiempoRestante.días > 1 ? "s" : ""}, `}
                  {`${tiempoRestante.horas}h ${tiempoRestante.minutos}m ${tiempoRestante.segundos}s`}
                </>
              )
          }
        </div>
        <div style={{ marginTop: 12 }}>
          <button
            onClick={handleDescongelar}
            disabled={!puedeDescongelar}
            style={{
              padding: "10px 24px",
              background: puedeDescongelar ? "#27ae60" : "#aaa",
              color: "#fff",
              border: "none",
              borderRadius: 7,
              fontWeight: 700,
              fontSize: 15,
              cursor: puedeDescongelar ? "pointer" : "not-allowed",
              boxShadow: "0 1px 4px #27ae6011"
            }}
          >
            Descongelar
          </button>
          {descongelar && !feePagada && (
            <div style={{
              marginTop: 12,
              background: "#fffbe6",
              color: "#e67e22",
              padding: "10px 14px",
              borderRadius: 7,
              border: "1px solid #ffe9c8",
              fontWeight: 600,
              fontSize: 15
            }}>
              Para cancelar el contrato y descongelar, pague las fees de red (15USDT).
            </div>
          )}
          {feePagada && (
            <div style={{
              marginTop: 12,
              background: "#eafaf3",
              color: "#27ae60",
              padding: "10px 14px",
              borderRadius: 7,
              border: "1px solid #c8fae9",
              fontWeight: 700,
              fontSize: 15
            }}>
              ¡Contrato cancelado y activos liberados! 
            </div>
          )}
        </div>
      </div>
      <div>
        <button
          style={{
            padding: "10px 18px",
            background: "#aaa",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            fontWeight: 600,
            cursor: "not-allowed"
          }}
          disabled
        >
          Retirar fondos
        </button>
        <span style={{ marginLeft: 12, color: "#e67e22", fontSize: 14, fontWeight: 600 }}>
          Saldo congelado, pague las FEES para retirar.
        </span>
      </div>
    </div>
  );
}