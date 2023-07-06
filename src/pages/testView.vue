<template>
  <div class="container">
    <div class="header">
      <Header
        :Icon="logoIcon"
        :moduleType="'Api測試'"
        :memuState="props.memuState"
        :handmemuStateBtn="props.handmemuStateBtn"
      >
      </Header>
    </div>
    <div class="content">
      <div class="tabs-content">
        <button
          :class="showContentRef == index ? 'active' : ''"
          v-for="(item, index) in dataTabsRef"
          :key="item.id"
          v-on:click="changeTab(index, item)"
        >
          {{ item.name }}
        </button>
      </div>
      <div v-if="showContentRef == 0">
        <div>
          <p>api</p>
          <textarea v-model="dataApiRef" class="api-content"></textarea>
          <p>需求?</p>
          <textarea v-model="dataReqRef" class="api-content"></textarea>
          <p>內容</p>
          <textarea v-model="dataBodyRef" class="textarea-content"></textarea>
          <p>操作</p>
          <div>
            <button @click="submitBtnFn('GET')">GET</button>
            <button @click="submitBtnFn('POST')">POST</button>
            <button @click="submitBtnFn('PUT')">PUT</button>
            <button @click="submitBtnFn('DELETE')">DELETE</button>
            <button @click="setDataFn()">清空數據</button>
          </div>
          <p>測試資料</p>
          <div>
            <button @click="updaetApiDataFn(0)">獲取範例</button>
            <button @click="updaetApiDataFn(1)">新增範例</button>
            <button @click="updaetApiDataFn(2)">更新範例</button>
          </div>
          <div>
            <button @click="updaetApiDataFn(3)">刪除範例</button>
            <button @click="setDataFn()">清空數據</button>
          </div>
        </div>
        <div>
          <pre>{{ dataJsonRef }} </pre>
        </div>
      </div>
      <div v-else></div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import logoIcon from "@/assets/Icon zocial-guest.svg";
import { useApptStore } from "@/stores/shareStore";
import Alert from "@/components/alertCmpt";
import { showErrorMsg } from "@/types/IMessage";

const props = defineProps<{
  memuState: any;
  handmemuStateBtn: Function;
}>();
let store = useApptStore();
let {} = storeToRefs(store);
let { getApiTestApi, addApiTestApi, updateApiTestApi, delApiTestApi } = store;

const showContentRef = ref(0);
const dataApiRef = ref("/api/Discounts/CouponCard");
const dataReqRef = ref("?CCId=1");
const dataBodyRef: any = ref("");
const dataJsonRef = ref("");

let exData = [
  {
    name: "GET",
    url: "/api/Discounts/CouponCard",
    req: "?CCId=0&select=1&type=-1&pageIndex=0&count=0",
    body: "",
  },
  {
    name: "POST",
    url: "/api/Discounts/CouponCard",
    req: "",
    body: '{"ccId":1,"ccType":1,"ccTitle": "100元優惠"ccTheme: "","ccImage": "","ccItemType": 1,"ccOnDate": 2,"ccSdt": "","ccEdt": "","ccDateOfDay": 90,"ccLimit": 50,"ccDiscountType": 1,"ccDiscount": 100,"ccAccountType": 0,"servicesList": [],"productList": [],"groupList": [],"dateCreate": "2023-07-03T16:26:36.813"}',
  },
  {
    name: "PUT",
    url: "/api/Discounts/CouponCard",
    req: "?CCId=1",
    body: '{"ccId": 0,"ccTitle": "優惠400","ccTheme": "母親節","ccType": 0,"ccImage": "","ccItemType": 0,"ccOnDate": 2,"ccSdt": "2023-07-05 00:00:00","ccEdt": "2023-07-05 23:59:59","ccDateOfDay": 7,"ccLimit": -1,"ccDiscountType": 2,"ccDiscount": "4000","ccAccountType": 0,"serviceMaps": [],"productMaps": [],"groupMaps": []}',
  },
  {
    name: "DELETE",
    url: "/api/Discounts/CouponCard",
    req: "?CCId=1003",
    body: "",
  },
];

let dataTabsRef: any = ref([
  {
    id: 0,
    name: "api測試",
  },
  {
    id: 1,
    name: "空白",
  },
]);

function changeTab(index: number, item: any) {
  showContentRef.value = index;
}

function setDataFn() {
  dataApiRef.value = "";
  dataReqRef.value = "";
  dataBodyRef.value = "";
  dataJsonRef.value = "";
}
function submitBtnFn(data: any) {
  let url = (dataApiRef.value + dataReqRef.value).replace("api/", "");
  //   console.log("url", url);
  //   console.log("dataBodyRef",dataBodyRef.value);

  //   console.log(JSON.parse());
  //'{"name": "Franc","department":"sales","salary":5000}'

  switch (data) {
    case "GET":
      getApiTestApi(url).then((res: any) => {
        dataJsonRef.value = res.data;
      });
      break;
    case "POST":
      /** */
      addApiTestApi(url, JSON.parse(dataBodyRef.value)).then((res: any) => {
        dataJsonRef.value = res;
      });
      break;
    case "PUT":
      /**更新 */
      updateApiTestApi(url, JSON.parse(dataBodyRef.value)).then((res: any) => {
        dataJsonRef.value = res;
      });
      break;
    case "DELETE":
      delApiTestApi(url).then((res: any) => {
        dataJsonRef.value = res;
      });
      break;

    default:
      break;
  }
}
function updaetApiDataFn(data: any) {
  dataApiRef.value = exData[data].url;
  dataReqRef.value = exData[data].req;
  dataBodyRef.value = exData[data].body;
}
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 5px;
  right: 5px;
  //   background-color: aqua;
  .header {
    // background-color: rgb(255, 251, 0);
    height: 80px;
  }
  .content {
    // margin-top: 80px;
    // background-color: rgb(255, 0, 0);
    display: block;
    height: calc(100% - 80px - 80px);
    > div {
      display: flex;
      height: calc(100% - 50px);
      border: solid 0.5px #ddd;
      > div {
        width: 50%;
        //   display: flex;
        .textarea-content {
          width: 400px;
          height: 100px;
        }
        .api-content {
          width: 400px;
          height: 30px;
        }
        div {
          display: flex;
          > button {
            margin: 5px;
          }
        }
        > span {
          display: block;
          width: 100%;
          height: 100%;
          border: solid 1px #000000;
          box-sizing: border-box;
        }
        > pre {
          display: block;
          width: 100%;
          height: 100%;
          border: solid 1px #000000;
          box-sizing: border-box;
          margin: 0px;
        }
      }
    }
    .tabs-content {
      height: 30px;
      align-items: end;
      border: solid 0px #000000;
      > button {
        white-space: nowrap;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        background-color: #faf9f8;
        font-weight: bold;
        font-family: HeitiTC;
        color: #717171;
        height: 100%;
        font-size: 20px;
        min-width: 100px;
        border-radius: 8px 8px 0 0;
      }
      > button.active {
        background-color: #e6e2de;
      }
    }
  }
  .footer {
    // background-color: rgb(47, 0, 255);
    height: 80px;
  }
}
</style>
