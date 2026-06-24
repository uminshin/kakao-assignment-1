type EmptyStateProps = {
  title: string;
  description: string;
};

export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-[14px] border border-dashed border-[#d8ccff] bg-[#f8f5ff] p-6 text-center">
      <h2 className="text-[15px] font-bold text-[#672be0]">{title}</h2>
      <p className="mt-2 text-[13px] leading-6 text-[#777]">{description}</p>
    </div>
  );
}
