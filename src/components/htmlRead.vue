<template>
    <div class="html-read">
      <!-- 부모로부터 전달받은 제목을 H1 태그로 표시 -->
      <h1>{{ title }}</h1>
      <!-- 부모로부터 전달받은 본문 HTML을 실제로 렌더링 -->
      <div v-html="formattedContent"></div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: String,   // 부모로부터 전달받은 제목
      content: String, // 부모로부터 전달받은 본문 내용
    },
    computed: {
      // 개행 문자를 <br>로 변환하여 렌더링
      formattedContent() {
        return this.content.replace(/\n/g, '<br>');  // 줄 바꿈 변환
      },
    },
  };
  </script>
  
  <style scoped>
  h1 {
    font-size: 2em;
    color: #333;
    margin-bottom: 20px;
  }
  </style>
  