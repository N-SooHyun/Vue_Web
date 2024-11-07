<template>
  <header-component></header-component>
      <nav-component 
      :userCK="userCK" 
      @postWrite="postModeChange('write')" 
      @loginClick="openLoginModal"
      @logOut="logOutFun">
    </nav-component>
      <div class="container">
          <aside id="postListArea">
              <post-list-component @post_Read_Data="handlePostSelected"></post-list-component>
          </aside>
          <section id="postContentArea">
              <post-component :mode="postMode" :postData="selectedPostData" @logout="token_out_logout" @editPost="handleEditPost"></post-component>
          </section>
      </div>
  <footer-component></footer-component>

  <login-modal v-if="isLoginModalVisible" @close="closeLoginModal" @loginSuccess="loginSuccess"></login-modal>
</template>

<script>
import HeaderComponent from './components/headerComponent.vue';
import NavComponent from './components/navComponent.vue';
import PostListComponent from './components/postListComponent.vue';
import PostComponent from './components/postComponent.vue';
import FooterComponent from './components/footerComponent.vue';
import LoginModal from './components/LoginModal.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    NavComponent,
    PostListComponent,
    PostComponent,
    FooterComponent,
    LoginModal,
  },
  data(){
    return {
      //현재 상태에 따라 랜더링할 컴포넌트를 변경하는 변수 
      postMode: 'home',   //postMode(home-default, read, write)
      isLoginModalVisible: false,
      tokenValue: null,   //토큰값 로그인 했는지 확인 가능
      userCK: false,    //로그인 체크 기본값 false
      selectedPostData: null
    };
  },
  created(){//새로고침시
    const storedToken = localStorage.getItem('token');
    if(storedToken){
      this.tokenValue = storedToken;
      this.userCK = true;
      this.postMode = 'home';
    }
  },
  methods:{
    handleEditPost(){
      this.postMode = 'edit';
    },
    handlePostSelected(postData){
      this.selectedPostData = postData;
      this.postMode = 'read';
    },
    //nav에서 글작성 버튼 눌렀을때 호출되는 메소드
    token_out_logout(){//세션 종료 토큰 반납
      localStorage.removeItem('token');
      this.userCK = false;
      window.location.href = '/';
    },
    logOutFun(){//토큰 반납
      localStorage.removeItem('token');
      alert('로그아웃 완료');
      this.userCK = false;
      window.location.href = '/';
    },
    loginSuccess(token){
      this.tokenValue = token;//토큰 부모 컴포넌트 변수에 저장
      this.userCK = true; //로그인이 되어있음을 체크
    },
    postModeChange(data){
      this.postMode = data; //read, write형태로 받아서 처리
    },
    openLoginModal(){
      this.isLoginModalVisible = true;
    },
    closeLoginModal(){
      this.isLoginModalVisible = false;
    },
  },
};
</script>

<style>
/* 기본 레이아웃 구조 */
.container {
  display: flex;
  justify-content: space-between; /* 좌우 공간 분배 */
  padding: 0px;
  height: calc(100vh - 160px); /* header, nav, footer의 높이를 고려하여 컨텐츠 영역이 가득 차도록 설정 */
}

#postListArea {
  position: absolute;
  left: 0;
  width: 20%;
  border: 1px solid #000;
  padding: 20px;
  box-sizing: border-box;
}

#postContentArea {
  position: absolute;
  right: 0;
  width: 80%;
  border: 1px solid #000;
  padding: 20px;
  box-sizing: border-box;
}
</style>
