import AddToCart from "@/app/components/AddToCart";
import { data } from "@/app/Utils/data";
import Image from "next/image";
import Link from "next/link";

export default function ProductDetailPage({ params }) {
  const { id } = params;
  const product = data.products.find((x) => x.id === parseInt(id));

  return (
    <div>
      <div className="py-2">
        <Link href="/"> --- back to products</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2 flex justify-center items-center">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            className="mx-auto my-auto"
            style={{
              width: "50%",
              height: "auto",
            }}
          />
        </div>

        <div>
          <ul>
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>

            <li>
              <hr className="my-3" />
              Description:
              <p>{product.description}</p>
              <p> Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet </p>
              <div>Price</div>
              <div>
                <h1 className="text-red-500 font-bold">{product.price} tk</h1>
              </div>
              <AddToCart product={product} redirect={true} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
