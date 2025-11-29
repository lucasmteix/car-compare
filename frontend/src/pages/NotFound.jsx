// pages/NotFound.jsx
import { Link } from "react-router-dom";
import { useTheme } from "../ThemeProvider";

export default function NotFound() {
  const { isDark } = useTheme();

  return (
    <div style={{
      backgroundColor: "var(--bg-page)",
      color: "var(--text)",
      borderRadius: "32px",
      padding: "4rem 2rem",
      margin: "2rem auto",
      maxWidth: "1000px",
      boxShadow: "var(--shadow)",
      transition: "all 0.4s ease",
      minHeight: "calc(100vh - 200px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{ textAlign: "center" }}>
        {/* 404 Gigante com gradiente */}
        <h1 style={{
          fontSize: "12rem",
          fontWeight: "900",
          margin: "0 0 1rem",
          background: "linear-gradient(135deg, var(--accent), #60a5fa, #a78bfa)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          lineHeight: "1",
          letterSpacing: "-0.05em",
          textShadow: "0 10px 30px rgba(13,71,161,0.3)"
        }}>
          404
        </h1>

        {/* Título */}
        <h2 style={{
          fontSize: "2.8rem",
          fontWeight: "bold",
          margin: "0 0 1rem",
          color: "var(--text)"
        }}>
          Oops! Página não encontrada
        </h2>

        {/* Subtítulo */}
        <p style={{
          fontSize: "1.4rem",
          color: "var(--text-muted)",
          marginBottom: "3rem",
          maxWidth: "600px",
          marginLeft: "auto",
          marginRight: "auto",
          lineHeight: "1.6"
        }}>
          Parece que você se perdeu no mundo dos carros...  
          A página que você está procurando não existe ou foi removida.
        </p>

        {/* Botão Voltar */}
        <Link
          to="/"
          style={{
            display: "inline-block",
            padding: "1.3rem 3.5rem",
            backgroundColor: "var(--accent)",
            color: "white",
            textDecoration: "none",
            borderRadius: "24px",
            fontSize: "1.3rem",
            fontWeight: "700",
            boxShadow: "0 12px 35px rgba(13,71,161,0.4)",
            transition: "all 0.4s ease",
            backdropFilter: "blur(10px)",
            border: "2px solid transparent"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--accent-hover)";
            e.currentTarget.style.transform = "translateY(-6px)";
            e.currentTarget.style.boxShadow = "0 20px 40px rgba(13,71,161,0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--accent)";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 12px 35px rgba(13,71,161,0.4)";
          }}
        >
          Voltar ao Catálogo
        </Link>

        {/* Detalhe decorativo (opcional, mas fica lindo) */}
        <div style={{
          marginTop: "4rem",
          fontSize: "6rem",
          opacity: 0.1,
          pointerEvents: "none"
        }}>
        </div>
      </div>
    </div>
  );
}