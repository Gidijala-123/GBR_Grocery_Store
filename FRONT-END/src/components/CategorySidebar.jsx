import React from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../store/productsSlice";

const CategorySidebar = ({ isMobileOpen, closeMobileSidebar }) => {
  const dispatch = useDispatch();

  const categories = [
    {
      name: "Vegetables & Fruits",
      icon: "fa-carrot",
      color: "text-green-500",
      category: "vegetables",
    },
    {
      name: "Beverages",
      icon: "fa-wine-bottle",
      color: "text-blue-500",
      category: "beverages",
    },
    {
      name: "Dairy Products",
      icon: "fa-cheese",
      color: "text-yellow-500",
      category: "dairy",
    },
    {
      name: "FoodGrains & Oil",
      icon: "fa-bread-slice",
      color: "text-amber-700",
      category: "grains",
    },
    {
      name: "Personal Care",
      icon: "fa-soap",
      color: "text-purple-500",
      category: "personal",
    },
    {
      name: "Pet Care",
      icon: "fa-paw",
      color: "text-red-400",
      category: "pet",
    },
  ];

  const quickLinks = [
    { name: "Home", icon: "fa-home", color: "text-green-500" },
    { name: "Today's Deals", icon: "fa-fire", color: "text-orange-500" },
    { name: "Upgrade to pro", icon: "fa-crown", color: "text-yellow-500" },
    { name: "Contact Us", icon: "fa-envelope", color: "text-blue-400" },
  ];

  const handleCategoryClick = (category) => {
    dispatch(fetchProducts(category));
    if (closeMobileSidebar) closeMobileSidebar();
  };

  return (
    <div
      className={`category-sidebar ${
        isMobileOpen ? "sidebar-visible" : ""
      } w-64 bg-white shadow-sm p-6`}
    >
      <h2 className="text-lg font-semibold mb-6 text-green-700">Category</h2>
      <ul className="space-y-4">
        {categories.map((cat) => (
          <li
            key={cat.category}
            className="category-item flex items-center text-gray-700 hover:text-green-600 cursor-pointer p-2 rounded hover:bg-green-50 transition-colors"
            onClick={() => handleCategoryClick(cat.category)}
          >
            <i className={`fas ${cat.icon} mr-3 ${cat.color}`}></i>
            {cat.name}
          </li>
        ))}
      </ul>

      <h2 className="text-lg font-semibold mt-10 mb-6 text-green-700">
        Quick Links
      </h2>
      <ul className="space-y-4">
        {quickLinks.map((link) => (
          <li
            key={link.name}
            className="flex items-center text-gray-700 hover:text-green-600 cursor-pointer p-2 rounded hover:bg-green-50 transition-colors"
          >
            <i className={`fas ${link.icon} mr-3 ${link.color}`}></i>
            {link.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySidebar;
