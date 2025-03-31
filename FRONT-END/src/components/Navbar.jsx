import { FaShoppingCart, FaBars } from "react-icons/fa";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Navbar = ({ toggleSidebar, toggleCart }) => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <nav className="navbar-gradient py-4 px-6 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center space-x-4">
        <button onClick={toggleSidebar} className="text-white md:hidden">
          <FaBars className="text-xl" />
        </button>
        <h1 className="text-2xl font-bold text-white">Trocery</h1>
      </div>
      <div className="hidden md:flex items-center space-x-6">
        <a
          href="#"
          className="text-white hover:text-orange-200 transition-colors duration-300"
        >
          Shop
        </a>
        <a
          href="#"
          className="text-white hover:text-orange-200 transition-colors duration-300"
        >
          Vegetables & Fruits
        </a>
        <a
          href="#"
          className="text-white hover:text-orange-200 transition-colors duration-300"
        >
          Upgrade to pro
        </a>
        <a
          href="#"
          className="text-white hover:text-orange-200 transition-colors duration-300"
        >
          Contact Us
        </a>
        <button
          onClick={toggleCart}
          className="relative p-2 text-white hover:text-orange-200 transition-colors duration-300"
        >
          <FaShoppingCart className="text-xl" />
          {totalQuantity > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="price-badge"
            >
              {totalQuantity}
            </motion.span>
          )}
        </button>
      </div>
      <div className="flex md:hidden items-center">
        <button onClick={toggleCart} className="relative p-2 text-white">
          <FaShoppingCart className="text-xl" />
          {totalQuantity > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="price-badge"
            >
              {totalQuantity}
            </motion.span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
