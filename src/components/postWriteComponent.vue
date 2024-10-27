<template>
    <div class="post-write">
      <div class="layout">
        <!-- 왼쪽: HtmlWrite 컴포넌트 -->
        <div class="leftArea">
          <html-write @updateContent="updateContent" @updateTitle="updateTitle" :content="content" :title="title" />
        </div>
        <!-- 오른쪽: HtmlRead 컴포넌트 -->
        <div class="rightArea">
          <html-read :content="content" :title="title" />
        </div>
      </div>

      <!--이미지 미리보기 영역-->
      <div id="imagePreviewsArea" v-if="imagePreviews.length">
        <p>이미지 미리보기:</p>
        <ul>
          <li v-for="(image, index) in imagePreviews" :key="index">
            <img :src="image" alt="Uploaded Image" width="100" />
            <button @click="removeImage(index)">X</button>
          </li>
        </ul>
      </div>

      <!--이미지 업로드 영역-->
      <input type="file" @change="handleFileUpload" multiple accept=".jpg, .jpeg, .png, .gif, .bmp, .webp"/>
      <button @click="applyImagesToContent">이미지 글에 적용</button>
      <button >글쓰기</button>
      
    </div>
</template>
  
  <script>
  import HtmlWrite from './htmlWrite.vue';
  import HtmlRead from './htmlRead.vue';
  
  export default {
    components: {
      HtmlWrite,
      HtmlRead,
    },
    data() {
      return {
        title: "",    // 입력한 제목
        content: "",  // 입력한 본문 내용
        imagePreviews: [], //이미지 미리보기 URL 배열
        imageData: {},
      };
    },
    methods: {
      //이미지를 글에 적용시키기
      applyImagesToContent(){
        this.imagePreviews.forEach((image, index) => {
          const imageID = `image-${index+1}`;  //고유 ID생성
          // 이미지 태그로 `content`를 업데이트하여 htmlRead로 전달
          this.content += `<p><img data-id="${imageID}" alt="Image Preview"/></p>`; 
          this.imageData[imageID] = image;  //ID와 인코딩된 이미지 URL을 매핑
        });
      },

      // 왼쪽에서 입력한 제목을 업데이트
      updateTitle(newTitle) {
        this.title = newTitle;
      },
      // 왼쪽에서 입력한 본문을 업데이트
      updateContent(newContent) {
        this.content = newContent;
      },
      //이미지 미리보기
      handleFileUpload(event){
        const files = event.target.files;
        this.imagePreviews = [];  //기존 미리보기 초기화

        Array.from(files).forEach((file, index) => {
          //FileReader를 이용해 이미지 URL생성 및 미리보기
          const reader = new FileReader();
          reader.onload = (e) => {
            this.imagePreviews.push(e.target.result); //미리보기 URL저장
            const imageID = `image-${index + 1}`;  //고유 ID 생성
            this.imageData.set(imageID, e.target.result);  //ID와 인코딩된 이미지 URL을 MAP에 저장 
          };
          //이미지를 base64 형식으로 인코딩
          reader.readAsDataURL(file); 
        });
      },
      removeImage(index){
        //특정 인덱스의 이미지를 미리보기에서 제거
        this.imagePreviews.splice(index, 1);
      },
    },
  };
  </script>

<style scoped>
.post-write {
  padding: 20px;
}

.layout {
  display: flex;
  width: 100%;
  min-height: 600px;
}

.leftArea {
  flex: 1 1 50%;  /* 왼쪽 영역 50% */
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  box-sizing: border-box;  /* padding, border가 width, height에 포함되도록 함 */
}

.rightArea {
  flex: 1 1 50%;  /* 오른쪽 영역 50% */
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #fff;
  box-sizing: border-box;  /* padding, border가 width, height에 포함되도록 함 */
}
</style>