export default function Header() {
  return (
    <header className="w-full bg-ufc-black border-b-2 border-ufc-red">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-ufc-white text-xl tracking-wide">
            <span className="font-bold italic">UFC</span>
            <span className="font-light italic"> GYM</span>
          </span>
          <span className="text-ufc-muted-gray text-lg font-light">×</span>
          <span className="text-ufc-gold text-xl font-bold italic">Vi</span>
        </div>
        <span className="hidden md:block text-ufc-muted-gray text-sm tracking-wide">
          Staff Resource Guide
        </span>
      </div>
    </header>
  );
}
