<script setup lang="ts">
onMounted(() => {

})
</script>
<template>
  <div class="container">
    <div class="item-tab">
      <div class="nav">
        <router-link
          to="/settingView/onlineWebSettingsView/reservationSettingsView/onlineBusinessHoursView">線上營業時間</router-link>
        <router-link to="/settingView/onlineWebSettingsView/reservationSettingsView/onlinePayMethodView">收款方式</router-link>
        <router-link to="/settingView/onlineWebSettingsView/reservationSettingsView/otherAdvancedSettings">其他進階設定</router-link>
      </div>
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;

  >.item-tab {
    position: absolute;
    top: 0px;
    right: 0px;
    left: 0px;
    bottom: 0px;
    // border-bottom: solid 1px #c1bdb8;

    >.nav {
      display: flex;
      border-bottom: solid 1px #c1bdb8;
      padding: 0px 15px;

      >a {
        border: none;
        width: 120px;
        height: 45px;
        border-radius: 10px 10px 0 0;
        // background-color: #faf9f8;
        // text-decoration:underline;
        // text-underline-offset:13px;
        font-size: 20px;
        font-weight: bold;
        font-family: HeitiTC;
        color: #717171;
        display: flex;
        justify-content: center;
        align-items: center;

        a:link {
          color: #717171;
        }

        a:visited {
          color: #717171;
        }

        a:hover {
          color: #717171;
        }

        >.router-link-exact-active {
          background-color: #e6e2de;
        }
      }

      >.router-link-exact-active {
        // background-color: #e6e2de;
        color: #000000;
        border-bottom: solid 1px #000000;
      }
    }
  }
}
</style>