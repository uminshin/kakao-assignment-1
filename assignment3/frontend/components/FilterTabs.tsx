import Link from "next/link";

const FILTER_OPTIONS = [
  { value: "all", label: "전체" },
  { value: "active", label: "진행 중" },
  { value: "completed", label: "완료" },
];

type FilterTabsProps = {
  selectedDateKey: string;
  selectedFilter: string;
};

export default function FilterTabs({
  selectedDateKey,
  selectedFilter,
}: FilterTabsProps) {
  return (
    <div className="mt-2 flex gap-1.5 rounded-xl bg-[#f1eef8] p-[5px]">
      {FILTER_OPTIONS.map((filterOption) => {
        const isSelected = selectedFilter === filterOption.value;
        const params = new URLSearchParams({ date: selectedDateKey });

        if (filterOption.value !== "all") {
          params.set("filter", filterOption.value);
        }

        return (
          <Link
            key={filterOption.value}
            href={`/todos?${params.toString()}`}
            className={`flex-1 rounded-[9px] px-2 py-2 text-center text-[13px] font-bold ${
              isSelected
                ? "bg-[#672be0] text-white"
                : "bg-transparent text-[#777] hover:bg-white"
            }`}
          >
            {filterOption.label}
          </Link>
        );
      })}
    </div>
  );
}
