# [Assignment 3] Next.js Todo 앱 구현 회고

## 과제3 회고

이번 과제에서는 과제2에서 React(Vite)로 만들었던 Todo 앱을 Next.js App Router와 FastAPI 백엔드 구조로 다시 구현했습니다.

과제2에서는 브라우저의 localStorage와 React state만으로 데이터를 관리했는데, 이번에는 FastAPI 서버와 SQLite DB를 두고 프론트엔드가 API를 통해 데이터를 주고받는 구조로 바꿨습니다. 처음에는 단순히 기존 Todo 앱을 Next.js로 옮기면 된다고 생각했지만, 진행하면서 데이터가 어디에서 만들어지고, 어디에 저장되고, 어떤 흐름으로 다시 화면에 표시되는지를 계속 생각해야 한다는 점이 달랐습니다.

## 진행한 내용

- Next.js App Router 기반 프론트엔드 프로젝트 생성
- FastAPI 기반 백엔드 프로젝트 생성
- SQLite와 SQLAlchemy를 사용한 Todo 데이터 저장
- Todo CRUD API 구현
  - `GET /todos`
  - `POST /todos`
  - `PUT /todos/{id}`
  - `DELETE /todos/{id}`
- Next.js `route.ts`를 통해 프론트엔드와 FastAPI 백엔드 연결
- `actions.ts`를 사용해 서버에서 Todo 데이터를 조회/생성/수정하는 흐름 구현
- 날짜별 Todo 관리 기능 구현
- 전체 / 진행 중 / 완료 필터 구현
- 과제2와 비슷한 UI 흐름으로 수정
- `.env.local`을 사용해 API URL과 DB 설정 분리
- README와 테스트 체크리스트 문서 작성
- `npm run lint`, `npm run build`, 백엔드 문법 검사 진행

## 과제2 피드백 반영

과제2 리뷰에서 가장 크게 받은 피드백은 `App.jsx`가 너무 많은 역할을 하고 있다는 점이었습니다. 그때는 화면 구성, 상태 관리, localStorage 저장, 필터링, 날짜 처리까지 한 파일 안에 많이 들어가 있었습니다.

그래서 이번 과제에서는 한 파일이 너무 많은 일을 하지 않도록 역할을 나누려고 했습니다.

프론트엔드에서는 다음처럼 나누었습니다.

- `app/todos/page.tsx`
  - Todo 목록 화면을 조립하는 역할
  - 날짜와 필터 기준으로 보여줄 Todo를 선택
- `components/DateNavigator.tsx`
  - 날짜 이동 UI 담당
- `components/FilterTabs.tsx`
  - 전체 / 진행 중 / 완료 필터 UI 담당
- `components/TodoForm.tsx`
  - Todo 입력 폼 담당
- `components/TodoList.tsx`
  - Todo 목록 출력 담당
- `components/TodoItem.tsx`
  - Todo 한 개의 표시와 버튼 배치 담당
- `lib/todoApi.ts`
  - FastAPI와 통신하는 요청 함수 담당
- `utils/date.ts`
  - 날짜 계산과 표시 형식 담당

이번에는 페이지 파일이 모든 일을 직접 처리하기보다는, 각 파일이 맡은 역할을 가지도록 나누려고 했습니다. 아직 완벽하게 좋은 구조인지는 모르겠지만, 적어도 이전처럼 한 파일에 모든 로직이 몰려 있지는 않게 만들려고 했습니다.

## 어려웠던 점

처음에는 Next.js App Router의 파일 기반 라우팅 구조가 익숙하지 않았습니다. React(Vite)에서는 `App.jsx` 안에서 화면 흐름을 직접 만들었는데, Next.js에서는 `app/todos/page.tsx`, `app/todos/new/page.tsx`, `app/todos/[todoId]/page.tsx`처럼 파일 위치 자체가 URL이 된다는 점이 새로웠습니다.

Server Component와 Client Component를 구분하는 것도 처음에는 헷갈렸습니다. 데이터를 불러와서 보여주는 부분은 Server Component로 두고, 클릭이나 삭제, 완료 토글처럼 사용자 이벤트가 필요한 부분은 `"use client"`가 필요한 Client Component로 분리해야 했습니다.

백엔드에서는 Todo에 날짜 필드를 추가하는 부분이 생각보다 중요했습니다. 처음에는 화면에 날짜 UI만 있으면 될 것 같았지만, 실제로 날짜별 Todo를 유지하려면 DB에도 Todo가 어느 날짜에 속하는지 저장해야 했습니다. 이 부분을 수정하면서 UI와 데이터 모델이 따로 움직이면 안 된다는 것을 알게 되었습니다.

