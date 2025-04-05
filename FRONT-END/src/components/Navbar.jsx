import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectCartCount } from "../store/cartSlice";

const Navbar = ({ toggleMobileMenu, toggleCart }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartCount = useSelector(selectCartCount);

  const handleMobileMenuClick = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    toggleMobileMenu();
  };

  return (
    <nav className="bg-green-600 shadow-sm py-4 px-6 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center space-x-4">
        <button
          id="mobile-menu-button"
          className="text-white md:hidden"
          onClick={handleMobileMenuClick}
        >
          <i className="fas fa-bars text-xl"></i>
        </button>
        <h1 className="text-2xl font-bold text-white">Trocery</h1>
      </div>
      <div className="hidden md:flex items-center space-x-6">
        <a
          href="#"
          className="text-white hover:text-yellow-200 transition-colors"
        >
          Shop
        </a>
        <a
          href="#"
          className="text-white hover:text-yellow-200 transition-colors"
        >
          Vegetables & Fruits
        </a>
        <a
          href="#"
          className="text-white hover:text-yellow-200 transition-colors"
        >
          Upgrade to pro
        </a>
        <a
          href="#"
          className="text-white hover:text-yellow-200 transition-colors"
        >
          Contact Us
        </a>
        <button
          id="cart-toggle"
          className="relative p-2 text-white hover:text-yellow-200 transition-colors"
          onClick={toggleCart}
        >
          <i className="fas fa-shopping-cart text-xl"></i>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
      <div className="flex md:hidden items-center">
        <button
          id="mobile-cart-button"
          className="relative p-2 text-white"
          onClick={toggleCart}
        >
          <i className="fas fa-shopping-cart text-xl"></i>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
