let todos = [];
let todoId = 0;

/* 상태 */
let currentFilter = "all";
let selectedDate = new Date();

/* 기준 주 시작 */
let weekStartDate = getWeekStart(new Date());

/* DOM */
const todoInput = document.getElementById("todoInput");
const addButton = document.getElementById("addButton");
const todoList = document.getElementById("todoList");
const errorMessage = document.getElementById("errorMessage");

const weekView = document.getElementById("weekView");
const weekRangeText = document.getElementById("weekRangeText");
const prevWeekBtn = document.getElementById("prevWeekBtn");
const nextWeekBtn = document.getElementById("nextWeekBtn");

const tabs = document.querySelectorAll(".tab");

/* =========================
   LocalStorage
========================= */
const STORAGE_KEY = "todos_week_app";

function saveToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ todos, todoId }));
}

function loadFromLocalStorage() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return;

  const parsed = JSON.parse(data);
  todos = parsed.todos || [];
  todoId = parsed.todoId || 0;
}

/* =========================
   날짜 유틸
========================= */
function formatDate(date) {
  return date.toISOString().split("T")[0];
}

function getWeekStart(date) {
  const d = new Date(date);
  const day = d.getDay(); // 0:일
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // 월요일 기준
  return new Date(d.setDate(diff));
}

/* =========================
   주간 뷰 생성
========================= */
function renderWeekView() {
  weekView.innerHTML = "";

  const todayStr = formatDate(new Date());

  let start = new Date(weekStartDate);
  let end = new Date(start);
  end.setDate(start.getDate() + 6);

  weekRangeText.textContent =
    `${formatDate(start)} ~ ${formatDate(end)}`;

  for (let i = 0; i < 7; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);

    const dateStr = formatDate(date);

    const count = todos.filter(t => t.date === dateStr).length;

    const dayDiv = document.createElement("div");
    dayDiv.className = "day";

    if (dateStr === formatDate(selectedDate)) {
      dayDiv.classList.add("active");
    }

    if (dateStr === todayStr) {
      dayDiv.classList.add("today");
    }

    dayDiv.innerHTML = `
      <div>${["일","월","화","수","목","금","토"][date.getDay()]}</div>
      <div>${date.getDate()}</div>
      <div class="count">${count}</div>
    `;

    dayDiv.addEventListener("click", () => {
      selectedDate = new Date(date);
      renderWeekView();
      renderTodos();
    });

    weekView.appendChild(dayDiv);
  }
}

/* =========================
   Todo CRUD
========================= */
function addTodo() {
  const text = todoInput.value.trim();

  if (!text) {
    errorMessage.textContent = "할 일을 입력해주세요.";
    return;
  }

  errorMessage.textContent = "";

  todos.push({
    id: todoId++,
    text,
    completed: false,
    date: formatDate(selectedDate)
  });

  todoInput.value = "";

  saveToLocalStorage();
  renderWeekView();
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  saveToLocalStorage();
  renderWeekView();
  renderTodos();
}

function toggleComplete(id) {
  todos = todos.map(t =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );

  saveToLocalStorage();
  renderWeekView();
  renderTodos();
}

function editTodo(id) {
  const todo = todos.find(t => t.id === id);
  const newText = prompt("수정", todo.text);

  if (newText?.trim()) {
    todo.text = newText.trim();
    saveToLocalStorage();
    renderWeekView();
    renderTodos();
  }
}

/* =========================
   필터 + 날짜 필터
========================= */
function getFilteredTodos() {
  return todos.filter(todo => {
    const matchDate = todo.date === formatDate(selectedDate);
    if (!matchDate) return false;

    if (currentFilter === "active") return !todo.completed;
    if (currentFilter === "completed") return todo.completed;

    return true;
  });
}

/* =========================
   렌더링
========================= */
function renderTodos() {
  todoList.innerHTML = "";

  getFilteredTodos().forEach(todo => {
    const li = document.createElement("li");
    li.className = "todo-item";

    const text = document.createElement("span");
    text.textContent = todo.text;

    if (todo.completed) text.classList.add("completed");

    const actions = document.createElement("div");

    const c = document.createElement("button");
    c.textContent = "완료";
    c.onclick = () => toggleComplete(todo.id);

    const e = document.createElement("button");
    e.textContent = "수정";
    e.onclick = () => editTodo(todo.id);

    const d = document.createElement("button");
    d.textContent = "삭제";
    d.onclick = () => deleteTodo(todo.id);

    actions.append(c, e, d);
    li.append(text, actions);

    todoList.appendChild(li);
  });
}

/* =========================
   주 이동
========================= */
function changeWeek(offset) {
  weekStartDate.setDate(weekStartDate.getDate() + offset * 7);
  renderWeekView();
}

/* =========================
   탭
========================= */
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    currentFilter = tab.dataset.filter;
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    renderTodos();
  });
});

/* =========================
   이벤트
========================= */
addButton.addEventListener("click", addTodo);

prevWeekBtn.addEventListener("click", () => changeWeek(-1));
nextWeekBtn.addEventListener("click", () => changeWeek(1));

/* =========================
   초기 실행
========================= */
loadFromLocalStorage();
selectedDate = new Date();
weekStartDate = getWeekStart(new Date());

renderWeekView();
renderTodos();