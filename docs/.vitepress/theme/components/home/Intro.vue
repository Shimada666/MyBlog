<template>
  <div class="intro-header">
    <div class="text-center">
      <div class="title">Shimada666</div>
      <div class="sub-title">「于是转身向大海走去」</div>
    </div>
    <!--<h1><img src="http://cdn.corgi.plus/uPic/diana.jpg" width="80" height="80" loading="lazy"-->
    <!--         class="inline rounded-full object-center md:h-20 md:w-20 h-12 w-12 object-cover">-->
    <!--  <span class="text-2xl ml-4">Shimada666</span>-->
    <!--</h1>-->
    <!--<p>-->
    <!--  和所有的烦恼说拜拜，和所有的快乐说嗨嗨-->
    <!--</p>-->
  </div>
</template>

<script lang="ts" setup>
</script>

<style scoped lang="scss">
.intro-header {
  background: rgb(0, 0, 0, 0.5) url("http://cdn.corgi.plus/uPic/20220328_173430_moon.png") no-repeat center center;
  background-size: cover;
  width: 100%;
  height: 400px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;

  .title {
    font-size: 60px;
    font-weight: 700;
    line-height: 1.1;
  }
  .sub-title {
    font-size: 18px;
    font-weight: 300;
    margin-top: 8px;
  }
}
@media screen and (max-width: 768px) {
  .intro-header {
    height: 240px;
    .title {
      font-size: 40px;
    }
  }
}
</style>
