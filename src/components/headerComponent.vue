<template>
    <header class="header">
        <h1>
            <span class="logoHome" @click="goHome">
                Vue를 이용한 포트폴리오
            </span>
        </h1>
    </header>
</template>


<script>
export default{
    name : 'headerComponent',
    methods : {
        goHome(){
            window.location.href = '/';
        }
    }
};
</script>

<style>
.header {
  background-color: #f1f1f1;
  border: 1px solid #000;
  padding: 1px;
  text-align: center;
  font-size: 10px;
}

.logoHome {
    cursor: pointer;
}
</style>