<template>
    <div id="postContent">
        <div v-if="mode === 'home'">
            포트폴리오 소개 글<br>
            저의 포트폴리오를 소개합니다.
            저는 이거 만들었다
        </div>
        <post-read-component v-if="mode === 'read'" :postData="postData" @request_logout="token_logout"
            :updatePostNo="postNo"
            :updateTitle="postTitle"
            :updateContent="postContent"
            :updateImages="newImages"
            @editPost="handleEditPost"
        ></post-read-component>
        <post-write-component v-if="mode === 'write'" @request_logout="token_logout"></post-write-component>

        <post-write-component v-if="mode === 'edit'" @request_logout="token_logout"
            :newUpdatePostNo="updatePostNo"
            :newUpdateTitle="updateTitle"
            :newUpdateContent="updateContent"
            :newUpdateImages="updateImages"
        ></post-write-component>
    </div>
    
</template>


<script>
import PostReadComponent from './postReadComponent.vue';
import PostWriteComponent from './postWriteComponent.vue';

export default {
    components:{
        PostReadComponent,
        PostWriteComponent,
    },
    data(){
        return{
            updatePostNo: 0,
            updateTitle: null,
            updateContent: null,
            updateImages: null,
        };
    },
    props: {
        mode:{//home-(default), read, write
            type: String,   
            default: 'home',
        },
        postData:{
            type: Object,
            required: true,
        },  
    },
    methods: {
        token_logout(){
            console.log('token_logout 호출됨');
            this.$emit('logout');
        },
        handleEditPost(payload){
            this.updateTitle = payload.updateTitle;
            this.updateContent = payload.updateContent;
            this.updateImages = payload.updateImages;
            this.updatePostNo = payload.updatePostNo;
            console.log('post에 전달 완료');
            console.log(`updatePostNo: ${this.updatePostNo}`);
            console.log(`updateTitle: ${this.updateTitle}`);
            console.log(`updateContent: ${this.updateContent}`);
            console.log(`updateImages: ${this.updateImages}`);
            this.$emit('editPost');
        }
    },
};
</script>

<style>
</style>