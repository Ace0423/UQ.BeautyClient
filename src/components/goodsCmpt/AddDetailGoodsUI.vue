<template>
  <div class="popup-AddGoodsDetailUI" v-on:click.self="showAddUIFn(false)">
    <div class="popup-content">
      <div class="top-content">
        <img :src="icon_closeX" v-on:click="showAddUIFn(false)" />
        <span>新增商品</span>
        <button class="otherpay-btn" v-on:click="submitBtn()">確認新增</button>
      </div>
      <div class="main-content">
        <div class="center-main">
          <div class="input-item" name="基本資訊">
            <span class="title-content">基本資訊</span>
            <span class="msg-content">填寫你的商品基本資訊。</span>
            <div class="name-content">
              <div class="name-info">
                <div>
                  <span>*商品名稱
                  </span>
                  <input v-model="formInputRef.name" placeholder="請輸入服務名稱" type="text" />
                </div>
                <div class="textMsg-content">
                  <span>說明</span>
                  <textarea v-model="formInputRef.memo" placeholder="請輸入商品說明"></textarea>
                </div>
                <div>
                  <span>*銷售價格</span>
                  <input v-model="formInputRef.price" placeholder="請輸入商品銷售價格" type="text" />
                </div>
                <span class="p_error" v-if="ruleLists.ruleItem.price.is_error">
                  {{ ruleLists.ruleItem.price.warn }}
                </span>
                <span class="p_error" v-if="ruleLists.ruleItem.name.is_error">
                  {{ ruleLists.ruleItem.name.warn }}
                </span>
              </div>
              <div class="img-info">
                <div :style="{ '--color': formInputRef.color }" class="img-bg">

                </div>
              </div>
            </div>
          </div>
          <div class="input-item" name="項目類型">
            <div class="horizontal-content">
              <div>
                <span>單位</span>
                <div>
                  <el-select :popper-append-to-body="false" popper-class="select" v-model="formInputRef.unit"
                    placeholder="請選擇單位" @change="changeValue()">
                    <el-option v-for="(item, index) in goodsUnitGroup" :key="item" :value="index" :label="item">
                      {{ item }}
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div>
                <span>容量</span>
                <input v-model="formInputRef.capacity" placeholder="請輸入價格" type="text" />
              </div>
            </div>
          </div>
          <div class="input-item" name="商品群組">
            <div class="bottom-item">
              <span>商品群組</span>
              <div class="link">
                <span @click="showCbGroupsUIFn(true)">加入群組</span>
              </div>
            </div>
          </div>
          <div class="input-item" name="庫存管理">
            <span class="title-content">庫存管理</span>
            <span class="msg-content">管理商品的多項規格及庫存數量</span>
            <div class="bottom-item">
              <span>*SKU編號</span>
              <input v-model="formInputRef.nameNo" placeholder="請輸入編號" type="text"
                onkeyup="value=value.replace(' ','')" />
              <span class="auto-link" @click="changeNameNo()">自動產生</span>
              <!-- <input v-model="formInputRef.NameNo" placeholder="請輸入編號" type="text" onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"/> -->
            </div>
            <span class="p_error" v-if="ruleLists.ruleItem.NameNo.is_error">
              {{ ruleLists.ruleItem.NameNo.warn }}
            </span>
          </div>
          <div class="input-switch" name="其他設定">
            <span class="title-switch">其他設定</span>
            <!-- <div class="box-switch">
              <div class="switch">
                <input type="checkbox" id="switch" v-model="formInputRef.isBonusOpen" /><label for="switch">Toggle</label>
              </div>
              <div class="label-info">
                <label>服務是否提供抽成</label>
                <span>開啟後，系統將按人員分潤設定比例白動計算抽成金額</span>
              </div>
            </div> -->
            <div class="box-switch">
              <div class="switch">
                <input type="checkbox" id="switch3" v-model="formInputRef.display" /><label for="switch3">Toggle2</label>
              </div>
              <div class="label-info">
                <label>上架</label>
                <span>開啟後，你的顧客即可透過線上預約瀏覽此項目</span>
              </div>
            </div>
            <!-- <div class="box-switch">
              <div class="switch">
                <input type="checkbox" id="switch2" v-model="formInputRef.isEditAccounting" /><label
                  for="switch2">Toggle1</label>
              </div>
              <div class="label-info">
                <label> 是否允許結帳時修改金額</label>
                <span>開啟後，結帳時可手動調整服務金額</span>
              </div>
            </div> -->
          </div>
        </div>
      </div>
      <div class="bottom-content"></div>
    </div>
  </div>
  <CbGoodsGroupsUI v-if="showCbGoodsUIRef" :selData="formInputRef.GroupsItem" :getDataFn="getCbGroupsFn"
    :showCbGroupsUIFn="showCbGroupsUIFn" />
