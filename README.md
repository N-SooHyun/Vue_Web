# Vue 프로젝트 현황

## 목차
- [초기설정](#초기설정)
- [구조설정](#구조설정)
- [nav컴포넌트](#nav컴포넌트)
- [post컴포넌트](#post컴포넌트)
- [사용자인증](#사용자인증)
- [HTTP프로토콜](#HTTP프로토콜)

---

### 초기설정
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


### 구조설정
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
```html
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

### HTTP프로토콜
Fetch API와 Axios라는 두 개의 방식을 이용해 HTTP문서를 전송할것이다.

### 사용자인증
토큰을 이용한 방식으로 사용자 인증을 진행할것이다.


### nav컴포넌트
nav컴포넌트에 로그인 버튼을 이용하여 사용자 인증을 구성합니다.

### post컴포넌트
post컴포넌트에 게시글작성과 게시글 읽기 로직을 구현합니다.
``` html
<post-read-component v-if="mode === 'read'"></post-read-component>
<post-write-component v-if="mode === 'write'"></post-write-component>
```
- post 컴포넌트의 자식 컴포넌트:
  - postRead컴포넌트
  - postWrite컴포넌트

#### postRead컴포넌트

#### postWrite컴포넌트
  - postWrite컴포넌트의 자식 컴포넌트:
    - htmlWrite컴포넌트
    - htmlRead컴포넌트 
```html
        <!-- 왼쪽: HtmlWrite 컴포넌트 -->
        <div class="leftArea">
          <html-write ref="htmlWrite" @updateContent="updateContent" @updateTitle="updateTitle" :content="content" :title="title" :imageMap="imageMap"/>
        </div>
        <!-- 오른쪽: HtmlRead 컴포넌트 -->
        <div class="rightArea">
          <html-read :content="content" :title="title" :imageMap="imageMap"/>
        </div>
        <!-- 이미지 업로드 -->
```
이런 구조로 진행이 되며<br>
## 예시
<table>
  <tr>
    <td></td>
    <th>htmlWrite(게시글 작성)</th>
    <th>htmlRead(게시글 미리보기)</th>
  </tr>
  <tr>
    <td>제목</td>
    <td>&lt;h1&gt;안녕&lt;/h1&gt;</td>
    <td><h1>안녕</h1></td>
  <tr>
    <td>내용</td>
    <td>왼쪽 글은 &lt;strong&gt;html 문법&lt;/strong&gt;으로 작성되며&lt;br&gt;오른쪽 글은 &lt;strong&gt;html 문법&lt;/strong&gt;으로 파싱됩니다.</td>
    <td>왼쪽 글은 <strong>html 문법</strong>으로 작성되며<br>오른쪽 글은 <strong>html 문법</strong>으로 파싱됩니다.</td>
  </tr>
</table>


이런식으로 진행되는 매커니즘이며 title, content, image 이 3개를 FormData를 이용해 JSON의 형식으로 묶어서<br>
서버에 POST방식으로 전송된다. FormData는 딕셔너리, JSON같은 자료구조의 형태이다.

## 클라이언트측 이미지를 송신
이미지는 **바이너리 파일**구조이다. 사용자용 **텍스트 파일**이 아닌 컴퓨터용 바이너리 파일이다.

클라이언트(이미지 업로드) -> 브라우저 -> **직접적**인 파일접근(보안상 접근이 불가능)<br>
그래서 **URL객체**를 이용하여 일시적이고 임시적인 파일의 접근경로를 생성하여 접근해야 안전하다.<br>
임시적인 URL은 **브라우저 메모리**에서만 동작하는 **휘발성**이며 추후 사용이 끝나면 **해제**해주는게 브라우저 **메모리 누수**를 막을 수 있다.<br>

전송방식은 쉽게 2가지로 구성된다.
1. 이미지 파일의 바이너리를 -> 인코딩시켜 -> 텍스트 파일로 변환 후 전송
2. 이미지 파일의 바이너리를 인코딩없이 그대로 전송
   
이렇게 2가지 방식을 사용할 수 있으며 필자는 2번을 사용한다. <br>
1번은 인코딩시 텍스트로 변환하기에 당연히 파일의 크기가 증가하기 때문이다.(33%정도 증가한단다)

## 서버측 이미지를 수신
**Node 서버**측에서 **FormData**를 받을때는 반드시 FormData처리를 위한 **미들웨어(ex:multer)**가 필요하다.

전송받은 이미지를 저장하는 방식은 2가지로 구성된다.
1. 이미지 BLOB 파일을 DB에 직접적으로 저장하는 방법
2. 이미지 BLOB 파일을 서버 HDD,SSD같은 보조기억장치에 저장하여 그 경로만 DB에 저장하는 방법

이렇게 2가지 방법이 있다. 2가지의 장단점은 극명하며 2번이 요즘은 많이 쓰인다.<br>
 - DB에 BLOB 방식으로 저장:
   - 장점:DB내 모든 데이터 관리가 가능, 데이터 무결성 높음
   - 단점:BLOB 데이터가 커질수록 DB성능 악화, 백업 및 복원 복잡
 - 서버 HDD에 저장 후 경로를 DB에 기록
   - 장점:파일을 효율적으로 관리가능, 이미지크기 수가 많아도 HDD용량만 충분하면 성능이 좋음
   - 단점:파일 시스템의 주기적인 백업 관리 필요, 파일이 손실될 경우 접근이 어려움

