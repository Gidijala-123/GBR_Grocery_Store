import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartCount,
  selectCartTotal,
  updateCartItem,
  removeFromCart,
} from "../store/cartSlice";

const CartSidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const cartCount = useSelector(selectCartCount);
  const subtotal = useSelector(selectCartTotal);

  const handleQuantityChange = (itemId, change) => {
    const item = items.find((item) => item._id === itemId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity > 0) {
        dispatch(updateCartItem({ itemId, quantity: newQuantity }));
      } else {
        dispatch(removeFromCart(itemId));
      }
    }
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-lg transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-6 h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-green-700">
            Your Shopping Cart
          </h2>
          <button
            className="text-gray-500 hover:text-red-500 transition-colors"
            onClick={onClose}
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <i className="fas fa-shopping-cart text-4xl text-gray-300 mb-4"></i>
              <p className="text-gray-500">Your cart is empty</p>
              <button
                className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                onClick={onClose}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item._id} className="border-b pb-4 mb-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">
                      {item.product.name}
                    </h3>
                    <span className="text-green-600 font-semibold">
                      £{item.product.price.toFixed(2)}
                    </span>
                  </div>
                  <button
                    className="remove-item text-gray-400 hover:text-red-500"
                    onClick={() => handleRemoveItem(item._id)}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-center border rounded">
                    <button
                      className="decrease-quantity px-3 py-1 text-gray-500 hover:bg-gray-100 rounded-l"
                      onClick={() => handleQuantityChange(item._id, -1)}
                    >
                      -
                    </button>
                    <span className="quantity px-4">{item.quantity}</span>
                    <button
                      className="increase-quantity px-3 py-1 text-gray-500 hover:bg-gray-100 rounded-r"
                      onClick={() => handleQuantityChange(item._id, 1)}
                    >
                      +
                    </button>
                  </div>
                  <span className="font-semibold">
                    £{(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold">£{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Delivery</span>
            <span className="font-semibold text-green-600">FREE</span>
          </div>
          <div className="flex justify-between mb-4 text-lg">
            <span className="font-semibold">Total</span>
            <span className="font-bold">£{subtotal.toFixed(2)}</span>
          </div>
          <button className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors mb-2">
            Proceed to Checkout
          </button>
          <button className="w-full bg-white text-green-600 border border-green-600 py-3 rounded-md hover:bg-green-50 transition-colors">
            <i className="fas fa-shopping-cart mr-2"></i> View Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
