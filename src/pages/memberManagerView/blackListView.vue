
<script setup lang="ts">
import { storeToRefs } from "pinia";
import Alert from "@/components/alertCmpt";
import { showHttpsStatus, showErrorMsg } from "@/types/IMessage";
import { useCounterStore } from "@/stores/counter";
import { useCompanyStore } from "@/stores/company";
const counterStore = useCounterStore();
const { handLogOut } = counterStore;
const companyStore = useCompanyStore();
const { getBlackListSet, submitBlackListSet } = companyStore;
const { companyBlackListSet } = storeToRefs(companyStore);
const backListSetData: any = reactive({ data: [] });
const backListSet = computed(() => {
  backListSetData.data = JSON.parse(JSON.stringify(companyBlackListSet.value.data));
  return backListSetData.data;
})
onMounted(() => {
  getBlackListSet()
    .then((res) => {
      if (res.state == 2) {
        Alert.warning(showErrorMsg(res.msg), 2000);
      }
    })
    .catch((e: any) => {
      Alert.warning(showHttpsStatus(e.response.status), 2000);
    })
});
const handReturn = (() => {
  backListSetData.data = JSON.parse(JSON.stringify(companyBlackListSet.value.data));
})
const handSubmit = (() => {
  console.log(backListSetData.data)
  submitBlackListSet(backListSetData.data).then((res) => {
    if (res.state == 1) {
      Alert.warning("修改成功", 2000);
    }
    if (res.state == 2) {
      Alert.warning(showErrorMsg(res.msg), 2000);
    }
  })
    .catch((e: any) => {
      Alert.warning(showHttpsStatus(e.response.status), 2000);
      if (e.response.status == 401) {
        setTimeout(() => {
          handLogOut();
        }, 2000);
      }
    })
})
</script>
<template>
  <div class="wrap">
    <div class="content">
      <div class="content_text">
        <h1>黑名單設定</h1>
        <p>黑名單顧客的相關設定</p>
      </div>
      <div class="switch">
        <label><input class="mui-switch" type="checkbox" v-model="backListSet.autoBlackList"></label>
        <div class="switch-content">
          <p><strong>自動加入黑名單</strong></p>
          <p>當顧客被標記未出席達一定次數時，將顧客自動加入黑名單。</p>
          <div class="frequency" v-if="backListSet.autoBlackList">
            <p>未出席次數</p>
            <input type="number" v-model="backListSet.attendance">
          </div>
        </div>
      </div>
      <div class="content_text">
        <h1>黑名單禁止事項</h1>
        <p>限制黑名單顧客使用以下功能</p>
      </div>
      <div class="switch">
        <label><input class="mui-switch" type="checkbox" v-model="backListSet.appointmentOnline"></label>
        <div class="switch-content">
          <p><strong>禁止線上預約</strong></p>
          <p>啟用後，黑名單顧客將無法線上預約，但乃可察看線上服務項目。</p>
        </div>
      </div>
    </div>
    <div class="submitBtn">
      <button @click="handReturn()">取消變更</button>
      <button @click="handSubmit()">確認儲存</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrap {
  position: absolute;
  top: 45px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  width: 100%;
  background-color: #faf9f8;
  border: solid 0.5px #ddd;
  font-family: STXihei;
  color: #717171;

  >.content {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    >.content_text {
      margin: 30px 15px 0;
      border-bottom: solid 1px #929090;

      h1 {
        padding-left: 6px;
      }

      p {
        padding-left: 15px;
      }
    }

    >.switch {
      display: flex;
      align-items: center;
      margin: 0 15px;
      border-bottom: solid 1px #929090;

      >.switch-content {
        margin: 0 15px;
        text-align: left;

        >.frequency {
          display: flex;
          align-items: center;

          >input {
            margin-left: 10px;
            width: 60px;
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
  }

  .submitBtn {
    position: absolute;
    right: 0px;
    bottom: 0px;
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    box-sizing: border-box;
    border-top: solid 0.5px #ddd;
    // font-size: 20px;

    >button {
      border-radius: 6px;
      padding: 5px 15px;
      margin: 0px 10px;
      height: 75%;
      border: transparent;
      background-color: #e6e2de;
      color: #717171;
    }
  }
}
</style>