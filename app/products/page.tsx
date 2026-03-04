import Link from "next/link"
import { products } from "./products.const"

export default function productsPage() {
        const categories = Object.keys(products)
    
  return (
    <div>
      <ul>
        {categories.map((p, idx)=>{
            return (
                <li key={idx}><Link href={`products/${p}`}>{p}</Link></li>
            )
        })}
      </ul>
    </div>
  )
}
