import Link from "next/link";
import { products } from "../products.const";

type productType = {
  id: number;
  name: string;
  price: string;
  category: string;
};

type paramsType = {
  slug: string[];
};

export default async function slugPage({ params }: any) {
  const { slug }: paramsType = await params;
  let item: string = slug[0];
  let productsData: productType[] = products[item as keyof typeof product];
  let category: string[] = [];
  productsData.map((pro: productType) => {
    if (!category.includes(pro.category)) {
      category.push(pro.category);
    }
  });

  if (slug.length == 1) {
    return (
      <div>
        <ul>
          {category.map((c, idx) => {
            return (
              <li key={idx}>
                <Link key={idx} href={`/products/${item}/${c}`}>
                  {c}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  if (slug.length == 2) {
    let filterData = productsData.filter((e:productType)=>{
      return e.category == slug[1]
    })
    return (
      <div>
        <ul>
          {filterData.map((p: productType, idx: number) => {
            return (
              <li key={idx}>
                <Link
                  key={idx}
                  href={`/products/${item}/${p.category}/${p.name}`}
                >
                  {p.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  let product: productType | undefined = productsData.find((e)=>e.name===slug[2])
  return (
    
    <div>
      <ul>
        {product && <li>{product.name} {product.price}</li>}
      </ul>
    </div>
  );
}
