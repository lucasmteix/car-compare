export default function CarCard({ car, onCompare }) {

  const placeholderImage = `https://source.unsplash.com/400x300/?car,${car.brand}`;
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        width: "260px",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        cursor: "pointer",
        overflow: "hidden"
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.2)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
      }}
    >
      
      <img 
        src={car.image ? car.image : placeholderImage} 
        alt={`${car.brand} ${car.model}`}
        style={{
          width: "100%",
          height: "160px",
          objectFit: "cover",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          transition: "transform 0.3s ease"
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
      />

      <div style={{ padding: "1rem" }}>
        {/* Modelo + Marca */}
        <h2 style={{
          fontSize: "1.35rem",
          margin: 0,
          fontWeight: "600",
          color: "#111"
        }}>
          {car.brand} {car.model}
        </h2>

        {/* Categoria */}
        <p style={{
          color: "#0d47a1",
          fontWeight: "500",
          margin: "0.4rem 0 0",
          fontSize: "1.05rem"
        }}>
          {car.category}
        </p>

        {/* Potência */}
        <p style={{
          color: "#333",
          margin: "0.3rem 0 0",
          fontSize: "0.95rem"
        }}>
          <strong>{car.power_hp} cv</strong>
        </p>

        {/* Botão */}
        <div style={{ textAlign: "center", marginTop: "0.8rem" }}>
          <button
            onClick={() => onCompare(car)}
            style={{
              padding: "0.6rem 1rem",
              backgroundColor: "#0d47a1",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "500",
              minWidth: "120px",
              transition: "background-color 0.3s ease"
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#1565c0")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#0d47a1")}
          >
            Comparar
          </button>
        </div>
      </div>
    </div>
  );
}
