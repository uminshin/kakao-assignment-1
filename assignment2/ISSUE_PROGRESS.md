# 과제 2 제출합니다

## 과제명: React로 Todo 앱 만들기

- 과제 내용: Vanilla JS로 구현했던 Todo 앱을 React Function Component 구조로 마이그레이션
- 브랜치명: `week-02-신유민`
- 작업 폴더: `kakao-assignment-1/assignment2`
- 주요 문서:
  - `README.md`
  - `docs/REACT_MIGRATION_PLAN.md`

## 파일 구조

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

## 1. 구조 설계

과제1에서 하나의 Vanilla JS 흐름으로 처리했던 Todo 기능을 React state와 컴포넌트 기준으로 다시 나누었습니다.

- `App.jsx`: 전체 상태 관리와 이벤트 처리 함수 관리
- `DateNavigator.jsx`: 선택 날짜 표시, 이전 / 다음 날짜 이동, 오늘로 이동 버튼
- `TodoForm.jsx`: Todo 입력과 추가 요청
- `FilterTabs.jsx`: 전체 / 진행 중 / 완료 필터 변경
- `TodoList.jsx`: 필터링된 Todo 목록과 빈 상태 메시지 표시
- `TodoItem.jsx`: 개별 Todo의 완료 처리, 수정, 삭제
- `utils/date.js`: 날짜 이동, 날짜 키 생성, 날짜 표시 문구 처리
- `utils/storage.js`: localStorage 저장과 불러오기 처리

## 2. 데이터 흐름

React에서는 DOM을 직접 수정하기보다 state를 바꾸고, 변경된 state를 기준으로 화면이 다시 렌더링되도록 구성했습니다.

- Todo 전체 데이터는 `todos` state로 관리
- 선택 날짜는 `selectedDate` state로 관리
- 필터 탭은 `filter` state로 관리
- 수정 중인 Todo는 `editingTodoId` state로 관리
- 안내 메시지는 `message` state로 관리

Todo 목록은 먼저 선택 날짜 기준으로 걸러낸 뒤, 그 결과에 전체 / 진행 중 / 완료 필터를 적용했습니다. Todo를 생성할 때는 현재 선택된 날짜를 `date` 값으로 함께 저장해 날짜별 목록이 유지되도록 했습니다.

## 3. 기능 설명

### Todo CRUD

- Todo 추가, 수정, 완료 처리, 삭제 기능을 구현했습니다.
- 빈 입력값은 Todo가 생성되지 않도록 막고 안내 메시지를 표시했습니다.
- Vanilla JS의 `prompt()` 방식 대신 Todo 항목 안에서 바로 수정하는 인라인 수정 UI로 변경했습니다.

### 상태별 필터링

- 전체 / 진행 중 / 완료 탭을 통해 원하는 상태의 Todo만 볼 수 있습니다.
- 필터 상태가 바뀌면 React가 필터링된 목록을 다시 계산해 화면을 갱신합니다.

### Todo 일간 뷰

- 이전 / 다음 날짜로 이동할 수 있습니다.
- 선택한 날짜에 해당하는 Todo만 표시됩니다.
- 오늘이 아닌 날짜에서는 `오늘` 버튼이 나타나고, 클릭하면 오늘 날짜로 돌아옵니다.
- 선택한 날짜의 Todo 개수와 초기화 버튼을 필터 탭 아래에 표시했습니다.

### localStorage 연동

- Todo 변경사항은 localStorage에 자동 저장됩니다.
- 새로고침 후에도 기존 Todo 데이터가 유지됩니다.
- Todo의 `date` 값도 함께 저장해 날짜별 Todo가 유지되도록 했습니다.

```js
useEffect(() => {
  saveTodosToStorage(STORAGE_KEY, todos);
}, [todos]);
```

`useEffect`의 의존성 배열에 `todos`를 넣은 이유는 Todo 목록이 바뀔 때만 저장 로직이 실행되도록 하기 위해서입니다.

## 4. AI 활용 내역

### AI 활용 방식

- 구현 전에 과제1 기능을 React에서 어떤 state와 컴포넌트로 나눌지 먼저 정리했습니다.
- `docs/REACT_MIGRATION_PLAN.md`에 마이그레이션 계획을 작성한 뒤, 그 흐름에 맞춰 기능을 단계별로 구현했습니다.
- 오류가 발생했을 때는 에러 메시지와 현재 코드를 함께 확인하면서 원인을 분석했습니다.
- 생성된 코드를 그대로 두지 않고, 브라우저에서 사용해보며 UI 위치와 수정 흐름을 직접 조정했습니다.

