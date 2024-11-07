<template>
    <div class="post-read">
    <!-- 제목 영역 -->
    <h1 class="post-title">{{ this.postTitle }}</h1>

    <hr />

    <!-- 작성자 ID 및 작성 날짜 -->
    <div class="post-info">
      <span class="post-author">작성자: {{ this.postId }}</span>
      <span class="post-date">작성일: {{ this.postMakeDate }}</span>
      <button @click="handleEditClick">수정</button>
      <button @click="handleDeleteClick">삭제</button>
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
      postNo: 0,
      postTitle: null,
      postContent: null,
      postId: null,
      postMakeDate: null,
      images: [],  // 이미지 경로와 ID를 담을 배열
      newImages: new Map(),   //이미지 ID와 경로에따라 받아온 파일 blob
      formattedContent: null, //이미지를 파싱하고 새롭게 만들어지는 content
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
        immediate: false,   //컴포넌트 생성 시에도 실행
      },
  },
    methods: {  
      //삭제하기 버튼 클릭 시 실행되는 메소드
      async handleDeleteClick(){
        const token = localStorage.getItem('token');

        if(!token){
          alert('권한이 필요합니다.');
          return; 
        }       
        

        try{
          //API요청을 보냅니다.
          const response = await fetch(`http://119.197.155.172:50052/api/DelPost/${this.postNo}`,{
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,  //헤더에 토큰 포함
            },
          }); 
          // 서버에서 삭제 요청이 정상적으로 처리되면
          if (response.ok) {
            const result = await response.json();  // 서버의 응답을 JSON 형식으로 받습니다.
            alert('게시글이 삭제되었습니다.');
            console.log(result);

            // 삭제 후 페이지를 새로 고침하거나, 다른 동작을 처리할 수 있습니다.
            // 예를 들어, 홈으로 이동:
            window.location.href = '/';
          }else{
            console.error('삭제 실패:', response.statusText);
            alert('게시글 삭제에 실패했습니다.');
          }
        }catch(error){
          console.error('오류,',error);
          alert('서버와 연결할 수 없습니다. 다시 시도해주세요');
        }

      },
      //수정하기 버튼 클릭 시 실행되는 메소드
      async handleEditClick(){
        const token = localStorage.getItem('token');

        if(!token){
          alert('로그인이 필요합니다.');
          return; 
        }

        try{
          const response = await fetch('http://119.197.155.172:50052/api/reqUpdate', {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`, 
            }              
          });
          if(!response.ok){
            alert('세션이 만료되었습니다. 다시 로그인하세요');
            this.$emit('request_logout'); //로그아웃 요청
            throw new Error('글 수정 실패');
          }else{
            this.$emit('editPost', {
              updatePostNo: this.postNo,
              updateTitle: this.postTitle,
              updateContent: this.postContent,
              updateImages: Array.from(this.newImages.entries()).map(([key, value]) => ({key, value}))
            });
          }
          const result = await response.json();
          console.log(result);
        }catch(error){
          console.error('오류,',error);
        }

      },
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
        this.postNo = postData.postno;
        this.postTitle = postData.title;
        this.postContent = postData.content;
        this.postId = postData.id;
        this.postMakeDate = this.formatDate(postData.makedate);
        this.newImages.clear();
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

      //1. postContent -> formattedContent parse
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
        //console.log(`formattedContent: ${this.formattedContent}`);

        //화면에 새로운 formattedContent가 반영된 후 이미지 로딩을 시작
        this.loadImagesAfterRender();
      },
      //2. MutationObserver를 사용하여 이미지 태그가 추가될 때 서버에서 이미지를 미리 받아오기
      loadImagesAfterRender(){
        //nextTick을 사용하여 DOM이 갱신된 후에 MutationObserver 실행 콜백함수임
        this.$nextTick(async() => {
          //console.log("DOM 업데이트 완료");
          
          //img태그들을 모두 찾아서 순차적으로 처리
          const imgElements = document.querySelectorAll('img');

          if(imgElements.length == 0){
            //console.log("이미지 태그가 존재하지 않습니다.");
            return;
          }

          //각 img 태그에 대해 이미지 처리
          for(let img of imgElements){
            const imgId = img.id;
            const imgSrc = img.src;

            try{
              //서버에서 이미지를 Blob로 받아오기
              const imageBlob = await this.fetchImagesAsBlob(imgSrc);

              //Blob이 성공적으로 받아졌다면 newImages에 저장
              if(imageBlob){
                this.newImages.set(imgId, imageBlob);
                //console.log(`이미지 Blob저장 완료: ${imgId}`);

                //Blob URL을 생성하여 img 태그의 src로 설정
                const imageURL = URL.createObjectURL(imageBlob);
                img.src = imageURL;

                //console.log(`이미지 로딩 완료: ${imgId}`);
              }else{
                console.log(`이미지 로드 실패: ${imgId}`);
              }
            }catch(error){
              console.error("이미지 로드 중 오류 발생:",error);
            }
          }
          console.log(`formattedContent: ${this.formattedContent}`);
          console.log(`newImages 개수: ${this.newImages.size}`);
          console.log(`게시글 번호 : ${this.postNo}`);
        });
      },

      //3. 서버로부터 이미지를 받아와 blob화 시키는 메소드
      fetchImagesAsBlob(url){
        return fetch(url).then(response => {
        if (!response.ok) {
          throw new Error(`이미지 요청 실패: ${response.statusText}`);
        }
          return response.blob();
        })
        .catch(err => {
          console.error('이미지 로드 실패:', err);
          return null;
        });
    },   
    unmounted() {
      this.createdUrls.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    },
  }
}
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
  align-items: center;
  color: #555;
  margin-bottom: 15px;
}

.post-author {
  flex: 1;  /* '작성자'는 왼쪽 정렬 */
}

.post-date {
  margin-left: 20px;  /* '작성일'과 '수정하기' 버튼 사이의 간격 */
  margin-right: 20px;  /* '수정하기' 버튼과의 간격 */
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