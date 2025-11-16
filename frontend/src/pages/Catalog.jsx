import { useState, useEffect } from "react";
import CarCard from "../components/CarCard";

export default function Catalog(){
  const [cars, setCars] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() =>{
    fetch("http://localhost:3000/api/cars")
      .then(res => res.json())
      .then(data => setCars(data))
      .catch(err => console.error("Erro ao carregar os carros:", err))
  }, []);

  const filteredCars = cars.filter(car =>
    car.model.toLowerCase().includes(query.toLowerCase())
  );

  const handleCompare = (car) => {
    alert(`Você selecionou para comparar: ${car.model}`);
  };

  return (
    <div style={{backgroundColor: "#f7f8a", minHeight: "100vh" }}>
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

      <div style={{ textAlign: "center", marginTop: "2rem"}}>
        <h2> Escolha os carros para comparar</h2>
        <input
          type="text"
          placeholder="Buscar carro. . ."
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
          <p style={{color: "#555", marginTop: "2rem"}}>Nenhum Carro encontrado.</p>
        )}
      </div>
    </div>
  );
}