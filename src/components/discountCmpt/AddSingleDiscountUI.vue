<template>
  <div id="ck1" class="form_bg" @click.self="showAddUIFn(false)">
    <div class="add-discount-form">
      <div class="add-discountdetail-bg Column">
        <div class="top-form">
          <p>新增</p>
        </div>
        <div class="main-form">
          <div class="form-info">
            <div class="formname">
              <span>折扣名稱</span>
              <div>
                <el-input
                  class="input-name"
                  v-model="formInputRef.name"
                  placeholder="請輸入名稱"
                />
                <span class="p_error" v-if="ruleItem.name.is_error">
                  {{ ruleItem.name.warn }}
                </span>
              </div>
            </div>
          </div>
          <div class="form-info">
            <div class="formprice">
              <span>售價(NT)</span>
              <div>
                <div>
                  <el-input
                    class="input-price"
                    v-model="formInputRef.discount"
                    placeholder="請輸入折扣"
                    onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
                  >
                  </el-input>
                  <div class="switch">
                    <span
                      class="box_item"
                      :class="{ actived_box: formInputRef.dType }"
                    ></span>
                    <span
                      class="left"
                      :class="{ actived_Area: !formInputRef.dType }"
                      @click="formInputRef.dType = !formInputRef.dType"
                      >%</span
                    >
                    <span
                      class="right"
                      :class="{ actived_Area: formInputRef.dType }"
                      @click="formInputRef.dType = !formInputRef.dType"
                      >$</span
                    >
                  </div>
                </div>
                <span class="p_error" v-if="ruleItem.discount.is_error">
                  {{ ruleItem.discount.warn }}
                </span>
              </div>
            </div>
          </div>
          <div class="form-info">
            <div class="form-item">
              <span>已套用服務項目</span>
              <div v-if="selServiceGroupRef.length > 0">
                <table>
                  <thead>
                    <tr>
                      <th>服務({{ 0 }})</th>
                      <th>價格</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody
                    v-for="(item, index) in selServiceGroupRef"
                    :key="item.lessonId"
                  >
                    <tr>
                      <td>
                        <p>{{ item.nameTw }}</p>
                      </td>
                      <td>
                        <p>{{ item.price }}</p>
                      </td>
                      <td>
                        <img
                          class="delete_img"
                          :src="icon_cancleItem"
                          @click="cancleServiceFn(item, index)"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <span class="link-btn" @click="showServiceUIFn(true)"
                >加入服務項目</span
              >
            </div>
          </div>
          <div class="form-info">
            <div class="form-item">
              <span>已套用商品項目</span>
              <div v-if="selGoodsGroupRef.length > 0">
                <table>
                  <thead>
                    <tr>
                      <th>服務({{ 0 }})</th>
                      <th>價格</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody
                    v-for="(item, index) in selGoodsGroupRef"
                    :key="item.pId"
                  >
                    <tr>
                      <td>
                        <p>{{ item.pName }}</p>
                      </td>
                      <td>
                        <p>{{ item.price }}</p>
                      </td>
                      <td>
                        <img
                          class="delete_img"
                          :src="icon_cancleItem"
                          @click="cancleGoodsFn(item, index)"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <span class="link-btn" @click="showGoodsUIFn(true)"
                >加入商品項目</span
              >
            </div>
          </div>
        </div>
        <div class="bottom-form">
          <button class="confirm-discountdetail-btn" @click="submitBtn()">
            確認
          </button>
          <button
            class="confirm-discountdetail-btn"
            @click="showAddUIFn(false)"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  </div>
  <CheckboxServiceUI
    v-if="showServiceUIRef"
    :selData="selServiceGroupRef"
    :showUIFn="showServiceUIFn"
    :getDataFn="getSelServiceFn"
  ></CheckboxServiceUI>
  <CheckboxGoodsUI
    v-if="showGoodsUIRef"
    :selData="selGoodsGroupRef"
    :showUIFn="showGoodsUIFn"
    :getDataFn="getGoodsFn"
  ></CheckboxGoodsUI>
</template>
<script setup lang="ts">
import { usePriceStore} from "@/stores/priceStore";
import type { IBackStatus } from "@/types/IData";
import { showErrorMsg } from "@/types/IMessage";
import { verify_methods } from "@/utils/utils";
import { storeToRefs } from "pinia";
import icon_cancleItem from "@/assets/images/icon_cancleItem.png";

