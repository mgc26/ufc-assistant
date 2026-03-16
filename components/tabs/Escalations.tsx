import Card from "@/components/ui/Card";
import NumberBadge from "@/components/ui/NumberBadge";

const metrics = [
  {
    icon: "\u{1F4DE}",
    title: "Today's Calls",
    description: "How many calls George has made today",
  },
  {
    icon: "\u23F1",
    title: "Ops Efficiency",
    description:
      "Hours of call time George handled so your staff didn't have to",
  },
];

const steps = [
  "Log into the Vi dashboard",
  'Check "Today\'s Calls" \u2014 see how many calls George has made',
  'Click "Take Action" on any escalation that needs attention',
  'Click "Resolve in GymSales" \u2014 opens the member\'s GymSales profile directly',
  "Click the call dropdown, select the member's phone number, and call",
  "Choose an outcome: Spoke to, No answer, or Left message",
  "If you spoke to the member, leave notes about the conversation",
];

const triggers = [
  "A request to speak to a human",
  "Mention of billing or cancellation",
  "Detected frustration",
  "Unanswered warm transfers",
];

export default function Escalations() {
  return (
    <section className="py-10 px-6 max-w-6xl mx-auto">
      <h2 className="text-ufc-white font-bold uppercase tracking-wide text-2xl mb-8">
        HOW TO RESOLVE ESCALATIONS
      </h2>

      {/* Metric callout cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {metrics.map((metric) => (
          <Card key={metric.title} className="border-t-2 border-ufc-gold">
            <div className="flex items-start gap-4">
              <span className="text-3xl" role="img" aria-label={metric.title}>
                {metric.icon}
              </span>
              <div>
                <h3 className="text-ufc-white font-bold text-lg">
                  {metric.title}
                </h3>
                <p className="text-ufc-light-gray text-sm leading-relaxed mt-1">
                  {metric.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Step-by-step guide */}
      <div className="flex flex-col gap-4 mb-8">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-4">
            <NumberBadge number={index + 1} />
            <Card className="flex-1">
              <p className="text-ufc-white text-sm leading-relaxed">{step}</p>
            </Card>
          </div>
        ))}
      </div>

      {/* Escalation triggers callout */}
      <Card className="border-l-4 border-ufc-red">
        <h3 className="text-ufc-white font-bold uppercase tracking-wide text-lg mb-4">
          WHAT TRIGGERS AN ESCALATION?
        </h3>
        <ul className="space-y-2">
          {triggers.map((trigger) => (
            <li
              key={trigger}
              className="text-ufc-light-gray text-sm leading-relaxed flex items-start gap-2"
            >
              <span className="text-ufc-red mt-0.5">&bull;</span>
              {trigger}
            </li>
          ))}
        </ul>
      </Card>
    </section>
  );
}
