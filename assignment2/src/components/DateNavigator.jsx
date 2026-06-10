import React from "react";
import { getDateDisplayText, getRelativeDateLabel } from "../utils/date";

function DateNavigator({ isToday, selectedDate, onMoveDate, onSelectToday }) {
  return (
    <div className="mb-4 rounded-[14px] bg-[#f4f0ff] px-3 py-5">
      <div className="flex items-center justify-between">
        <button
          className="h-9 w-9 rounded-full border border-[#d8ccff] bg-white text-[18px] font-bold text-[#672be0] transition hover:bg-[#eee6ff]"
          type="button"
          aria-label="이전 날짜"
          onClick={() => onMoveDate(-1)}
        >
          &lt;
        </button>

        <div className="text-center">
          <p className="text-[15px] font-bold text-[#672be0]">
            {getRelativeDateLabel(selectedDate)}
          </p>
          <p className="mt-1.5 text-[19px] font-bold text-[#333]">
            {getDateDisplayText(selectedDate)}
          </p>
        </div>

        <button
          className="h-9 w-9 rounded-full border border-[#d8ccff] bg-white text-[18px] font-bold text-[#672be0] transition hover:bg-[#eee6ff]"
          type="button"
          aria-label="다음 날짜"
          onClick={() => onMoveDate(1)}
        >
          &gt;
        </button>
      </div>

      {!isToday && (
        <div className="mt-3 flex justify-center">
          <button
            className="rounded-full bg-[#672be0] px-3 py-1 text-[12px] font-bold text-white transition hover:bg-[#541fb9]"
            type="button"
            onClick={onSelectToday}
          >
            오늘
          </button>
        </div>
      )}
    </div>
  );
}

export default DateNavigator;
