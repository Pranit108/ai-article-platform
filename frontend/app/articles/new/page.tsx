"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewArticle() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("http://localhost:8000/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        author,
        content,
      }),
    });

    router.push("/");
  }

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        New Article
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <input
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <textarea
          placeholder="Content"
          rows={12}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <button
          className="bg-black text-white px-5 py-3 rounded"
        >
          Publish
        </button>
      </form>
    </main>
  );
}