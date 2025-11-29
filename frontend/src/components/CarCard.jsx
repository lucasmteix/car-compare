import { useTheme } from "../ThemeProvider";

export default function CarCard({ car, onCompare, isSelected = false }) {
  const { isDark } = useTheme();

  const imageUrl = car.image_url
    ? `http://localhost:3000/${car.image_url}`
    : `https://via.placeholder.com/400x300/334155/94a3b8?text=Sem+Foto`;

  const isElectric = car.fuel_type === "Elétrico" || car.fuel_type === "Híbrido";

  return (
    <div
      style={{
        backgroundColor: "var(--bg-card)",
        color: "var(--text)",
        borderRadius: "28px",
        boxShadow: isSelected
          ? "0 0 0 6px #0d47a1, 0 20px 40px rgba(13,71,161,0.35)"
          : "var(--shadow)",
        width: "380px",
        overflow: "hidden",
        transition: "all 0.4s ease",
        cursor: "pointer",
        position: "relative",
        transform: isSelected ? "translateY(-12px)" : "none",
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.transform = "translateY(-20px) scale(1.04)";
          e.currentTarget.style.boxShadow = "0 30px 60px rgba(13,71,161,0.4)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.transform = "translateY(0) scale(1)";
          e.currentTarget.style.boxShadow = "var(--shadow)";
        }
      }}
    >
      {/* Foto */}
      <div style={{ height: "240px", overflow: "hidden", position: "relative" }}>
        <img
          src={imageUrl}
          alt={`${car.brand} ${car.model}`}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "0.4s" }}
        />
        {/* Overlay sutil no hover */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.5))",
          opacity: 0,
          transition: "opacity 0.4s ease"
        }}
          onMouseEnter={e => e.currentTarget.style.opacity = 1}
          onMouseLeave={e => e.currentTarget.style.opacity = 0}
        />
      </div>

      <div style={{ padding: "2rem 1.8rem" }}>
        {/* Marca + Modelo */}
        <h2 style={{
          fontSize: "1.85rem",
          fontWeight: "800",
          textAlign: "center",
          margin: "0 0 0.8rem",
          color: "var(--text)",
          minHeight: "76px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          {car.brand} {car.model}
        </h2>

        {/* Categoria */}
        <p style={{
          color: "var(--accent)",
          fontWeight: "700",
          fontSize: "1.25rem",
          textAlign: "center",
          margin: "0 0 1.8rem",
          textTransform: "uppercase",
          letterSpacing: "1.5px"
        }}>
          {car.category || "Sem categoria"}
        </p>

        {/* Informações técnicas - Grid limpo */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          fontSize: "1rem",
          color: "var(--text-light)",
          minHeight: "156px",
          marginBottom: "1.8rem"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span><strong>Ano:</strong> {car.year || "—"}</span>
            <span><strong>Potência:</strong> {car.power_hp ? `${car.power_hp} cv` : "—"}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span><strong>Cidade:</strong> {isElectric ? `${car.wh_km_city || "—"} Wh/km` : `${car.km_l_city || "—"} km/l`}</span>
            <span><strong>Estrada:</strong> {isElectric ? `${car.wh_km_road || "—"} Wh/km` : `${car.km_l_road || "—"} km/l`}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span><strong>Tração:</strong> {car.traction || "—"}</span>
            <span>
              <strong>Combustível:</strong>{" "}
              <span style={{
                padding: "6px 14px",
                borderRadius: "12px",
                fontSize: "0.85rem",
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
            </span>
          </div>
        </div>

        {/* Botão Comparar / Remover */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={(e) => { e.stopPropagation(); onCompare(car); }}
            style={{
              padding: "1.1rem 2.8rem",
              backgroundColor: isSelected ? "#dc2626" : "var(--accent)",
              color: "white",
              border: "none",
              borderRadius: "20px",
              fontSize: "1.15rem",
              fontWeight: "700",
              cursor: "pointer",
              minWidth: "240px",
              height: "68px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              boxShadow: isSelected 
                ? "0 10px 30px rgba(220,38,38,0.5)" 
                : "0 10px 30px rgba(13,71,161,0.45)",
              transition: "all 0.3s ease"
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
          top: "20px",
          right: "20px",
          width: "40px",
          height: "40px",
          backgroundColor: "#0d47a1",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "4px solid white",
          boxShadow: "0 8px 25px rgba(13,71,161,0.6)",
          zIndex: 10
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      )}
    </div>
  );
}