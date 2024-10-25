<template>
  <header-component></header-component>
      <nav-component @postWrite="switchToPostWrite" @loginClick="openLoginModal"></nav-component>
      <div class="container">
          <aside id="postListArea">
              <post-list-component></post-list-component>
          </aside>
          <section id="postContentArea">
              <component :is="currentPostComponent"></component>
          </section>
      </div>
  <footer-component></footer-component>

  <login-modal v-if="isLoginModalVisible" @close="closeLoginModal"></login-modal>
</template>

<script>
import HeaderComponent from './components/headerComponent.vue';
import NavComponent from './components/navComponent.vue';
import PostListComponent from './components/postListComponent.vue';
import PostComponent from './components/postComponent.vue';
import FooterComponent from './components/footerComponent.vue';
import postWriteComponent from './components/postWriteComponent.vue';
import LoginModal from './components/LoginModal.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    NavComponent,
    PostListComponent,
    PostComponent,
    FooterComponent,
    postWriteComponent,
    LoginModal,
  },
  data(){
    return {
      //현재 상태에 따라 랜더링할 컴포넌트를 변경하는 변수 
      currentPostComponent: 'postComponent',
      isLoginModalVisible: false,
    };
  },
  methods:{
    //nav에서 글작성 버튼 눌렀을때 호출되는 메소드
    switchToPostWrite(){
      this.currentPostComponent = 'postWriteComponent';
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
