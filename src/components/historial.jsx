import React from "react";

export default function Historial({ historial }) {
  // Separar los depósitos y los congelados
  const depositados = historial.filter(h => h.type === "Depósito");
  const congelados = [
    {
      date: "2024-08-07",
      type: "Congelado",
      amount: 40133.37,
      currency: "USDT",
      status: "Congelado",
      details: "40,133.37 USDT congelados el 07/08/2024 por contrato de 9 años"
    }
  ];

  return (
    <div className="fade-in">
      <h3 style={{
        margin: "12px 0 18px",
        color: "#2986fa",
        fontWeight: 700,
        fontSize: 20,
        letterSpacing: "0.01em"
      }}>
        Historial de movimientos
      </h3>

      <div style={{
        background: "linear-gradient(90deg,#f0f6fe 60%,#e9f2ff 100%)",
        borderRadius: 12,
        padding: "14px 18px",
        marginBottom: 18,
        boxShadow: "0 1.5px 6px #2986fa12"
      }}>
        <div style={{
          fontWeight: 700,
          color: "#27ae60",
          fontSize: 16,
          marginBottom: 4
        }}>
          Depósitos realizados
        </div>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Fecha</th>
              <th style={{ textAlign: "right" }}>Monto</th>
              <th style={{ textAlign: "left" }}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {depositados.map((h, i) => (
              <tr key={i}>
                <td>{h.date}</td>
                <td style={{ textAlign: "right", fontWeight: 600 }}>
                  {h.amount.toLocaleString()} {h.currency}
                </td>
                <td style={{ color: "#2986fa" }}>{h.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{
        background: "linear-gradient(90deg,#fff6e8 60%,#ffe9c8 100%)",
        borderRadius: 12,
        padding: "14px 18px",
        marginBottom: 8,
        boxShadow: "0 1.5px 6px #e67e2212"
      }}>
        <div style={{
          fontWeight: 700,
          color: "#e67e22",
          fontSize: 16,
          marginBottom: 4
        }}>
          Activos congelados por contrato de 9 años
        </div>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Fecha</th>
              <th style={{ textAlign: "right" }}>Monto</th>
              <th style={{ textAlign: "left" }}>Estado</th>
              <th style={{ textAlign: "left" }}>Detalles</th>
            </tr>
          </thead>
          <tbody>
            {congelados.map((h, i) => (
              <tr key={i}>
                <td>{h.date}</td>
                <td style={{ textAlign: "right", fontWeight: 600, color: "#e67e22" }}>
                  {h.amount.toLocaleString()} {h.currency}
                </td>
                <td style={{ color: "#e67e22" }}>{h.status}</td>
                <td style={{ fontSize: 13, color: "#888" }}>{h.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{
        marginTop: 16,
        color: "#888",
        fontSize: 13,
        textAlign: "right"
      }}>
      </div>
    </div>
  );
}