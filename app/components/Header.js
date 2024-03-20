import Link from "next/link";
import { ShoppingCart, BarChart2, Search, Box, Filter } from "react-feather";
import React from "react";
import { useSelector } from "react-redux";

export default function Header() {
  const { loading, cartItems } = useSelector((state) => state.cart);

  return (
    <header>
      <nav className="flex justify-between items-center h-17 px-4 shadow-md bg-gray-800 text-white">
        <div>
          <BarChart2 size={20} />
        </div>
        <div className="flex items-center">
          <Search size={20} className="text-white" />
          <input
            type="text"
            placeholder="Search"
            className="ml-2 border-none bg-white text-gray-800 px-2 py-1 rounded focus:outline-none"
          />
        </div>

        <div>
          <Box size={20} />
        </div>
        <div>
          <Filter size={20} />
        </div>

        <div>
          <span className="cart-badge">
            {loading ? " " : cartItems.reduce((a, c) => a + c.qty, 0)}
          </span>
          <br />
          <Link href="/cart">
            <ShoppingCart size={20} />
            <span className="ml-2">Cart</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
