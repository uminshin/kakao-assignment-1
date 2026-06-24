# 과제3 계획: Next.js로 Todo 앱 만들기

## 1. 과제 목표

과제3은 과제2에서 React(Vite)로 만들었던 Todo 앱을 Next.js App Router 구조와 FastAPI 백엔드 구조로 다시 만들어보는 과제다.

이번 과제에서 이해해야 할 핵심은 다음과 같다.

- React(Vite) 기반 Todo 앱을 Next.js App Router 구조로 옮긴다.
- `app/`, `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`의 역할을 이해한다.
- Server Component와 Client Component를 역할에 맞게 구분한다.
- FastAPI로 Todo CRUD API를 직접 구현한다.
- Next.js의 `route.ts`를 통해 프론트엔드와 FastAPI 백엔드를 연결한다.
- 과제2의 localStorage 기반 데이터 흐름을 서버 API 기반 데이터 흐름으로 바꾼다.
- API URL, DB 설정 같은 값은 환경변수로 분리한다.
- AI는 구현을 대신하는 도구가 아니라 설계, 디버깅, 검토를 돕는 도구로 사용한다.

## 2. 사용 기술

### 프론트엔드

- Next.js v15+
- React v18+
- TypeScript v5
- Tailwind CSS v4
- Axios

### 백엔드

- FastAPI v0.111+
- Uvicorn
- SQLAlchemy
- SQLite
- Pydantic v2

## 3. 제출 일정

- 마감: 6/24(수) 23:59

## 4. 프로젝트 구조 계획

과제3은 프론트엔드와 백엔드를 분리해서 구성한다.

```text
assignment3/
  frontend/
    app/
      api/
        todos/
          route.ts
      todos/
        page.tsx
        new/
          page.tsx
        [todoId]/
          page.tsx
        loading.tsx
        error.tsx
      actions.ts
      layout.tsx
      page.tsx
    .env.local
    package.json
  backend/
    main.py
    requirements.txt
    todos.db
    .env.local
```

현재 저장소 안에 `assignment3/` 폴더를 만들고, 그 안에서 `frontend/`와 `backend/`를 명확히 분리한다.

## 5. 과제2와 달라지는 점

| 구분 | 과제2 | 과제3 |
| --- | --- | --- |
| 프론트엔드 | React + Vite | Next.js App Router |
| 언어 | JavaScript | TypeScript |
| 데이터 저장 | localStorage | FastAPI + SQLite |
| 데이터 흐름 | 브라우저 내부 state 중심 | 프론트엔드 -> Next route.ts -> FastAPI -> DB |
| 라우팅 | 한 화면에서 상태로 처리 | 파일 기반 라우팅 |
| 검증 | 수동 테스트 중심 | API 문서, 브라우저, 네트워크 흐름까지 확인 |

## 6. 기능 분리 기준

### 프론트엔드가 담당할 것

- Todo 목록 화면 표시
- Todo 생성 페이지 표시
- Todo 수정 페이지 표시
- 사용자 입력 처리
- 버튼 클릭, 폼 제출 같은 인터랙션 처리
- 로딩 화면과 에러 화면 처리
- Next.js route handler 또는 server action 호출

### 백엔드가 담당할 것

- Todo 데이터 모델 정의
- SQLite DB 연결과 테이블 생성
- Todo 목록 조회
- Todo 생성
- Todo 수정
- Todo 삭제
- API 요청/응답 스키마 검증

### Next.js `route.ts`가 담당할 것

- 프론트엔드에서 들어온 요청을 받는다.
- FastAPI API로 요청을 전달한다.
- FastAPI 응답을 프론트엔드에 돌려준다.
- 클라이언트가 백엔드 주소를 직접 알지 않도록 중간 프록시 역할을 한다.

### `actions.ts`가 담당할 것

- 페이지 또는 컴포넌트에서 직접 호출할 서버 함수를 작성한다.
- 목록 조회처럼 서버에서 바로 처리해도 되는 흐름에 사용할 수 있다.
- `route.ts`와 역할이 다르므로, 어떤 기능을 어디에 둘지 먼저 정리하고 사용한다.

