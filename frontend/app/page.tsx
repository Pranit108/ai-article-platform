// "use client";

// import { useEffect, useState } from "react";

// type Status = "checking" | "connected" | "error";

// export default function Home() {
//   const [status, setStatus] = useState<Status>("checking");

//   useEffect(() => {
//     const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

//     fetch(`${apiUrl}/health`)
//       .then((res) => {
//         if (!res.ok) throw new Error("Health check failed");
//         return res.json();
//       })
//       .then((data) => {
//         setStatus(data.status === "ok" ? "connected" : "error");
//       })
//       .catch(() => setStatus("error"));
//   }, []);

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-center gap-4">
//       <h1 className="text-2xl font-semibold">AI Article Platform</h1>

//       {status === "checking" && (
//         <p className="text-gray-500">Checking backend...</p>
//       )}
//       {status === "connected" && (
//         <p className="text-green-600 font-medium">Backend connected</p>
//       )}
//       {status === "error" && (
//         <p className="text-red-600 font-medium">
//           Could not reach backend
//         </p>
//       )}
//     </main>
//   );
// }


"use client";
import Link from "next/link";

import { useEffect, useState } from "react";

type Article = {
  id: number;
  title: string;
  author: string;
  content: string;
};
const API_URL = process.env.NEXT_PUBLIC_API_URL!;
export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/articles`)
      .then((res) => res.json())
      .then((data) => setArticles(data));
  }, []);

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        AI Article Platform
      </h1>
      <Link
        href="/articles/new"
      className="inline-block bg-black text-white px-4 py-2 rounded mb-8">

      + New Article
      </Link>

          {articles.map((article) => (
      <Link
        key={article.id}
        href={`/articles/${article.id}`}
        className="block border rounded-lg p-4 mb-4 hover:bg-gray-50"
      >
        <h2 className="text-2xl font-semibold">
          {article.title}
        </h2>

        <p className="text-gray-500">
          {article.author}
        </p>

        <p className="mt-2 text-blue-600">
          Read →
        </p>
      </Link>
    ))}
    </main>
  );
}
