import React, { useEffect, useState } from "react";

// Criptos principales a mostrar con iconos
const SYMBOLS = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    icon: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    icon: "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628"
  },
  {
    id: "tether",
    name: "Tether",
    symbol: "USDT",
    icon: "https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661"
  },
  {
    id: "binancecoin",
    name: "BNB",
    symbol: "BNB",
    icon: "https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png?1696501961"
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    icon: "https://assets.coingecko.com/coins/images/4128/large/solana.png?1696502472"
  }
];

export default function Cotizaciones() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  // Función para pedir los precios a CoinGecko
  const fetchPrices = () => {
    fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${SYMBOLS.map(
        s => s.id
      ).join(",")}&vs_currencies=usd`
    )
      .then(res => res.json())
      .then(resp => {
        setData(resp);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPrices(); // Carga inicial
    const interval = setInterval(fetchPrices, 10000); // Cada 10 segundos
    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, []);

  return (
    <div className="fade-in">
      <h3 style={{
        margin: "10px 0 20px",
        color: "#2986fa",
        fontWeight: 700,
        fontSize: 20,
        letterSpacing: "0.01em"
      }}>
        cotizaciones  <span style={{ color: "#38b6ff", fontWeight: 600 }}>open wallet</span>
      </h3>
      {loading ? (
        <div style={{
          padding: "18px 0",
          color: "#2986fa",
          fontWeight: 600,
          textAlign: "center"
        }}>Cargando cotizaciones...</div>
      ) : (
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Cripto</th>
              <th style={{ textAlign: "right" }}>Precio (USD)</th>
            </tr>
          </thead>
          <tbody>
            {SYMBOLS.map(c => (
              <tr key={c.id} style={{verticalAlign: "middle"}}>
                <td style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <img
                    src={c.icon}
                    alt={c.name}
                    width={32}
                    height={32}
                    style={{
                      borderRadius: 8,
                      boxShadow: "0 1.5px 7px #2986fa29"
                    }}
                  />
                  <span style={{
                    fontWeight: 600,
                    fontSize: 15,
                    color: "#2986fa"
                  }}>{c.name}</span>
                  <span style={{
                    color: "#888",
                    fontSize: 13,
                    fontWeight: 500,
                    marginLeft: 2
                  }}>({c.symbol})</span>
                </td>
                <td style={{
                  textAlign: "right",
                  fontWeight: 700,
                  fontSize: 16,
                  color: "#27ae60"
                }}>
                  {data[c.id]?.usd
                    ? "$" + data[c.id].usd.toLocaleString()
                    : <span style={{ color: "#f39c12" }}>-</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div style={{
        marginTop: 14,
        fontSize: 13,
        color: "#888",
        textAlign: "right"
      }}>
        <span style={{ color: "#38b6ff", fontWeight: 600 }}>*</span>
      </div>
    </div>
  );
}