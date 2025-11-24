import { useState, useEffect } from "react";
import Header from "../components/Header";

export default function Brands() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/cars/brands")
      .then(res => res.json())
      .then(setBrands)
      .catch(err => console.error("Erro ao carregar marcas:", err));
  }, []);

  return (
    <div style={{ backgroundColor: "#f7f8fa", minHeight: "100vh", margin: 0, padding: 0 }}>
      <Header />

      <div style={{ maxWidth: "1200px", margin: "2rem auto", padding: "0 2rem", textAlign: "center" }}>
        <h1 style={{ color: "#333", marginBottom: "2rem" }}>Marcas de Carros</h1>
        <ul style={{ listStyle: "none", padding: 0, maxWidth: "400px", margin: "0 auto" }}>
          {brands.length ? (
            brands.map((brand, idx) => (
              <li key={idx} style={{ padding: "1rem", borderBottom: "1px solid #eee", fontSize: "1.2rem", color: "#555" }}>
                {brand}
              </li>
            ))
          ) : (
            <p style={{ color: "#555" }}>Carregando marcas...</p>
          )}
        </ul>
      </div>
    </div>
  );
}
