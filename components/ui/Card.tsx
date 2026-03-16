interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-ufc-card border border-ufc-card-border rounded-lg p-6 ${className}`}
    >
      {children}
    </div>
  );
}
