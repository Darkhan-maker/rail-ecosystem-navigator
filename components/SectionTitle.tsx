interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionTitle({ title, subtitle, centered = false, className = '' }: SectionTitleProps) {
  return (
    <div className={`mb-10 ${centered ? 'text-center' : ''} ${className}`}>
      <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h1>
      {subtitle && <p className="mt-2 text-base text-slate-500 max-w-2xl">{subtitle}</p>}
    </div>
  );
}
