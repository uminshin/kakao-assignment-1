type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export default function PageHeader({
  eyebrow,
  title,
  description,
}: PageHeaderProps) {
  return (
    <header className="mb-6 text-center">
      {eyebrow && (
        <p className="text-[13px] font-bold text-[#777]">{eyebrow}</p>
      )}
      <h1 className="mt-1 text-[28px] font-bold text-[#672be0]">{title}</h1>
      {description && (
        <p className="mt-3 text-[13px] leading-6 text-[#666]">{description}</p>
      )}
    </header>
  );
}
