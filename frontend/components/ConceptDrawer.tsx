"use client";

type Concept = {
  id: number;
  term: string;
  explanation: string;
};

type Props = {
  concept: Concept | null;
  onClose: () => void;
};

export default function ConceptDrawer({
  concept,
  onClose,
}: Props) {
  if (!concept) return null;

  return (
    <>
      {/* Background */}
      <div
            className="fixed inset-0 bg-black/30 transition-opacity duration-300 z-40"
            onClick={onClose}
            />

      {/* Drawer */}
      <div 
            className="
                fixed
                top-0
                right-0
                h-screen
                w-[450px]
                bg-white
                shadow-2xl
                z-50
                flex
                flex-col
                animate-slide-in
            "
            >

        {/* Header */}
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-2xl font-bold">
            {concept.term}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl hover:text-red-500 transition"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <p className="leading-8 text-gray-700">
            {concept.explanation}
          </p>
        </div>

      </div>
    </>
  );
}