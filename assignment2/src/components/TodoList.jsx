import React from "react";
import TodoItem from "./TodoItem";

const EMPTY_MESSAGES = {
  all: "등록된 할 일이 없습니다.",
  active: "진행 중인 할 일이 없습니다.",
  completed: "완료한 할 일이 없습니다.",
};

function TodoList({
  editingTodoId,
  todos,
  selectedFilter,
  onCancelEdit,
  onDeleteTodo,
  onEditTodo,
  onToggleTodo,
  onUpdateTodo,
}) {
  if (todos.length === 0) {
    return (
      <p className="py-5 text-center text-sm text-[#999]">
        {EMPTY_MESSAGES[selectedFilter]}
      </p>
    );
  }

  return (
    <ul className="mt-3 list-none">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          isEditing={editingTodoId === todo.id}
          todo={todo}
          onCancelEdit={onCancelEdit}
          onDeleteTodo={onDeleteTodo}
          onEditTodo={onEditTodo}
          onToggleTodo={onToggleTodo}
          onUpdateTodo={onUpdateTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
