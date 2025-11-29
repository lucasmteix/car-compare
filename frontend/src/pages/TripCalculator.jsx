// pages/TripCalculator.jsx
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useTheme } from "../ThemeProvider"; // Importante!

// Configuração do ícone do Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function TripCalculator() {
  const { isDark } = useTheme();

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const [allCars, setAllCars] = useState([]);
  const [selectedCars, setSelectedCars] = useState([]);

  const fuelPrices = { Gasolina: 5.89, Álcool: 4.19, Elétrico: 0.85 };

  useEffect(() => {
    fetch("http://localhost:3000/api/cars")      .then(r => r.json())
      .then(setAllCars)
      .catch(() => console.error("Erro ao carregar carros"));
  }, []);

  const calculateRoute = async () => {
    if (!origin.trim() || !destination.trim()) return alert("Preencha origem e destino!");

    try {
      const origResp = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(origin)}`);
      const origData = await origResp.json();
      const destResp = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destination)}`);
      const destData = await destResp.json();

      if (origData.length === 0 || destData.length === 0) return alert("Endereço não encontrado!");

      const orig = origData[0];
      const dest = destData[0];

      const routeResp = await fetch(`https://router.project-osrm.org/route/v1/driving/${orig.lon},${orig.lat};${dest.lon},${dest.lat}?overview=full&geometries=geojson`);
      const routeData = await routeResp.json();

      if (!routeData.routes?.length) return alert("Rota não encontrada!");

      const route = routeData.routes[0];
      setDistance((route.distance / 1000).toFixed(1));
      setDuration(formatDuration(route.duration));
      setRouteCoords(route.geometry.coordinates.map(c => [c[1], c[0]]));
    } catch (err) {
      console.error(err);
      alert("Erro ao calcular rota. Tente novamente.");
    }
  };

  const formatDuration = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return h > 0 ? `${h}h ${m}min` : `${m}min`;
  };

  const calculateCost = (car) => {
    if (!distance) return null;
    const fuel = (car.fuel_type || "").toLowerCase();
    const isElectric = fuel.includes("elétrico");
    const isDiesel = fuel.includes("diesel");

    let consumption = null;
    let unit = "L";

    if (isElectric) {
      consumption = car.wh_km_road || car.wh_km_city || car.wh_km_avg;
      if (!consumption) return null;
      unit = "kWh";
      consumption = consumption / 1000 * 100;
    } else {
      consumption = car.km_l_road || car.km_l_city || car.km_l_avg;
      if (!consumption) return null;
      consumption = 100 / consumption;
      unit = "L";
    }

    const totalConsumed = (distance / 100) * consumption;
    const price = isElectric ? 0.85 : isDiesel ? 5.80 : 5.89;

    return {
      consumed: totalConsumed.toFixed(1),
      unit,
      cost: (totalConsumed * price).toFixed(2)
    };
  };

  const toggleCar = (car) => {
    setSelectedCars(prev =>
      prev.some(c => c.id === car.id)
        ? prev.filter(c => c.id !== car.id)
        : [...prev, car]
    );
  };

  return (
    <div style={{
      backgroundColor: "var(--bg-page)",
      color: "var(--text)",
      borderRadius: "32px",
      padding: "3rem 2rem",
      margin: "2rem auto",
      maxWidth: "1500px",
      boxShadow: "var(--shadow)",
      transition: "all 0.4s ease"
    }}>
      <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
        {/* Título */}
        <h1 style={{
          textAlign: "center",
          fontSize: "3.2rem",
          fontWeight: "900",
          marginBottom: "3rem",
          background: "linear-gradient(90deg, var(--accent), #60a5fa)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}>
          Calculadora de Viagem
        </h1>

        {/* Inputs */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
          marginBottom: "3rem",
          maxWidth: "1000px",
          marginLeft: "auto",
          marginRight: "auto"
        }}>
          <input
            type="text"
            placeholder="Origem (ex: São Paulo, SP)"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            style={{
              padding: "1.4rem 1.6rem",
              borderRadius: "20px",
              border: `2px solid var(--border)`,
              backgroundColor: "var(--bg-input)",
              color: "var(--text)",
              fontSize: "1.2rem",
              outline: "none",
              boxShadow: "var(--shadow)",
              transition: "all 0.3s ease"
            }}
            onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
            onBlur={(e) => e.target.style.borderColor = "var(--border)"}
          />
          <input
            type="text"
            placeholder="Destino (ex: Rio de Janeiro, RJ)"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            style={{
              padding: "1.4rem 1.6rem",
              borderRadius: "20px",
              border: `2px solid var(--border)`,
              backgroundColor: "var(--bg-input)",
              color: "var(--text)",
              fontSize: "1.2rem",
              outline: "none",
              boxShadow: "var(--shadow)",
              transition: "all 0.3s ease"
            }}
            onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
            onBlur={(e) => e.target.style.borderColor = "var(--border)"}
          />
        </div>

        {/* Botão Calcular */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <button
            onClick={calculateRoute}
            style={{
              padding: "1.3rem 4rem",
              backgroundColor: "var(--accent)",
              color: "white",
              border: "none",
              borderRadius: "24px",
              fontSize: "1.4rem",
              fontWeight: "700",
              cursor: "pointer",
              boxShadow: "0 12px 30px rgba(13,71,161,0.4)",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--accent-hover)"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "var(--accent)"}
          >
            Calcular Rota
          </button>
        </div>

        {/* Resultado da rota */}
        {distance && (
          <div style={{
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "3rem",
            color: "var(--accent)",
            textShadow: "0 4px 10px rgba(13,71,161,0.3)"
          }}>
            {distance} km • {duration}
          </div>
        )}

        {/* Mapa */}
        {routeCoords.length > 0 && (
          <div style={{
            height: "560px",
            borderRadius: "28px",
            overflow: "hidden",
            marginBottom: "4rem",
            boxShadow: "var(--shadow)",
            border: `3px solid var(--accent)`
          }}>
            <MapContainer center={routeCoords[0]} zoom={7} style={{ height: "100%", width: "100%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
              />
              <Polyline positions={routeCoords} color={isDark ? "#60a5fa" : "#0d47a1"} weight={8} opacity={0.9} />
              <Marker position={routeCoords[0]} />
              <Marker position={routeCoords[routeCoords.length - 1]} />
            </MapContainer>
          </div>
        )}

        {/* Custo por carro */}
        {distance && (
          <>
            <h2 style={{
              textAlign: "center",
              fontSize: "2.4rem",
              fontWeight: "bold",
              margin: "3rem 0 2rem",
              color: "var(--text)"
            }}>
              Custo Estimado por Carro
            </h2>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
              gap: "2rem"
            }}>
              {allCars.map((car) => {
                const cost = calculateCost(car);
                const selected = selectedCars.some(c => c.id === car.id);

                return (
                  <div
                    key={car.id}
                    onClick={() => toggleCar(car)}
                    style={{
                      backgroundColor: "var(--bg-card)",
                      padding: "2rem",
                      borderRadius: "24px",
                      cursor: "pointer",
                      border: selected ? `4px solid var(--accent)` : `2px solid var(--border)`,
                      boxShadow: selected ? "0 12px 35px rgba(13,71,161,0.3)" : "var(--shadow)",
                      transition: "all 0.4s ease",
                      transform: selected ? "translateY(-8px)" : "translateY(0)"
                    }}
                  >
                    <h3 style={{
                      fontSize: "1.5rem",
                      fontWeight: "700",
                      marginBottom: "1rem",
                      color: "var(--text)"
                    }}>
                      {car.brand} {car.model}
                    </h3>

                    {cost ? (
                      <div style={{
                        fontSize: "1.6rem",
                        fontWeight: "600",
                        color: "var(--text-light)"
                      }}>
                        <span style={{ color: "var(--accent)", fontSize: "2rem", fontWeight: "900" }}>
                          R$ {cost.cost}
                        </span>
                        <br />
                        <span style={{ fontSize: "1.1rem", opacity: 0.9 }}>
                          {cost.consumed} {cost.unit} consumidos
                        </span>
                      </div>
                    ) : (
                      <div style={{ color: "#ef4444", fontStyle: "italic" }}>
                        Consumo não informado
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}