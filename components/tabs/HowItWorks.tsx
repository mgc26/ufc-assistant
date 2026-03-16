import Card from "@/components/ui/Card";
import NumberBadge from "@/components/ui/NumberBadge";

const items = [
  {
    number: 1,
    question: "Who does George call?",
    answer:
      "Active members showing early churn signals — about 300/week. Not prospects, not fully disengaged, and not anyone who already re-engaged after a Monday email or text.",
  },
  {
    number: 2,
    question: "What does George talk about?",
    answer:
      "Three topics, always tailored to your location: amenities, current programs and offerings, and recovery services. He will never mention anything not available at your club.",
  },
  {
    number: 3,
    question: "Will George leave voicemails?",
    answer:
      "Yes — about 1 in 3 calls results in a voicemail. George leaves a professional, on-topic message on your behalf, saving your team significant outbound call time each week.",
  },
  {
    number: 4,
    question: "What happens after a call?",
    answer:
      "Re-engaged members are automatically removed from the workflow — no further outreach needed. Members needing support land in your escalation queue and appear in the dashboard the next morning.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-10 px-6 max-w-6xl mx-auto">
      <h2 className="text-ufc-white font-bold uppercase tracking-wide text-2xl mb-8">
        HOW IT WORKS
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => (
          <Card key={item.number}>
            <div className="flex items-start gap-4">
              <NumberBadge number={item.number} />
              <div>
                <h3 className="text-ufc-white font-bold text-lg mb-2">
                  {item.question}
                </h3>
                <p className="text-ufc-light-gray text-sm leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
