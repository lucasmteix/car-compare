import { useState, useEffect } from "react";
import { useTheme } from "../ThemeProvider";
import { useNavigate } from "react-router-dom";  

export default function Brands() {
  const { isDark } = useTheme();
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();  

  useEffect(() => {
    fetch("http://localhost:3000/api/cars/brands")
      .then(res => res.json())
      .then(setBrands)
      .catch(err => console.error("Erro ao carregar marcas:", err));
  }, []);

  const handleBrandClick = (brand) => {
    const slug = brand.toLowerCase().replace(/\s+/g, '-');
    navigate(`/catalog/${slug}`);
  };
  return (
    <div style={{
      backgroundColor: "var(--bg-page)",
      color: "var(--text)",
      borderRadius: "32px",
      padding: "4rem 2rem",
      margin: "2rem auto",
      maxWidth: "1400px",
      boxShadow: "var(--shadow)",
      transition: "all 0.4s ease"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{
          textAlign: "center",
          fontSize: "3.5rem",
          fontWeight: "900",
          marginBottom: "4rem",
          background: "linear-gradient(90deg, var(--accent), #60a5fa, #a78bfa)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "-1px"
        }}>
          Todas as Marcas Disponíveis
        </h1>

        {/* Grid de marcas */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "2rem",
          padding: "0 1rem"
        }}>
          {brands.length > 0 ? (
            brands.sort().map((brand, idx) => (
              <div
                key={idx}
                role="button"
                tabIndex={0}
                onClick={() => handleBrandClick(brand)}
                onKeyDown={(e) => e.key === "Enter" && handleBrandClick(brand)}
                style={{
                  backgroundColor: "var(--bg-card)",
                  padding: "2.5rem 1.5rem",
                  borderRadius: "24px",
                  textAlign: "center",
                  fontSize: "1.8rem",
                  fontWeight: "700",
                  color: "var(--text)",
                  boxShadow: "var(--shadow)",
                  border: `2px solid var(--border)`,
                  transition: "all 0.4s ease",
                  cursor: "pointer"                   
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-12px) scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(13,71,161,0.3)";
                  e.currentTarget.style.borderColor = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "var(--shadow)";
                  e.currentTarget.style.borderColor = "var(--border)";
                }}
              >
                <div style={{
                  background: "linear-gradient(135deg, var(--accent), #60a5fa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontSize: "2.2rem",
                  marginBottom: "0.5rem"
                }}>
                  {brand}
                </div>
                <div style={{
                  fontSize: "1rem",
                  color: "var(--text-muted)",
                  fontWeight: "500"
                }}>
                  Ver todos os {brand}
                </div>
              </div>
            ))
          ) : (
            [...Array(12)].map((_, i) => (
              <div key={i} style={{
                backgroundColor: "var(--bg-card)",
                padding: "2.5rem",
                borderRadius: "24px",
                boxShadow: "var(--shadow)",
                animation: "pulse 1.5s ease-in-out infinite"
              }}>
                <div style={{
                  height: "2.5rem",
                  background: "linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)",
                  backgroundSize: "200% 100%",
                  animation: "loading 1.5s infinite",
                  borderRadius: "12px"
                }} />
              </div>
            ))
          )}
        </div>

        {brands.length === 0 && (
          <div style={{
            textAlign: "center",
            padding: "6rem 2rem",
            color: "var(--text-muted)",
            fontSize: "1.6rem"
          }}>
            Nenhuma marca encontrada no momento
          </div>
        )}
      </div>
    </div>
  );
}