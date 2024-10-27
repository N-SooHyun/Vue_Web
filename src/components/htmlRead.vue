<template>
    <div class="html-read">
      <!-- 부모로부터 전달받은 제목을 H1 태그로 표시 -->
      <h1>{{ title }}</h1>
      <!-- 부모로부터 전달받은 본문 HTML을 실제로 렌더링 -->
      <div v-html="content"></div>
      
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: String,   // 부모로부터 전달받은 제목
      content: String, // 부모로부터 전달받은 본문 내용
      imageData: Object, //부모로부터 전달받은 이미지 데이터
    },
    mounted(){
      this.$nextTick(() => {
        this.replaceImageIds();
      });
    },
    methods: {
      replaceImageIds(){
        const images = this.$el.querySelectorAll("img[data-id]");
        images.forEach((img) => {
        const imageId = img.getAttribute("data-id");
        if (this.imageData[imageId]) {
          img.src = this.imageData[imageId]; // 인코딩된 URL로 대체
        }
        });
      },
    },
    computed: {
      renderedContent(){
        //content의 img 태그를 찾아서 src를 imageData에서 가져오기
        let htmlContent = this.content;

        //정규 표현식을 사용하여 img 태그를 찾아서 대체
        htmlContent = htmlContent.replace(/<img data-id="([^"]+)"/g, (match, id) => {
          const imageUrl = this.imageData.get(id); // ID에 해당하는 URL을 가져옴
          return imageUrl ? `<img src="${imageUrl}"` : match; // URL이 존재하면 대체, 없으면 원본 유지
        });

        return htmlContent; // 최종 HTML 반환
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
  