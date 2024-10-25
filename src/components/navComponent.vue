<template>
    <div id="nav">
        <button @click="$emit('loginClick')" class="btn btn-primary">로그인</button>
        <button @click="postWrite" class="btn btn-primary">글작성</button>
    </div>
</template>


<script>
export default{
    name: 'navComponent',
    methods:{
        //버튼 클릭 시 부모 컴포넌트에 이벤트를 전달
        postWrite(){
            this.$emit('postWrite');
        },
    },
};
</script>

<style>

#nav {
    text-align: right;
}
</style>