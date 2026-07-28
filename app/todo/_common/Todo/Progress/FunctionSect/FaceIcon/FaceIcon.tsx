export const FaceIcon = ({ score }: { score: number }) => {
  const moods = [
    {
      bg: "#FCA5A5",
      mouth: "M28 56C31 50 36 47 40 47C44 47 49 50 52 56",
    },
    {
      bg: "#FDBA74",
      mouth: "M30 52C34 49 38 48 40 48C42 48 46 49 50 52",
    },
    {
      bg: "#FDE68A",
      mouth: "M30 50H50",
    },
    {
      bg: "#86EFAC",
      mouth: "M28 49C32 53 36 55 40 55C44 55 48 53 52 49",
    },
    {
      bg: "#4ADE80",
      mouth: "M28 47C31 53 36 56 40 56C44 56 49 53 52 47",
    },
  ];

  const normalized =
    score < 20 ? 0 : score < 40 ? 1 : score < 60 ? 2 : score < 80 ? 3 : 4;

  const mood = moods[normalized];

  return (
    <svg width="68" height="68" viewBox="0 0 80 80" className="drop-shadow-sm">
      <circle cx="40" cy="40" r="32" fill={mood.bg} />

      <circle cx="30" cy="32" r="3" fill="#0F172A" />
      <circle cx="50" cy="32" r="3" fill="#0F172A" />

      <path
        d={mood.mouth}
        stroke="#0F172A"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};
