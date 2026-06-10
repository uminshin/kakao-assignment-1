# React Todo 마이그레이션 기획 문서

## 1. 과제 목표

Vanilla JavaScript로 구현한 Todo 앱을 React Function Component 구조로 마이그레이션한다.

이번 과제에서 중점적으로 확인할 내용은 다음과 같다.

- DOM을 직접 조작하던 방식을 React의 state 기반 렌더링 방식으로 바꾸기
- UI를 컴포넌트 단위로 분리하고 props로 필요한 값과 이벤트 함수를 전달하기
- Todo 데이터, 필터 상태, 선택 날짜, 수정 상태를 각각 어떤 state로 관리할지 정리하기
- Todo 변경 사항을 localStorage에 저장하고 새로고침 후 복원하기
- Vanilla JS와 React에서 데이터 수정 방식이 어떻게 다른지 비교하며 이해하기

## 2. 1차 과제 기능 분석

1차 과제의 주요 기능은 다음과 같다.

- Todo 추가
- Todo 목록 출력
- Todo 수정
- Todo 완료 / 진행 상태 변경
- Todo 삭제
- 전체 / 진행 중 / 완료 필터
- 이전 / 다음 날짜 이동
- 선택한 날짜에 해당하는 Todo만 표시
- 선택 날짜 Todo 전체 삭제
- localStorage 저장 및 복원

기존 Vanilla JS에서는 `querySelector`, `addEventListener`, `innerHTML`, `createElement`를 사용해 DOM을 직접 변경했다.

React에서는 DOM을 직접 수정하지 않고, state가 바뀌면 JSX가 다시 렌더링되는 구조로 바꾼다.

## 3. React 상태 설계

`App.jsx`에서 관리할 핵심 state는 다음과 같이 계획한다.

```js
const [todos, setTodos] = useState([]);
const [selectedDate, setSelectedDate] = useState(new Date());
const [filter, setFilter] = useState("all");
const [editingTodoId, setEditingTodoId] = useState(null);
const [message, setMessage] = useState("");
```

각 state의 역할은 다음과 같다.

- `todos`: 전체 Todo 데이터
- `selectedDate`: 현재 화면에서 보고 있는 날짜
- `filter`: 전체 / 진행 중 / 완료 필터 상태
- `editingTodoId`: 현재 수정 중인 Todo의 id
- `message`: 빈 입력, 데이터 오류 등 사용자 안내 메시지

## 4. 컴포넌트 구조 설계

파일 구조는 과제 가이드에 맞춰 `src/components/`를 기준으로 직접 생성한다.

```text
src/
  App.jsx
  main.jsx
  index.css
  components/
    DateNavigator.jsx
    TodoForm.jsx
    FilterTabs.jsx
    TodoList.jsx
    TodoItem.jsx
  utils/
    date.js
    storage.js
```

각 컴포넌트의 역할은 다음과 같다.

- `DateNavigator`: 선택 날짜 표시, 이전 / 다음 날짜 이동 버튼, 오늘로 이동 버튼
- `TodoForm`: Todo 추가 입력 처리
- `FilterTabs`: 전체 / 진행 중 / 완료 필터 변경
- `TodoList`: 필터링된 Todo 목록 표시, 빈 상태 메시지 처리
- `TodoItem`: 개별 Todo의 텍스트, 완료 토글, 인라인 수정, 삭제 버튼

선택 날짜의 Todo 개수와 초기화 버튼은 `App.jsx`에서 선택 날짜 Todo 목록을 계산한 뒤 필터 탭 아래에 표시한다.

## 5. props 전달 계획

`App.jsx`는 전체 상태와 데이터 변경 함수를 가지고, 하위 컴포넌트에는 필요한 값과 함수만 전달한다.

예시:

```jsx
<TodoForm
  editingTodo={editingTodo}
  onSubmitTodo={handleSubmitTodo}
  onCancelEdit={handleCancelEdit}
/>

<TodoList
  todos={filteredTodos}
  editingTodoId={editingTodoId}
  onEditTodo={handleEditTodo}
  onToggleTodo={handleToggleTodo}
  onDeleteTodo={handleDeleteTodo}
/>
```

이 구조를 통해 하위 컴포넌트는 직접 전체 state를 수정하지 않고, 부모에게 받은 이벤트 함수만 호출한다.

## 6. localStorage 설계

Todo 데이터는 Web Storage API를 사용해 저장한다.

- 앱 첫 실행 시 localStorage에서 Todo 목록을 읽어 `todos` 초기값으로 사용한다.
- `todos`가 변경될 때마다 `useEffect`로 localStorage에 저장한다.
- 저장된 데이터가 깨져 있거나 배열이 아니면 빈 배열로 시작한다.

## 7. 단계별 진행 계획

1. Vite + React 프로젝트 생성
2. Tailwind CSS v4 설치 및 연결
3. `src/components/`와 `src/utils/` 구조 생성
4. 정적 UI를 컴포넌트로 분리
5. Todo CRUD state 로직 구현
6. 필터링 기능 구현
7. 날짜별 Todo 관리 구현
8. localStorage 저장 / 복원 구현
9. 브라우저에서 주요 흐름 직접 검증
10. 진행 내용과 배운 점을 GitHub Issue에 기록

## 8. 초기 준비 완료 기준

본격적인 기능 구현 전 아래 항목까지 먼저 완료한다.

- Vite React 프로젝트 구조 생성
- Tailwind CSS v4 설치 및 CSS 빌드 연결
- `src/components/` 폴더 생성
- 1차 과제 기능과 React 마이그레이션 구조 문서화
- `npm run build`가 통과하는 초기 상태 만들기
