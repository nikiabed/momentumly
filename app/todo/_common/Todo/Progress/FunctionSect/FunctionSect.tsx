import { useTodoContext } from "@/app/_utils";
import { FaceIcon } from "./FaceIcon";
import { RecordSect } from "./RecordSect";
import { buildWeeklyProgress } from "@/app/_utils/progress";

const getScoreMessage = (score: number) => {
  if (score >= 80) return "درخشیدی ✨";
  if (score >= 60) return "خوبه، ادامه بده 🌱";
  if (score >= 40) return "کم‌کم جلو برو 🌤️";
  if (score > 0) return "فقط شروع کن 💜";
  return "شروع نشده";
};

export const FunctionSect = () => {
  const { todo } = useTodoContext();
  const weekData = buildWeeklyProgress(todo);

  return (
    <div className="flex flex-col lg:flex-row gap-5">
      {/* Weekly performance */}
      <div className="bg-white rounded-4xl p-6 shadow-sm border border-gray-100 lg:flex-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">عملکرد این هفته</h2>

            <p className="text-sm text-gray-400 mt-1">
              هر روز فقط یک قدم کوچیک 🌱
            </p>
          </div>

          <div className="px-3 py-1.5 rounded-full bg-violet-50 text-violet-600 text-xs font-bold">
            ۷ روز
          </div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 sm:gap-3">
          {weekData.map((day) => (
            <div
              key={day.label}
              className="
                group
                flex flex-col
                items-center
                justify-center
                gap-2
                rounded-2xl
                py-3 px-1
                transition
                hover:bg-gray-50
              "
            >
              {/* Day */}
              <span className="text-xs sm:text-sm font-semibold text-gray-500">
                {day.label}
              </span>

              {/* Face */}
              <div
                className="
                  transition-transform
                  duration-200
                  group-hover:scale-110
                "
              >
                <FaceIcon score={day.score} />
              </div>

              {/* Score */}
              <span
                className={`
                  text-sm font-black
                  ${
                    day.score >= 80
                      ? "text-emerald-500"
                      : day.score >= 60
                        ? "text-green-500"
                        : day.score >= 40
                          ? "text-yellow-500"
                          : day.score > 0
                            ? "text-orange-500"
                            : "text-gray-300"
                  }
                `}
              >
                {day.score}%
              </span>

              {/* Tiny message */}
              <span className="hidden sm:block text-[10px] text-gray-400 text-center leading-4">
                {getScoreMessage(day.score)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <RecordSect />
    </div>
  );
};
