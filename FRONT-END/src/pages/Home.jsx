import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productsSlice";
import ProductCard from "../components/ProductCard";
import CategorySidebar from "../components/CategorySidebar";

const Home = () => {
  const dispatch = useDispatch();
  const { items: products, status } = useSelector((state) => state.products);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Featured Products");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleCategorySelect = (category, name) => {
    dispatch(fetchProducts(category));
    setSelectedCategory(name);
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex">
        {/* Mobile Sidebar Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={closeMobileMenu}
          ></div>
        )}

        {/* Category Sidebar - Desktop */}
        <div className="hidden md:block">
          <CategorySidebar />
        </div>

        {/* Category Sidebar - Mobile */}
        <div
          className={`fixed md:hidden z-50 ${
            mobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <CategorySidebar
            isMobileOpen={mobileMenuOpen}
            closeMobileSidebar={closeMobileMenu}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-green-700">
              {selectedCategory}
            </h2>
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Customer Rating</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <i className="fas fa-chevron-down"></i>
              </div>
            </div>
          </div>

          {status === "loading" ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : status === "failed" ? (
            <div className="text-center py-12 text-red-500">
              Failed to load products. Please try again.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
