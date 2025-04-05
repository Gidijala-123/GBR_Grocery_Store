import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: product._id, quantity: 1 }));
  };

  return (
    <div className="product-card bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all">
      <div className="text-5xl mb-4 text-center">{product.image}</div>
      <h3 className="text-lg font-semibold mb-2 text-gray-800">
        {product.name}
      </h3>
      <div className="flex items-center mb-4">
        {product.originalPrice && (
          <span className="text-gray-500 line-through mr-2">
            £{product.originalPrice.toFixed(2)}
          </span>
        )}
        <span className="text-green-600 font-bold text-xl">
          £{product.price.toFixed(2)}
        </span>
      </div>
      <button
        className="add-to-cart w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
