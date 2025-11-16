import { useState, useEffect } from "react";

export default function Brands() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/cars/brands")
      .then(res => res.json())
      .then(setBrands)
      .catch(err => console.error("Erro ao carregar marcas:", err));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Marcas de Carros</h1>
      <ul style={{ marginTop: "1.5rem" }}>
        {brands.length ? (
          brands.map((brand, idx) => <li key={idx}>{brand}</li>)
        ) : (
          <p>Carregando marcas...</p>
        )}
      </ul>
    </div>
  );
}