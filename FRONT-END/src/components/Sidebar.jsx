import { motion } from "framer-motion";
import {
  FaCarrot,
  FaWineBottle,
  FaCheese,
  FaBreadSlice,
  FaSoap,
  FaPaw,
  FaHome,
  FaFire,
  FaCrown,
  FaEnvelope,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ type: "spring", damping: 25 }}
      className="fixed top-0 left-0 h-full w-64 sidebar z-40 md:sticky md:block"
    >
      <div className="p-6 h-full overflow-y-auto">
        <h2 className="text-lg font-semibold mb-6 text-orange-400">Category</h2>
        <ul className="space-y-4">
          <li
            onClick={() => handleCategoryClick("vegetables")}
            className="category-item flex items-center text-gray-300 hover:text-orange-400 cursor-pointer p-3 rounded-lg hover:bg-gray-700 transition-all duration-300"
          >
            <FaCarrot className="mr-3 text-orange-400" /> Vegetables & Fruits
          </li>
          {/* Other category items... */}
        </ul>

        <h2 className="text-lg font-semibold mt-10 mb-6 text-orange-400">
          Quick Links
        </h2>
        <ul className="space-y-4">
          <li className="flex items-center text-gray-300 hover:text-orange-400 cursor-pointer p-3 rounded-lg hover:bg-gray-700 transition-all duration-300">
            <FaHome className="mr-3 text-orange-400" /> Home
          </li>
          {/* Other quick links... */}
        </ul>
      </div>
    </motion.div>
  );
};

export default Sidebar;
