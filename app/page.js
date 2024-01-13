import { data } from "@/app/Utils/data";
import Image from "next/image";
import ProductItem from "./components/ProductItem";

export default function Home() {
  const { products } = data;
  return (
    <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-5 p-0">
      {products.map((product) => (
        <ProductItem key={product.id} product={product}/>
      ))}
    </div>
   
  );
}
