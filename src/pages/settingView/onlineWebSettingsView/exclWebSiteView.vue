<script setup lang="ts">
import Icon from "@/assets/Icon material-settings.svg";

const aaa = ref(true);
onMounted(() => {
})

</script>
<template>
  <div class="container">
    <div class="switch">
      <label><input class="mui-switch" type="checkbox" v-model="aaa"></label>
      <div class="switch-content">
        <p><strong>啟用網站服務</strong></p>
        <p>你的商店與服務人員都將雍有客製化網站，皆可提供預約與銷售商品，並可管理想要呈現給消費者的內容。</p>
      </div>
      <div class="hint-tag">
        <label class="label-item">
          <input class="input-item" type="checkbox" v-model="aaa" disabled="true" />
          <label for="item"></label>
          <div>
            <nobr>網站未公開</nobr>
          </div>
        </label>
      </div>
    </div>
    <div class="item-tab">
      <div class="nav">
        <router-link to="/settingView/onlineWebSettingsView/exclWebSiteView/storeWebsiteView">商店網站</router-link>
        <router-link to="/settingView/onlineWebSettingsView/exclWebSiteView/serviceStaffWebsiteView">服務人員網站</router-link>
      </div>
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;

  >.switch {
    display: flex;
    align-items: center;
    width: 100%;

    >.switch-content {
      margin: 0 15px;
      text-align: left;
    }

    >.hint-tag {
      padding: 10px 10px 10px 0px;
      border-radius: 5px;
      background-color: #faf9f8;

      .label-item {
        display: flex;
        align-items: center;
        width: 100%;
        margin-left: 15px;

        input {
          display: none;
        }

        >label {
          display: inline-block;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 1px solid #c1bdb8;
          position: relative;
          cursor: pointer;
        }

        >label::before {
          display: inline-block;
          content: " ";
          width: 12px;
          border: 2px solid #fff;
          height: 4px;
          border-top: none;
          border-right: none;
          transform: rotate(-45deg);
          top: 5px;
          left: 3px;
          position: absolute;
          opacity: 0;
        }

        >input:checked+label {
          background: #64bd63;
        }

        >input:checked+label::before {
          opacity: 1;
          transform: all 0.5s;
        }

        >span {
          margin-left: 10px;
        }

        >div {
          display: grid;
          margin-left: 10px;

          .timer-msg {
            font-size: 15px;
          }
        }
      }

    }

    .mui-switch {
      width: 52px;
      height: 31px;
      position: relative;
      border: 1px solid #dfdfdf;
      margin-left: 15px;
      background-color: #fdfdfd;
      box-shadow: #dfdfdf 0 0 0 0 inset;
      border-radius: 20px;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
      background-clip: content-box;
      display: inline-block;
      -webkit-appearance: none;
      user-select: none;
      outline: none;
    }

    .mui-switch:before {
      content: '';
      width: 29px;
      height: 29px;
      position: absolute;
      top: 0px;
      left: 0;
      border-radius: 20px;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
      background-color: #fff;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    }

    .mui-switch:checked {
      border-color: #64bd63;
      box-shadow: #64bd63 0 0 0 16px inset;
      background-color: #64bd63;
    }

    .mui-switch:checked:before {
      left: 21px;
    }
  }

  >.item-tab {
    position: absolute;
    top: 112px;
    right: 0px;
    left: 15px;
    bottom: 0px;
    // border-bottom: solid 1px #c1bdb8;

    >.nav {
      display: flex;
      border-bottom: solid 1px #c1bdb8;

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