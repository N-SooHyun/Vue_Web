import { createApp } from 'vue';   // Vue 3에서 제공하는 createApp 함수
import App from './App.vue';        // 루트 컴포넌트 App.vue를 import
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {createRouter, createWebHistory} from 'vue-router'; 

import PostRead from './components/postReadComponent.vue';
import PostWrite from './components/postWriteComponent.vue';

//라우터 설정
const routes = [
    {
        path: '/post/:id',
        name: 'postRead',
        components: PostRead,
        props: true
    },
    {
        path: '/post/write',
        name: 'postWrite',
        component: PostWrite,
        props: true  // PostWrite에서 props로 데이터를 받을 수 있게 설정
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  createApp(App)
  .use(router)  // 라우터를 Vue 애플리케이션에 등록
  .mount('#app');      // Vue 앱을 #app 요소에 마운트
