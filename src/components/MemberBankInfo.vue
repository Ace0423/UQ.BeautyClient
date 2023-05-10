<script setup lang="ts">
import { useCounterStore } from "@/stores/memberBank";

import { storeToRefs } from "pinia";
const store = useCounterStore();
const { memberBankInfoList } = storeToRefs(store);
const { getMemberBankDetailList } = store;
const title = ref("儲值明細");
const props = defineProps<{
  memberBankInfoItem: any;
  handmemberBankInfoView: Function;
}>();
const emits = defineEmits<{
  (e: "handEditmemberBank", item: any): void;
}>();
const handEditMemberBank = (item: any) => {
  emits("handEditmemberBank", item);
};
onMounted(() => {
  let userBankInfo = {
    id: props.memberBankInfoItem.userId,
    pageindex: 0,
    count: 0,
  };
  getMemberBankDetailList(userBankInfo);
});
</script>

<template>
  <div class="popup-mask" v-on:click.self="handmemberBankInfoView()">
    <!-- 提示弹窗 -->
    <div class="popup-content">
      <h1>{{ title }}</h1>
      <p>客戶姓名:{{ props.memberBankInfoItem.nameView }}</p>
      <div>
        <table>
          <thead class="header-tab">
            <tr>
              <th>日期</th>
              <th>金額</th>
              <th>類型</th>
              <th>備註</th>
            </tr>
          </thead>
          <tbody class="content-tab">
            <tr
              v-for="item in memberBankInfoList.data"
              :key="item"
              @click="handEditMemberBank(item)"
            >
              <td>
                <p>{{ item.accountDate }}</p>
              </td>
              <td>
                <p>{{ item.income }}</p>
              </td>
              <td>
                <p>{{ item.stateTitle }}</p>
              </td>
              <td>
                <p>{{ item.memo }}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.popup-mask {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 2;
  background: rgba(255, 255, 255, 0.5);

  display: flex;
  align-items: center;
  justify-content: space-around;

  .popup-content {
    width: 60%;
    height: 60%;
    text-align: center;
    position: relative;
    background-color: #e6e2de;
    // padding: 20px 50px;
    font-size: 20px;
    font-family: HeitiTC;
    color: #84715c;
    font-weight: bold;

    > h1 {
      // height: 20px;
      font-size: 30px;
    }

    > p {
      text-align: left;
      height: 25px;
      widows: 100%;
      margin: 0px 0px;
      padding: 0px 25px;
      color: #717171;
    }

    > div {
      position: absolute;
      left: 0px;
      right: 0px;
      top: 66px;
      bottom: 0px;

      > table {
        display: block;
        position: absolute;
        top: 0px;
        bottom: 20px;
        left: 20px;
        right: 20px;
        background-color: #faf9f8;
        border: solid 0.5px #ddd;
        font-family: STXihei;
        color: #717171;

        > .header-tab {
          display: block;
          height: 50px;
          position: absolute;
          left: 0px;
          right: 0px;
          color: #717171;
          border: solid 1px #707070;
          background-color: #e6e2de;
          box-sizing: border-box;

          > tr {
            display: flex;
            align-items: center;
            height: 100%;
            justify-content: space-between;
            margin: 0 10px;

            > th {
              width: 25%;
            }
          }
        }

        > .content-tab {
          position: absolute;
          width: 100%;
          top: 52px;
          bottom: 0px;
          overflow: auto;
          display: block;

          tr {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 2px #717171 solid;

            > td {
              display: flex;
              justify-content: center;
              width: 25%;

              > img {
                cursor: pointer;
                width: 40px;
                height: 40px;
                padding: 5px 10px;
                border-radius: 45px;
              }

              > button {
                height: 100%;
                background-color: transparent;
                border: none;
              }

              > p {
                cursor: pointer;
                margin: 10px 0;
              }
            }
          }
        }
      }
    }
  }
}
</style>