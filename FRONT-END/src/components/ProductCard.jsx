import { motion } from "framer-motion";
import { FaCartPlus } from "react-icons/fa";
import { addItem } from "../store/cartSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAddToCart = () => {
    dispatch(addItem(product));
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <motion.div
      className="product-card rounded-lg p-6 bg-gray-800 bg-opacity-70 backdrop-blur-md border border-gray-700"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="relative">
        <div className="text-5xl mb-4 text-center">{product.image}</div>
        {product.originalPrice && (
          <span className="absolute top-0 left-0 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
            SAVE {Math.round((1 - product.price / product.originalPrice) * 100)}
            %
          </span>
        )}
      </div>
      <h3 className="text-lg font-semibold mb-2 text-white">{product.name}</h3>
      <div className="flex items-center mb-3">
        {renderRatingStars(product.rating)}
      </div>
      <div className="flex items-center mb-4">
        {product.originalPrice && (
          <span className="text-gray-400 line-through mr-2">
            £{product.originalPrice.toFixed(2)}
          </span>
        )}
        <span className="text-orange-400 font-bold text-xl">
          £{product.price.toFixed(2)}
        </span>
      </div>
      <motion.button
        onClick={handleAddToCart}
        whileTap={{ scale: 0.95 }}
        className="btn-primary w-full py-2 rounded-md relative overflow-hidden flex items-center justify-center"
      >
        <motion.span
          animate={isAnimating ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.5 }}
        >
          <FaCartPlus className="mr-2" />
          Add to Cart
        </motion.span>
      </motion.button>
    </motion.div>
  );
}

function renderRatingStars(rating) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <i key={`full-${i}`} className="fas fa-star text-yellow-400"></i>
    );
  }

  if (hasHalfStar) {
    stars.push(
      <i key="half" className="fas fa-star-half-alt text-yellow-400"></i>
    );
  }

  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <i key={`empty-${i}`} className="far fa-star text-yellow-400"></i>
    );
  }

  return stars;
}
