export const BOARD_KEYS = {
  MY_DAY: "myDay",
  ALL: "all",
  IMPORTANT: "important",
  COMPLETE: "complete",
  PROGRESS: "progress",
  WORK: "work",
  UUTITLED: "untitled",
  SEARCH: "search",
} as const;

export type BoardKey =
  | "myDay"
  | "all"
  | "important"
  | "complete"
  | "progress"
  | "work"
  | "untitled"
  | "search";
  
export const BOARD_LABELS: Record<BoardKey, string> = {
  myDay: "امروز",
  all: "همه",
  important: "مهم",
  complete: "انجام شده",
  progress: "پیشرفت",
  work: "کار",
  untitled: "بدون عنوان",
  search: "جستجو",
} as const;