## 7. 구현 순서

### 0단계. 전체 구조 잡기

상태: 완료

작업:

- `assignment3/` 프로젝트 루트 생성
- `frontend/`, `backend/` 디렉터리 분리
- 과제2 기능 중 어떤 부분이 프론트에 남고, 어떤 부분이 백엔드로 이동하는지 정리

확인:

- `frontend/`와 `backend/`가 명확히 분리되어 있는가?
- Next.js의 `app/` 구조를 사용할 준비가 되었는가?
- 과제2 localStorage 흐름을 서버 API 흐름으로 바꿀 계획이 정리되었는가?

### 1단계. 프론트엔드 프로젝트 세팅

상태: 완료

작업:

- `frontend/`에 Next.js 프로젝트 생성
- TypeScript, ESLint, Tailwind CSS, App Router 사용
- `src/` directory는 사용하지 않음
- Turbopack은 사용하지 않음
- import alias는 사용하지 않음
- `npm install`
- `npm run dev` 실행 후 `localhost:3000` 확인

프로젝트 생성 옵션:

```text
TypeScript -> Yes
ESLint -> Yes
Tailwind CSS -> Yes
src/ directory -> No
App Router -> Yes
Turbopack -> No
import alias -> No
```

확인:

- `app/` 디렉터리가 보이는가?
- `pages/` 디렉터리가 없는가?
- `localhost:3000`에서 Next.js 기본 화면이 보이는가?

### 2단계. 백엔드 프로젝트 세팅

상태: 완료

작업:

- `backend/` 디렉터리 생성
- `requirements.txt` 작성
- Python 가상환경 생성 및 활성화
- FastAPI, Uvicorn, SQLAlchemy, Pydantic 설치
- `main.py`에 기본 FastAPI 앱 작성
- `uvicorn main:app --reload` 실행
- `localhost:8000`, `localhost:8000/docs` 확인

`requirements.txt` 기본 내용:

```text
fastapi>=0.111.0
uvicorn[standard]>=0.29.0
sqlalchemy>=2.0.0
pydantic>=2.0.0
```

확인:

- 가상환경이 활성화되어 있는가?
- `localhost:8000`에서 JSON 응답이 보이는가?
- `localhost:8000/docs`에서 FastAPI 문서가 보이는가?

### 3단계. FastAPI Todo CRUD API 구현

상태: 완료

작업:

- Todo DB 모델 정의
- Pydantic 요청/응답 스키마 정의
- SQLite DB 연결
- 앱 실행 시 테이블 생성
- CRUD API 구현

구현할 API:

| Method | URL | 설명 |
| --- | --- | --- |
| GET | `/todos` | 전체 Todo 목록 조회 |
| POST | `/todos` | 새 Todo 생성 |
| PUT | `/todos/{id}` | Todo 수정 |
| DELETE | `/todos/{id}` | Todo 삭제 |

데이터 모델 초안:

```text
id: number
text: string
completed: boolean
created_at: datetime
updated_at: datetime
```

과제2의 날짜별 Todo 기능까지 유지할 경우 추가 후보:

```text
date: string
```

확인:

- `localhost:8000/docs`에서 각 엔드포인트가 보이는가?
- Todo 생성 후 목록 조회에 포함되는가?
- 수정, 삭제 요청 후 목록이 의도대로 바뀌는가?
- `backend/todos.db` 파일이 생성되는가?

### 4단계. Next.js Todo 페이지 구현

상태: 완료


작업:

- `app/todos/page.tsx`에 Todo 목록 페이지 구현
- `app/todos/new/page.tsx`에 Todo 생성 페이지 구현
- `app/todos/[todoId]/page.tsx`에 Todo 수정 페이지 구현
- `app/todos/loading.tsx`에 로딩 화면 구현
- `app/todos/error.tsx`에 에러 화면 구현
- 각 페이지에서 Server Component와 Client Component를 구분

구분 기준:

