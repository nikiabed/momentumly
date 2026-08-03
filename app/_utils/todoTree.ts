import { Todo } from "../types";

export function buildTodoTree(todos: Todo[]) {
  const map = new Map();

  todos.forEach((todo) => {
    map.set(todo._id, {
      ...todo,
      children: [],
    });
  });

  const roots: Todo[] = [];

  todos.forEach((todo) => {
    if (todo.parentTodoId) {
      const parent = map.get(todo.parentTodoId);

      if (parent) {
        parent.children.push(map.get(todo._id));
      }
    } else {
      roots.push(map.get(todo._id));
    }
  });

  return roots;
}
