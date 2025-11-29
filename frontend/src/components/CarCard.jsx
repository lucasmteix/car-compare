// components/CarCard.jsx
import { useTheme } from "../ThemeProvider";

export default function CarCard({ car, onCompare, isSelected = false }) {
  const { isDark } = useTheme(); // Pega o tema global!

  const imageUrl = car.image_url
    ? `http://localhost:3000/${car.image_url}`
    : `https://via.placeholder.com/400x300/334155/94a3b8?text=Sem+Foto`;

  const isElectric = car.fuel_type === "Elétrico" || car.fuel_type === "Híbrido";

  return (
    <div
      style={{
        backgroundColor: "var(--bg-card)",
        color: "var(--text)",
        borderRadius: "24px",
        boxShadow: "var(--shadow)",
        width: "340px",
        overflow: "hidden",
        transition: "all 0.4s ease",
        cursor: "pointer",
        position: "relative",
        border: `1px solid var(--border)`
      }}
      onMouseEnter={(e) => !isSelected && (e.currentTarget.style.transform = "translateY(-12px) scale(1.02)")}
      onMouseLeave={(e) => !isSelected && (e.currentTarget.style.transform = "translateY(0) scale(1)")}
    >
      {/* Foto */}
      <div style={{ height: "210px", overflow: "hidden", position: "relative" }}>
        <img
          src={imageUrl}
          alt={`${car.brand} ${car.model}`}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "all 0.4s ease" }}
        />
        {/* Overlay sutil no hover */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.4))",
          opacity: 0,
          transition: "opacity 0.4s ease"
        }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
          onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
        />
      </div>

      <div style={{ padding: "1.6rem" }}>
        {/* Marca + Modelo */}
        <h2 style={{
          fontSize: "1.65rem",
          fontWeight: "800",
          margin: "0 0 0.4rem",
          color: "var(--text)",
          letterSpacing: "-0.5px"
        }}>
          {car.brand} {car.model}
        </h2>

        {/* Categoria */}
        <p style={{
          color: "var(--accent)",
          fontWeight: "700",
          fontSize: "1.15rem",
          marginBottom: "1.2rem",
          textTransform: "uppercase",
          letterSpacing: "1px"
        }}>
          {car.category || "Sem categoria"}
        </p>

        {/* Informações técnicas - Grid limpo */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.7rem 1rem",
          fontSize: "0.98rem",
          color: "var(--text-light)",
          marginBottom: "1.2rem"
        }}>
          <div><strong>Ano:</strong> {car.year || "—"}</div>
          <div><strong>Potência:</strong> {car.power_hp ? `${car.power_hp} cv` : "—"}</div>

          <div>
            <strong>{isElectric ? "Cidade:" : "Cidade:"}</strong>{" "}
            {isElectric
              ? (car.wh_km_city ? `${car.wh_km_city} Wh/km` : "—")
              : (car.km_l_city ? `${car.km_l_city} km/l` : "—")}
          </div>
          <div>
            <strong>{isElectric ? "Estrada:" : "Estrada:"}</strong>{" "}
            {isElectric
              ? (car.wh_km_road ? `${car.wh_km_road} Wh/km` : "—")
              : (car.km_l_road ? `${car.km_l_road} km/l` : "—")}
          </div>

          <div><strong>Tração:</strong> {car.traction || "—"}</div>
          <div>
            <strong>Combustível:</strong>{" "}
            <span style={{
              padding: "4px 10px",
              borderRadius: "8px",
              fontSize: "0.8rem",
              fontWeight: "700",
              color: "white",
              backgroundColor:
                car.fuel_type === "Elétrico" ? "#16a34a" :
                car.fuel_type === "Híbrido" ? "#2563eb" :
                car.fuel_type === "Gasolina" ? "#dc2626" :
                car.fuel_type === "Álcool" ? "#ea580c" : "#64748b"
            }}>
              {car.fuel_type || "—"}
            </span>
          </div>
        </div>

        {/* Botão Comparar / Remover */}
        <div style={{ textAlign: "center", marginTop: "1.4rem" }}>
          <button
            onClick={(e) => { e.stopPropagation(); onCompare(car); }}
            style={{
              padding: "1rem 2.6rem",
              backgroundColor: isSelected ? "#dc2626" : "var(--accent)",
              color: "white",
              border: "none",
              borderRadius: "18px",
              fontSize: "1.1rem",
              fontWeight: "700",
              cursor: "pointer",
              boxShadow: isSelected 
                ? "0 8px 25px rgba(220, 38, 38, 0.4)" 
                : "0 8px 25px rgba(13, 71, 161, 0.35)",
              transition: "all 0.3s ease",
              minWidth: "160px"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.backgroundColor = isSelected ? "#b91c1c" : "var(--accent-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.backgroundColor = isSelected ? "#dc2626" : "var(--accent)";
            }}
          >
            {isSelected ? "Remover da comparação" : "Adicionar à comparação"}
          </button>
        </div>
      </div>

      {/* Check de selecionado - mais bonito */}
      {isSelected && (
        <div style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          background: "#dc2626",
          color: "white",
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.8rem",
          fontWeight: "bold",
          boxShadow: "0 8px 25px rgba(220, 38, 38, 0.5)",
          border: "4px solid white",
          zIndex: 10
        }}>
          Check
        </div>
      )}
    </div>
  );
}