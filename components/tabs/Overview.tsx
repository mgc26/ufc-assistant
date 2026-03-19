import Card from "@/components/ui/Card";

export default function Overview() {
  return (
    <section className="py-10 px-6 max-w-6xl mx-auto">
      {/* Hero Stat Block */}
      <div className="text-center mb-10">
        <p className="text-6xl font-bold text-ufc-white">28.6%</p>
        <p className="text-ufc-muted-gray text-lg mt-2">
          of fitness members churn every year
        </p>
      </div>

      {/* Intro Paragraph */}
      <p className="text-ufc-light-gray text-center max-w-3xl mx-auto mb-10 leading-relaxed">
        Vi Engage combines predictive AI with behavioral insights to enable
        George, your AI assistant, to complete phone calls. Providing value and
        enabling you to support members who need you most.
      </p>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card>
          <h3 className="text-ufc-white font-bold uppercase tracking-wide mb-3">
            Proactive Outreach
          </h3>
          <p className="text-ufc-light-gray">
            George automatically calls members identified by Vi&apos;s
            prediction model as needing support or engagement.
          </p>
        </Card>

        <Card>
          <h3 className="text-ufc-white font-bold uppercase tracking-wide mb-3">
            Personalized Conversations
          </h3>
          <p className="text-ufc-light-gray">
            Each call follows a tailored topic — check-in, recovery, or
            offerings — to guide members toward relevant services or support.
          </p>
        </Card>

        <Card>
          <h3 className="text-ufc-white font-bold uppercase tracking-wide mb-3">
            Smart Handoff
          </h3>
          <p className="text-ufc-light-gray">
            When a member needs human help, George escalates the conversation
            with a summary so staff can step in quickly.
          </p>
        </Card>
      </div>

      {/* Training Materials */}
      <div>
        <h2 className="text-ufc-white text-2xl font-bold uppercase tracking-wide mb-4">
          Training Materials
        </h2>
        <ul className="space-y-2">
          <li>
            <a
              href="https://www.youtube.com/watch?v=KciffSRKg6Q"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ufc-red hover:underline"
            >
              Call Demo
            </a>
          </li>
          <li>
            <a
              href="https://docs.google.com/presentation/d/1nTBdBzRNjn5kHLRfkPuZTdgIlhq8RwfpVtK4rvZqnv4/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ufc-red hover:underline"
            >
              Overview Pages
            </a>
          </li>
          <li>
            <a
              href="https://console.platform.vi.co/dashboards/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ufc-red hover:underline"
            >
              Vi Dashboard
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
