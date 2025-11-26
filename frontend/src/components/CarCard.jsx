export default function CarCard({ car, onCompare, isSelected = false }) {
  const imageUrl = car.image_url 
    ? `http://localhost:3000/${car.image_url}` 
    : `https://via.placeholder.com/400x300/cccccc/666666?text=Sem+Foto`;

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "16px",
        boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
        width: "280px",
        transition: "all 0.3s ease",
        cursor: "pointer",
        overflow: "hidden",
        position: "relative",
        ...(isSelected && {
          boxShadow: "0 0 0 4px #0d47a1, 0 6px 16px rgba(0,0,0,0.2)"
        })
      }}
      onMouseEnter={e => {
        if (!isSelected) {
          e.currentTarget.style.transform = "translateY(-8px)";
          e.currentTarget.style.boxShadow = "0 16px 32px rgba(0,0,0,0.22)";
        }
      }}
      onMouseLeave={e => {
        if (!isSelected) {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.12)";
        }
      }}
    >
      {/* Foto */}
      <div style={{ overflow: "hidden", borderRadius: "13px 13px 0 0" }}>
        <img 
          src={imageUrl} 
          alt={`${car.brand} ${car.model}`}
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
            transition: "transform 0.4s ease"
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        />
      </div>

      {/* texto do card */}
      <div style={{ padding: "1.2rem" }}>
        <h2 style={{ 
          fontSize: "1.45rem", 
          margin: "0 0 0.4rem 0", 
          fontWeight: "700", 
          color: "#111",
          lineHeight: "1.2"
        }}>
          {car.brand} {car.model}
        </h2>

        <p style={{ 
          color: "#0d47a1", 
          fontWeight: "600", 
          margin: "0 0 0.6rem 0", 
          fontSize: "1.15rem"
        }}>
          {car.category}
        </p>

        <p style={{ 
          color: "#222", 
          margin: "0 0 1rem 0", 
          fontSize: "1rem",
          fontWeight: "500",
          letterSpacing: "0.3px"
        }}>
          <strong>{car.year}</strong>
          <span style={{ margin: "0 10px" }}>•</span>
          <strong>{car.power_hp} cv</strong>
        </p>

        {/* botao */}
        <div style={{ textAlign: "center" }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCompare(car);
            }}
            style={{
              padding: "0.75rem 1.8rem",
              backgroundColor: isSelected ? "#d32f2f" : "#0d47a1",
              color: "white",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "1.05rem",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 14px rgba(13,71,161,0.4)"
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            {isSelected ? "Remover" : "Comparar"}
          </button>
        </div>
      </div>

      {/* simbool de check no canto pra ficar bonitinho */}
      {isSelected && (
        <div style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          width: "28px",
          height: "28px",
          backgroundColor: "#0d47a1",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          zIndex: 10
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      )}
    </div>
  );
}
