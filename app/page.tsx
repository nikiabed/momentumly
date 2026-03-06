import Link from "next/link";
import { ROUTES } from "./_utils/constants";

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <ul>
        <li>
          <Link href={`/${ROUTES.PRODUCTS}`}>محصولات</Link>
        </li>
        <li>
          <Link href={`/${ROUTES.DASHBOARD}`}>داشبورد</Link>
        </li>
        <li>
          <Link href={`/${ROUTES.TODO}`}>اپلیکیشن TODO</Link>
        </li>
      </ul>
    </div>
  );
}
