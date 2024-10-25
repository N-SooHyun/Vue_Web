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
      };
    },
    methods: {
      // 왼쪽에서 입력한 제목을 업데이트
      updateTitle(newTitle) {
        this.title = newTitle;
      },
      // 왼쪽에서 입력한 본문을 업데이트
      updateContent(newContent) {
        this.content = newContent;
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