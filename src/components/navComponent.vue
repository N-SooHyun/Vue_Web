<template>
    <div id="nav">
        <button id="loginBtn" v-if="!userCK" @click="$emit('loginClick')" class="btn btn-primary">로그인</button>
        <button id="logoutBtn" v-if="userCK" @click="$emit('logOut')" class="btn btn-primary">로그아웃</button>
        <button id="postWriteBtn" v-if="userCK" @click="postWriteBtn" class="btn btn-primary">글작성</button>
    </div>
</template>


<script>
export default{
    name: 'navComponent',
    methods:{
        //버튼 클릭 시 부모 컴포넌트에 이벤트를 전달
        postWriteBtn(){
            this.$emit('postWrite');
        },
        logOut(){//로그아웃 버튼 클릭시
            
        },
    },
    props: {
        userCK: {
            type: Boolean,
            default: false,
        }
    }
};
</script>

<style>

#nav {
    text-align: right;
}
#loginBtn, #logoutBtn, #postWriteBtn{
    margin: 0.5rem;
}

</style>