import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header style={{ backgroundColor: "#0d47a1", color: "white", padding: "1.2rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
      <h1 style={{ margin: 0, fontSize: "1.6rem" }}>Car Compare</h1>
      <nav>
        <Link to="/" style={{ color: "white", margin: "0 1.2rem", textDecoration: "none", fontWeight: "500" }}>Catálogo</Link>
        <Link to="/brands" style={{ color: "white", margin: "0 1.2rem", textDecoration: "none", fontWeight: "500" }}>Marcas</Link>
        <Link to="/compare" style={{ color: "white", margin: "0 1.2rem", textDecoration: "none", fontWeight: "500" }}>Comparar</Link>
      </nav>
    </header>
  );
}
