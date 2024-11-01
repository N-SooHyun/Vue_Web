<template>
    <div class="post-read">
    <!-- 제목 영역 -->
    <h1 class="post-title">{{ postData.title }}</h1>

    <hr />

    <!-- 작성자 ID 및 작성 날짜 -->
    <div class="post-info">
      <span class="post-author">작성자: {{ postData.id }}</span>
      <span class="post-date">작성일: {{ postData.makedate }}</span>
    </div>

    <!-- 게시글 내용 -->
    <div class="post-content">
      <p>{{ postData.content }}</p>
    </div>

    <!-- 이미지 영역 -->
    <div v-if="postData.images && postData.images.length" class="post-images">
      <h3>첨부된 이미지</h3>
      <div class="images-grid">
        <img v-for="(blobUrl, index) in images" :key="index" :src="blobUrl" alt="첨부 이미지" />
      </div>
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
      images: [],  // Blob URL을 담을 배열
    };
  },
    async created() {
        // 이미지를 로드하여 Blob URL 생성
        if (this.postData.images && this.postData.images.length > 0) {
        for (const image of this.postData.images) {
            const response = await fetch(`/api/postImage?imagePath=${image.imagelink}`);
            if (response.ok) {
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);  // Blob을 위한 URL 생성
            this.images.push(blobUrl);  // 배열에 Blob URL 추가
            } else {
            console.error('Failed to load image', image.imagelink);
            }
        }
        }
    },
    
};
</script>

<style>
</style>