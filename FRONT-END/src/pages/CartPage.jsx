import React from "react";
import { useSelector } from "react-redux";

const CartPage = () => {
  const { items } = useSelector((state) => state.cart);

  return (
    <div className="container mx-auto py-8">{/* Your cart page content */}</div>
  );
};

export default CartPage;
