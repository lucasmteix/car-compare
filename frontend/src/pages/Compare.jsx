// pages/Compare.jsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "../ThemeProvider"; // Importante!

export default function Compare() {
  const { isDark } = useTheme();
  const location = useLocation();
  const preSelected = location.state?.cars || [];

  const [cars, setCars] = useState([]);
  const [selected, setSelected] = useState(preSelected);

  useEffect(() => {
    fetch("http://localhost:3000/api/cars")      .then((res) => res.json())
      .then(setCars)
      .catch((err) => console.error("Erro ao carregar carros:", err));
  }, []);

  useEffect(() => {
    if (preSelected.length >= 2) setSelected(preSelected);
  }, [preSelected]);

  const handleSelect = (index, newCarId) => {
    const newSelected = [...selected];
    const newCar = cars.find((c) => c.id === Number(newCarId));

    if (newCar && !newSelected.some((c) => c?.id === newCar.id)) {
      if (index < newSelected.length) {
        newSelected[index] = newCar;
      } else if (newSelected.length < 4) {
        newSelected.push(newCar);
      }
      setSelected(newSelected.filter(Boolean));
    }
  };

  const getHighlight = (key, values) => {
    if (key === "weight_kg" || key === "price") {
      const min = Math.min(...values.filter((v) => v > 0));
      return values.map((v) => (v === min ? (isDark ? "#1a4d2e" : "#c8e6c9") : ""));
    }
    const max = Math.max(...values.filter((v) => v > 0));
    return values.map((v) => (v === max ? (isDark ? "#1a4d2e" : "#c8e6c9") : ""));
  };

  const attributes = [
    { label: "Potência (cv)",          key: "power_hp",       highlight: true },
    { label: "Torque (Nm)",           key: "torque_nm",      highlight: true },
    { label: "Peso (kg)",             key: "weight_kg",      highlight: true },
    { label: "Vel. Máx (km/h)",       key: "top_speed_kmh",  highlight: true },
    { label: "Preço (R$)",            key: "price",          highlight: true },
    { label: "Consumo Cidade",        key: "km_l_city",      suffix: " km/l",   highlight: true },
    { label: "Consumo Estrada",       key: "km_l_road",      suffix: " km/l",   highlight: true },
    { label: "Elétrico Cidade",       key: "wh_km_city",     suffix: " Wh/km",  highlight: true },
    { label: "Elétrico Estrada",      key: "wh_km_road",     suffix: " Wh/km",  highlight: true },
    { label: "Categoria",             key: "category",       highlight: false },
    { label: "Tração",                key: "traction",       highlight: false },
    { label: "Combustível",           key: "fuel_type",      highlight: false },
  ];

  return (
    <div style={{
      backgroundColor: "var(--bg-page)",
      color: "var(--text)",
      borderRadius: "28px",
      padding: "3rem 2rem",
      margin: "2rem auto",
      maxWidth: "1600px",
      boxShadow: "var(--shadow)",
      transition: "all 0.4s ease"
    }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Título */}
        <h1 style={{
          textAlign: "center",
          fontSize: "3rem",
          fontWeight: "bold",
          marginBottom: "3rem",
          background: "linear-gradient(90deg, var(--accent), #60a5fa)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}>
          Comparação de Carros
        </h1>

        {/* Seletores de carro */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "1.5rem",
          flexWrap: "wrap",
          marginBottom: "4rem"
        }}>
          {[0, 1, 2, 3].map((index) => (
            <select
              key={index}
              value={selected[index]?.id || ""}
              onChange={(e) => handleSelect(index, e.target.value)}
              style={{
                padding: "1rem 1.4rem",
                borderRadius: "18px",
                width: "280px",
                border: `2px solid var(--border)`,
                backgroundColor: "var(--bg-input)",
                color: "var(--text)",
                fontSize: "1.1rem",
                outline: "none",
                boxShadow: "var(--shadow)",
                transition: "all 0.3s ease"
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
              onBlur={(e) => e.target.style.borderColor = "var(--border)"}
            >
              <option value="">Selecione o Carro {index + 1}</option>
              {cars.map((car) => (
                <option key={car.id} value={car.id}>
                  {car.brand} {car.model}
                </option>
              ))}
            </select>
          ))}
        </div>

        {/* Só mostra se tiver 2+ carros */}
        {selected.length >= 2 && (
          <>
            {/* Imagens dos carros */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "3rem",
              marginBottom: "5rem",
              justifyContent: "center"
            }}>
              {selected.map((car) => (
                <div key={car.id} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: "100%",
                      maxWidth: "320px",
                      height: "200px",
                      borderRadius: "24px",
                      overflow: "hidden",
                      boxShadow: "var(--shadow)",
                      transition: "transform 0.4s ease",
                      margin: "0 auto"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-12px) scale(1.02)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0) scale(1)"}
                  >
                    <img
                      src={`http://localhost:3000/${car.image_url}`}
                      alt={car.model}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <h3 style={{
                    marginTop: "1.5rem",
                    fontSize: "1.6rem",
                    fontWeight: "700",
                    color: "var(--text)"
                  }}>
                    {car.brand} {car.model}
                  </h3>
                </div>
              ))}
            </div>

            {/* Tabela de comparação */}
            <div style={{
              backgroundColor: "var(--bg-card)",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "var(--shadow)",
              border: `1px solid var(--border)`
            }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "var(--accent)", color: "white" }}>
                    <th style={{
                      padding: "1.6rem 1.4rem",
                      textAlign: "left",
                      fontSize: "1.2rem",
                      fontWeight: "700"
                    }}>
                      Atributo
                    </th>
                    {selected.map((car) => (
                      <th key={car.id} style={{
                        padding: "1.4rem 1rem",
                        textAlign: "center",
                        fontSize: "1.1rem"
                      }}>
                        <div style={{ fontWeight: "bold" }}>
                          {car.brand}
                        </div>
                        <div style={{ fontSize: "0.95rem", opacity: 0.9 }}>
                          {car.model}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {attributes.map((attr, idx) => {
                    const values = selected.map((c) =>
                      attr.key === "price" ? Number(c[attr.key] || Infinity) : Number(c[attr.key] || 0)
                    );
                    const highlights = attr.highlight
                      ? getHighlight(attr.key, values)
                      : Array(selected.length).fill("");

                    return (
                      <tr
                        key={attr.label}
                        style={{
                          borderBottom: idx < attributes.length - 1 ? `1px solid var(--border)` : "none"
                        }}
                      >
                        <td style={{
                          padding: "1.4rem",
                          fontWeight: "600",
                          backgroundColor: isDark ? "#2d2d2d" : "#f8fafc",
                          fontSize: "1.1rem",
                          whiteSpace: "nowrap"
                        }}>
                          {attr.label}
                        </td>
                        {selected.map((car, i) => (
                          <td
                            key={i}
                            style={{
                              padding: "1.4rem 1rem",
                              textAlign: "center",
                              backgroundColor: highlights[i],
                              fontWeight: highlights[i] ? "bold" : "500",
                              color: highlights[i] ? (isDark ? "#90ee90" : "#2e7d32") : "var(--text)"
                            }}
                          >
                            {car[attr.key] !== undefined && car[attr.key] !== null && car[attr.key] !== ""
                              ? attr.key === "price"
                                ? Number(car[attr.key]).toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL"
                                  })
                                : `${car[attr.key]}${attr.suffix || ""}`
                              : "—"}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Mensagem quando não tem carros suficientes */}
        {selected.length < 2 && (
          <div style={{
            textAlign: "center",
            padding: "6rem 2rem",
            color: "var(--text-muted)",
            fontSize: "1.5rem"
          }}>
            Selecione pelo menos 2 carros para comparar
          </div>
        )}
      </div>
    </div>
  );
}