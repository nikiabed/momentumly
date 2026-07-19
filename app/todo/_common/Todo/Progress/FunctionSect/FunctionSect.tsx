import { useTodoContext } from "@/app/_utils";
import { buildWeeklyProgress } from "@/app/_utils/progress";
import { FaceIcon } from "./FaceIcon";
import { RecordSect } from "./RecordSect";

export const FunctionSect = () => {
  const { todo } = useTodoContext();

  const weekData = buildWeeklyProgress(todo);
  return (
    <div className="flex gap-5 flex-col lg:flex-row">
      <div className="bg-white rounded-3xl p-5 shadow lg:flex-4/5 flex-wrap">
        <h2 className="mb-4 font-semibold">عملکرد این هفته</h2>

        <div className="flex flex-wrap justify-center gap-4 md:justify-between">
          {weekData.map((day) => (
            <div
              key={day.label}
              className="
            flex flex-col
            items-center
            gap-2
            "
            >
              <span
                className="
    flex flex-col
    items-center
    gap-2
    w-1/4 sm:w-1/6 md:w-auto
  "
              >
                {day.label}
              </span>
              <FaceIcon score={day.score} />

              <span>{day.score}%</span>
            </div>
          ))}
        </div>
      </div>
      <RecordSect />
    </div>
  );
};
