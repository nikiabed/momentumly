import { useTodoContext } from "@/app/_utils";
import { buildWeeklyProgress } from "@/app/_utils/progress";
import FaceIcon from "./FaceIcon/FaceIcon";
import RecordSect from "./RecordSect/RecordSect";

const FunctionSect = () => {
  const { todo } = useTodoContext();

  const weekData = buildWeeklyProgress(todo);
  return (
    <div className="flex gap-5">
      <div className="bg-white rounded-3xl p-5 shadow flex-4/5">
        <h2 className="mb-4 font-semibold">عملکرد این هفته</h2>

        <div className="flex justify-between">
          {weekData.map((day) => (
            <div
              key={day.label}
              className="
            flex flex-col
            items-center
            gap-2
            "
            >
              <span>{day.label}</span>
              <FaceIcon score={day.score} />

              <span>
                {day.total ? Math.round((day.done / day.total) * 100) : 0}%
              </span>
            </div>
          ))}
        </div>
      </div>
      <RecordSect/>
    </div>
  );
};

export default FunctionSect;
