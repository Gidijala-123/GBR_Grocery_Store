import {
  FaCarrot,
  FaWineBottle,
  FaCheese,
  FaBreadSlice,
  FaSoap,
  FaPaw,
} from "react-icons/fa";
import { FaHome, FaFire, FaCrown, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import { setCategory } from "../store/productsSlice";
import { useDispatch } from "react-redux";

const categories = [
  {
    id: "vegetables",
    name: "Vegetables & Fruits",
    icon: <FaCarrot className="text-orange-400 mr-3" />,
  },
  {
    id: "beverages",
    name: "Beverages",
    icon: <FaWineBottle className="text-orange-300 mr-3" />,
  },
  {
    id: "dairy",
    name: "Dairy Products",
    icon: <FaCheese className="text-yellow-300 mr-3" />,
  },
  {
    id: "grains",
    name: "FoodGrains & Oil",
    icon: <FaBreadSlice className="text-amber-400 mr-3" />,
  },
  {
    id: "personal",
    name: "Personal Care",
    icon: <FaSoap className="text-blue-300 mr-3" />,
  },
  {
    id: "pet",
    name: "Pet Care",
    icon: <FaPaw className="text-red-300 mr-3" />,
  },
];

const quickLinks = [
  { name: "Home", icon: <FaHome className="text-orange-400 mr-3" /> },
  { name: "Today's Deals", icon: <FaFire className="text-red-400 mr-3" /> },
  {
    name: "Upgrade to pro",
    icon: <FaCrown className="text-yellow-400 mr-3" />,
  },
  { name: "Contact Us", icon: <FaEnvelope className="text-blue-400 mr-3" /> },
];

export default function Sidebar() {
  const dispatch = useDispatch();

  return (
    <div className="hidden md:block w-64 bg-gray-800 bg-opacity-90 backdrop-blur-sm border-r border-gray-700 p-6 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
      <h2 className="text-lg font-semibold mb-6 text-orange-400">Category</h2>
      <ul className="space-y-4">
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              to={`/category/${category.id}`}
              onClick={() => dispatch(setCategory(category.id))}
              className="flex items-center text-gray-300 hover:text-orange-400 cursor-pointer p-3 rounded-lg hover:bg-gray-700 transition-all duration-300"
            >
              {category.icon}
              {category.name}
            </Link>
          </li>
        ))}
      </ul>

      <h2 className="text-lg font-semibold mt-10 mb-6 text-orange-400">
        Quick Links
      </h2>
      <ul className="space-y-4">
        {quickLinks.map((link) => (
          <li key={link.name}>
            <a
              href="#"
              className="flex items-center text-gray-300 hover:text-orange-400 cursor-pointer p-3 rounded-lg hover:bg-gray-700 transition-all duration-300"
            >
              {link.icon}
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
