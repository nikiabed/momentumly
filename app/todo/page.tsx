import Sidebar from "./_common/Sidebar/Sidebar";
import Todo from "./_common/Todo/Todo";

export default function todoPage() {
 
  return (
    <div className="h-screen w-full flex ">
      <Sidebar/>
      <Todo/>
    </div>
  );
}
