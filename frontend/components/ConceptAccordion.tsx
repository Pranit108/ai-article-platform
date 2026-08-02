"use client";

import { useState } from "react";

type Concept = {
  id: number;
  term: string;
  explanation: string;
};

type Props = {
  concepts: Concept[];
};

export default function ConceptAccordion({
  concepts,
}: Props) {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {concepts.map((concept) => (
        <div
          key={concept.id}
          className="border rounded-lg"
        >
          <button
            onClick={() =>
              setOpenId(
                openId === concept.id
                  ? null
                  : concept.id
              )
            }
            className="w-full flex justify-between items-center p-4 font-semibold text-left"
          >
            <span>{concept.term}</span>

            <span>
              {openId === concept.id ? "−" : "+"}
            </span>
          </button>

          {openId === concept.id && (
            <div className="px-4 pb-4 text-gray-600">
              {concept.explanation}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}