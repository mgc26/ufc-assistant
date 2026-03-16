interface NumberBadgeProps {
  number: number;
  className?: string;
}

export default function NumberBadge({ number, className = "" }: NumberBadgeProps) {
  return (
    <div
      className={`w-8 h-8 rounded-full bg-ufc-red flex items-center justify-center shrink-0 ${className}`}
    >
      <span className="text-white font-bold text-sm">{number}</span>
    </div>
  );
}
