import Card from "@/components/ui/Card";

const contacts = [
  { name: "Ashton", initials: "A", role: "Vi Team", phone: "(724) 787-6216" },
  { name: "Katie Sutherland", initials: "KS", role: "Vi Team", phone: "(952) 913-6288" },
];

export default function Support() {
  return (
    <section className="py-10 px-6 max-w-6xl mx-auto">
      <h2 className="text-ufc-white font-bold uppercase tracking-wide text-2xl mb-8">
        Escalations &amp; Support
      </h2>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {contacts.map((contact) => (
          <Card key={contact.name} className="flex flex-col items-center text-center">
            <div className="bg-ufc-red rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-lg mb-4">
              {contact.initials}
            </div>
            <p className="text-ufc-white font-bold">{contact.name}</p>
            <p className="text-ufc-muted-gray text-sm">{contact.role}</p>
            <a
              href={`tel:${contact.phone.replace(/[^0-9]/g, "")}`}
              className="text-ufc-red text-sm hover:underline mt-1"
            >
              {contact.phone}
            </a>
          </Card>
        ))}

        {/* Email Card */}
        <Card className="flex flex-col items-center text-center">
          <div className="bg-ufc-red rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-lg mb-4">
            @
          </div>
          <p className="text-ufc-white font-bold">Email Us</p>
          <a
            href="mailto:engage@viengage.co"
            className="text-ufc-red text-sm hover:underline"
          >
            engage@viengage.co
          </a>
        </Card>
      </div>

      {/* Feedback Callout */}
      <Card className="border-l-4 border-ufc-gold">
        <h3 className="text-ufc-white font-bold text-lg mb-2">HAVE FEEDBACK?</h3>
        <p className="text-ufc-light-gray mb-4">
          Flag anything — tone, topics, or location-specific details — and changes
          happen the same day. Reach out anytime.
        </p>
        <a
          href="mailto:engage@viengage.co"
          className="inline-block bg-ufc-red text-white px-6 py-2 rounded-full font-semibold hover:opacity-90 transition-opacity"
        >
          Contact engage@viengage.co
        </a>
      </Card>
    </section>
  );
}
