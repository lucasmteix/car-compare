import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function NotFound() {
  return (
    <div style={{ backgroundColor: "#f7f8fa", minHeight: "100vh", margin: 0, padding: 0 }}>
      <Header />

      <div style={{ textAlign: "center", padding: "4rem 2rem", maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "5.5rem", fontWeight: "bold", color: "#0d47a1", margin: "0 0 1rem" }}>
          404
        </h1>
        <h2 style={{ fontSize: "1.8rem", color: "#333", marginBottom: "1rem" }}>
          Oops! Página não encontrada
        </h2>
        <p style={{ fontSize: "1.2rem", color: "#666", marginBottom: "2.5rem" }}>
          A página que você tentou acessar não existe ou foi removida.
        </p>

        <Link
          to="/"
          style={{
            display: "inline-block",
            padding: "0.9rem 2rem",
            backgroundColor: "#0d47a1",
            color: "white",
            textDecoration: "none",
            borderRadius: "12px",
            fontWeight: "bold",
            fontSize: "1.1rem",
            boxShadow: "0 4px 12px rgba(13,71,161,0.3)",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = "#1565c0"}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = "#0d47a1"}
        >
          Voltar ao Catálogo
        </Link>
      </div>
    </div>
  );
}
