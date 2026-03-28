import Header from "../../Header/Header";

const Work = ({ item }: any) => {
  return (
    <div className="overflow-y-auto flex-4 flex gap-3 flex-col bg-linear-45 from-purple-300 to-purple-400 h-screen px-15 pt-5">
      <Header item={item} />
    </div>
  );
};

export default Work;
