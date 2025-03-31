import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productsSlice";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";

const Home = () => {
  const dispatch = useDispatch();
  const {
    items: products,
    status,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  let content;

  if (status === "loading") {
    content = (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  } else if (status === "succeeded") {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.slice(0, 12).map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    );
  } else if (status === "failed") {
    content = (
      <div className="text-center py-12 text-red-400">
        <p>Error loading products: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-orange-400 animate__animated animate__fadeIn">
          Featured Products
        </h2>
        <div className="relative">
          <select className="appearance-none bg-gray-700 border border-gray-600 rounded-md py-2 pl-3 pr-8 text-gray-300 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
            <option className="bg-gray-800">Sort by: Featured</option>
            <option className="bg-gray-800">Price: Low to High</option>
            <option className="bg-gray-800">Price: High to Low</option>
            <option className="bg-gray-800">Customer Rating</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-orange-400">
            <i className="fas fa-chevron-down"></i>
          </div>
        </div>
      </div>
      {content}
    </div>
  );
};

export default Home;
