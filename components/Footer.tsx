export default function Footer() {
  return (
    <footer className="bg-ufc-black border-t border-ufc-card-border">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between text-sm">
        <span className="text-ufc-muted-gray">
          Powered by{" "}
          <span className="text-ufc-gold font-semibold">Vi Engage</span>
        </span>
        <a
          href="mailto:engage@viengage.co"
          className="text-ufc-muted-gray hover:text-ufc-white transition-colors"
        >
          engage@viengage.co
        </a>
      </div>
    </footer>
  );
}
