<template>
    <div id="postContent">
        <div v-if="mode === 'home'">
            포트폴리오 소개 글<br>
            저의 포트폴리오를 소개합니다.
            저는 이거 만들었다
        </div>
        <post-read-component v-if="mode === 'read'" :postData="postData"></post-read-component>
        <post-write-component v-if="mode === 'write'" @request_logout="token_logout"></post-write-component>
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
    },
};
</script>

<style>
</style>