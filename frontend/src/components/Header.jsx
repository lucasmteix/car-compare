// components/Header.jsx
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../ThemeProvider";

export default function Header() {
  const { isDark, setIsDark } = useTheme();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header style={{
      backgroundColor: isDark ? "#111" : "#0d47a1",
      color: "white",
      padding: "1.6rem 2rem",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
      backdropFilter: "blur(12px)",
      borderBottom: isDark ? "1px solid #334155" : "none",
      transition: "all 0.4s ease"
    }}>
      <div style={{ 
        maxWidth: "1400px", 
        margin: "0 auto", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center" 
      }}>
        <h1 style={{ 
          fontSize: "2.1rem", 
          fontWeight: "900", 
          letterSpacing: "-1px"
        }}>
          Car Compare
        </h1>

        <nav style={{ display: "flex", alignItems: "center", gap: "3rem" }}>
          <Link 
            to="/" 
            style={{ 
              color: "white", 
              textDecoration: "none", 
              fontWeight: isActive("/") ? "800" : "500",
              paddingBottom: "0.5rem",
              borderBottom: isActive("/") ? "3px solid white" : "3px solid transparent",
              transition: "all 0.3s ease"
            }}
          >
            Catálogo
          </Link>
          <Link 
            to="/brands" 
            style={{ 
              color: "white", 
              textDecoration: "none", 
              fontWeight: isActive("/brands") ? "800" : "500",
              paddingBottom: "0.5rem",
              borderBottom: isActive("/brands") ? "3px solid white" : "3px solid transparent",
              transition: "all 0.3s ease"
            }}
          >
            Marcas
          </Link>
          <Link 
            to="/compare" 
            style={{ 
              color: "white", 
              textDecoration: "none", 
              fontWeight: isActive("/compare") ? "800" : "500",
              paddingBottom: "0.5rem",
              borderBottom: isActive("/compare") ? "3px solid white" : "3px solid transparent",
              transition: "all 0.3s ease"
            }}
          >
            Comparar
          </Link>

          <Link 
            to="/viagem"
            style={{
              background: "rgba(255,255,255,0.22)",
              color: "white",
              padding: "0.8rem 1.8rem",
              borderRadius: "20px",
              fontWeight: "700",
              textDecoration: "none",
              backdropFilter: "blur(10px)",
              border: "2px solid rgba(255,255,255,0.15)",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.32)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.22)"}
          >
            Calcular Viagem
          </Link>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: "600",
                color: "rgba(255,255,255,0.7)",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}
            >
              Tema
            </span>

            <button
              onClick={() => setIsDark(!isDark)}
              aria-label="Alternar tema claro/escuro"
              style={{
                width: "64px",
                height: "36px",
                backgroundColor: "rgba(255,255,255,0.15)",
                border: "2px solid rgba(255,255,255,0.25)",
                borderRadius: "50px",
                position: "relative",
                cursor: "pointer",
                transition: "all 0.4s ease",
                backdropFilter: "blur(12px)",
                boxShadow: "inset 0 2px 8px rgba(0,0,0,0.15)",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.25)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)")}
            >
              <div
                style={{
                  position: "absolute",
                  top: "4px",
                  left: isDark ? "4px" : "28px",
                  width: "28px",
                  height: "28px",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  transition: "all 0.45s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1rem",
                  color: isDark ? "#e2e8f0" : "#f59e0b",
                }}
              >
              </div>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}