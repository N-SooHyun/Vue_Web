<template>
    <div>
    <h3>게시글 목록</h3>
    <hr>
    <ul>
        <li v-for="(post, index) in posts" :key="index">
            <button @click="handleButtonClick(post)" class="post-button">
                {{ post[1] }} <!-- 게시글 제목 -->
            </button>
        </li>
    </ul>
  </div>
</template>


<script>
export default{
    data() {
    return {
      posts: [],
      titles: [],
    };
  },
  async created() {
    await this.fetchPosts();
  },
  methods: {
    async fetchPosts() {
      try {
        const response = await fetch('http://119.197.155.172:50052/api/postList'); // API URL
        if (!response.ok) {
          throw new Error('네트워크 응답에 문제가 있습니다.');
        }
        this.posts = await response.json();

        this.posts.forEach(post => {
            console.log(post[1]); // post[1]은 title일 경우
        });
      } catch (error) {
        console.error('게시글을 가져오는 중 오류 발생:', error);
      }
    },
    async handleButtonClick(select_post){
        //select_post[0]=postNo, [1]=title, [2]=ID
        const postNo = select_post[0];  //postNo추출
        console.log(postNo);
        try{
            const response = await fetch(`http://119.197.155.172:50052/api/postContent?postNo=${postNo}`); // API URL+get방식 postNo전송
            if(!response.ok){
                throw new Error('네트워크 응답에 문제가 있습니다.');
            }

            //JSON데이터 받기
            const postData = await response.json();
            console.log(postData);
            
            this.$emit('post_Read_Data', postData);
        }catch(error){
            console.error('게시글을 가져오는 중 오류 발생: ',error);
        }
    },
  },
};
</script>

<style>

</style>