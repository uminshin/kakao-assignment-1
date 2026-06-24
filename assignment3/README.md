# Assignment 3 - Next.js Todo App

과제3은 과제2에서 React(Vite)로 만들었던 Todo 앱을 Next.js App Router와 FastAPI 백엔드 구조로 다시 구현하는 과제입니다.

## 목표

- Next.js App Router의 파일 기반 라우팅 이해
- Server Component와 Client Component 역할 구분
- FastAPI로 Todo CRUD API 구현
- localStorage 기반 데이터 흐름을 서버 API + SQLite 기반 흐름으로 전환
- 환경변수로 API URL과 DB 설정 분리
- AI 사용 과정을 숨기지 않고 기록

## 프로젝트 구조

```text
assignment3/
  frontend/
    app/
      api/todos/route.ts
      api/todos/[todoId]/route.ts
      todos/page.tsx
      todos/new/page.tsx
      todos/[todoId]/page.tsx
      todos/loading.tsx
      todos/error.tsx
      actions.ts
      layout.tsx
      page.tsx
    components/
    lib/
    types/
  backend/
    main.py
    requirements.txt
  docs/
    TEST_CHECKLIST.md
```

## 실행 방법

### 1. 백엔드 실행

```bash
cd assignment3/backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.local.example .env.local
uvicorn main:app --reload
```

확인 주소:

```text
http://localhost:8000
http://localhost:8000/docs
```

### 2. 프론트엔드 실행

```bash
cd assignment3/frontend
npm install
copy .env.local.example .env.local
npm run dev
```

확인 주소:

```text
http://localhost:3000
http://localhost:3000/todos
```

## API 목록

FastAPI 백엔드는 아래 API를 제공합니다.

| Method | URL | 설명 |
| --- | --- | --- |
| GET | `/todos` | 전체 Todo 목록 조회 |
| POST | `/todos` | 새 Todo 생성 |
| PUT | `/todos/{id}` | Todo 수정 및 완료 상태 변경 |
| DELETE | `/todos/{id}` | Todo 삭제 |

## 데이터 흐름

과제2에서는 브라우저의 localStorage에 Todo를 저장했습니다.

과제3에서는 데이터 흐름이 아래처럼 바뀝니다.

```text
브라우저
  -> Next.js page/component
  -> Server Action 또는 API Route
  -> FastAPI
  -> SQLite DB
```

이 구조에서는 데이터가 브라우저가 아니라 서버 DB에 저장됩니다. 그래서 새로고침 후에도 FastAPI와 SQLite 기준으로 데이터가 유지됩니다.

## 파일 역할

### `frontend/lib/todoApi.ts`

FastAPI 서버에 실제 요청을 보내는 함수들을 모아둔 파일입니다.

- `getTodos`
- `getTodo`
- `createTodo`
- `updateTodo`
- `deleteTodo`

### `frontend/app/actions.ts`

페이지와 폼에서 호출하는 Server Action 파일입니다.

생성/수정 폼처럼 서버에서 처리하고 페이지를 다시 갱신해야 하는 동작을 담당합니다.

### `frontend/app/api/todos/route.ts`

Next.js API Route입니다.

브라우저에서 `/api/todos`로 들어온 요청을 FastAPI로 전달하는 프록시 역할을 합니다.

### `frontend/components/`

화면 UI를 작은 단위로 나눈 폴더입니다.

- `TodoList`: 목록 렌더링
- `TodoItem`: Todo 한 개 렌더링
- `TodoForm`: 생성/수정 폼
- `TodoToggleButton`: 목록에서 완료 상태 변경
- `TodoDeleteButton`: 삭제 전 확인 후 삭제
- `EmptyState`: 데이터가 없을 때 표시
- `PageHeader`: 페이지 제목 영역

## Server Component와 Client Component 구분

- `page.tsx`는 서버에서 데이터를 불러와 화면을 구성하므로 Server Component로 둡니다.
- 클릭, 확인창, `router.refresh()`처럼 브라우저 동작이 필요한 버튼은 Client Component로 분리했습니다.
- 예: `TodoToggleButton`, `TodoDeleteButton`, `error.tsx`

## 환경변수

프론트엔드:

```text
API_BASE_URL=http://localhost:8000
```

백엔드:

```text
DATABASE_URL=sqlite:///./todos.db
```

실제 `.env.local`은 GitHub에 올리지 않고, `.env.local.example`만 공유합니다.

## 과제2와 달라진 점

| 과제2 | 과제3 |
| --- | --- |
| React + Vite | Next.js App Router |
| JavaScript | TypeScript |
| localStorage 저장 | FastAPI + SQLite 저장 |
| 한 화면 중심 상태 관리 | 파일 기반 라우팅 |
| 브라우저 내부 데이터 흐름 | 클라이언트-서버-DB 데이터 흐름 |

## AI 사용 기록

AI는 아래 작업에 도움을 주었습니다.

- 과제 요구사항을 구현 순서로 정리
- `AGENTS.md`와 계획 문서 작성 보조
- Next.js / FastAPI 파일 역할 분리 방향 검토
- 환경변수, route.ts, actions.ts 역할 설명 정리
- 검증 체크리스트 작성 보조

AI가 만든 코드는 그대로 제출하지 않고, 각 파일의 역할과 데이터 흐름을 이해한 뒤 수정하며 반영했습니다.

## 제출 전 확인

자세한 검증 목록은 `docs/TEST_CHECKLIST.md`에 정리했습니다.