### 직접 수정한 내용

- 처음에는 수정 버튼을 누르면 상단 입력창에서 수정하는 방식이었지만, 어떤 Todo를 수정하는지 흐름이 어색해서 Todo 항목 안에서 수정하도록 바꿨습니다.
- 날짜 영역은 기존 Todo 앱의 흐름을 살리되, 오늘 버튼과 Todo 개수 표시가 너무 튀지 않도록 위치와 크기를 여러 번 조정했습니다.
- 빈 파일로 남아 있던 미사용 컴포넌트를 제거하고, README와 기획 문서의 구조 설명을 최종 코드에 맞게 정리했습니다.

## 5. 구현하면서 고민한 점

### 컴포넌트를 어디까지 나눌지

처음에는 Todo 개수 표시를 별도 컴포넌트로 둘지 고민했습니다. 하지만 현재 화면에서는 선택 날짜의 Todo 개수를 `App.jsx`에서 이미 계산하고 있었기 때문에, 별도 컴포넌트보다 `App.jsx`에서 계산 결과를 바로 표시하는 방식이 더 단순하다고 판단했습니다.

### Vanilla JS와 React의 차이

Vanilla JS에서는 필요한 순간에 DOM을 직접 찾고 수정했지만, React에서는 state를 변경하면 화면이 다시 그려집니다. 그래서 필터링, 날짜 이동, localStorage 저장 모두 state 흐름을 중심으로 다시 구성했습니다.

### localStorage 저장 위치

과제1에서는 추가, 수정, 삭제 함수마다 저장 로직을 직접 호출했습니다. React에서는 `todos`가 바뀌는 순간을 `useEffect`에서 감지해 한 곳에서 저장하는 방식이 더 적절하다고 판단했습니다.

## 6. 검증 결과

- [x] 빈 입력값 제출 시 Todo가 생성되지 않음
- [x] Todo 추가 / 수정 / 완료 처리 / 삭제 가능
- [x] 전체 / 진행 중 / 완료 필터 동작
- [x] 날짜 이동 시 해당 날짜 Todo만 표시
- [x] 새로고침 후 localStorage 데이터 유지
- [x] 불필요한 `console.log`, `debugger` 없음
- [x] `npm run lint` 통과
- [x] `npm run build` 통과

## 7. 과제 회고

이번 과제에서는 기능을 바로 구현하기보다 먼저 마이그레이션 계획을 문서로 정리하고 시작했습니다. 덕분에 React에서 어떤 값을 state로 둘지, 어떤 UI를 컴포넌트로 나눌지 생각한 뒤 구현할 수 있었습니다.

아쉬웠던 점은 처음 UI를 만들 때 과제1의 화면 흐름과 조금 다르게 구현한 부분이 있었다는 점입니다. 직접 사용해보면서 수정 입력 위치, 날짜 영역, 버튼 위치를 다시 조정했고, 이 과정에서 “마이그레이션”은 단순히 기능만 옮기는 것이 아니라 기존 사용 흐름도 함께 유지해야 한다는 점을 느꼈습니다.

AI에게 요청할 때도 단순히 "구현해줘"라고만 하지 않고, 이 작업을 왜 하는지, 어느 파일의 어느 부분을 바꿨는지, 보완할 점은 무엇인지 함께 설명해달라고 요청했습니다. 그 과정을 통해 과제에서 부족한 부분이 무엇인지, 그리고 지금 제가 어떤 흐름을 진행하고 있는지 더 잘 이해할 수 있었습니다.

다음에는 처음 설계 문서를 작성할 때 UI 배치 기준과 사용자 흐름까지 더 구체적으로 정리해두고 구현해보고 싶습니다.

## 멘토님께 질문하고 싶은 점

React에서 localStorage 같은 외부 저장소와 state를 연결할 때, 현재처럼 `useEffect`로 저장하는 방식이 작은 앱에서는 충분한지 궁금합니다. 앱 규모가 커졌을 때는 custom hook으로 분리하거나 상태 관리 라이브러리를 사용하는 기준이 따로 있는지도 여쭤보고 싶습니다.