// import { tr } from "element-plus/es/locale";
let store = usePriceStore();
let {} = storeToRefs(store);
let { addSingleDiscountApi } = store;

const props = defineProps<{
  showAddUIFn: Function;
  // formInfo: any;
}>();

let showServiceUIRef: any = ref(false);
let showGoodsUIRef: any = ref(false);
let selServiceGroupRef: any = ref([]);
let selGoodsGroupRef: any = ref([]);
let formInputRef: any = ref({
  name: null,
  type: null,
  price: null,
});

onMounted(() => {
  formInputRef.value.name = "";
  formInputRef.value.dType = false;
  formInputRef.value.discount = "";
});

function showServiceUIFn(state: boolean) {
  showServiceUIRef.value = state;
}
function showGoodsUIFn(state: boolean) {
  showGoodsUIRef.value = state;
}

function getSelServiceFn(data: any) {
  console.log(data, "獲取");
  selServiceGroupRef.value = data;
  // props.showAddUIFn(false);
}
function getGoodsFn(data: any) {
  console.log(data, "獲取");
  selGoodsGroupRef.value = data;
  // props.showAddUIFn(false);
}

//新增課程-確認
let submitBtn = () => {
  ruleLists.ruleItem.discount.value = formInputRef.value.discount;
  ruleLists.ruleItem.name.value = formInputRef.value.name;
  if (!verify_all()) return;

  let curServiceMaps = [];
  for (let i = 0; i < selServiceGroupRef.value.length; i++) {
    const element = selServiceGroupRef.value[i];
    curServiceMaps.push(element.lessonId);
  }
  let curGoodsMaps = [];
  for (let i = 0; i < selGoodsGroupRef.value.length; i++) {
    const element = selGoodsGroupRef.value[i];
    curGoodsMaps.push(element.pId);
  }

  let curdata: any = {
    dType: formInputRef.value.dType ? 3 : 2,
    title: formInputRef.value.name,
    discount: formInputRef.value.dType
      ? formInputRef.value.discount
      : formInputRef.value.discount / 100,
    orderBy: 0,
    serviceMaps: curServiceMaps,
    productMaps: curGoodsMaps,
  };

  /**新增明細 */
  addSingleDiscountApi(curdata).then((res: any) => {
    let resData = res;
    if (resData.state == 1) {
      handAlertView("新增成功", 2, 1);
      setTimeout(() => {
        props.showAddUIFn(false);
      }, 1000);
    } else {
      handAlertView(showErrorMsg(resData.msg), 2, 2);
    }
  });
};

