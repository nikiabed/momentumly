// chartHeader.constants.ts

export const CHART_HEADER = {
  title: "پیشرفت هفتگی",
} as const;

export const WEEK_OPTIONS = [
  {
    value: 0,
    label: "این هفته",
  },
  {
    value: 1,
    label: "هفته قبل",
  },
  {
    value: 2,
    label: "۲ هفته قبل",
  },
] as const;