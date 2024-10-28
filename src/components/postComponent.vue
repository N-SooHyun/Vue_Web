<template>
    <div id="postContent">
        <div v-if="mode === 'home'">
            포트폴리오 소개 글<br>
            저의 포트폴리오를 소개합니다.
            저는 이거 만들었다
        </div>
        <post-read-component v-if="mode === 'read'"></post-read-component>
        <post-write-component v-if="mode === 'write'"></post-write-component>
    </div>
    
</template>


<script>
import PostReadComponent from './postReadComponent.vue';
import PostWriteComponent from './postWriteComponent.vue';

export default{
    components:{
        PostReadComponent,
        PostWriteComponent,
    },
    props: {
        mode:{//home-(default), read, write
            type: String,   
            default: 'home',
        },
    },
};
</script>

<style>
</style>