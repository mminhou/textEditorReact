# textEditorReact

## VanillaJS -> React 로 구현하기  

### 진행상황
- 새로운 탭 생성 -> 👌
- 탭 불러오기 -> 👌
- 탭 데이터 변경시 indicator -> 👌
- 탭 데이터 저장 -> 👌
- 다른 이름으로 저장 -> ...ing -> 👌

### 개선할 이슈....
1. save 버튼 클릭 후 tab indicator 비활성화 이슈
   - 현재 save 버튼 클릭 후 tab의 indicator 비활성화가 안됨
   - 다른 탭으로 이동해야 indicator가 사라짐.

2. 코드가 더럽다...

<br/>

## Firebase 고도화 작업

### Function
- 구글 로그인 환경을 Firebase를 통해 구현
- 로컬 스토리지에 저장한 데이터를 Firebase Storage에 저장하도록 변경
- Firebase Storage에 저장된 데이터를 로드

### 진행상황
- 구글 로그인 버튼 클릭시 팝업창을 통해 구글로그인 할 수 있도록 함.
- 새로고침시 현재 로그인 정보 사라지도록 설정
- Localstorage -> Firebase storage 고도화 작업 진행중
- initial storageState를 firebase storage에서 가져올 때 promise인 상태로 가져오기 때문에 발생할 수 있는 이슈 해결중 
- -> useEffect() 안의 async 함수를 정의해 state를 update 할 수 있도록 설정
- firebase storage GET, POST method 정의 및 로직 분리
- 요구사항 만족하는 결과 확인

### 추가작업
- SOLID 원칙으로 코드 분리작업 해보기