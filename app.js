// localStorage에 Todo 데이터를 저장할 때 사용할 이름
const TODO_STORAGE_KEY = "vanillaTodoItems";

// Todo 데이터를 저장할 배열
let todoItems = [];

// Todo마다 고유한 id를 주기 위한 숫자
let nextTodoId = 1;

// 현재 수정 중인 Todo의 id를 저장한다.
// 수정 중이 아니면 null이다.
let editingTodoId = null;

// 현재 선택된 필터 상태를 저장한다.
// all: 전체, active: 진행 중, completed: 완료
let currentFilter = "all";

// 현재 선택된 날짜를 저장한다.
// 처음에는 오늘 날짜로 시작한다.
let selectedDate = new Date();

// HTML 요소 가져오기
const todoInput = document.querySelector("#todoInput");
const addTodoButton = document.querySelector("#addTodoButton");
const todoList = document.querySelector("#todoList");
const messageText = document.querySelector("#messageText");
const filterTabs = document.querySelectorAll(".filter-tab");

const selectedDateText = document.querySelector("#selectedDateText");
const prevDateButton = document.querySelector("#prevDateButton");
const nextDateButton = document.querySelector("#nextDateButton");
const clearStorageButton = document.querySelector("#clearStorageButton");

// 추가 버튼을 클릭하면 Todo를 추가하거나 수정한다.
addTodoButton.addEventListener("click", handleTodoSubmit);

// 입력창에서 Enter 키를 눌러도 Todo를 추가하거나 수정한다.
todoInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    handleTodoSubmit();
  }
});

// 이전 날짜 버튼 클릭
prevDateButton.addEventListener("click", function () {
  moveSelectedDate(-1);
});

// 다음 날짜 버튼 클릭
nextDateButton.addEventListener("click", function () {
  moveSelectedDate(1);
});

// 전체 초기화 버튼 클릭
clearStorageButton.addEventListener("click", function () {
  clearSelectedDateTodoItems();
});

// 현재 선택된 날짜의 Todo만 모두 삭제하는 함수
function clearSelectedDateTodoItems() {
  const selectedDateKey = getDateKey(selectedDate);

  // 현재 날짜에 해당하는 Todo가 있는지 먼저 확인한다.
  const selectedDateTodoItems = todoItems.filter(function (todo) {
    return todo.date === selectedDateKey;
  });

  if (selectedDateTodoItems.length === 0) {
    showMessage("이 날짜에 삭제할 Todo가 없습니다.");
    return;
  }

  // 선택된 날짜가 아닌 Todo만 남긴다.
  // 즉, 현재 날짜의 Todo만 삭제된다.
  todoItems = todoItems.filter(function (todo) {
    return todo.date !== selectedDateKey;
  });

  // 수정 중인 상태가 있었다면 초기화한다.
  editingTodoId = null;
  todoInput.value = "";
  resetEditMode();

  // 전체 localStorage를 삭제하지 않고,
  // 현재 날짜 Todo가 제거된 배열을 다시 저장한다.
  saveTodoItemsToLocalStorage();

  showMessage("현재 날짜의 Todo를 모두 초기화했습니다.");

  // 화면을 다시 그린다.
  renderTodoList();
}

// 필터 탭을 클릭하면 현재 필터 상태를 변경한다.
filterTabs.forEach(function (filterTab) {
  filterTab.addEventListener("click", function () {
    currentFilter = filterTab.dataset.filter;

    updateFilterTabStyle();
    renderTodoList();
  });
});

// Todo 입력 처리 함수
function handleTodoSubmit() {
  const todoContent = todoInput.value.trim();

  // 입력값이 비어 있으면 Todo를 만들거나 수정하지 않는다.
  if (todoContent === "") {
    showMessage("할 일을 입력해주세요.");
    return;
  }

  // 수정 중인 Todo가 있으면 수정 처리
  if (editingTodoId !== null) {
    updateTodo(todoContent);
  } else {
    addTodo(todoContent);
  }

  // 입력창과 버튼 상태 초기화
  todoInput.value = "";
  resetEditMode();
  showMessage("");

  // 화면 다시 그리기
  renderTodoList();
}

// Todo 추가 함수
function addTodo(todoContent) {
  const newTodo = {
    id: nextTodoId,
    text: todoContent,
    completed: false,

    // Todo를 생성할 때 현재 선택된 날짜를 함께 저장한다.
    date: getDateKey(selectedDate)
  };

  todoItems.push(newTodo);
  nextTodoId++;

  // Todo가 추가될 때마다 localStorage에 저장한다.
  saveTodoItemsToLocalStorage();
}

// 수정 버튼을 눌렀을 때 실행되는 함수
function editTodo(todoId) {
  const selectedTodo = todoItems.find(function (todo) {
    return todo.id === todoId;
  });

  if (selectedTodo === undefined) {
    showMessage("수정할 Todo를 찾을 수 없습니다.");
    return;
  }

  // 수정할 Todo의 내용을 입력창에 넣는다.
  todoInput.value = selectedTodo.text;

  // 현재 수정 중인 Todo의 id를 저장한다.
  editingTodoId = todoId;

  // 버튼 문구와 스타일을 수정 모드로 바꾼다.
  addTodoButton.textContent = "수정 완료";
  addTodoButton.classList.add("editing");

  showMessage("내용을 수정한 뒤 '수정 완료' 버튼을 눌러주세요.");

  // 사용자가 바로 입력할 수 있도록 입력창에 커서를 둔다.
  todoInput.focus();

  renderTodoList();
}

