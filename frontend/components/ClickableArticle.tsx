"use client";

import { useState } from "react";
import ConceptDrawer from "./ConceptDrawer";

type Concept = {
  id: number;
  term: string;
  explanation: string;
};

type Props = {
  content: string;
  concepts: Concept[];
};


export default function ClickableArticle({
  content,
  concepts,
}: Props) {
  const [selectedConcept, setSelectedConcept] =
  useState<Concept | null>(null);
  // Longest terms first so "Roman Republic" wins before "Roman"
  const sorted = [...concepts].sort(
    (a, b) => b.term.length - a.term.length
  );

  const elements: React.ReactNode[] = [];
  let remaining = content;
  let key = 0;

  while (remaining.length > 0) {
    let earliestIndex = -1;
    let matchedConcept: Concept | null = null;

    for (const concept of sorted) {
      const index = remaining.indexOf(concept.term);

      if (
        index !== -1 &&
        (earliestIndex === -1 || index < earliestIndex)
      ) {
        earliestIndex = index;
        matchedConcept = concept;
      }
    }

    if (!matchedConcept) {
      elements.push(remaining);
      break;
    }

    if (earliestIndex > 0) {
      elements.push(remaining.slice(0, earliestIndex));
    }

    elements.push(
      <button
        key={key++}
        onClick={() => setSelectedConcept(matchedConcept)}
        className="
        rounded-md
        bg-blue-50
        px-1
        font-medium
        text-pink-700
        transition
        hover:bg-pink-100
        hover:text-pink-900
        cursor-help
        ">
      
        {matchedConcept.term}
      </button>
  );

    remaining = remaining.slice(
      earliestIndex + matchedConcept.term.length
    );
  }

  return (
    <>
      <article className="
  
        whitespace-pre-wrap
        text-lg
        leading-10
        rounded-3xl
        border
        border-[#e8e2d8]
        bg-[#fffdf8]
        p-10
        shadow-md
      "
        >     
        {elements}
      </article>

      <ConceptDrawer
        concept={selectedConcept}
        onClose={() => setSelectedConcept(null)}
      />
    </>
  );
}