</template>
  
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useApptStore } from "@/stores/apptStore";
import icon_closeX from "@/assets/images/icon_closeX.png";
import icon_ticket from "@/assets/images/icon_cancle.png";
import { GetRandomChar, GetRandomNumStr, checkVerify_all, formatZeroDate, goodsUnitGroup } from "@/utils/utils";
import Alert from "../alertCmpt";
import { showErrorMsg } from "@/types/IMessage";
import icon_cancleItem from "@/assets/images/icon_cancleItem.png";

let store = useApptStore();
let { } = storeToRefs(store);
let { addGoodsDetailApi } = store;

const props = defineProps<{
  showAddUIFn: Function;
}>();
let showCbGoodsUIRef = ref(false);

let formInputRef: any = ref({
  name: "",
  unit: "",
  capacity: "",
  nameNo: "",
  GroupsItem: [],
  price: "",
  total: 0,
  state: 0,
  msg: "",
});

onBeforeFn();
function onBeforeFn() {
  formInputRef.value.nameNo =
    GetRandomChar(3) + "-" + GetRandomNumStr(1, 99999);
}
onMounted(() => {
  // console.log('onMounted');
});


function submitBtn() {
  ruleLists.ruleItem.name.value = formInputRef.value.name;
  ruleLists.ruleItem.price.value = formInputRef.value.price;
  ruleLists.ruleItem.NameNo.value = formInputRef.value.nameNo;
  if (!checkVerify_all(ruleLists)) return;

  // let curGroupMaps = formInputRef.value.GroupsItem;
  // let curGroupMaps = [];
  // for (let i = 0; i < formInputRef.value.GroupsItem.length; i++) {
  //   const element = formInputRef.value.GroupsItem[i];
  //   curGroupMaps.push(element.pgId);
  // }

  let curdata: any = {
    pCode: formInputRef.value.nameNo,
    pName: formInputRef.value.name,
    memo: formInputRef.value.msg,
    price: formInputRef.value.price,
    imageBig: "",
    imageSmall: "",
    unit: formInputRef.value.unit ? formInputRef.value.unit : 0,
    amount: formInputRef.value.capacity ? formInputRef.value.capacity : 0,
    brand: 0,
    stockOpen: false,
    stock: formInputRef.value.total,
    stockTrace: false,
    bonusOpen: formInputRef.value.isBonusOpen,
    updateOpen: formInputRef.value.isEditAccounting,
    display: formInputRef.value.state == 1,
    productGroup: GroupsIdList,
    productDiscount: [],
    productProvider: [],
  };

  /**新增明細 */
  addGoodsDetailApi(curdata).then((res: any) => {
    if (res.state == 1) {
      Alert.sussess("成功", 1000);
      setTimeout(() => {
        props.showAddUIFn(false);
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

let GroupsIdList: string[] = []
function getCbGroupsFn(itemList: any, idList: any = []) {
  formInputRef.value.GroupsItem = itemList;
  GroupsIdList = idList;
  showCbGroupsUIFn(false)
}
function showCbGroupsUIFn(data: boolean) {
  showCbGoodsUIRef.value = data;
}
function changeNameNo() {
  formInputRef.value.nameNo =
    GetRandomChar(3) + "-" + GetRandomNumStr(1, 99999);
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
          warn: " 名稱為必填",
        },
      },
      is_error: false,
      warn: "",
    },
    price: {
      label: "價格",
      rules: {
        required: {
          warn: " 價格為必填",
        },
      },
      is_error: false,
      warn: "",
    },
    NameNo: {
      label: "編號",
      rules: {
        required: {
          warn: " 編號為必填",
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
.popup-AddGoodsDetailUI {
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
        box-sizing: border-box;
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
        width: 70%;
        height: 100%;
        // border-right: solid 0.5px #ddd;
        box-sizing: border-box;

        // overflow: hidden;

        .input-item {
          display: grid;
          width: 100%;
          margin: 15px 0;

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

          .auto-link {
            display: flex;
            height: 100%;
            // width: calc(100% - 180px);
            justify-content: center;
            align-items: center;
            color: #87ceeb;
          }

          .title-content {
            font-size: 28px;
            width: 100%;
          }

          .name-content {
            display: flex;
            width: 100%;
            margin: 15px 0;
            height: 240px;

            .name-info {
              width: calc(100% - 160px);

              >div {
                display: flex;
                height: 80px;
                width: calc(100%);
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
            }

            .img-info {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 160px;
              height: 160px;
              background-color: #f5f5f5;

              .img-bg {
                display: grid;
                width: 100px;
                height: 100px;
                background: var(--color);
                border-radius: 12px;

                >div {
                  width: 100px;
                  height: 100px;

                  >span {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100px;
                    height: 50px;
                    font-size: 40px;
                    color: #ffffff;
                  }
                }
              }
            }
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
                  box-sizing: border-box !important;
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

          .horizontal-content {
            border: 0px solid #000000;
            width: 100%;
            height: 60px;
            justify-content: space-between;

            >div {
              display: flex;
              height: 100%;
              width: calc(50% - 10px);
              border: solid 0.5px #ddd;
              box-sizing: border-box;

              >span {
                height: 100%;
                width: 180px;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #faf9f8;
                font-size: 24px;
              }

              .el-select {
                // width:  calc(100%);
                height: 100%;

                :deep(.el-input__wrapper) {
                  // width: calc(100%);
                  height: 57px;
                  font-size: 24px;

                  :deep(.el-select-dropdown) {
                    border: 1px solid #ff0000 !important;
                    box-sizing: border-box !important;
                  }
                }

                input {
                  font-size: 12px;
                  border: none;
                  background: none;
                  text-align: center;
                  font-weight: bold;
                  border: 0px solid #000000;
                }
              }

              >input {
                // width: calc(100% - 180px);
                border: 0px solid #000000;
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


          .link-btn {
            font-size: 28px;
            width: 100%;

            >span {
              color: #87ceeb;
              font-size: 28px;
              width: 100%;
            }
          }

          .form-info {
            width: 100%;
            height: auto;
            display: flex;
            justify-content: center;
            border: solid 0px #ddd;

            >div {
              p {
                text-align: left;
                font-size: 18px;
                text-align: left;
                color: #877059;
                height: 8px;
              }

              span {
                display: block;
                height: 30px;
                width: 95%;
                text-align: left;
                font-size: 22px;
                text-align: left;
                color: #877059;
                font-weight: bold;
              }

              >input {
                vertical-align: middle;
                width: 95%;
                margin: 5;
                height: 30px;
                border: solid 1px #707070;
                box-sizing: border-box !important;
                background-color: #fff;
              }
            }

            .form-item {
              width: 100%;
              border-bottom: 0px solid #fff;
              box-sizing: border-box !important;

              >span {
                display: flex;
                width: 100%;
                justify-content: center;
                align-items: center;
                height: 40px;
              }

              >div {
                display: flex;
                width: 100%;
                justify-content: center;
                // max-height: 100px;
                // overflow-y: auto;

                >table {
                  // display: flex;
                  width: 100%;

                  >thead {
                    background-color: #c1bdb8;
                    color: #797979;
                    width: 100%;
                    border-bottom: 2px;
                    box-sizing: border-box !important;

                    >tr>th {
                      font-size: 16px;
                      color: #636363;
                      font-weight: bold;
                    }

                    >tr>th:nth-child(1) {
                      width: 50%;
                    }

                    >tr>th:nth-child(2) {
                      width: 15%;
                    }

                    >tr>th:nth-child(3) {
                      width: 15%;
                    }

                    >tr>th:nth-child(4) {
                      width: 20%;
                    }
                  }

                  >tbody {
                    border-bottom: 2px solid #dadada;
                    box-sizing: border-box !important;

                    >tr>td>span {
                      display: block;
                      text-align: left;
                      font-size: 22px;
                      color: #877059;
                      font-weight: bold;
                      margin: 10px 0px;
                    }

                    >tr>td:nth-child(1) {
                      width: 50%;
                    }

                    >tr>td:nth-child(2) {
                      width: 15%;
                    }

                    >tr>th:nth-child(3) {
                      width: 15%;
                    }

                    >tr>th:nth-child(4) {
                      width: 20%;
                    }
                  }
                }
              }

              .link-btn {
                color: #b89087;
              }
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
            box-sizing: border-box !important;
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
            box-sizing: border-box !important;

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
  