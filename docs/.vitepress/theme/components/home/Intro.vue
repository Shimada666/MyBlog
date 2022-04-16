<template>
  <div class="home-header">
    <div class="text-center">
      <div class="title">Shimada666</div>
      <div class="sub-title">「從何時開始對悲劇的嚮往 圓滿了整個心臟」</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style scoped lang="scss">
.home-header {
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
  .home-header {
    height: 240px;
    .title {
      font-size: 40px;
    }
  }
}
</style>
