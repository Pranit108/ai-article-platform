// type Props = {
//   params: {
//     id: string;
//   };
// };

// export default async function ArticlePage({ params }: Props) {
// //   const res = await fetch(
// //     `http://localhost:8000/articles/${params.id}`,
// //     {
// //       cache: "no-store",
// //     }
// //   );

// //   if (!res.ok) {
// //     return <h1>Article not found.</h1>;
// //   }

// //   const article = await res.json();

// const [articleRes, conceptsRes] = await Promise.all([
//   fetch(`http://localhost:8000/articles/${params.id}`, {
//     cache: "no-store",
//   }),
//   fetch(`http://localhost:8000/articles/${params.id}/concepts`, {
//     cache: "no-store",
//   }),
// ]);

// const article = await articleRes.json();
// const concepts = await conceptsRes.json();

//   return (
//     <main className="max-w-3xl mx-auto p-8">
//       <h1 className="text-4xl font-bold">
//         {article.title}
//       </h1>

//       <p className="text-gray-500 mt-2">
//         {article.author}
//       </p>

//       <article className="mt-8 whitespace-pre-wrap">
//         {article.content}
//       </article>

//       <hr className="my-10" />

// <h2 className="text-2xl font-bold mb-4">
//   Concepts
// </h2>

// <div className="space-y-4">
//   {concepts.map((concept: any) => (
//     <div
//       key={concept.id}
//       className="border rounded-lg p-4"
//     >
//       <h3 className="font-semibold text-lg">
//         {concept.term}
//       </h3>

//       <p className="text-gray-600 mt-2">
//         {concept.explanation}
//       </p>
//     </div>
//   ))}
// </div>
//     </main>
//   );
// }

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ArticlePage({ params }: Props) {
  const { id } = await params;

  const [articleRes, conceptsRes] = await Promise.all([
    fetch(`http://localhost:8000/articles/${id}`, {
      cache: "no-store",
    }),
    fetch(`http://localhost:8000/articles/${id}/concepts`, {
      cache: "no-store",
    }),
  ]);

  if (!articleRes.ok) {
    return <h1>Article not found.</h1>;
  }

  const article = await articleRes.json();
  const concepts = await conceptsRes.json();

  return (
    <main className="max-w-7xl mx-auto p-8">
      <h1 className="text-5xl font-bold">{article.title}</h1>

      <p className="text-gray-500 mt-2">{article.author}</p>

      <div className="grid grid-cols-[2fr_1fr] gap-12 mt-8">
        <article className="whitespace-pre-wrap text-lg leading-9">
          {article.content}
        </article>

        <aside>
          <h2 className="text-2xl font-bold mb-4">📚 Concepts</h2>

          <div className="space-y-3">
            {concepts.map((concept: any) => (
              <div key={concept.id} className="border rounded-lg p-4">
                <h3 className="font-semibold">{concept.term}</h3>
                <p className="text-gray-600 mt-2">
                  {concept.explanation}
                </p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}