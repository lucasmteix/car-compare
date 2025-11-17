import { useState, useEffect } from "react";
import { Link } from "react-router-dom";  // Para links de navegação no header

export default function Compare() {
  const [cars, setCars] = useState([]);
  const [car1Id, setCar1Id] = useState("");
  const [car2Id, setCar2Id] = useState("");
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/cars")
      .then(res => res.json())
      .then(setCars)
      .catch(err => console.error("Erro ao carregar carros:", err));
  }, []);

  const handleCompare = async () => {
    if (!car1Id || !car2Id || car1Id === car2Id) {
      setError("Selecione dois carros diferentes!");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:3000/api/cars/compare/${car1Id}/${car2Id}`);
      if (!res.ok) throw new Error("Erro na comparação");
      const data = await res.json();
      setComparison(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getCarById = (id) => cars.find(car => car.id === Number(id)) || {};

  return (
    <div style={{ backgroundColor: "#f7f8fa", minHeight: "100vh", padding: "2rem" }}>
      {/* Header simples para navegação */}
      <header style={{ backgroundColor: "#0d47a1", color: "white", padding: "1rem", marginBottom: "2rem" }}>
        <h1 style={{ margin: 0 }}>Car Compare</h1>
        <nav>
          <Link to="/" style={{ color: "white", margin: "0 1rem", textDecoration: "none" }}>Catálogo</Link>
          <Link to="/brands" style={{ color: "white", margin: "0 1rem", textDecoration: "none" }}>Marcas</Link>
          <Link to="/compare" style={{ color: "white", margin: "0 1rem", textDecoration: "none" }}>Comparar</Link>
        </nav>
      </header>

      <h1 style={{ textAlign: "center", color: "#333" }}>Comparar Carros</h1>
      
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "1rem" }}>
        <select 
          value={car1Id} 
          onChange={e => setCar1Id(e.target.value)}
          style={{ padding: "0.6rem", borderRadius: "8px", width: "200px" }}
        >
          <option value="">Selecione Carro 1</option>
          {cars.map(car => (
            <option key={car.id} value={car.id}>{car.brand} {car.model}</option>
          ))}
        </select>
        
        <select 
          value={car2Id} 
          onChange={e => setCar2Id(e.target.value)}
          style={{ padding: "0.6rem", borderRadius: "8px", width: "200px" }}
        >
          <option value="">Selecione Carro 2</option>
          {cars.map(car => (
            <option key={car.id} value={car.id}>{car.brand} {car.model}</option>
          ))}
        </select>
        
        <button 
          onClick={handleCompare}
          style={{ 
            padding: "0.6rem 1rem", 
            backgroundColor: "#0d47a1", 
            color: "white", 
            border: "none", 
            borderRadius: "8px", 
            cursor: "pointer" 
          }}
        >
          Comparar
        </button>
      </div>

      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}
      {loading && <p style={{ textAlign: "center" }}>Carregando comparação...</p>}

      {comparison && (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ textAlign: "center" }}>{comparison.modelos}</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
            <thead>
              <tr style={{ backgroundColor: "#eee" }}>
                <th style={{ padding: "0.8rem", textAlign: "left" }}>Atributo</th>
                <th style={{ padding: "0.8rem" }}>{getCarById(car1Id).brand} {getCarById(car1Id).model}</th>
                <th style={{ padding: "0.8rem" }}>{getCarById(car2Id).brand} {getCarById(car2Id).model}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "0.8rem" }}>Potência (cv)</td>
                <td style={{ padding: "0.8rem", backgroundColor: getCarById(car1Id).power_hp > getCarById(car2Id).power_hp ? "#d4edda" : "" }}>
                  {getCarById(car1Id).power_hp}
                </td>
                <td style={{ padding: "0.8rem", backgroundColor: getCarById(car2Id).power_hp > getCarById(car1Id).power_hp ? "#d4edda" : "" }}>
                  {getCarById(car2Id).power_hp}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "0.8rem" }}>Torque (Nm)</td>
                <td style={{ padding: "0.8rem", backgroundColor: getCarById(car1Id).torque_nm > getCarById(car2Id).torque_nm ? "#d4edda" : "" }}>
                  {getCarById(car1Id).torque_nm}
                </td>
                <td style={{ padding: "0.8rem", backgroundColor: getCarById(car2Id).torque_nm > getCarById(car1Id).torque_nm ? "#d4edda" : "" }}>
                  {getCarById(car2Id).torque_nm}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "0.8rem" }}>Categoria</td>
                <td style={{ padding: "0.8rem" }}>{getCarById(car1Id).category}</td>
                <td style={{ padding: "0.8rem" }}>{getCarById(car2Id).category}</td>
              </tr>
              {/* Adicione mais rows para outros campos do backend, ex: weight_kg, top_speed_kmh, price */}
              <tr>
                <td style={{ padding: "0.8rem" }}>Peso (kg)</td>
                <td style={{ padding: "0.8rem", backgroundColor: getCarById(car1Id).weight_kg < getCarById(car2Id).weight_kg ? "#d4edda" : "" }}>  {/* Menor peso é "melhor" */}
                  {getCarById(car1Id).weight_kg}
                </td>
                <td style={{ padding: "0.8rem", backgroundColor: getCarById(car2Id).weight_kg < getCarById(car1Id).weight_kg ? "#d4edda" : "" }}>
                  {getCarById(car2Id).weight_kg}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "0.8rem" }}>Velocidade Máx (km/h)</td>
                <td style={{ padding: "0.8rem", backgroundColor: getCarById(car1Id).top_speed_kmh > getCarById(car2Id).top_speed_kmh ? "#d4edda" : "" }}>
                  {getCarById(car1Id).top_speed_kmh}
                </td>
                <td style={{ padding: "0.8rem", backgroundColor: getCarById(car2Id).top_speed_kmh > getCarById(car1Id).top_speed_kmh ? "#d4edda" : "" }}>
                  {getCarById(car2Id).top_speed_kmh}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}