function cancleServiceFn(item: any, index: number) {
  selServiceGroupRef.value.splice(index, 1);
}
function cancleGoodsFn(item: any, index: number) {
  selGoodsGroupRef.value.splice(index, 1);
}
//-------------------------------------form驗證
const ruleLists: any = reactive({
  ruleItem: {
    name: {
      type: "number",
      rules: {
        required: {
          warn: "此項為必填",
        },
        length: {
          max: 9,
          warn: "不高於9字",
        },
      },
      is_error: false,
      warn: "",
    },
    discount: {
      type: "number",
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
let { ruleItem } = toRefs(ruleLists);
const verify_all = () => {
  let is_valid = true;
  for (let component in ruleLists.ruleItem) {
    let item = ruleLists.ruleItem[component];
    for (let rule in item.rules) {
      if (!verify_methods[rule](item)) {
        is_valid = false;
        break;
      }
    }
  }
  return is_valid;
};
//-----------------------------------我是底部-------------------------------------------

//-------------------------------------------------------alertUI
const alertInformation = reactive({
  selfData: {},
  selfType: "",
  messageText: "", // 提示內容
  buttonState: 2, //按鈕顯示狀態 0:全部 1:只顯示確定按鈕 2:不顯示按鈕
  timerVal: 2, //時間計時器
  showAlert: false, //顯示
});
const handAlertView = (msg: string, btnState: number, timer: number) => {
  alertInformation.messageText = msg;
  alertInformation.buttonState = btnState;
  alertInformation.timerVal = timer;
  alertInformation.showAlert = !alertInformation.showAlert;
};
</script>

<style lang="scss" scoped>
.form_bg {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.5);
  z-index: 3;

  .add-discount-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;

    background-color: #e6e2de;
    padding: 10px 10px 10px 10px;

    .Column {
      // width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }

    .top-form {
      width: 100%;
      p {
        font-weight: bold;
        width: 80px;
        height: 20px;
        font-family: HeitiTC;
        font-size: 20px;
        text-align: left;
        color: #877059;
      }
    }
    .main-form {
      width: 100%;
      .form-info {
        width: 100%;
        // height: 60px;
        display: flex;
        justify-content: center;
        > div {
          p {
            text-align: left;
            font-size: 15px;
            text-align: left;
            color: #877059;
            height: 8px;
          }
          span {
            display: block;
            height: 30px;
            width: 95%;
            text-align: left;
            font-size: 15px;
            text-align: left;
            color: #877059;
            font-weight: bold;
          }

          > input {
            vertical-align: middle;
            width: 95%;
            margin: 5;
            height: 30px;
            border: solid 1px #707070;
            background-color: #fff;
          }
        }
        .formname {
          display: flex;
          justify-content: center;
          padding: 5px 10px;
          > span {
            width: 110px;
            font-size: 20px;
          }
          > div {
            .input-name {
              width: 210px;
              height: 40px;
            }
            > span {
              font-size: 10px;
            }
          }
        }
        .formprice {
          display: flex;
          justify-content: center;
          width: 100%;
          padding: 0px 10px;
          > span {
            width: 110px;
            font-size: 20px;
          }

          > div {
            > span {
              font-size: 10px;
            }
            > div {
              display: flex;
              .input-price {
                width: 150px;
              }

              .switch {
                width: 56px;
                display: flex;
                align-items: center;
                border-radius: 5px;
                padding: 2px 2px;
                background-color: #877059;
                filter: brightness(90%);
                span {
                  cursor: pointer;
                  font-size: 12px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  color: #fff;
                  width: 50%;
                }
                .box_item {
                  position: absolute;
                  color: #fff;
                  transition: all 0.5s;
                  border-radius: 5px;
                  background-color: #fff;
                }
                .actived_Area {
                  color: #877059;
                  border-radius: 5px;
                  z-index: 1;
                  font-weight: 60;
                  width: 50%;
                }
                .actived_box {
                  margin-left: 43%;
                  width: 50%;
                }
              }
            }
          }
        }
        .form-item {
          width: 320px;
          > span {
            display: flex;
            width: 100%;
            justify-content: center;
            align-items: center;
            height: 40px;
          }
          > div {
            display: flex;
            width: 100%;
            justify-content: center;
            > table {
              // display: flex;
              width: 100%;
              > thead {
                background-color: #c1bdb8;
                color: #877059;

                > tr > th:nth-child(1) {
                  width: 70%;
                }
                > tr > th:nth-child(2) {
                  width: 20%;
                }
                > tr > th:nth-child(3) {
                  width: 10%;
                }
              }
              > tbody {
                border-bottom: 1px solid #fff;
                > tr > td:nth-child(1) {
                  width: 70%;
                }
                > tr > td:nth-child(2) {
                  width: 20%;
                }
                > tr > th:nth-child(3) {
                  width: 10%;
                }
              }
            }
          }
          .link-btn {
            color: #b89087;
          }
        }

        .p_error {
          color: #fc0505;
          width: 100%;
          height: 20px;
        }
      }

      .add-discountdetail-btndiv {
        padding: 0px 20px;
        max-height: 250px;
        overflow-y: scroll;
        width: 100%;
        div {
          flex-wrap: wrap;
          display: flex;

          // padding: 10px;
          div {
            .add-discountdetail-btn {
              width: 250px;
              height: 45px;
              margin: 5px;
              border-radius: 10px;

              font-size: 20px;
              font-weight: bold;
              background-color: #fff;
              color: #717171;
              display: flex;

              > span {
                margin-top: 5px;
                width: 88%;
                justify-content: center;
              }

              .add-discountdetail-ico {
                margin-top: 10px;
                width: 20px;
                height: 20px;
                display: flex;
                justify-content: center;
                flex: 1;
              }
            }
          }
        }

        p {
          text-align: left;
          font-size: 20px;
          font-weight: bold;
          text-align: left;
          color: #877059;
        }
      }
    }
    .bottom-form {
      width: 100%;
      display: flex;
      justify-content: center;
      .confirm-discountdetail-btn {
        position: relative;
        width: 100px;
        height: 45px;
        margin: 10px;
        // padding: 9px 16px;
        border-radius: 10px;
        font-size: 20px;
        font-weight: bold;
        color: #717171;
        background-color: #fff;
      }
    }
  }
}
</style>
