import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleCart, removeItem, updateQuantity } from "../store/cartSlice";
import CartItem from "./CartItem";

export default function Cart() {
  const dispatch = useDispatch();
  const { isCartOpen, items } = useSelector((state) => state.cart);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          className="fixed top-0 right-0 h-full w-full sm:w-96 bg-gray-800 bg-opacity-95 backdrop-blur-md border-l border-gray-700 z-50"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 30 }}
        >
          <div className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-orange-400">
                Your Shopping Cart
              </h2>
              <button
                onClick={() => dispatch(toggleCart())}
                className="text-gray-400 hover:text-orange-400 transition-colors duration-300"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <FaShoppingCart className="text-5xl text-gray-600 mb-4 mx-auto" />
                  <p className="text-gray-400 mb-4">Your cart is empty</p>
                  <button
                    onClick={() => dispatch(toggleCart())}
                    className="btn-primary px-6 py-2 rounded-md"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onRemove={() => dispatch(removeItem(item.id))}
                      onUpdateQuantity={(change) =>
                        dispatch(updateQuantity({ id: item.id, change }))
                      }
                    />
                  ))}
                </AnimatePresence>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-gray-700 pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="font-semibold text-orange-400">
                    £{subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Delivery</span>
                  <span className="font-semibold text-green-400">FREE</span>
                </div>
                <div className="flex justify-between mb-4 text-lg">
                  <span className="font-semibold text-white">Total</span>
                  <span className="font-bold text-orange-400">
                    £{subtotal.toFixed(2)}
                  </span>
                </div>
                <button className="btn-primary w-full py-3 rounded-md mb-3">
                  Proceed to Checkout
                </button>
                <button
                  onClick={() => dispatch(toggleCart())}
                  className="w-full bg-gray-700 text-orange-400 border border-orange-400 py-3 rounded-md hover:bg-gray-600 transition-colors duration-300"
                >
                  <FaShoppingCart className="inline mr-2" />
                  View Cart
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
