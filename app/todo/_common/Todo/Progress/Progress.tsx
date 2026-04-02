import { ListItemProps } from "../Todo.const";
import Header from "../../Header/Header";
import LineChart from "../../LineChart/LineChart";

const Progress = ({ item }: { item: ListItemProps }) => {
  const data = [
    { label: "امروز", value: 8 },
    { label: "دیروز", value: 2 },
    { label: "امروز", value: 15 },
    { label: "دیروز", value: 6 },
  ];
  return (
    <div>
      <LineChart data={data} height={200} width={200}/>
    </div>
  );
};

export default Progress;
