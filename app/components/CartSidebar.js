import { addToCart, removeFromCart } from "@/app/redux/slices/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export default function CartSidebar() {
  const { loading, cartItems, itemsPrice, subtotals } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const increaseQty = (item) => {
    addToCartHandler(item, item.qty + 1);
  };

  const decreaseQty = (item) => {
    if (item.qty > 1) {
      addToCartHandler(item, item.qty - 1);
    }
  };

  const pathname = usePathname();

  return (
    <div
      className={
        loading
          ? ""
          : cartItems.length > 0 &&
            (pathname === "/" || pathname.indexOf("/product/") >= 0)
          ? "fixed top-0 right-0 w-96 h-full shadow-lg border-l border-l-gary-700 overflow-scroll bg-white text-black"
          : "hidden"
      }
    >
      {loading ? (
        <div className="py-5 px-2">Loading...</div>
      ) : cartItems.length === 0 ? (
        <div className="py-5 px-2">Cart is empty</div>
      ) : (
        <>
          <div className="p-2 flex flex-col items-center border-b border-b-gary-600">
            <div className="font-bold text-orange-700 pt-6">
              Subtotal Price: ${itemsPrice}
            </div>
            <div>
              <Link
                href="/cart"
                className="w-full text-center p-1 rounded-2xl border-2 border-red-500 text-black hover:bg-red-500 hover:text-white"
              >
                Go to cart
              </Link>
            </div>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="p-2 flex flex-col items-center border-b border-b-gary-600"
              >
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
                </Link>
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

                <div>Subtotal: ${subtotals[item.id]}</div>
                <button
                  className="default-button mt-2"
                  onClick={() => removeFromCartHandler(item.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
