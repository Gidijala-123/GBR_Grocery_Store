import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Cart from "./components/Cart";
import Home from "./pages/Home";
import Category from "./pages/Category";
import "./index.css";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          toggleCart={() => setIsCartOpen(!isCartOpen)}
        />
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

        <div className="flex pt-16">
          <main className="flex-1 p-4 md:p-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:category" element={<Category />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
