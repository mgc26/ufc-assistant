import Card from "@/components/ui/Card";
import NumberBadge from "@/components/ui/NumberBadge";

const timelineCards = [
  {
    badge: "Daily (2 min)",
    text: "Check overnight escalations. Call back pending members and glance at yesterday's results.",
  },
  {
    badge: "1–4 PM Central",
    text: "Live feed shows calls are working in real time. Handle up to 20 escalations per week between tasks.",
  },
  {
    badge: "End of Week",
    text: "Check your Scorecard. Celebrate saved members. Send feedback to the Vi team.",
  },
];

const warmTransferSteps = [
  'Member is put on hold, with music — "Let\'s get you connected to a team member."',
  'GM answers — "You are receiving a warm transfer call, press 1 to initiate"',
  'Call summary begins — "Press 1 to join the conference"',
  "You're connected — pick up where George left off",
];

export default function WeeklyRhythm() {
  return (
    <section className="py-10 px-6 max-w-6xl mx-auto">
      {/* Section Heading */}
      <h2 className="text-ufc-white font-bold uppercase tracking-wide text-2xl mb-8">
        Your Weekly Rhythm
      </h2>

      {/* Timeline Cards */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Horizontal connector line (desktop only) */}
        <div
          className="hidden md:block absolute top-10 left-[16.67%] right-[16.67%] h-0.5 bg-ufc-red/40"
          aria-hidden="true"
        />

        {timelineCards.map((card, i) => (
          <div key={i} className="relative z-10 flex flex-col items-center">
            {/* Time Badge */}
            <span className="bg-ufc-red text-white text-xs font-bold uppercase px-3 py-1 rounded-full mb-4">
              {card.badge}
            </span>

            <Card className="text-center h-full">
              <p className="text-ufc-light-gray text-sm leading-relaxed">
                {card.text}
              </p>
            </Card>
          </div>
        ))}
      </div>

      {/* Warm Transfers Callout */}
      <Card className="border-l-4 border-ufc-gold">
        <h3 className="text-ufc-white font-bold uppercase tracking-wide text-lg">
          Warm Transfers
        </h3>
        <p className="text-ufc-gold text-sm mb-6">How to connect live</p>

        <div className="flex flex-col gap-4">
          {warmTransferSteps.map((step, i) => (
            <div key={i} className="flex items-start gap-4">
              <NumberBadge number={i + 1} />
              <p className="text-ufc-light-gray text-sm leading-relaxed pt-1">
                {step}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
