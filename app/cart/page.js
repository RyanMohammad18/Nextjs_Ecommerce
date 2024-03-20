"use client";

import { addToCart, removeFromCart } from "@/app/redux/slices/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export default function CartPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, cartItems, itemsPrice, subtotals } = useSelector(
    (state) => state.cart
  );

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const increaseQty = (item) => {
    
    addToCartHandler(item, item.qty + 1);
  
};

const decreaseQty = (item) => {
  if (item.qty > 1) {
    addToCartHandler(item, item.qty - 1);
  }
};

const tax = 200;
const shipping = 100;
const discount = 0.1;
const numericDiscount = parseFloat(itemsPrice) * discount;
const numericItemsPrice = parseFloat(itemsPrice) - numericDiscount;


let totalPrice = numericItemsPrice + shipping + tax;




  return (
    <div>
      <h1 className="mb-4 text-xl">Shopping Cart</h1>
      {loading ? (
        <div>Loading...</div>
      ) : cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="p-5 text-left">Product</th>
                  <th className="p-5 text-left">--</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="p-5 text-right">Price</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td>
                      <Link
                        href={`/product/${item.id}`}
                        className="flex items-center"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="p-1"
                        ></Image>
                        {item.name}
                      </Link>
                    </td>
                    <td className="p-5 text-right">
                      <div className="flex items-center">
                        <button
                          className="qty-button"
                          onClick={() => decreaseQty(item)}
                        >
                          -
                        </button>
                        <span className="mx-2">{item.qty}</span>
                        <button
                          className="qty-button"
                          onClick={() => increaseQty(item)}
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td className="p-5 text-right">{item.qty}</td>
                    <td className="p-5 text-right">{subtotals[item.id]}</td>
                    <td className="p-5 text-center">
                      <button
                        className="default-button"
                        onClick={() => removeFromCartHandler(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <div className="card p-5">
              <ul>
                <li>
                  <div className="pb-3 text-xl">
                    Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)}) : 
                    {itemsPrice}
                  </div>
                </li>
                <li>
                  <div className="pb-3">
                    Discount (10%)
                  </div>
                </li>
                <li>
                  <div className="pb-3">Shipping: {shipping}</div>
                </li>
                <li>
                  <div className="pb-3">Tax: {tax}</div>
                </li>
                <li>
                  <div className="pb-3 text-xl">
                    Total: {totalPrice}
                  </div>
                </li>
                <li>
                  <button
                    onClick={() => router.push("/shipping")}
                    className="primary-button w-full"
                  >
                    Proceed to checkout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
