import Link from "next/link";

export default function Menu() {
  return (
    <nav className="flex flex-row justify-center gap-4">
      <Link href="/" className="text-lg font-semibold">
        Home
      </Link>
    </nav>
  );
}
