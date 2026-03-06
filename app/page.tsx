import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <ul>
        <li>
          <Link href={"/products"}>Products</Link>
        </li>
        <li>
          <Link href={"/dashboard"}>Dashboard</Link>
        </li>
        <li>
          <Link href={"/todo"}>To Do App</Link>
        </li>
      </ul>
    </div>
  );
}
