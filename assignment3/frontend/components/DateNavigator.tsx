import Link from "next/link";
import {
  addDays,
  getDateDisplayText,
  getDateKey,
  getRelativeDateLabel,
} from "../utils/date";

type DateNavigatorProps = {
  filter: string;
  selectedDate: Date;
};

function getTodosHref(date: Date, filter: string) {
  const params = new URLSearchParams({ date: getDateKey(date) });

  if (filter !== "all") {
    params.set("filter", filter);
  }

  return `/todos?${params.toString()}`;
}

export default function DateNavigator({ filter, selectedDate }: DateNavigatorProps) {
  const today = new Date();
  const isToday = getDateKey(selectedDate) === getDateKey(today);

  return (
    <div className="mb-4 rounded-[14px] bg-[#f4f0ff] px-3 py-5">
      <div className="flex items-center justify-between">
        <Link
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d8ccff] bg-white text-[18px] font-bold text-[#672be0] transition hover:bg-[#eee6ff]"
          href={getTodosHref(addDays(selectedDate, -1), filter)}
          aria-label="이전 날짜"
        >
          &lt;
        </Link>

        <div className="text-center">
          <p className="text-[15px] font-bold text-[#672be0]">
            {getRelativeDateLabel(selectedDate)}
          </p>
          <p className="mt-1.5 text-[19px] font-bold text-[#333]">
            {getDateDisplayText(selectedDate)}
          </p>
        </div>

        <Link
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d8ccff] bg-white text-[18px] font-bold text-[#672be0] transition hover:bg-[#eee6ff]"
          href={getTodosHref(addDays(selectedDate, 1), filter)}
          aria-label="다음 날짜"
        >
          &gt;
        </Link>
      </div>

      {!isToday && (
        <div className="mt-3 flex justify-center">
          <Link
            className="rounded-full bg-[#672be0] px-3 py-1 text-[12px] font-bold text-white transition hover:bg-[#541fb9]"
            href={getTodosHref(today, filter)}
          >
            오늘
          </Link>
        </div>
      )}
    </div>
  );
}
