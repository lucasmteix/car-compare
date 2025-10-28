import { useState } from "react";
import CarCard from "../components/CarCard";

const cars = [
  {
    id: 1,
    name: "Tesla Model 3",
    year: 2023,
    category: "Sedan Elétrico",
    power: "283 cv",
    image: "/images/tesla.jpg"
  },
  {
    id: 2,
    name: "BMW i4",
    year: 2024,
    category: "Coupé Elétrico",
    power: "340 cv",
    image: "/images/bmw.jpg"
  },
  {
    id: 3,
    name: "Civic Si",
    year: 2008,
    category: "Sedan Esportivo",
    power: "192 cv",
    image: "/images/civic.jpg"
  },
  {
    id: 4,
    name: "Audi A5",
    year: 2016,
    category: "Coupé Premium",
    power: "252 cv",
    image: "/images/audi.jpg"
  }
];

export default function Catalog() {
  const [query, setQuery] = useState("");

  const filteredCars = cars.filter(car =>
    car.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleCompare = (car) => {
    alert(`Você selecionou para comparar: ${car.name}`);
    // Aqui depois você pode abrir modal ou redirecionar pra tela de comparação
  };

  return (
    <div style={{ backgroundColor: "#f7f8fa", minHeight: "100vh" }}>
      <header
        style={{
          backgroundColor: "#0d47a1",
          color: "white",
          padding: "1rem 2rem",
          fontSize: "1.5rem",
          fontWeight: "bold",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
        }}
      >
        Car Compare
      </header>

      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h2>Escolha os carros para comparar</h2>
        <input
          type="text"
          placeholder="Buscar carro..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: "0.6rem 1rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginTop: "1rem",
            width: "280px",
            fontSize: "1rem"
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "2rem",
          padding: "2rem"
        }}
      >
        {filteredCars.length > 0 ? (
          filteredCars.map(car => (
            <CarCard key={car.id} car={car} onCompare={handleCompare} />
          ))
        ) : (
          <p style={{ color: "#555", marginTop: "2rem" }}>Nenhum carro encontrado.</p>
        )}
      </div>
    </div>
  );
}
