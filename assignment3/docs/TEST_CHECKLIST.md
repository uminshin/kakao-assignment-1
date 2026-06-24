# 과제3 검증 체크리스트

## 1. 백엔드 검증

- [ ] `backend/.venv` 가상환경이 활성화된다.
- [ ] `pip install -r requirements.txt`가 성공한다.
- [ ] `uvicorn main:app --reload`로 서버가 실행된다.
- [ ] `http://localhost:8000`에서 `{"message":"Hello World"}` 응답이 보인다.
- [ ] `http://localhost:8000/docs`에서 API 문서가 보인다.
- [ ] `GET /todos`가 동작한다.
- [ ] `POST /todos`로 Todo를 생성할 수 있다.
- [ ] `PUT /todos/{id}`로 Todo 내용과 완료 상태를 수정할 수 있다.
- [ ] `DELETE /todos/{id}`로 Todo를 삭제할 수 있다.
- [ ] `backend/todos.db`가 생성된다.
- [ ] `todos.db`가 Git 변경 목록에 올라오지 않는다.

## 2. 프론트엔드 검증

- [ ] `npm install`이 성공한다.
- [ ] `npm run dev`로 개발 서버가 실행된다.
- [ ] `http://localhost:3000` 첫 화면이 보인다.
- [ ] `http://localhost:3000/todos` 목록 페이지가 보인다.
- [ ] 데이터가 없을 때 빈 상태 화면이 보인다.
- [ ] `http://localhost:3000/todos/new` 생성 페이지가 보인다.
- [ ] Todo 생성 후 목록 페이지로 이동한다.
- [ ] 생성한 Todo가 목록에 표시된다.
- [ ] 목록에서 완료 상태를 바로 변경할 수 있다.
- [ ] 수정 페이지에서 Todo 내용을 수정할 수 있다.
- [ ] 삭제 버튼 클릭 시 확인창이 뜬다.
- [ ] 삭제 확인 후 Todo가 목록에서 사라진다.

## 3. 네트워크 흐름 검증

- [ ] 브라우저 개발자도구 Network 탭에서 `/api/todos` 요청을 확인했다.
- [ ] Todo 생성, 수정, 삭제 시 요청이 정상 상태 코드로 끝난다.
- [ ] FastAPI `/docs`에서 직접 실행한 결과와 프론트 화면 결과가 일치한다.

## 4. 환경변수 검증

- [ ] `frontend/.env.local.example`이 있다.
- [ ] `backend/.env.local.example`이 있다.
- [ ] 실제 `.env.local` 파일은 Git에 올라가지 않는다.
- [ ] 코드에 API 주소와 DB 설정을 직접 여러 군데 하드코딩하지 않았다.

## 5. 코드 품질 검증

- [ ] `npm run lint`가 통과한다.
- [ ] `npm run build`가 통과한다.
- [ ] 불필요한 `console.log`가 없다.
- [ ] 사용하지 않는 코드가 없다.
- [ ] 페이지가 너무 많은 일을 하지 않고 컴포넌트와 함수로 역할이 나뉘어 있다.
- [ ] Server Component와 Client Component를 왜 나눴는지 설명할 수 있다.
- [ ] `route.ts`와 `actions.ts`의 역할 차이를 설명할 수 있다.

## 6. 문서 검증

- [ ] README만 보고 프로젝트 실행 방법을 알 수 있다.
- [ ] API 목록이 README에 정리되어 있다.
- [ ] 과제2와 과제3의 차이가 README에 정리되어 있다.
- [ ] AI 사용 기록이 README에 정리되어 있다.

## 현재 확인된 결과

- `npm run lint` 통과
- `npm run build` 통과
- `backend/main.py` Python 문법 확인 통과
- FastAPI `/docs`에서 기본 API와 Todo CRUD API 확인

남은 확인:

- 브라우저에서 Todo 생성, 완료 토글, 수정, 삭제 흐름 직접 확인
- 브라우저 Network 탭에서 `/api/todos` 요청 흐름 확인
- README와 실제 최종 코드가 일치하는지 최종 확인
