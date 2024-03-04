<script setup lang="ts">
import { onMounted } from 'vue';
const selectWebItem = ref();
const editWebView = ref(false);
const handEditWebView = () => {
  editWebView.value = !editWebView.value;
};
onMounted(() => {

})
</script>
<template>
  <div class="container">
    <div>
      <div class="store-site">
        <div class="title-content">
          <h2>商店網址</h2>
          <p>新增編輯商品、服務或加入相片和描述，即可在線上進行販售與預約，拓展你的線上業務!</p>
        </div>
        <hr style="border: 1 solid #c1bdb8;">
        <div class="store-content">
          <p>線上預約 (0位)</p>
          <div>
            <p>開放預約</p>
          </div>
        </div>
        <div class="store-content">
          <p>店販銷售</p>
          <div>
            <p>已關閉接單</p>
          </div>
        </div>
        <hr style="border: 1 solid #c1bdb8;">
        <div class="store-content">
          <a @click="handEditWebView">編輯網站 ></a>
        </div>
      </div>
    </div>
    <div>
      <div class="list-site">
        <h2>網址列表</h2>
        <p>網站提供不同用途的入口，可以分享於各種平台與服務或傳送給你的顧客使用。</p>
        <hr style="border: 1 solid #c1bdb8;">

        <div class="list-content">
          <div>
            <h3>首頁網址</h3>
            <p>展示商店基本資訊</p>
          </div>
          <div>
            複製連結
          </div>
        </div>
        <hr style="border: 1 solid #c1bdb8;">
        <div class="list-content">
          <div>
            <h3>線上預約網址</h3>
            <p>提供顧客預約項目</p>
          </div>
          <div>
            複製連結
          </div>
        </div>
        <hr style="border: 1 solid #c1bdb8;">
        <div class="list-content">
          <div>
            <h3>店販銷售網址</h3>
            <p>提供顧客選購商品</p>
          </div>
          <div>
            複製連結
          </div>
        </div>
        <hr style="border: 1 solid #c1bdb8;">
        <div class="list-content">
          <div>
            <h3>顧客會員中心</h3>
            <p>提供顧客查看自己的個人紀錄</p>
          </div>
          <div>
            複製連結
          </div>
        </div>
      </div>
    </div>
  </div>
  <EditWeb v-if="editWebView" :webItem="selectWebItem" :handEditWebView="handEditWebView" />
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  color: #717171;
  position: absolute;
  top: 50px;
  bottom: 0px;
  overflow: auto;

  .store-site {
    margin: 10px 5px;
    padding: 0px 5px 10px 5px;
    border: 1.5px solid #c1bdb8;
    border-radius: 10px 10px;

    >.store-content {
      display: flex;
      justify-content: space-between;
      margin: 0 10px;
    }
  }

  .list-site {
    margin: 10px 5px;
    border: 1.5px solid #c1bdb8;
    border-radius: 10px 10px;
    padding: 0px 5px 10px 5px;

    >.list-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 10px;
    }
  }
}
</style>