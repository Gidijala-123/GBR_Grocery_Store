import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { setProducts } from "../store/productsSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { featuredProducts } = useSelector((state) => state.products);

  useEffect(() => {
    // In a real app, you would fetch this from your API
    const dummyProducts = [
      // Same product data as before
    ];
    dispatch(setProducts(dummyProducts.flat()));
  }, [dispatch]);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-orange-400">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
