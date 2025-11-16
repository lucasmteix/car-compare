import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Catalog from "./pages/Catalog";
import Brands from "./pages/Brands";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/brands" element={<Brands />} />
      </Routes>
    </Router>
  );
}

export default App;