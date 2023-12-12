<template>
  <div class="popup-mask2" v-on:click.self="showAddForm(false)">
    <div class="popup-content">
      <div class="top-content">
        <img :src="icon_closeX" v-on:click="showAddForm(false)" />
        <span>新增服務</span>
        <button class="otherpay-btn" v-on:click="submitBtn()">確認新增</button>
      </div>
      <div class="main-content">
        <div class="center-main">
          <div class="input-item" name="基本資訊">
            <span class="title-content">基本資訊</span>
            <span class="msg-content">填寫你的服務項目基本資訊。</span>
            <div>
              <span>*服務名稱</span>
              <input v-model="formInputRef.name" placeholder="請輸入服務名稱" type="text" />
            </div>
            <span class="p_error" v-if="ruleLists.ruleItem.name.is_error">
              {{ ruleLists.ruleItem.name.warn }}
            </span>
            <div>
              <span>簡稱</span>
              <input v-model="formInputRef.nickName" placeholder="最多輸入四個字簡稱" type="text" />
            </div>
            <div class="textMsg-content">
              <span>說明</span>
              <textarea v-model="formInputRef.memo" placeholder="請輸入說明或注意事項"></textarea>
            </div>
          </div>
          <div class="input-radio" name="服務顏色">
            <span class="title-content">服務顏色</span>
            <!-- <span class="msg-content">選擇呈現於行事曆的預約顏色</span> -->
            <div>
              <RadioColorUI :selColorIndex="formInputRef.color" :updataColorFn="updataColorFn" :coloarSize="60" />
            </div>
          </div>
          <div class="input-item" name="使用期限">
            <div>
              <span>*項目類型</span>
              <div class="select-content">
                <el-select :popper-append-to-body="false" popper-class="select" v-model="formInputRef.subType"
                  @change="changeValue()">
                  <el-option v-for="(item, index) in childrenTab" :key="index" :value="item.id" :label="item.name">
                    {{ item.name }}
                  </el-option>
                </el-select>
              </div>
            </div>
            <div v-if="formInputRef.subType == 0">
              <span>*價格</span>
              <input v-model="formInputRef.price" placeholder="請輸入價格" type="text" />
            </div>
            <span class="p_error" v-if="ruleLists.ruleItem.price.is_error && formInputRef.subType == 0">
              {{ ruleLists.ruleItem.price.warn }}
            </span>
            <div v-if="formInputRef.subType == 0">
              <span>*服務時長</span>
              <div class="select-content">
                <el-select :popper-append-to-body="false" popper-class="select" v-model="formInputRef.servicesTime"
                  placeholder="請選擇服務時數" @change="changeValue()">
                  <el-option v-for="(item, index) in timeGroup" :key="index" :label="item" :value="item">
                    {{ item }}
                  </el-option>
                </el-select>
              </div>
            </div>
            <span class="p_error" v-if="ruleLists.ruleItem.servicesTime.is_error && formInputRef.subType == 0">
              {{ ruleLists.ruleItem.servicesTime.warn }}
            </span>
            <div class="link-btn" v-if="formInputRef.subType == 1">
              <span>新增服務子項目</span>
            </div>
          </div>
          <div class="input-switch" name="其他設定">
            <span class="title-switch">其他設定</span>
            <div class="box-switch">
              <div class="switch">
                <input type="checkbox" id="switch" v-model="formInputRef.isBonusOpen" /><label for="switch">Toggle</label>
              </div>
              <div class="label-info">
                <label>服務是否提供抽成</label>
                <span>開啟後，系統將按人員分潤設定比例白動計算抽成金額</span>
              </div>
            </div>
            <div class="box-switch">
              <div class="switch">
                <input type="checkbox" id="switch3" v-model="formInputRef.display" /><label for="switch3">Toggle2</label>
              </div>
              <div class="label-info">
                <label>上架 </label>
                <span>開啟後，你的顧客即可透過線上預約瀏覽此項目</span>
              </div>
            </div>
            <div class="box-switch">
              <div class="switch">
                <input type="checkbox" id="switch2" v-model="formInputRef.isEditAccounting" /><label
                  for="switch2">Toggle1</label>
              </div>
              <div class="label-info">
                <label> 是否允許結帳時修改金額</label>
                <span>開啟後，結帳時可手動調整服務金額</span>
              </div>
            </div>
          </div>
          <div class="input-item" name="服務群組">
            <div class="bottom-item">
              <span>服務群組</span>
              <div class="link">
                <span @click="showCGroupsUIFn(true)">加入群組</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-content"></div>
    </div>
  </div>
  <SelectItemUI v-if="showSelItemUIRef" :showUIFn="showSelItemUIFn">
  </SelectItemUI>
  <CbServiceGroupsUI v-if="showSelGroupsUIRef" :selData="formInputRef.sgIdList" :getDataFn="getCGroupsFn"
    :showCGroupsUIFn="showCGroupsUIFn">
  </CbServiceGroupsUI>
