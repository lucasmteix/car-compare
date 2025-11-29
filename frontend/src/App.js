// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Catalog from "./pages/Catalog";
import Compare from "./pages/Compare";
import Brands from "./pages/Brands";
import NotFound from "./pages/NotFound";
import TripCalculator from "./pages/TripCalculator";
import Header from "./components/Header";
import { useTheme } from "./ThemeProvider";

function App() {
  const { isDark } = useTheme();

  return (
    <Router>
      <div style={{ 
        minHeight: "100vh", 
        backgroundColor: "var(--bg-body)", 
        color: "var(--text)",
        transition: "all 0.4s ease"
      }}>
        <Header />
        
        <main style={{ paddingTop: "90px" }}>
          <Routes>
            <Route path="/" element={<Catalog />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/notfound" element={<NotFound />} />
            <Route path="/viagem" element={<TripCalculator />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;