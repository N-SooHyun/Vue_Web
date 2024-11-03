<template>
    <div class="post-read">
    <!-- 제목 영역 -->
    <h1 class="post-title">{{ this.postTitle }}</h1>

    <hr />

    <!-- 작성자 ID 및 작성 날짜 -->
    <div class="post-info">
      <span class="post-author">작성자: {{ this.postId }}</span>
      <span class="post-date">작성일: {{ this.postMakeDate }}</span>
    </div>

    <!-- 게시글 내용 -->
    <div class="post-content">
      <div v-html="formattedContent"></div>
    </div>

  </div>
</template>


<script>
export default{
    props: {
        postData:{
            type: Object,
            required: true,
        },
    },
    data() {
    return {
      postTitle: null,
      postContent: null,
      postId: null,
      postMakeDate: null,
      images: [],  // 이미지 경로와 ID를 담을 배열
      formattedContent: null //이미지를 파싱하고 새롭게 만들어지는 content
    };
  },
    created() {
        //초기 데이터 설정
        this.updatePostData(this.postData);
   },
    watch: {
      postData: {
        handler(newVal){
          //props에 postData가 변경될때마다 데이터 업데이트
          this.updatePostData(newVal);
          //this.loadImages();
        },
        deep: true,  //객체의 깊은 변화도 감지
        immediate: true,   //컴포넌트 생성 시에도 실행
      },
  },
    methods: {  
      formatDate(dateString){
        const date = new Date(dateString);

          //날짜 형식 지정
          const day = String(date.getUTCDate()).padStart(2, '0');  //두 자리 수로
          const month = String(date.getUTCMonth() + 1).padStart(2, '0');
          const year = date.getUTCFullYear().toString().slice(-2);

          const hours = String(date.getUTCHours()).padStart(2, '0');
          const minutes = String(date.getUTCMinutes()).padStart(2, '0');

          return `${year}-${month}-${day} | ${hours}:${minutes}`;
      },
      updatePostData(postData){
        this.postTitle = postData.title;
        this.postContent = postData.content;
        this.postId = postData.id;
        this.postMakeDate = this.formatDate(postData.makedate);

        this.images = postData.images.map(image => ({
          imageId: image.imageId,
          imageLink: image.imageLink
        }));
        /*
        console.log(this.images);
        console.log(postData.images[0].imageId);
        console.log(postData.images[0].imageLink);
        console.log(this.images[0].imageId);
        console.log(this.images[0].imageLink);
        */
       this.formatContentWithImages();
      },
      formatContentWithImages(){
        //postContent를 html로 구문분석하기 위한 DOM요소 생성
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = this.postContent;

        //ID가 있는 <img>태그를 찾아 업데이트
        this.images.forEach(image => {
          const imgElement = tempDiv.querySelector(`img[id="${image.imageId}"]`);
          if(imgElement){
            imgElement.src = `http://119.197.155.172:50052/api/image?path=${image.imageLink}`;
          }
        });

        //v-html에 대한 포맷된 콘텐츠를 문자열로 설정
        this.formattedContent = tempDiv.innerHTML;
        console.log(this.formattedContent);        
      }
       
    },
    
};
</script>


<style scoped>
.post-read {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.post-title {
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 10px;
}

.post-info {
  display: flex;
  justify-content: space-between;
  color: #555;
  margin-bottom: 15px;
}

.post-content {
  font-size: 1.1em;
  margin-bottom: 20px;
}

.post-images {
  margin-top: 20px;
}

.images-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.images-grid img {
  max-width: 100%;
  height: auto;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 5px;
}
</style>