- 데이터를 단순히 불러와 보여주는 페이지는 Server Component 우선
- 클릭, 입력, 폼 상태, 이벤트 처리가 필요한 UI는 Client Component 사용
- `useState`, `useEffect`, `onClick`, `onChange`가 필요하면 `"use client"`가 필요하다

확인:

- `localhost:3000/todos`에서 목록 페이지가 보이는가?
- `localhost:3000/todos/new`에서 생성 페이지가 보이는가?
- `localhost:3000/todos/[todoId]`에서 수정 페이지가 보이는가?
- `"use client"`가 필요한 컴포넌트와 필요하지 않은 컴포넌트를 구분했는가?
- `loading.tsx`, `error.tsx`가 의도대로 동작하는가?

### 5단계. API Route 작성 및 프론트-백엔드 연동

상태: 완료


작업:

- `app/api/todos/route.ts` 작성
- 필요하다면 `app/api/todos/[todoId]/route.ts` 작성
- `route.ts`에서 FastAPI로 요청 전달
- `actions.ts`에 서버 함수 작성
- 목록 조회, 생성, 수정, 삭제 전체 흐름 연결

요청 흐름:

```text
브라우저
  -> Next.js page/component
  -> Next.js route.ts 또는 actions.ts
  -> FastAPI
  -> SQLite DB
```

`route.ts`와 `actions.ts` 역할 비교:

| 구분 | route.ts | actions.ts |
| --- | --- | --- |
| 역할 | HTTP 요청을 받아 FastAPI로 전달하는 프록시 | 페이지/컴포넌트에서 호출하는 서버 함수 |
| 호출 방식 | `fetch('/api/todos')` | `import { createTodo } from './actions'` |
| 사용 위치 | 외부 HTTP 요청 처리 | Server/Client Component에서 직접 호출 |

확인:

- Todo를 생성하면 FastAPI DB에 실제로 저장되는가?
- 목록 페이지에서 생성한 Todo가 바로 표시되는가?
- 수정, 삭제 후 목록이 올바르게 업데이트되는가?
- 브라우저 네트워크 탭에서 요청 순서를 확인했는가?
- 데이터 흐름이 과제2의 localStorage 단방향 흐름에서 클라이언트-서버 왕복 흐름으로 바뀐 것을 설명할 수 있는가?

### 6단계. 환경변수 설정

상태: 완료


작업:

- 프론트엔드 `.env.local`에 백엔드 API URL 분리
- 백엔드 `.env.local`에 DB 설정 등 민감한 값 분리
- `.env.local`이 `.gitignore`에 포함되어 있는지 확인
- 코드에 `http://localhost:8000` 같은 값이 하드코딩되어 있지 않은지 확인

프론트엔드 환경변수 예시:

