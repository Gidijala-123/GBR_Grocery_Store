import { FaTimes, FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItemFromCart,
  deleteItemFromCart,
  clearCart,
} from "../store/cartSlice";
import CartItem from "./CartItem";
import { motion, AnimatePresence } from "framer-motion";

const Cart = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalAmount } = useSelector(
    (state) => state.cart
  );

  const handleDecrease = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const handleIncrease = (id) => {
    // In a real app, we would dispatch addItemToCart with the product details
    // For simplicity, we'll just find the item and update its quantity
    const item = items.find((item) => item.id === id);
    if (item) {
      dispatch(
        addItemToCart({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
        })
      );
    }
  };

  const handleRemove = (id) => {
    dispatch(deleteItemFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25 }}
      className="fixed top-0 right-0 h-full w-full sm:w-96 cart-sidebar z-50"
    >
      <div className="p-6 h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-orange-400">
            Your Shopping Cart
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-orange-400 transition-colors duration-300"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <AnimatePresence>
            {totalQuantity === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <FaShoppingCart className="text-5xl text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 mb-4">Your cart is empty</p>
                <button
                  onClick={onClose}
                  className="btn-primary px-6 py-2 rounded-md"
                >
                  Continue Shopping
                </button>
              </motion.div>
            ) : (
              <>
                <div className="flex justify-end mb-2">
                  <button
                    onClick={handleClearCart}
                    className="text-sm text-gray-400 hover:text-orange-400"
                  >
                    Clear Cart
                  </button>
                </div>
                <div className="space-y-4">
                  <AnimatePresence>
                    {items.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onDecrease={handleDecrease}
                        onIncrease={handleIncrease}
                        onRemove={handleRemove}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </>
            )}
          </AnimatePresence>
        </div>

        {totalQuantity > 0 && (
          <div className="border-t border-gray-700 pt-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Subtotal</span>
              <span className="font-semibold text-orange-400">
                £{totalAmount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Delivery</span>
              <span className="font-semibold text-green-400">FREE</span>
            </div>
            <div className="flex justify-between mb-4 text-lg">
              <span className="font-semibold text-white">Total</span>
              <span className="font-bold text-orange-400">
                £{totalAmount.toFixed(2)}
              </span>
            </div>
            <button className="btn-primary w-full py-3 rounded-md mb-3">
              Proceed to Checkout
            </button>
            <button
              onClick={onClose}
              className="w-full bg-gray-700 text-orange-400 border border-orange-400 py-3 rounded-md hover:bg-gray-600 transition-colors duration-300"
            >
              <FaShoppingCart className="inline mr-2" /> View Cart
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Cart;
