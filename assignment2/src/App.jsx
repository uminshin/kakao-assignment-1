import React, { useEffect, useMemo, useState } from "react";
import DateNavigator from "./components/DateNavigator";
import FilterTabs from "./components/FilterTabs";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { addDays, getDateKey } from "./utils/date";
import { loadTodosFromStorage, saveTodosToStorage } from "./utils/storage";

const STORAGE_KEY = "assignment2-react-todos";

const FILTER_OPTIONS = [
  { value: "all", label: "전체" },
  { value: "active", label: "진행 중" },
  { value: "completed", label: "완료" },
];

function getInitialTodos() {
  const todayKey = getDateKey(new Date());

  return loadTodosFromStorage(STORAGE_KEY).map((todo) => ({
    ...todo,
    date: todo.date ?? todayKey,
  }));
}

function App() {
  const [filter, setFilter] = useState("all");
  const [todos, setTodos] = useState(getInitialTodos);
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [message, setMessage] = useState("");
  const selectedDateKey = getDateKey(selectedDate);
  const isSelectedDateToday = selectedDateKey === getDateKey(new Date());

  // todos state가 바뀔 때마다 localStorage에 최신 Todo 목록을 저장한다.
  useEffect(() => {
    saveTodosToStorage(STORAGE_KEY, todos);
  }, [todos]);

  // 선택한 날짜의 Todo를 따로 계산해서 목록 표시와 개수 표시에 함께 사용한다.
  const selectedDateTodos = useMemo(() => {
    return todos.filter(
      (todo) => todo.date === selectedDateKey,
    );
  }, [selectedDateKey, todos]);

  // 선택한 날짜의 Todo 안에서 상태별 필터를 한 번 더 적용한다.
  const filteredTodos = useMemo(() => {
    if (filter === "active") {
      return selectedDateTodos.filter((todo) => todo.completed === false);
    }

    if (filter === "completed") {
      return selectedDateTodos.filter((todo) => todo.completed === true);
    }

    return selectedDateTodos;
  }, [filter, selectedDateTodos]);

  function handleAddTodo(todoText) {
    const trimmedText = todoText.trim();

    if (trimmedText === "") {
      setMessage("할 일을 입력해주세요.");
      return false;
    }

    const newTodo = {
      id: Date.now(),
      text: trimmedText,
      completed: false,
      date: selectedDateKey,
    };

    setTodos((currentTodos) => [...currentTodos, newTodo]);
    setMessage("");
    return true;
  }

  function handleMoveDate(dayAmount) {
    setSelectedDate((currentDate) => addDays(currentDate, dayAmount));
    setEditingTodoId(null);
    setMessage("");
  }

  function handleSelectToday() {
    setSelectedDate(new Date());
    setEditingTodoId(null);
    setMessage("");
  }

  function handleClearSelectedDateTodos() {
    if (selectedDateTodos.length === 0) {
      setMessage("초기화할 Todo가 없습니다.");
      return;
    }

    setTodos((currentTodos) =>
      currentTodos.filter((todo) => todo.date !== selectedDateKey),
    );
    setEditingTodoId(null);
    setMessage("선택한 날짜의 Todo를 초기화했습니다.");
  }

  function handleEditTodo(todoId) {
    setEditingTodoId(todoId);
    setMessage("Todo 항목 안에서 내용을 수정해주세요.");
  }

  function handleCancelEdit() {
    setEditingTodoId(null);
    setMessage("");
  }

  function handleUpdateTodo(todoId, nextText) {
    const trimmedText = nextText.trim();

    if (trimmedText === "") {
      setMessage("수정할 내용을 입력해주세요.");
      return false;
    }

    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === todoId ? { ...todo, text: trimmedText } : todo,
      ),
    );
    setEditingTodoId(null);
    setMessage("Todo를 수정했습니다.");
    return true;
  }

  function handleToggleTodo(todoId) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
    setMessage("");
  }

  function handleDeleteTodo(todoId) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== todoId));

    if (editingTodoId === todoId) {
      setEditingTodoId(null);
    }

    setMessage("");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f2f8] px-4 py-8 text-[#222]">
      <section className="w-full max-w-[400px] rounded-[18px] bg-white p-7 shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
        <h1 className="mb-6 text-center text-[28px] font-bold text-[#672be0]">
          Todo List
        </h1>

        <DateNavigator
          isToday={isSelectedDateToday}
          selectedDate={selectedDate}
          onMoveDate={handleMoveDate}
          onSelectToday={handleSelectToday}
        />

        <TodoForm onAddTodo={handleAddTodo} />

        <p className="mt-2 min-h-5 text-[13px] text-[#e74c3c]" role="status">
          {message}
        </p>

        <FilterTabs
          filterOptions={FILTER_OPTIONS}
          selectedFilter={filter}
          onSelectFilter={setFilter}
        />

        <div className="mb-4 flex items-center justify-between px-1 py-1">
          <p className="text-[13px] font-bold text-[#555]">
            Todo {selectedDateTodos.length}개
          </p>
          <button
            className="rounded-full bg-[#672be0] px-3 py-1.5 text-[12px] font-bold text-white transition hover:bg-[#541fb9]"
            type="button"
            onClick={handleClearSelectedDateTodos}
          >
            초기화
          </button>
        </div>

        <TodoList
          editingTodoId={editingTodoId}
          todos={filteredTodos}
          selectedFilter={filter}
          onCancelEdit={handleCancelEdit}
          onDeleteTodo={handleDeleteTodo}
          onEditTodo={handleEditTodo}
          onToggleTodo={handleToggleTodo}
          onUpdateTodo={handleUpdateTodo}
        />
      </section>
    </main>
  );
}

export default App;
