# Vue 프로젝트 현황

## 목차
- [첫째 날](#첫째-날)
- [둘째 날](#둘째-날)
- [셋째 날](#셋째-날)

---

### 첫째 날
#### 1. 개발 환경 설정
- **Node.js**를 이용해 **Vue CLI** 개발 환경 설치
- 프로젝트 생성:
  - 명령어: `vue create "프로젝트명"`
  - 선택 사항: Vue 3(최신버전, 내가고른버전), Vue 2, Manually select features(수동기능선택)



#### 2. Vue 프로젝트 디렉토리 구조
생성된 Vue 프로젝트의 디렉토리 구조는 다음과 같습니다.
```
프로젝트명/
- node_modules/       // 의존성 패키지
- public/             // 정적 파일
  - index.html        // 주요 HTML 파일
- src/                // 소스 코드
  - assets/           // 자산 (이미지, 스타일 등)
  - components/       // Vue 컴포넌트
  - App.vue           // 루트 컴포넌트
  - main.js           // 진입점
- babel.config.js     // Babel 설정
- jsconfig.json       // JS 설정
- package.json        // 패키지 설정
- package-lock.json   // 패키지 고정
- vue.config.js       // Vue CLI 설정
```

#### 3.개발 후 설정
- **프론트엔드 서버 구현**:
 1. **빌드**: `npm run build` 명령어를 통해 `dist` 폴더 생성
 2. **서버 개발**:
    - `server` 디렉토리 생성
    - `package.json` 초기화: `npm init -y`
    - **Express 설치**: `npm install express`
    - `server.js` 파일 생성 및 코딩 진행
 3. **서버 실행**: `node server.js`
 4. **포트 포워딩 및 방화벽 설정**:
    - 공인 IP에 포트 포워딩 및 인바운드 규칙으로 포트 오픈(예: 50052 포트)
   
#### 4. 결과
 - 외부에서 `119.-.-.-:50052/index`에 접속하여 `index.html`을 받아올 수 있도록 초기 설정 완료.


### 둘째 날
#### 1. Vue 페이지 랜더링 초기 설정
### index.html
``` html
<div id="app"></div>
<script src="/src/main.js"></script>
```
### main.js
```js
import { createApp } from 'vue';  //Vue 3에서 제공하는 createApp함수
import App from './App.vue';

createApp(App).mount('#app');
```
- index.html에서 div로 app영역을 만들어줍니다.
- main.js를 불러옵니다.
- vue라이브러리에서 createApp함수를 가져옵니다.
- main.js와 같은 위치에 존재하는 ./App.vue에서 App이라는 기본 컴포넌트를 가져옵니다.
- 이후 index.html에 존재하는 <div영역인 app에 App을 마운팅 해줍니다.
- 이로써 `<div id="app"></div>` 이 영역은 App.vue의 루트 컴포넌트가 되고 App.vue의 내용이 랜더링 됩니다.


### App.vue
페이지의 기본 레이아웃을 구성합니다.
 - Header: 홈을 표시
 - Nav: 로그인 및 글 작성 버튼
 - PostList: 글 목록 보기
 - Post: 글 내용 표시
 - Footer: 법적 필수 내용표시 영역
이렇게 5가지의 레이아웃을 구성해주고 이를 좀더 구조화 시키기 위해 이 레이아웃 영역은
```
<header-component></header-component>
<nav-component></nav-component>
<div class = "container"> 
  <post-list-component></post-list-component>
  <post-componet></post-componet>
</div>
<footer-component></footer-component>
```
이런식으로 부모 컴포넌트 App.vue를 필두로 5개의 자식 컴포넌트를 만들어서 진행할 에정입니다.

Vue는 말 그대로 SPA를 지원하기에 App.vue한개를 가지고 index.html라는 한 개의 페이지로 여러 기능을 구현합니다.

그래서 App.vue는 여러 페이지를 SPA로 구현하기 위해 하나의 트리구조로써 부모-자식-손자 라는 컴포넌트 구조를 가지고 있습니다.


### 셋째 날