</template>
  
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useApptStore } from "@/stores/apptStore";
import icon_closeX from "@/assets/images/icon_closeX.png";
import icon_ticket from "@/assets/images/icon_cancle.png";
import { checkVerify_all, formatZeroDate } from "@/utils/utils";
import Alert from "../alertCmpt";
import { showErrorMsg } from "@/types/IMessage";

let store = useApptStore();
let { } = storeToRefs(store);
let { addServiceDetailApi } = store;

const props = defineProps<{
  showAddForm: Function;
}>();
let showSelItemUIRef = ref(false);
let showSelGroupsUIRef = ref(false);

let childrenTab = [
  {
    id: 0,
    name: "無子項目",
  },
  // {
  //   id: 1,
  //   name: "多項子項目",
  // },
];
let timeGroup: any = ref(["30", "60", "90", "120", "150", "180", "210", "240"]);
let formInputRef: any = ref({
  name: "",
  nickName: "",
  memo: "",
  display: false,
  servicesTime: null,
  price: null,
  isBonusOpen: false,
  isEditAccounting: false,
  color: "#fb9ea6",
  colorIndex: 0,
  subType: 0,
  sgIdList: [],
});
onMounted(() => {
  // console.log('onMounted');
});

var date = new Date();

formInputRef.value.startDate =
  date.getFullYear() +
  "-" +
  formatZeroDate(date.getMonth() + 1) +
  "-" +
  formatZeroDate(date.getDate());
formInputRef.value.endDate =
  date.getFullYear() +
  "-" +
  formatZeroDate(date.getMonth() + 1) +
  "-" +
  formatZeroDate(date.getDate());

function showSelItemUIFn(state: boolean) {
  showSelItemUIRef.value = state;
}

