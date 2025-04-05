import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { fetchCart } from "./store/cartSlice";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CartSidebar from "./components/CartSidebar";
import { useDispatch } from "react-redux";

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="relative">
      <Navbar toggleCart={toggleCart} toggleMobileMenu={toggleMobileMenu} />
      <Home
        mobileMenuOpen={mobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
};

export default AppWrapper;
