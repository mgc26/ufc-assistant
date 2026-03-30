import AccordionItem from "@/components/ui/AccordionItem";

const faqs = [
  {
    question: "Can members tell Jade is AI?",
    answer:
      "Yes — Jade discloses she's an AI assistant from UFC Gym at the start of every call. Full transparency, every time.",
  },
  {
    question: "What if a member asks to cancel?",
    answer:
      "Jade never processes cancellations. She listens, empathizes, and escalates the member to your team with full context so you can take it from there.",
  },
  {
    question: "Can I change Jade's scripts?",
    answer:
      "Not directly, but your feedback shapes every update. Flag anything — tone, topics, or location-specific details — to engage@viengage.co and changes happen the same day.",
  },
  {
    question: "Will Jade replace my staff?",
    answer:
      "No. Jade handles routine retention outreach so your team can focus on high-value moments: tours, sales, and service interactions that need a human touch.",
  },
];

export default function FAQ() {
  return (
    <section className="py-10 px-6 max-w-6xl mx-auto">
      <h2 className="text-ufc-white font-bold uppercase tracking-wide text-2xl mb-8">
        COMMON QUESTIONS
      </h2>
      <div className="flex flex-col gap-4">
        {faqs.map((faq) => (
          <AccordionItem
            key={faq.question}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </div>
    </section>
  );
}
