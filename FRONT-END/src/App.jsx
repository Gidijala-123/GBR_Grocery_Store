// Path: FRONT-END/src/App.jsx

import React, { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store";
import { fetchCart } from "./store/cartSlice";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CartSidebar from "./components/CartSidebar";
import LoginModal from "./components/LoginModal";
import { setAuthToken, verifyToken } from "./utils/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName="bg-white text-gray-800 shadow-lg"
      />
      <App />
    </Provider>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const isValid = await verifyToken();
          if (isValid) {
            setAuthToken(token);
            dispatch({ type: "auth/loginSuccess" });
            dispatch(fetchCart());
          } else {
            localStorage.removeItem("token");
          }
        } catch (error) {
          console.error("Token verification failed:", error);
          localStorage.removeItem("token");
        }
      }
    };

    initializeAuth();
  }, [dispatch]);

  const toggleCart = () => {
    if (!isAuthenticated) {
      setShowLogin(true);
      return;
    }
    setCartOpen(!cartOpen);
  };

  const handleLoginSuccess = () => {
    setShowLogin(false);
    dispatch(fetchCart());
    setCartOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      <Navbar
        toggleCart={toggleCart}
        toggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
      />

      <Home
        mobileMenuOpen={mobileMenuOpen}
        toggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
      />

      {isAuthenticated && (
        <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      )}

      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default AppWrapper;