// Todo 수정 완료 함수
function updateTodo(todoContent) {
  const selectedTodo = todoItems.find(function (todo) {
    return todo.id === editingTodoId;
  });

  if (selectedTodo === undefined) {
    showMessage("수정할 Todo를 찾을 수 없습니다.");
    return;
  }

  // Todo 내용만 수정한다.
  // Todo가 가진 날짜는 그대로 유지한다.
  selectedTodo.text = todoContent;

  // Todo가 수정될 때마다 localStorage에 저장한다.
  saveTodoItemsToLocalStorage();
}

// 수정 모드를 초기 상태로 되돌리는 함수
function resetEditMode() {
  editingTodoId = null;
  addTodoButton.textContent = "추가";
  addTodoButton.classList.remove("editing");
}

// Todo 완료 상태 변경 함수
function toggleTodoComplete(todoId) {
  const selectedTodo = todoItems.find(function (todo) {
    return todo.id === todoId;
  });

  if (selectedTodo === undefined) {
    showMessage("완료 처리할 Todo를 찾을 수 없습니다.");
    return;
  }

  // 완료 상태를 true면 false로, false면 true로 바꾼다.
  selectedTodo.completed = !selectedTodo.completed;

  // Todo 완료 상태가 바뀔 때마다 localStorage에 저장한다.
  saveTodoItemsToLocalStorage();

  showMessage("");
  renderTodoList();
}

// Todo 삭제 함수
function deleteTodo(todoId) {
  todoItems = todoItems.filter(function (todo) {
    return todo.id !== todoId;
  });

  // 수정 중인 Todo를 삭제한 경우 수정 모드도 해제한다.
  if (editingTodoId === todoId) {
    todoInput.value = "";
    resetEditMode();
  }

  // Todo가 삭제될 때마다 localStorage에 저장한다.
  saveTodoItemsToLocalStorage();

  showMessage("");
  renderTodoList();
}

// 날짜를 이전 또는 다음으로 이동하는 함수
function moveSelectedDate(dayAmount) {
  const movedDate = new Date(selectedDate);

  // dayAmount가 -1이면 이전 날짜, 1이면 다음 날짜로 이동한다.
  movedDate.setDate(movedDate.getDate() + dayAmount);

  selectedDate = movedDate;

  // 날짜를 이동하면 수정 중이던 상태를 초기화한다.
  todoInput.value = "";
  resetEditMode();
  showMessage("");

  updateSelectedDateText();
  renderTodoList();
}

// Date 객체를 YYYY-MM-DD 형태의 문자열로 바꾸는 함수
// 이 값은 Todo를 날짜별로 구분할 때 사용한다.
function getDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// 화면에 보여줄 날짜 문장을 만드는 함수
function getDateDisplayText(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  const dayName = dayNames[date.getDay()];

  return `${year}년 ${month}월 ${day}일 (${dayName})`;
}

// 선택된 날짜를 화면에 표시하는 함수
function updateSelectedDateText() {
  const today = new Date();
  // 어제 날짜 만들기
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // 내일 날짜 만들기
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const todayKey = getDateKey(today);
  const yesterdayKey = getDateKey(yesterday);
  const tomorrowKey = getDateKey(tomorrow);
  const selectedDateKey = getDateKey(selectedDate);

  if (selectedDateKey === todayKey) {
    selectedDateText.textContent = `오늘, ${getDateDisplayText(selectedDate)}`;
  } else if (selectedDateKey === yesterdayKey) {
    selectedDateText.textContent = `어제, ${getDateDisplayText(selectedDate)}`;
  } else if (selectedDateKey === tomorrowKey) {
    selectedDateText.textContent = `내일, ${getDateDisplayText(selectedDate)}`;
  } else {
    selectedDateText.textContent = getDateDisplayText(selectedDate);
  }
}

// 현재 선택된 날짜와 필터 상태에 맞는 Todo 목록만 반환하는 함수
function getFilteredTodoItems() {
  const selectedDateKey = getDateKey(selectedDate);

  // 먼저 선택된 날짜에 해당하는 Todo만 고른다.
  const dateTodoItems = todoItems.filter(function (todo) {
    return todo.date === selectedDateKey;
  });

  // 그 다음 상태 필터를 적용한다.
  if (currentFilter === "active") {
    return dateTodoItems.filter(function (todo) {
      return todo.completed === false;
    });
  }

  if (currentFilter === "completed") {
    return dateTodoItems.filter(function (todo) {
      return todo.completed === true;
    });
  }

  return dateTodoItems;
}

// 현재 선택된 필터 탭에 active 스타일을 적용하는 함수
function updateFilterTabStyle() {
  filterTabs.forEach(function (filterTab) {
    if (filterTab.dataset.filter === currentFilter) {
      filterTab.classList.add("active");
    } else {
      filterTab.classList.remove("active");
    }
  });
}

