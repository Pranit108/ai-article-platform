import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-5">
        <Link
          href="/"
          className="text-2xl font-bold"
        >
          Knowledge
        </Link>

        <Link
          href="/articles/new"
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          New Article
        </Link>
      </div>
    </nav>
  );
}