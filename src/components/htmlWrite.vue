<template>
    <div class="html-write">
      <input 
        class="title-input"
        v-model="inputTitle"
        @input="handleTitleInput"
        placeholder="제목을 작성하세요..."
        type="text"
      />
      <textarea 
        class="editor"
        v-model="inputContent"
        @input="handleContentInput" 
        placeholder="글을 작성하세요..." 
        rows="10">
      </textarea>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        inputTitle: "",  // 제목 입력
        inputContent: "",  // 본문 입력
      };
    },
    methods: {
      // 제목 입력 시 부모로 전달
      handleTitleInput() {
        this.$emit('updateTitle', this.inputTitle);
      },
      // 본문 입력 시 부모로 전달
      handleContentInput() {
        this.$emit('updateContent', this.inputContent);  
      },
    },
    watch: {
      // 부모로부터 전달받은 제목이 변경되면 업데이트
      title(newTitle) {
        this.inputTitle = newTitle;
      },
      // 부모로부터 전달받은 내용이 변경되면 업데이트
      content(newContent) {
        this.inputContent = newContent;
      },
    },
    props: {
      title: String,    // 부모로부터 전달받은 제목
      content: String,  // 부모로부터 전달받은 본문 내용
    },
  };
  </script>
  
  <style scoped>
  .html-write {
    width: 100%;
    height: 100%;
  }
  
  .title-input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    background-color: #fff;
    box-sizing: border-box;
  }
  
  .editor {
    width: 100%;
    height: calc(100% - 50px); /* 제목 입력란을 제외한 높이 */
    padding: 10px;
    border: 1px solid #ccc;
    background-color: #fff;
    resize: none;
    box-sizing: border-box;
  }
  
  .editor:focus {
    outline: none;
    border-color: #4CAF50;
  }
  </style>
  