import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ backgroundColor: "#f7f8fa", minHeight: "100vh", padding: "2rem" }}>
      
      {/* Header igual ao Compare.jsx */}
      <header style={{ backgroundColor: "#0d47a1", color: "white", padding: "1rem", marginBottom: "2rem" }}>
        <h1 style={{ margin: 0 }}>Car Compare</h1>
        <nav>
          <Link to="/" style={{ color: "white", margin: "0 1rem", textDecoration: "none" }}>Catálogo</Link>
          <Link to="/brands" style={{ color: "white", margin: "0 1rem", textDecoration: "none" }}>Marcas</Link>
          <Link to="/compare" style={{ color: "white", margin: "0 1rem", textDecoration: "none" }}>Comparar</Link>
        </nav>
      </header>

      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <h1 style={{ fontSize: "3rem", color: "#333", marginBottom: "1rem" }}>404</h1>
        <p style={{ fontSize: "1.2rem", color: "#555" }}>Oops! A página que você tentou acessar não existe.</p>

        <Link 
          to="/" 
          style={{
            display: "inline-block",
            marginTop: "2rem",
            padding: "0.8rem 1.4rem",
            backgroundColor: "#0d47a1",
            color: "white",
            textDecoration: "none",
            borderRadius: "8px",
            fontWeight: "bold"
          }}
        >
          Voltar ao Catálogo
        </Link>
      </div>

    </div>
  );
}
