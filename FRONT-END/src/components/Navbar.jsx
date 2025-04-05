import { FaShoppingCart } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { toggleCart } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <nav className="navbar-gradient py-4 px-6 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center space-x-4">
        <button className="text-white md:hidden">
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
          onClick={() => dispatch(toggleCart())}
          className="relative p-2 text-white hover:text-orange-200 transition-colors duration-300"
        >
          <FaShoppingCart className="text-xl" />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
