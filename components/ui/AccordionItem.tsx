"use client";

import { useState } from "react";

interface AccordionItemProps {
  question: string;
  answer: string;
}

export default function AccordionItem({ question, answer }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-ufc-card-border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between p-6 bg-ufc-card text-left hover:bg-ufc-charcoal transition-colors focus:outline-none focus:ring-2 focus:ring-ufc-red focus:ring-inset"
      >
        <span className="text-ufc-white font-bold text-lg pr-4">{question}</span>
        <svg
          className={`w-5 h-5 text-ufc-muted-gray shrink-0 transition-transform duration-150 ease-in-out ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`transition-all duration-150 ease-in-out overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-6 pt-0 bg-ufc-card text-ufc-light-gray leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
}
