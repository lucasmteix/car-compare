import { useState, useEffect } from "react";
import CarCard from "../components/CarCard";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

export default function Catalog() {
  const [cars, setCars] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedCars, setSelectedCars] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/cars")
      .then(res => res.json())
      .then(data => setCars(data))
      .catch(err => console.error("Erro ao carregar os carros:", err));
  }, []);

  const filteredCars = cars.filter(car => {
    const lowerQuery = query.toLowerCase();
    return (
      car.brand.toLowerCase().includes(lowerQuery) ||
      car.model.toLowerCase().includes(lowerQuery) ||
      car.category.toLowerCase().includes(lowerQuery) ||
      car.fuel_type.toLowerCase().includes(lowerQuery) ||
      car.traction.toLowerCase().includes(lowerQuery) ||
      car.year.toString().includes(lowerQuery)
    );
  });

  const handleCompare = (car) => {
    if (selectedCars.find(c => c.id === car.id)) {
      setSelectedCars(selectedCars.filter(c => c.id !== car.id));
    } else if (selectedCars.length < 4) {
      setSelectedCars([...selectedCars, car]);
    } else {
      alert("Máximo 4 carros!");
    }
  };

  const goToCompare = () => {
    if (selectedCars.length >= 2) {
      navigate('/compare', { state: { cars: selectedCars } });
    } else {
      alert("Selecione pelo menos 2 carros!");
    }
  };

  return (
    <div style={{ backgroundColor: "#f7f8fa", minHeight: "100vh", margin: 0, padding: 0 }}>
      <Header />

      <div style={{ textAlign: "center", marginTop: "2rem", padding: "0 1rem" }}>
        <h2 style={{ marginBottom: "1rem", color: "#333", fontWeight: "600" }}>
          Escolha os carros para comparar
        </h2>

        {/* Barra de pesquisa */}
        <div style={{ position: "relative", maxWidth: "600px", margin: "0 auto" }}>
          <input
            type="text"
            placeholder="Busque por marca, modelo, ano, categoria ..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "0.95rem 1.3rem 0.95rem 3.2rem",
              borderRadius: "14px",
              border: "2px solid #ddd",
              fontSize: "1.1rem",
              backgroundColor: "white",
              boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
              outline: "none",
              transition: "all 0.3s ease",
              boxSizing: "border-box"
            }}
            onFocus={(e) => e.target.style.borderColor = "#0d47a1"}
            onBlur={(e) => e.target.style.borderColor = "#ddd"}
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#666"
            style={{
              position: "absolute",
              left: "18px",
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none"
            }}
          >
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
          </svg>
        </div>
      </div>

      {/* Botão de comparação */}
      <div style={{ textAlign: "center", marginTop: "1.8rem" }}>
        <button
          onClick={goToCompare}
          disabled={selectedCars.length < 2}
          style={{
            padding: "0.9rem 2rem",
            backgroundColor: selectedCars.length < 2 ? "#ccc" : "#0d47a1",
            color: "white",
            border: "none",
            borderRadius: "14px",
            fontSize: "1.1rem",
            fontWeight: "600",
            cursor: selectedCars.length < 2 ? "not-allowed" : "pointer",
            boxShadow: "0 6px 20px rgba(13,71,161,0.35)",
            transition: "all 0.3s ease"
          }}
        >
          Ir para Comparação ({selectedCars.length} selecionados)
        </button>
      </div>

      {/* Grid de carros */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "2.2rem",
        padding: "3rem 1rem"
      }}>
        {filteredCars.length > 0 ? (
          filteredCars.map(car => (
            <CarCard
              key={car.id}
              car={car}
              onCompare={handleCompare}
              isSelected={selectedCars.some(c => c.id === car.id)}
            />
          ))
        ) : (
          <p style={{ color: "#555", marginTop: "2rem", fontSize: "1.3rem" }}>
            Nenhum carro encontrado.
          </p>
        )}
      </div>
    </div>
  );
}