function submitBtn() {

  ruleLists.ruleItem.name.value = formInputRef.value.name;
  ruleLists.ruleItem.price.value = formInputRef.value.price;
  ruleLists.ruleItem.servicesTime.value = formInputRef.value.servicesTime;

  if (formInputRef.value.subType == 1) {
    ruleLists.ruleItem.price.value = 1;
    ruleLists.ruleItem.servicesTime.value = 1;
  }
  if (!checkVerify_all(ruleLists)) return;




  let curGroupMaps = [];
  for (let i = 0; i < formInputRef.value.sgIdList.length; i++) {
    const element = formInputRef.value.sgIdList[i];
    curGroupMaps.push(element.pgId);
  }
  let apiData = {
    sId: 0,
    name: formInputRef.value.name,
    nickName: formInputRef.value.nickName,
    memo: formInputRef.value.memo,
    display: formInputRef.value.display,
    servicesTime: formInputRef.value.servicesTime,
    price: formInputRef.value.price,
    discount: formInputRef.value.discount,
    isBonusOpen: formInputRef.value.isBonusOpen,
    isEditAccounting: formInputRef.value.isEditAccounting,
    sgIdList: formInputRef.value.sgIdList,
    color: formInputRef.value.color,
  };
  console.log(apiData);

  /**新增 */
  addServiceDetailApi(apiData).then((res: any) => {
    if (res.state == 1) {
      Alert.sussess("成功", 1000);
      setTimeout(() => {
        props.showAddForm(false);
      }, 1000);
    } else {
      Alert.warning(showErrorMsg(res.msg), 1000);
    }
  });
}
function updateImgUrl() {
  // console.log("更新圖片");
}
function changeValue() {
  // console.log(formInputRef.value.subType);
  // formInputRef.value.subType = formInputRef.value.subType == 0 ? 1 : 0;
}
function getCGroupsFn(data: any) {
  formInputRef.value.sgIdList = data;
  showCGroupsUIFn(false)
}
function showCGroupsUIFn(data: boolean) {
  showSelGroupsUIRef.value = data;
}
function updataColorFn(params: any) {
  formInputRef.value.color = params
}
//#region 規則
const ruleLists: any = reactive({
  ruleItem: {
    name: {
      label: "名稱",
      rules: {
        required: {
          warn: "此項為必填",
        },
      },
      is_error: false,
      warn: "",
    },
    price: {
      label: "價格",
      rules: {
        required: {
          warn: "此項為必填",
        },
      },
      is_error: false,
      warn: "",
    },
    servicesTime: {
      label: "時長",
      rules: {
        required: {
          warn: "此項為必填",
        },
      },
      is_error: false,
      warn: "",
    },
  },
});
//#endregion
</script>
  
