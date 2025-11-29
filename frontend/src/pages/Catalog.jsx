import { useState, useEffect } from "react";
import CarCard from "../components/CarCard";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeProvider"; export default function Catalog() {
  const { isDark } = useTheme(); 
  const [cars, setCars] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedCars, setSelectedCars] = useState([]);
  const navigate = useNavigate();  useEffect(() => {
    fetch("http://localhost:3000/api/cars")
      .then(res => res.json())
      .then(data => setCars(data))
      .catch(err => console.error("Erro ao carregar os carros:", err));
  }, []);  const filteredCars = cars.filter(car => {
    const lowerQuery = query.toLowerCase();
    return (
      car.brand?.toLowerCase().includes(lowerQuery) ||
      car.model?.toLowerCase().includes(lowerQuery) ||
      car.category?.toLowerCase().includes(lowerQuery) ||
      car.fuel_type?.toLowerCase().includes(lowerQuery) ||
      car.traction?.toLowerCase().includes(lowerQuery) ||
      car.year?.toString().includes(lowerQuery)
    );
  });  const handleCompare = (car) => {
    if (selectedCars.find(c => c.id === car.id)) {
      setSelectedCars(selectedCars.filter(c => c.id !== car.id));
    } else if (selectedCars.length < 4) {
      setSelectedCars([...selectedCars, car]);
    } else {
      alert("Você só pode comparar até 4 carros!");
    }
  };  const goToCompare = () => {
    if (selectedCars.length >= 2) {
      navigate('/compare', { state: { cars: selectedCars } });
    } else {
      alert("Selecione pelo menos 2 carros para comparar!");
    }
  };   return (
    <>
      {/* Conteúdo principal do catálogo */}
      <div style={{
        backgroundColor: "var(--bg-page)",
        color: "var(--text)",
        borderRadius: "24px",
        padding: "2.5rem",
        margin: "2rem auto",
        maxWidth: "1500px",
        boxShadow: "var(--shadow)",
        transition: "all 0.4s ease",
        paddingBottom: "120px" // espaço pro FAB não sobrepor
      }}>
        {/* Título + subtítulo */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1 style={{ 
            fontSize: "2.8rem", 
            fontWeight: "bold", 
            marginBottom: "0.5rem",
            background: "linear-gradient(90deg, var(--accent), #60a5fa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            Catálogo de Carros
          </h1>
          <p style={{ fontSize: "1.3rem", color: "var(--text-muted)" }}>
            Selecione até 4 veículos para comparar
          </p>
        </div>

        {/* Barra de pesquisa */}
        <div style={{ maxWidth: "700px", margin: "0 auto 3rem", position: "relative" }}>
          {/* ... seu input e svg ... */}
        </div>

        {/* Grid de carros */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: "2.5rem",
          padding: "1rem",
          maxWidth: "1600px",
          margin: "0 auto"
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
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "4rem", color: "var(--text-muted)", fontSize: "1.4rem" }}>
              Nenhum carro encontrado para sua busca
            </div>
          )}
        </div>
      </div>

      {/* BOTÃO FLUTUANTE (FAB) — DENTRO do return e do fragment */}
      {selectedCars.length > 0 && (
        <div style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          zIndex: 999,
          animation: selectedCars.length >= 2 ? "pulse 2s infinite" : "none"
        }}>
          <button
            onClick={goToCompare}
            disabled={selectedCars.length < 2}
            style={{
              padding: "1.2rem 2.4rem",
              backgroundColor: selectedCars.length < 2 ? "#475569" : "var(--accent)",
              color: "white",
              border: "none",
              borderRadius: "50px",
              fontSize: "1.3rem",
              fontWeight: "700",
              cursor: selectedCars.length < 2 ? "not-allowed" : "pointer",
              boxShadow: "0 12px 35px rgba(13,71,161,0.5)",
              transition: "all 0.4s ease",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              backdropFilter: "blur(12px)",
              border: "3px solid rgba(255,255,255,0.2)"
            }}
            onMouseEnter={(e) => selectedCars.length >= 2 && (
              e.currentTarget.style.backgroundColor = "var(--accent-hover)",
              e.currentTarget.style.transform = "translateY(-4px) scale(1.05)"
            )}
            onMouseLeave={(e) => selectedCars.length >= 2 && (
              e.currentTarget.style.backgroundColor = "var(--accent)",
              e.currentTarget.style.transform = "translateY(0) scale(1)"
            )}
          >
            Comparar  os {selectedCars.length} carro{selectedCars.length > 1 ? "s" : ""}
          </button>
        </div>
      )}

      {/* Animação do pulse */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 12px 35px rgba(13,71,161,0.5); }
          50% { box-shadow: 0 12px 50px rgba(13,71,161,0.8); }
        }
      `}</style>
    </>
  );
}