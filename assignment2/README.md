# React Todo App

Vanilla JavaScript로 만든 Todo 앱을 React Function Component 구조로 마이그레이션하는 과제입니다.

## 구현 기능

- Todo 추가, 조회, 수정, 완료 처리, 삭제
- 빈 입력값 제출 방지와 안내 메시지 표시
- 전체 / 진행 중 / 완료 상태별 필터링
- 선택 날짜 기준 Todo 일간 뷰
- 이전 날짜 / 다음 날짜 이동
- 오늘이 아닌 날짜에서 오늘 날짜로 돌아가기
- 선택한 날짜의 Todo 개수 표시
- 선택한 날짜의 Todo 초기화
- localStorage 저장과 새로고침 후 데이터 유지

## React 마이그레이션 방향

- `todos`, `filter`, `selectedDate`, `editingTodoId`, `message`를 React state로 관리했습니다.
- Todo 입력, 필터, 날짜 이동, 목록, 개별 Todo 항목을 컴포넌트 단위로 분리했습니다.
- Vanilla JS에서 DOM을 직접 숨기고 다시 그리던 흐름을 state 변경에 따른 React 렌더링 흐름으로 바꿨습니다.
- Todo 변경 사항은 `useEffect`를 사용해 localStorage에 자동 저장되도록 구성했습니다.

자세한 설계와 진행 기록은 아래 문서를 확인합니다.

- [`docs/REACT_MIGRATION_PLAN.md`](docs/REACT_MIGRATION_PLAN.md)
- [`ISSUE_PROGRESS.md`](ISSUE_PROGRESS.md)

## 프로젝트 구조

```text
assignment2/
  docs/
    REACT_MIGRATION_PLAN.md
  src/
    components/
      DateNavigator.jsx
      FilterTabs.jsx
      TodoForm.jsx
      TodoItem.jsx
      TodoList.jsx
    utils/
      date.js
      storage.js
    App.jsx
    index.css
    main.jsx
  index.html
  package.json
  postcss.config.js
  README.md
```

## 실행 방법

```bash
npm install
npm run dev
```

## 사용 기술

- React
- Vite
- Tailwind CSS v4
- JavaScript
- Web Storage API(localStorage)

## 검증

```bash
npm run lint
npm run build
```

두 명령 모두 통과하는 것을 확인했습니다.
