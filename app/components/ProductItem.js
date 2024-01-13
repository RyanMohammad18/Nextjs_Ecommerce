import Image from "next/image";
import Link from "next/link";
import AddToCart from "./AddToCart";

export default function ProductItem({ product }) {
  return (
    <div className="card w-5/6 p-2 flex flex-col items-center justify-center">
      <Link href={`/product/${product.id}`}>
        <Image
          src={product.image}
          width={60} // Set the width to your desired size
          height={60} // Set the height to your desired size
          alt={product.name}
          className="rounded shadow object-cover w-60 h-60"
          layout="fixed"
          objectFit="cover"
        />
      </Link>
      <div className="flex flex-col items-center justify-center p-2">
        <Link href={`/product/${product.id}`}>
          <h2 className="text-sm">{product.name}</h2>
        </Link>
        <p className="text-xs">${product.price}</p>


        
        <AddToCart
          showQty={false}
          product={product}
          increasePerClick={true}
          redirect={false}
        />
      </div>
    </div>
  );
}
