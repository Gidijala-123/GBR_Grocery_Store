import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const CartItem = ({ item, onDecrease, onIncrease, onRemove }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
      className="border-b border-gray-700 pb-4 mb-4"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <div className="text-2xl mr-3">{item.image}</div>
          <div className="flex-1">
            <h3 className="font-medium text-white">{item.name}</h3>
            <span className="text-orange-400 font-semibold">
              £{item.price.toFixed(2)}
            </span>
          </div>
        </div>
        <button
          onClick={() => onRemove(item.id)}
          className="text-gray-400 hover:text-orange-400 transition-colors duration-300"
        >
          <FaTimes />
        </button>
      </div>
      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center border border-gray-600 rounded-md">
          <button
            onClick={() => onDecrease(item.id)}
            className="px-3 py-1 text-gray-300 hover:bg-gray-700 rounded-l-md transition-colors duration-300"
          >
            -
          </button>
          <span className="quantity px-4 text-white">{item.quantity}</span>
          <button
            onClick={() => onIncrease(item.id)}
            className="px-3 py-1 text-gray-300 hover:bg-gray-700 rounded-r-md transition-colors duration-300"
          >
            +
          </button>
        </div>
        <span className="font-semibold text-orange-400">
          £{(item.price * item.quantity).toFixed(2)}
        </span>
      </div>
    </motion.div>
  );
};

export default CartItem;
