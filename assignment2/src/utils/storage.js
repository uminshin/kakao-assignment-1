export function loadTodosFromStorage(storageKey) {
  const savedTodos = localStorage.getItem(storageKey);

  if (savedTodos === null) {
    return [];
  }

  try {
    const parsedTodos = JSON.parse(savedTodos);
    return Array.isArray(parsedTodos) ? parsedTodos : [];
  } catch {
    return [];
  }
}

export function saveTodosToStorage(storageKey, todos) {
  localStorage.setItem(storageKey, JSON.stringify(todos));
}