## AI 활용 방식

AI에게 단순히 “구현해줘”라고 요청하기보다는, 지금 어떤 단계인지, 어떤 파일이 어떤 역할을 해야 하는지, 왜 그렇게 나누는지 설명해달라고 요청했습니다.

특히 다음 부분에서 AI의 도움을 받았습니다.

- 과제3 요구사항을 기준으로 구현 플랜 다시 작성
- `AGENTS.md` 작성
- Next.js와 FastAPI 프로젝트 구조 설계
- Server Component와 Client Component 역할 구분
- `route.ts`와 `actions.ts`의 차이 설명
- 오류 메시지 원인 파악
- 과제2 UI 흐름과 과제3 UI를 비교하며 수정
- README와 테스트 체크리스트 문서 정리

AI가 작성한 코드를 그대로 붙여넣기보다는, 파일이 왜 나뉘었는지와 각 파일이 어떤 역할을 하는지 확인하면서 진행하려고 했습니다. 중간중간 “이 파일은 무슨 역할인지”, “왜 이렇게 나눴는지”를 다시 물어보면서 이해하려고 했습니다.

## 검증한 내용

- FastAPI `/docs`에서 API 동작 확인
- Todo 생성 후 목록 조회 확인
- Todo 수정 확인
- Todo 삭제 확인
- 날짜별 Todo 표시 확인
- 전체 / 진행 중 / 완료 필터 확인
- 새로고침 후에도 DB에 저장된 Todo가 유지되는지 확인
- `npm run lint` 통과
- `npm run build` 통과
- 백엔드 `main.py` 문법 검사 통과
- `.env.local`, `.venv`, `.next`, `node_modules`, `todos.db`가 Git에 올라가지 않도록 `.gitignore` 확인

## 새롭게 알게 된 점

이번 과제를 하면서 프론트엔드와 백엔드가 분리되면 데이터 흐름을 더 명확히 생각해야 한다는 것을 알게 되었습니다.

과제2에서는 Todo를 추가하면 React state와 localStorage만 보면 됐지만, 과제3에서는 다음 흐름을 거쳤습니다.

```text
브라우저
-> Next.js 페이지 또는 컴포넌트
-> Next.js route.ts / actions.ts
-> FastAPI
-> SQLite DB
-> 다시 화면 갱신
```

또 환경변수를 사용하는 이유도 더 이해하게 되었습니다. `http://localhost:8000` 같은 값을 코드에 직접 적어두면 개발 환경과 배포 환경이 달라질 때 수정하기 어렵기 때문에, `.env.local`로 분리해 관리하는 것이 더 안전하다는 점을 알게 되었습니다.

## 아쉬웠던 점

처음에는 과제3 요구사항을 보기 전 과제2 리팩터링 방향으로 플랜을 잡았습니다. 이후 과제3의 실제 목표가 Next.js와 FastAPI를 사용하는 구조라는 것을 확인하고 플랜을 다시 작성했습니다.

이 과정에서 과제를 시작하기 전에 요구사항을 더 꼼꼼히 읽고, 기존 과제의 어떤 부분을 유지하고 어떤 부분을 새 구조로 바꿀지 먼저 정리하는 것이 중요하다는 것을 느꼈습니다.

또 UI를 처음 수정했을 때 과제2와 완전히 같지 않았고, 날짜 영역도 빠져 있었습니다. 직접 화면을 확인하면서 날짜 네비게이터, 필터, 개수, 초기화 버튼을 다시 맞췄습니다. 이 경험을 통해 마이그레이션은 기능만 옮기는 것이 아니라 기존 사용 흐름도 함께 유지해야 한다는 점을 느꼈습니다.

## 다음에 개선하고 싶은 점

다음 과제에서는 구현을 시작하기 전에 다음 내용을 먼저 정리하고 진행하고 싶습니다.

- 요구사항에서 반드시 구현해야 하는 기능 목록
- 기존 과제에서 유지해야 하는 UI/UX 흐름
- 프론트엔드가 담당할 일과 백엔드가 담당할 일
- Server Component와 Client Component를 나누는 기준
- 테스트할 항목과 검증 방법

또 시간이 된다면 Playwright 같은 도구를 사용해서 생성, 수정, 삭제 같은 핵심 흐름을 자동으로 검증해보고 싶습니다.