// Todo 목록을 화면에 표시하는 함수
function renderTodoList() {
  // 기존 목록을 비운 뒤 다시 그린다.
  todoList.innerHTML = "";

  // 현재 날짜와 필터에 맞는 Todo만 가져온다.
  const filteredTodoItems = getFilteredTodoItems();

  // 필터 결과에 Todo가 하나도 없을 때 안내 문구 표시
  if (filteredTodoItems.length === 0) {
    const emptyText = document.createElement("li");
    emptyText.className = "empty-text";

    if (currentFilter === "active") {
      emptyText.textContent = "이 날짜에 진행 중인 할 일이 없습니다.";
    } else if (currentFilter === "completed") {
      emptyText.textContent = "이 날짜에 완료된 할 일이 없습니다.";
    } else {
      emptyText.textContent = "이 날짜에 등록된 할 일이 없습니다.";
    }

    todoList.appendChild(emptyText);
    return;
  }

  // 필터링된 Todo 배열을 하나씩 화면에 추가
  filteredTodoItems.forEach(function (todo) {
    const todoItem = document.createElement("li");
    todoItem.className = "todo-item";

    const todoText = document.createElement("span");
    todoText.className = "todo-text";
    todoText.textContent = todo.text;

    // 완료된 Todo면 취소선 스타일 적용
    if (todo.completed === true) {
      todoText.classList.add("completed");
    }

    // 현재 수정 중인 Todo를 시각적으로 표시
    if (todo.id === editingTodoId) {
      todoText.classList.add("editing");
    }

    const buttonGroup = document.createElement("div");
    buttonGroup.className = "todo-button-group";

    const editButton = document.createElement("button");
    editButton.className = "todo-button edit-button";
    editButton.textContent = "수정";
    editButton.addEventListener("click", function () {
      editTodo(todo.id);
    });

    const completeButton = document.createElement("button");
    completeButton.className = "todo-button complete-button";

    // 완료된 Todo는 버튼 문구를 다시 진행으로 바꾼다.
    if (todo.completed === true) {
      completeButton.textContent = "진행";
    } else {
      completeButton.textContent = "완료";
    }

    completeButton.addEventListener("click", function () {
      toggleTodoComplete(todo.id);
    });

    const deleteButton = document.createElement("button");
    deleteButton.className = "todo-button delete-button";
    deleteButton.textContent = "삭제";
    deleteButton.addEventListener("click", function () {
      deleteTodo(todo.id);
    });

    buttonGroup.appendChild(editButton);
    buttonGroup.appendChild(completeButton);
    buttonGroup.appendChild(deleteButton);

    todoItem.appendChild(todoText);
    todoItem.appendChild(buttonGroup);

    todoList.appendChild(todoItem);
  });
}

// Todo 배열을 localStorage에 저장하는 함수
function saveTodoItemsToLocalStorage() {
  // 배열이나 객체는 localStorage에 그대로 저장할 수 없어서 문자열로 바꿔야 한다.
  const todoItemsString = JSON.stringify(todoItems);

  localStorage.setItem(TODO_STORAGE_KEY, todoItemsString);
}

// localStorage에서 Todo 배열을 불러오는 함수
function loadTodoItemsFromLocalStorage() {
  const savedTodoItemsString = localStorage.getItem(TODO_STORAGE_KEY);

  // 저장된 데이터가 없으면 빈 배열 상태로 시작한다.
  if (savedTodoItemsString === null) {
    todoItems = [];
    return;
  }

  try {
    // localStorage에 저장된 문자열을 다시 배열로 바꾼다.
    const savedTodoItems = JSON.parse(savedTodoItemsString);

    // 불러온 값이 배열일 때만 todoItems에 넣는다.
    if (Array.isArray(savedTodoItems)) {
      todoItems = savedTodoItems;
      updateNextTodoId();
    } else {
      todoItems = [];
    }
  } catch (error) {
    // 저장된 데이터 형식이 잘못된 경우 앱이 멈추지 않도록 빈 배열로 시작한다.
    todoItems = [];
    showMessage("저장된 데이터를 불러오지 못했습니다.");
  }
}

// localStorage에서 불러온 Todo들을 기준으로 다음 id 값을 정하는 함수
function updateNextTodoId() {
  // Todo가 하나도 없으면 id를 1부터 시작한다.
  if (todoItems.length === 0) {
    nextTodoId = 1;
    return;
  }

  // 현재 저장된 Todo id 중 가장 큰 값을 찾는다.
  const maxTodoId = Math.max(...todoItems.map(function (todo) {
    return todo.id;
  }));

  // 다음 Todo는 가장 큰 id보다 1 큰 값을 사용한다.
  nextTodoId = maxTodoId + 1;
}

// 안내 메시지를 표시하는 함수
function showMessage(message) {
  messageText.textContent = message;
}

// 처음 화면을 그린다.
loadTodoItemsFromLocalStorage();
updateSelectedDateText();
updateFilterTabStyle();
renderTodoList();