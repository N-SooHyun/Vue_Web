<template>
    <div class="html-read">
      <!-- 부모로부터 전달받은 제목을 H1 태그로 표시 -->
      <h1>{{ title }}</h1>
      <!-- 부모로부터 전달받은 본문 HTML을 실제로 렌더링 -->
      <div v-html="renderedContent"></div>
      
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: String,   // 부모로부터 전달받은 제목
      content: String, // 부모로부터 전달받은 본문 내용
      imageMap: {   //부모로부터 전달받은 이미지 Map
        type: Object,
        required: true,
      },
    },
    computed: {
      renderedContent(){
        // content에서 <img> 태그의 id를 찾아서 src를 추가
        return this.content.replace(/<img id="([^"]+)"([^>]*)\/?>/g, (match, id, attribu) => {
        const src = this.imageMap.get(id);
        // src가 있으면 src 속성을 추가
        return src ? `<img id="${id}" src="${src}" ${attribu}/>` : match; // URL이 없으면 원래 태그를 그대로 반환
      });
      }
    }
  };
  </script>
  
  <style scoped>
  h1 {
    font-size: 2em;
    color: #333;
    margin-bottom: 20px;
  }
  </style>
  