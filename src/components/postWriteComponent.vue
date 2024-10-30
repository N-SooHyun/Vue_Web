<template>
    <div class="post-write">
      <div class="layout">
        <!-- 왼쪽: HtmlWrite 컴포넌트 -->
        <div class="leftArea">
          <html-write ref="htmlWrite" @updateContent="updateContent" @updateTitle="updateTitle" :content="content" :title="title" :imageMap="imageMap"/>
        </div>
        <!-- 오른쪽: HtmlRead 컴포넌트 -->
        <div class="rightArea">
          <html-read :content="content" :title="title" :imageMap="imageMap"/>
        </div>
      </div>
      
      <!--이미지 업로드 영역-->
      <input ref="fileInput" type="file" @change="handleFileUpload" multiple accept=".jpg, .jpeg, .png, .gif, .bmp, .webp"/>
      <button @click="applyImagesToContent">이미지 글에 적용</button>
      <button @click="postWrite_server">글쓰기</button>
      
      <!--이미지 미리보기 영역-->
      <div v-if="imagePreviews.length" class="image-preview">
        <ul>
          <li v-for="(image, index) in imagePreviews" :key="index">
            <img :src="image" alt="Uploaded Image" width="100" />
            <button @click="removeImage(index)">X</button>
          </li>
        </ul> 
      </div>
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
        fileList: [], 
        imageMap: new Map(),    // 이미지고유값(키):인코딩링크값(밸류)
        busImageMap: new Map(), // 자식에게 전달할 imageMap버스
        nextImageId: 0,         //이미지 고유값관리 ID값 변수
      };
    },
    methods: {
      //이미지를 글에 적용시키기
      applyImagesToContent(){
        if(this.imagePreviews.length === 0){
          alert("올릴 이미지를 선택해주세요");
          return;
        }
        //이미지 Map 생성
        this.imagePreviews.forEach((image) => {
          this.imageMap.set(`image-${this.nextImageId}`,image);
          this.busImageMap.set(`image-${this.nextImageId++}`,image);
        });
        
        //자식 컴포넌트에게 busImageMpa전달
        this.$refs.htmlWrite.receiveImages(this.busImageMap);
        
        //imageMap이 업데이트 되었기에 자동으로 자식에게 전달됨
        this.resetImagePreviewsAndFiles();
      },

      //미리보기와 파일 리스트 초기화 메서드
      resetImagePreviewsAndFiles(){
        this.imagePreviews = [];
        const dataTransfer = new DataTransfer();
        this.fileList = dataTransfer.files;

        this.$refs.fileInput.files=this.fileList;
      },

      // leftWrite -> rightRead Update_title
      updateTitle(newTitle) {
        this.title = newTitle;
      },
      // leftWrite -> rightRead Update_content
      updateContent(newContent) {
        this.content = newContent;
      },
      //이미지 미리보기
      handleFileUpload(event){
        const files = event.target.files;
        this.imagePreviews = [];  //기존 미리보기 초기화
        this.fileList = files;  //파일 리스트 업데이트

        Array.from(files).forEach(file => {
          const imageUrl = URL.createObjectURL(file); //이미지 파일 경로 생성(보안때문에 브라우저가 찾을 경로 대신 찾아주는 URL객체)

          //미리보기 이미지 배열에 경로 추가
          this.imagePreviews.push(imageUrl);
        });
      },
      removeImage(index){
        //특정 인덱스의 이미지를 미리보기에서 제거
        this.imagePreviews.splice(index, 1);  

        //새 DataTransfer 객체 생성 후 파일 업데이트
        const dataTransfer = new DataTransfer();
        Array.from(this.fileList).forEach((file, i) => {
          if(i !== index) {
            dataTransfer.items.add(file);
          }
        });
        this.fileList = dataTransfer.files;

        this.$refs.fileInput.files = this.fileList;        
      },
      ImageLinkParse(){
        
      },

      //서버에 포스트의 내용을 보내는 메소드
      async postWrite_server(){
        //이미지 링크 추출 배열
        const regex = /<img id="(.*?)"\s*\/?>/g; // <img> 태그의 id를 추출하기 위한 정규식
        let match;
        
        //이미지 링크는 단순 클라이언트측에서만 유용한 링크이기에 서버로 파일을 보내주는 FormData를 사용해야함
        const formData = new FormData();

        formData.append('postTitle', this.title);
        formData.append('postContent',this.content);

        // content에서 모든 <img> 태그의 id를 찾아서 링크를 추출
        while ((match = regex.exec(this.content)) !== null) {
          const imgId = match[1]; // id 추출
          if (this.imageMap.has(imgId)) {
            const fileUrl = this.imageMap.get(imgId);   //해당 ID의 이미지 경로를 가져옴
            const fileBlob = await fetch(fileUrl).then(res => res.blob());  //Blob객체로 변환(경로를 통해서 실제 이미지 파일을 바이너리로 변환)

            //파일 Blob 추가 FormData객체는 딕셔너리 구조이기에 'images'가 키 ,fileBlob,imgId가 밸류이다.
            //value가 2개이니 { key:[{key:value},{key:value}]} 이런느낌의 json형식임
            formData.append('files', fileBlob, imgId);
          }
        }

        try{
          //Fetch API를 이용한 POST요청
          const response = await fetch('http://119.197.155.172:50052/api/postWrite', {
            method: 'POST',
            body: formData
          });
          
          //이후 서버의 응답 처리
          if(response.ok){
            const result = await response.json();
            alert('게시글 작성 완료!');
            console.log(result);
          }else{
            console.error('서버 응답 에러:',response.statusText);
          }
        }catch(error){
          console.error('에러 발생:',error);
          alert('게시글 작성중 에러 발생');
        }
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
  overflow-y: auto;
}

.rightArea {
  flex: 1 1 50%;  /* 오른쪽 영역 50% */
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #fff;
  box-sizing: border-box;  /* padding, border가 width, height에 포함되도록 함 */
  overflow-x: auto;
  white-space: nowrap;
}
</style>