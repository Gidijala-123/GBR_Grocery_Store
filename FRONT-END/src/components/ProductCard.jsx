import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../store/cartSlice";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addItemToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="product-card rounded-lg p-6"
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
        whileTap={{ scale: 0.95 }}
        onClick={handleAddToCart}
        className="btn-primary w-full py-2 rounded-md flex items-center justify-center"
      >
        <FaCartPlus className="mr-2" /> Add to Cart
      </motion.button>
    </motion.div>
  );
};

export default ProductCard;
