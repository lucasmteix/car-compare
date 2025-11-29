import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("carcompare-dark");
    if (saved !== null) return saved === "true";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    localStorage.setItem("carcompare-dark", isDark);

    // AQUI É A MÁGICA: injetamos as variáveis direto no :root
    const root = document.documentElement;

    if (isDark) {
      root.style.setProperty("--bg-body", "#0f0f0f");
      root.style.setProperty("--bg-page", "#111111");
      root.style.setProperty("--bg-card", "#1e1e1e");
      root.style.setProperty("--bg-input", "#2d2d2d");
      root.style.setProperty("--text", "#f1f5f9");
      root.style.setProperty("--text-light", "#cbd5e1");
      root.style.setProperty("--text-muted", "#94a3b8");
      root.style.setProperty("--border", "#334155");
      root.style.setProperty("--shadow", "0 8px 32px rgba(0,0,0,0.6)");
      root.style.setProperty("--accent", "#3b82f6");
      root.style.setProperty("--accent-hover", "#60a5fa");
      document.body.style.backgroundColor = "#0f0f0f";
    } else {
      root.style.setProperty("--bg-body", "#f8fafc");
      root.style.setProperty("--bg-page", "#ffffff");
      root.style.setProperty("--bg-card", "#ffffff");
      root.style.setProperty("--bg-input", "#ffffff");
      root.style.setProperty("--text", "#1e293b");
      root.style.setProperty("--text-light", "#475569");
      root.style.setProperty("--text-muted", "#64748b");
      root.style.setProperty("--border", "#e2e8f0");
      root.style.setProperty("--shadow", "0 8px 32px rgba(0,0,0,0.1)");
      root.style.setProperty("--accent", "#0d47a1");
      root.style.setProperty("--accent-hover", "#1565c0");
      document.body.style.backgroundColor = "#f8fafc";
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);