<style lang="scss">
.el-select-dropdown {
  top: 0px;
}
</style>
<style scoped lang="scss">
.popup-mask2 {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 3;
  background: rgba(255, 255, 255, 0.5);

  display: flex;
  align-items: center;
  justify-content: space-around;

  .popup-content {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    font-size: 20px;
    font-family: HeitiTC;
    color: #84715c;
    font-weight: bold;

    .top-content {
      display: flex;
      height: 70px;
      border: solid 1px #ddd;
      box-sizing: border-box;

      >span {
        display: flex;
        width: calc(100%);
        justify-content: center;
        align-items: center;
        font-size: 28px;
        height: 70px;
        // height: 100px;
        justify-content: center;
      }

      >img {
        position: absolute;
        width: 41px;
        height: 38px;
        top: 15px;
        left: 15px;
      }

      >button {
        position: absolute;
        width: 150px;
        height: 50px;
        top: 10px;
        right: 10px;
        border-radius: 5px;
        border: none;
        background-color: #84715c;
        color: #fff;
      }
    }

    .main-content::-webkit-scrollbar {
      display: none;
      /* Chrome Safari */
    }

    .main-content {
      display: flex;
      height: calc(100% - 70px - 20px);
      justify-content: center;
      overflow-y: auto;


      scrollbar-width: none;
      /* firefox */
      -ms-overflow-style: none;
      /* IE 10+ */

      .center-main {
        width: 60%;
        height: 100%;
        // border-right: solid 0.5px #ddd;
        box-sizing: border-box;

        // overflow: hidden;

        .input-item {
          display: grid;
          width: 100%;
          // margin-left: 5%;
          margin: 15px 0;

          .title-content {
            font-size: 28px;
            width: 100%;
          }


          .msg-content {
            font-size: 20px;
            color: #c1bdb8;
            margin-bottom: 10px;
          }

          .select-content {
            width: calc(100% - 180px);

            .el-select {
              width: 100%;

              :deep(.el-input__wrapper) {
                width: 100%;
                height: 77px;
                font-size: 24px;

                :deep(.el-select-dropdown) {
                  border: 1px solid #ff0000 !important;
                }
              }

              input {
                font-size: 12px;
                border: none;
                background: none;
                text-align: center;
                font-weight: bold;
              }
            }
          }


          .input-timer {
            width: calc(100% - 180px);
            height: 100%;
            margin-left: 0;

            .el-input__inner {
              height: 100px;
            }
          }

          .percent-input {
            width: calc(100% - 180px - 180px);
          }

          .textMsg-content {
            display: flex;
            height: 100px;
            width: 100%;
            border: solid 0.5px #ddd;
            box-sizing: border-box;

            textarea {
              width: calc(100% - 180px);
              height: 99%;
              border: solid 0px #ddd;
              box-sizing: border-box;
            }
          }

          >div {
            display: flex;
            height: 80px;
            width: 100%;
            border: solid 0.5px #ddd;
            box-sizing: border-box;

            // margin: 15px 0;
            .link {
              display: flex;
              height: 100%;
              width: calc(100% - 180px);
              justify-content: center;
              align-items: center;
              color: #87ceeb;
            }

            >span {
              height: 100%;
              width: 180px;
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: #faf9f8;
              font-size: 24px;
            }

            >input {
              border: solid 0px #c1bdb8;
              box-sizing: border-box;
              height: 100%;
              width: calc(100% - 180px);
              font-size: 22px;
            }

            >p {
              color: #87ceeb;
              width: calc(100% - 180px);
            }

            ::placeholder {
              color: #c1bdb8;
            }
          }

          .link-btn {
            font-size: 28px;
            width: 100%;

            >span {
              color: #87ceeb;
              font-size: 28px;
              width: 100%;
            }
          }

        }


        .input-radio {
          display: grid;
          width: 100%;
          // margin-left: 5%;
          margin-top: 3%;

          .title-content {
            font-size: 28px;
            width: 100%;
            // .el-select{
          }

          .msg-content {
            font-size: 20px;
            color: #c1bdb8;
            margin-bottom: 10px;
          }

        }


        .input-switch {
          // padding: 0px 15px;
          width: 100%;
          height: 300px;
          // border: 1px solid #000;

          .title-switch {
            display: block;
            height: 60px;
            width: 100%;
            text-align: left;
            font-size: 28px;
            text-align: left;
            color: #877059;
            font-weight: bold;
            border-bottom: 1px solid #000;
          }

          .box-switch {
            display: flex;
            width: 100%;
            height: calc(100% / 4);
            align-items: center;
            // margin-top: 15px;

            box-sizing: border-box;
            // border-top: 1px solid #000;
            border-bottom: 1px solid #000;

            .label-info {
              display: grid;
              width: calc(100% - 80px);
              height: 100%;

              >label {
                color: #707070;
                font-size: 26px;
                margin-left: 20px;
              }

              >span {
                color: #c1bdb8;
                font-size: 20px;
                margin-left: 20px;
              }
            }
          }

          .switch {
            align-items: center;
            display: flex;
            width: 80px;
            height: 40px;
            // object-fit: contain;
            // aspect-ratio: 2/1;

            input[type="checkbox"] {
              height: 0;
              width: 0;
              visibility: hidden;
            }

            label {
              cursor: pointer;
              text-indent: -9999px;
              width: 100%;
              height: 100%;
              background: grey;
              display: block;
              border-radius: 50px;
              position: relative;
            }

            label:after {
              content: "";
              position: absolute;
              top: 1px;
              left: 1px;
              width: calc(50% - 2px - 1px);
              height: calc(100% - 2px - 1px);
              background: #fff;
              border-radius: 90px;
              transition: 0.3s;
            }

            input:checked+label {
              background: #877059;
            }

            input:checked+label:after {
              left: calc(100% - 1px);
              transform: translateX(-100%);
            }

            label:active:after {
              width: calc(50% - 2px - 1px);
              ;
            }

            // centering
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
            }
          }
        }
      }
    }

    .bottom-content {
      display: flex;
      height: 20px;
    }
  }
}

.p_error {
  color: #fc0505;
  width: 100%;
}

.link-bottom {
  padding: 0 5px;
  opacity: 0.5;
  margin: auto;
  width: 80%;
  height: 2px;
  background-color: #707070;
}
</style>
  