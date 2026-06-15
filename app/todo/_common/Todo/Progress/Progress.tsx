"use client";

type Props = {
  progress: number;
  xp?: number;
  streak?: number;
};

export const Progress = ({
  progress = 0,
  xp = 0,
  streak = 0,
}: Props) => {
  const moodText =
    progress < 40
      ? "آرام شروع شده"
      : progress < 80
      ? "در حال رشد"
      : "روز پُررونق";

  return (
    <div className="w-full max-w-md rounded-2xl p-6 text-white shadow-md bg-gradient-to-br from-slate-700 via-slate-600 to-slate-500">
      
      {/* top subtle line */}
      <div className="text-xs opacity-70 mb-6">
        progress • today
      </div>

      {/* main feeling */}
      <div className="text-xl font-light mb-6 tracking-wide">
        {moodText}
      </div>

      {/* soft rainbow bar */}
      <div className="w-full h-[6px] bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-700 rounded-full bg-gradient-to-r from-indigo-300 via-sky-300 to-emerald-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* minimal stats */}
      <div className="flex justify-between mt-5 text-xs opacity-70">
        <span>xp {xp}</span>
        <span>{progress}%</span>
      </div>

      {/* plant but subtle */}
      <div className="mt-8 text-center text-2xl opacity-80 transition-all">
        {progress < 30 && "·"}
        {progress >= 30 && progress < 70 && "··"}
        {progress >= 70 && "···"}
      </div>

      {/* streak (very subtle, not firey) */}
      {streak > 0 && (
        <div className="text-center mt-3 text-xs opacity-60">
          {streak} days in flow
        </div>
      )}
    </div>
  );
};