```text
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

백엔드 환경변수 예시:

```text
DATABASE_URL=sqlite:///./todos.db
```

확인:

- 환경변수로 바꾼 뒤에도 기능이 동일하게 동작하는가?
- `NEXT_PUBLIC_` 접두사가 필요한 변수와 필요하지 않은 변수를 구분할 수 있는가?
- `.env.local`이 커밋 대상에서 제외되는가?

### 7단계. 문서와 이슈 기록

상태: README 및 검증 문서 작성 완료, 이슈 기록 필요


작업:

- README에 실행 방법 작성
- 프론트엔드와 백엔드 실행 명령어 분리 작성
- API 목록 작성
- AI 사용 방식 작성
- 과제2와 과제3의 차이 정리
- 이슈 템플릿에 맞춰 기능 단위 진행 기록 남기기

확인:

- 문서만 보고 프로젝트를 실행할 수 있는가?
- 어떤 기능을 어떤 순서로 구현했는지 기록되어 있는가?
- AI가 어떤 부분에서 도움을 줬는지 투명하게 기록되어 있는가?

### 8단계. 최종 검증

프론트엔드 확인:

- `npm run lint`
- `npm run build`
- `localhost:3000/todos` 접속
- 생성, 목록 조회, 수정, 삭제 확인
- 로딩/에러 화면 확인

백엔드 확인:

- FastAPI 서버 실행
- `localhost:8000/docs` 접속
- GET, POST, PUT, DELETE 직접 실행
- `todos.db` 생성 확인

브라우저 확인:

- 크롬 콘솔 에러가 없는가?
- 주요 기능을 직접 클릭하며 E2E 흐름을 확인했는가?
- 네트워크 탭에서 요청 흐름을 확인했는가?

프로젝트 구조 확인:

- 불필요한 파일이 포함되어 있지 않은가?
- `node_modules/`, `.next/`, `.venv/`, `.env.local`, `todos.db`가 커밋되지 않도록 관리되는가?
- README와 실제 코드가 일치하는가?

## 8. AI 사용 계획

AI를 사용할 수 있는 부분:

- 디렉터리 구조 검토
- Next.js App Router 개념 설명
- Server Component와 Client Component 구분 확인
- FastAPI 에러 메시지 분석
- API 요청/응답 흐름 점검
- README와 체크리스트 문서 정리

AI를 사용할 때 지킬 것:

- 에러 메시지, 파일명, 현재 상황을 함께 전달한다.
- AI가 제안한 코드는 바로 붙여넣지 않고 이유를 이해한 뒤 적용한다.
- 구현이 막히면 전체 코드를 대신 작성해달라고 하기보다, 막힌 부분을 구체적으로 설명하고 힌트를 요청한다.
- 최종 제출 전 내가 코드 흐름을 설명할 수 있는지 확인한다.

AI 디버깅 요청 템플릿:

```text
아래 에러가 발생했어. 현재 코드를 보고 원인과 해결 방법을 알려줘.

[에러 메시지]
에러 메시지 붙여넣기

[에러 발생 파일]
파일명과 관련 코드 붙여넣기

[현재 상황]
어떤 동작을 했을 때 에러가 발생하는지 설명하기
```

AI 구현 도움 요청 템플릿:

```text
Next.js App Router에서 [구현하려는 기능]을 만들려고 해.
현재까지 작성한 코드는 아래와 같아.

[코드 붙여넣기]

[막히는 부분]
전체 코드를 작성해주기보다, 어떤 방향으로 접근하면 좋을지 힌트를 줘.
```

## 9. 제출 전 체크리스트

### 기능 구현

- [ ] 필수 기능이 모두 구현되어 있다.
- [ ] Todo 목록 조회가 동작한다.
- [ ] Todo 생성이 동작한다.
- [ ] Todo 수정이 동작한다.
- [ ] Todo 삭제가 동작한다.
- [ ] 예외 상황에서도 오류 없이 동작한다. 예: 빈 입력값 제출, 데이터 없는 상태
- [ ] 새로고침 후에도 DB 기준으로 데이터가 유지된다.

### 코드 품질

- [ ] 불필요한 `console.log`가 제거되어 있다.
- [ ] 사용하지 않는 코드와 주석이 제거되어 있다.
- [ ] 변수명과 함수명이 역할을 명확히 나타낸다.
- [ ] 중복 코드는 함수나 컴포넌트로 분리되어 있다.
- [ ] 들여쓰기와 코드 포맷이 일관되어 있다.

### UI/UX

- [ ] 모든 기능이 UI에서 명확하게 인지 가능하다.
- [ ] 빈 상태에 대한 화면 처리가 되어 있다.
- [ ] 로딩 상태가 표시된다.
- [ ] 에러 상태가 표시된다.

### 브라우저 검증

- [ ] 크롬 콘솔에 에러가 없다.
- [ ] 주요 기능을 직접 클릭하며 E2E 흐름을 확인했다.
- [ ] 네트워크 탭에서 API 요청 순서를 확인했다.

### 프로젝트 구조

- [ ] 프론트엔드와 백엔드 폴더가 분리되어 있다.
- [ ] 불필요한 파일이 포함되어 있지 않다.
- [ ] `.env.local`이 커밋되지 않는다.
- [ ] `node_modules/`, `.next/`, `.venv/`, `todos.db`가 커밋되지 않는다.
- [ ] README가 최종 코드와 일치한다.


