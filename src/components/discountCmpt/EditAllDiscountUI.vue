<template>
  <div id="ck1" class="form_bg" @click.self="showEditUIFn(false)">
    <div class="add-discount-form">
      <div class="add-coursedetail-bg Column">
        <div class="top-form">
          <p>編輯</p>
        </div>
        <div class="main-form">
          <div class="userinfo">
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
          <div class="userinfo">
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
                    <input
                      type="checkbox"
                      id="switch3"
                      v-model="formInputRef.dType"
                    /><label for="switch3">Toggle2</label>
                  </div>
                </div>
                <span class="p_error" v-if="ruleItem.discount.is_error">
                  {{ ruleItem.discount.warn }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom-form">
          <button class="confirm-coursedetail-btn" @click="submitBtn()">
            確認
          </button>
          <button class="confirm-coursedetail-btn" @click="showEditUIFn(false)">
            取消
          </button>
        </div>
      </div>
    </div>
  </div>
  <Alert
    v-if="alertInformation.showAlert"
    :alertInformation="alertInformation"
    :handAlertView="handAlertView"
  ></Alert>
</template>
<script setup lang="ts">
import { useApptStore } from "@/stores/priceStore";
import formDeleteIcon from "@/assets/Icon course-delete.svg";
import type { IBackStatus } from "@/types/IData";
import { showErrorMsg } from "@/types/IMessage";
import { verify_methods } from "@/utils/utils";
import { storeToRefs } from "pinia";
import type { FormInstance, FormRules } from "element-plus";
let store = useApptStore();
let {} = storeToRefs(store);
let { addtAllDiscountApi } = store;

const props = defineProps<{
  showEditUIFn: Function;
  formInfo: any;
}>();

let formInputRef: any = ref({
  name: null,
  type: null,
  price: null,
});

onMounted(() => {
  formInputRef.value.name = props.formInfo.value.title;
  formInputRef.value.dType = props.formInfo.value.dType ? true : false;
  formInputRef.value.discount = props.formInfo.value.dType
    ? props.formInfo.value.discount
    : props.formInfo.value.discount * 100;
});

//新增課程-確認
let submitBtn = () => {
  ruleLists.ruleItem.discount.value = formInputRef.value.discount;
  ruleLists.ruleItem.name.value = formInputRef.value.name;
  if (!verify_all()) return;

  let curdata: any = {
    title: formInputRef.value.name,
    discount: formInputRef.value.dType
      ? formInputRef.value.discount
      : formInputRef.value.discount / 100,
    dType: formInputRef.value.dType ? 1 : 0,
  };
  /**新增明細 */
  addtAllDiscountApi(curdata).then((res: any) => {
    let resData = res.data;
    if (resData.state == 1) {
      handAlertView("新增成功", 2, 1);
      setTimeout(() => {
        props.showEditUIFn(false);
      }, 1000);
    } else {
      handAlertView(showErrorMsg(resData.msg), 2, 2);
    }
  });
};

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
      .userinfo {
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
                align-items: center;
                display: flex;
                width: 60px;
                input[type="checkbox"] {
                  height: 0;
                  width: 0;
                  visibility: hidden;
                }
                label {
                  cursor: pointer;
                  text-indent: -9999px;
                  width: 70px;
                  height: 35px;
                  background: grey;
                  display: block;
                  border-radius: 9px;
                  position: relative;
                }

                label:after {
                  content: "";
                  position: absolute;
                  top: 1px;
                  left: 0px;
                  width: 33px;
                  height: 33px;
                  background: #fff;
                  border-radius: 9px;
                  transition: 0.3s;
                }

                input:checked + label {
                  background: #877059;
                }

                input:checked + label:after {
                  left: calc(100% - 1px);
                  transform: translateX(-100%);
                }

                label:active:after {
                  width: 33px;
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

        .p_error {
          color: #fc0505;
          width: 100%;
          height: 20px;
        }
      }

      .add-coursedetail-btndiv {
        padding: 0px 20px;
        max-height: 250px;
        overflow-y: scroll;
        width: 100%;
        div {
          flex-wrap: wrap;
          display: flex;

          // padding: 10px;
          div {
            .add-coursedetail-btn {
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

              .add-coursedetail-ico {
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
      .confirm-coursedetail-btn {
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
