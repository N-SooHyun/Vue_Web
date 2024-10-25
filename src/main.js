import { createApp } from 'vue';   // Vue 3에서 제공하는 createApp 함수
import App from './App.vue';        // 루트 컴포넌트 App.vue를 import
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

createApp(App).mount('#app');      // Vue 앱을 #app 요소에 마운트