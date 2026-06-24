const DATE_FORMATTER = new Intl.DateTimeFormat("ko-KR", {
  month: "long",
  day: "numeric",
  weekday: "short",
});

export function getDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function parseDateKey(dateKey?: string) {
  if (!dateKey || !/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) {
    return new Date();
  }

  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function addDays(date: Date, dayAmount: number) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + dayAmount);

  return nextDate;
}

export function getDateDisplayText(date: Date) {
  return DATE_FORMATTER.format(date);
}

export function getRelativeDateLabel(date: Date) {
  const selectedDateKey = getDateKey(date);
  const today = new Date();
  const todayKey = getDateKey(today);
  const yesterdayKey = getDateKey(addDays(today, -1));
  const tomorrowKey = getDateKey(addDays(today, 1));

  if (selectedDateKey === todayKey) {
    return "오늘";
  }

  if (selectedDateKey === yesterdayKey) {
    return "어제";
  }

  if (selectedDateKey === tomorrowKey) {
    return "내일";
  }

  return "선택한 날짜";
}
