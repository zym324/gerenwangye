interface Props {
  children: React.ReactNode;
  subtitle?: string;
  id?: string;
}

export default function SectionTitle({ children, subtitle, id }: Props) {
  return (
    <div id={id} className="mb-12 text-center scroll-mt-24">
      <h2 className="text-3xl font-bold tracking-tight text-dark-text md:text-4xl">
        {children}
      </h2>
      {subtitle && <p className="mt-3 text-sm text-dark-muted">{subtitle}</p>}
      <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-accent" />
    </div>
  );
}
