import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Cart from "./Cart";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-gray-100">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
      <Cart />
    </div>
  );
}
