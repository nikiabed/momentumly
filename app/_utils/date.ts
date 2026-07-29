export const getDateKey = (date: string | Date) => {
  if (!date) return null;
  const d = new Date(date);
  if (isNaN(d.getTime())) return null;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const formatGroupDate = (date: string) => {
  const target = new Date(date);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const targetKey = getDateKey(target);

  let label = "";

  if (targetKey === getDateKey(today)) {
    label = "امروز";
  } else if (targetKey === getDateKey(yesterday)) {
    label = "دیروز";
  } else if (targetKey === getDateKey(tomorrow)) {
    label = "فردا";
  }

  const persianDate = new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(target);

  return {
    label,
    date: persianDate,
  };
};