export function addDays(date, dayAmount) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + dayAmount);

  return nextDate;
}

export function getDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getDateDisplayText(date) {
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayName = dayNames[date.getDay()];

  return `${year}년 ${month}월 ${day}일 (${dayName})`;
}

export function getRelativeDateLabel(date) {
  const todayKey = getDateKey(new Date());
  const targetKey = getDateKey(date);

  if (targetKey === todayKey) {
    return "오늘";
  }

  const yesterday = addDays(new Date(), -1);
  const tomorrow = addDays(new Date(), 1);

  if (targetKey === getDateKey(yesterday)) {
    return "어제";
  }

  if (targetKey === getDateKey(tomorrow)) {
    return "내일";
  }

  return "선택일";
}
