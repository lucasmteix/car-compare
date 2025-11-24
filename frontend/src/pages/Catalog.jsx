import { useState, useEffect } from "react";
import CarCard from "../components/CarCard";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";  // Importado para corrigir o erro

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

  const filteredCars = cars.filter(car =>
    car.model.toLowerCase().includes(query.toLowerCase())
  );

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

      <div style={{ textAlign: "center", marginTop: "2rem" }}>
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

      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <button onClick={goToCompare} disabled={selectedCars.length < 2} style={{ padding: "0.6rem 1rem", backgroundColor: selectedCars.length < 2 ? "#ccc" : "#0d47a1", color: "white", border: "none", borderRadius: "6px", cursor: selectedCars.length < 2 ? "not-allowed" : "pointer" }}>
          Ir para Comparação ({selectedCars.length} selecionados)
        </button>
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
            <CarCard key={car.id} car={car} onCompare={handleCompare} isSelected={selectedCars.some(c => c.id === car.id)} />
          ))
        ) : (
          <p style={{color: "#555", marginTop: "2rem"}}>Nenhum Carro encontrado.</p>
        )}
      </div>
    </div>
  );
}
