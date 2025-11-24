import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";

export default function Compare() {
  const location = useLocation();
  const preSelected = location.state?.cars || [];

  const [cars, setCars] = useState([]);
  const [selected, setSelected] = useState(preSelected);

  useEffect(() => {
    fetch("http://localhost:3000/api/cars")
      .then(res => res.json())
      .then(setCars);
  }, []);

  useEffect(() => {
    if (preSelected.length >= 2) setSelected(preSelected);
  }, [preSelected]);

  const handleSelect = (index, newCarId) => {
    const newSelected = [...selected];
    const newCar = cars.find(c => c.id === Number(newCarId));
    if (newCar && !newSelected.some(c => c?.id === newCar.id)) {
      if (index < newSelected.length) newSelected[index] = newCar;
      else if (newSelected.length < 4) newSelected.push(newCar);
      setSelected(newSelected.filter(Boolean));
    }
  };

  const getHighlight = (key, values) => {
    if (key === "weight_kg" || key === "price") {
      const min = Math.min(...values);
      return values.map(v => v === min ? "#c8e6c9" : "");
    }
    const max = Math.max(...values);
    return values.map(v => v === max ? "#c8e6c9" : "");
  };

  const attributes = [
    { label: "Potência (cv)", key: "power_hp", highlight: true },
    { label: "Torque (Nm)", key: "torque_nm", highlight: true },
    { label: "Peso (kg)", key: "weight_kg", highlight: true },
    { label: "Vel. Máx (km/h)", key: "top_speed_kmh", highlight: true },
    { label: "Preço (R$)", key: "price", highlight: true },
    { label: "Categoria", key: "category", highlight: false },
    { label: "Tração", key: "traction", highlight: false },
    { label: "Combustível", key: "fuel_type", highlight: false },
  ];

  return (
    <div style={{ backgroundColor: "#f7f8fa", minHeight: "100vh", margin: 0, padding: 0 }}>
      <Header />

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "2rem 1rem" }}>
        <h1 style={{ textAlign: "center", color: "#333", marginBottom: "2.5rem", fontSize: "2.4rem", fontWeight: "bold" }}>
          Comparação de Carros
        </h1>

        {/* Dropdowns */}
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem" }}>
          {[0, 1, 2, 3].map(index => (
            <select
              key={index}
              value={selected[index]?.id || ""}
              onChange={e => handleSelect(index, e.target.value)}
              style={{
                padding: "0.9rem 1.2rem",
                borderRadius: "12px",
                width: "240px",
                border: "2px solid #ddd",
                fontSize: "1rem",
                backgroundColor: "white"
              }}
            >
              <option value="">Selecione o Carro {index + 1}</option>
              {cars.map(car => (
                <option key={car.id} value={car.id}>{car.brand} {car.model}</option>
              ))}
            </select>
          ))}
        </div>

        {selected.length >= 2 && (
          <>
            {/* Fotos – limpas, alinhadas e perfeitas */}
            <div style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "3rem",
              marginBottom: "4rem"
            }}>
              {selected.map(car => (
                <div key={car.id} style={{ textAlign: "center" }}>
                  <div style={{
                    width: "280px",
                    height: "170px",
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
                    transition: "transform 0.3s ease"
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-8px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                  >
                    <img
                      src={`http://localhost:3000/${car.image_url}`}
                      alt={car.model}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <h3 style={{ margin: "1.2rem 0 0", fontSize: "1.4rem", color: "#222", fontWeight: "600" }}>
                    {car.brand} {car.model}
                  </h3>
                </div>
              ))}
            </div>

            {/* Tabela – perfeita e totalmente responsiva */}
            <div style={{
              backgroundColor: "white",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
            }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#0d47a1", color: "white" }}>
                    <th style={{
                      padding: "1.4rem",
                      textAlign: "left",
                      fontSize: "1.15rem",
                      minWidth: "180px"
                    }}>
                      Atributo
                    </th>
                    {selected.map(car => (
                      <th key={car.id} style={{
                        padding: "1.2rem 0.8rem",
                        textAlign: "center",
                        fontSize: "1rem",
                        minWidth: "140px"
                      }}>
                        <div style={{ fontSize: "0.9rem", lineHeight: "1.3" }}>
                          {car.brand}<br />{car.model}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {attributes.map((attr, idx) => {
                    const values = selected.map(c =>
                      attr.key === "price" ? Number(c[attr.key] || Infinity) : Number(c[attr.key] || 0)
                    );
                    const highlights = attr.highlight ? getHighlight(attr.key, values) : Array(selected.length).fill("");

                    return (
                      <tr key={attr.label} style={{
                        borderBottom: idx < attributes.length - 1 ? "1px solid #e0e0e0" : "none"
                      }}>
                        <td style={{
                          padding: "1.2rem 1.4rem",
                          fontWeight: "600",
                          backgroundColor: "#f9f9f9",
                          fontSize: "1.05rem"
                        }}>
                          {attr.label}
                        </td>
                        {selected.map((car, i) => (
                          <td key={i} style={{
                            padding: "1.2rem 0.8rem",
                            textAlign: "center",
                            backgroundColor: highlights[i],
                            fontSize: "1rem",
                            fontWeight: highlights[i] ? "bold" : "normal"
                          }}>
                            {car[attr.key] !== undefined && car[attr.key] !== null
                              ? attr.key === "price"
                                ? Number(car[attr.key]).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
                                : car[attr.key]
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
      </div>
    </div>
  );
}
