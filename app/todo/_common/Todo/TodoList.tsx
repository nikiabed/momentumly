
export default function TodoList({todoList}:any) {
  return (
    <div>
      <ul>
        {todoList.map((list:any, idx:number) => {
          return (
            <li key={idx}>
              {list.title} {list.status}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
