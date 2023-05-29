<template>
  <div id="ck1" class="form_bg" @click.self="showAddUIFn(false)">
    <div class="add-form">
      <div class="add-bg Column">
        <div class="top-form">
          <p>新增</p>
        </div>
        <div class="main-form">
          <div class="main-img"></div>
          <div class="main-info">
            <div class="main-input">
              <div class="form-input">
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
              <div class="form-input">
                <div>
                  <el-input
                    class="input-unit"
                    v-model="formInputRef.unit"
                    placeholder="請輸入單位"
                  />
                  <span class="p_error" v-if="ruleItem.unit.is_error">
                    {{ ruleItem.unit.warn }}
                  </span>
                </div>
              </div>
              <div class="form-input">
                <div>
                  <el-input
                    class="input-capacity"
                    v-model="formInputRef.capacity"
                    placeholder="請輸入容量"
                  />
                  <span class="p_error" v-if="ruleItem.capacity.is_error">
                    {{ ruleItem.capacity.warn }}
                  </span>
                </div>
              </div>
            </div>
            <div class="main-input">
              <div class="form-input">
                <div>
                  <div>
                    <el-input
                      class="input-basic"
                      v-model="formInputRef.NameNo"
                      placeholder="請輸入編號"
                      onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
                    >
                    </el-input>
                  </div>
                  <span class="p_error" v-if="ruleItem.NameNo.is_error">
                    {{ ruleItem.NameNo.warn }}
                  </span>
                </div>
              </div>
              <div class="form-input">
                <div>
                  <div>
                    <el-input
                      class="input-basic"
                      v-model="formInputRef.GoodsTypeId"
                      placeholder="請輸入分類"
                      onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
                    >
                    </el-input>
                  </div>
                  <span class="p_error" v-if="ruleItem.GoodsTypeId.is_error">
                    {{ ruleItem.GoodsTypeId.warn }}
                  </span>
                </div>
              </div>
            </div>
            <div class="main-input">
              <div class="form-input">
                <div>
                  <div>
                    <el-input
                      class="input-basic"
                      v-model="formInputRef.price"
                      placeholder="請輸入訂價"
                      onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
                    >
                    </el-input>
                  </div>
                  <span class="p_error" v-if="ruleItem.price.is_error">
                    {{ ruleItem.price.warn }}
                  </span>
                </div>
              </div>
            </div>
            <div class="main-input">
              <div class="form-input">
                <div>
                  <div>
                    <el-input
                      class="input-basic"
                      v-model="formInputRef.sellPrice"
                      placeholder="請輸入售價"
                      onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
                    >
                    </el-input>
                  </div>
                  <span class="p_error" v-if="ruleItem.sellPrice.is_error">
                    {{ ruleItem.sellPrice.warn }}
                  </span>
                </div>
              </div>
            </div>
            <div class="main-input">
              <div class="form-total">
                <div>
                  <p>庫存數量</p>
                  <div>
                    <img :src="ico_minus" @click="countTotalBtn(-1)" />
                    <el-input
                      class="input-total"
                      v-model="formInputRef.total"
                      onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
                    >
                    </el-input>
                    <img :src="icon_plus" @click="countTotalBtn(+1)" />
                  </div>
                  <span class="p_error" v-if="ruleItem.total.is_error">
                    {{ ruleItem.total.warn }}
                  </span>
                </div>
              </div>
              <div class="form-state">
                <div>
                  <p>上架期間</p>
                  <div>
                    <img
                      v-if="formInputRef.state"
                      :src="ico_sure"
                      @click="updataOnlineBtn(true)"
                    />
                    <img
                      v-if="!formInputRef.state"
                      :src="ico_cancle"
                      @click="updataOnlineBtn(true)"
                    />
                    <el-input
                      class="input-state"
                      v-model="formInputRef.state"
                      placeholder="請輸入上架"
                      onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
                    >
                    </el-input>
                    <img
                      v-if="formInputRef.state"
                      :src="ico_cancle"
                      @click="updataOnlineBtn(false)"
                    />
                    <img
                      v-if="!formInputRef.state"
                      :src="ico_sure"
                      @click="updataOnlineBtn(false)"
                    />
                  </div>
                  <span class="p_error" v-if="ruleItem.state.is_error">
                    {{ ruleItem.state.warn }}
                  </span>
                </div>
              </div>
            </div>
            <div class="main-input">
              <div class="form-input">
                <div>
                  <div>
                    <!-- <textarea
                      class="input-msg"
                      v-model="formInputRef.msg"
                      placeholder="請輸入說明"
                    >
                    </textarea> -->
                    <el-input
                      class="input-msg"
                      v-model="formInputRef.msg"
                      placeholder="請輸入說明"
                      type="textarea"
                    />
                  </div>
                  <span class="p_error" v-if="ruleItem.msg.is_error">
                    {{ ruleItem.msg.warn }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom-form">
          <button class="confirm-coursedetail-btn" @click="submitBtn()">
            確認
          </button>
          <button class="confirm-coursedetail-btn" @click="showAddUIFn(false)">
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
import icon_plus from "@/assets/images/ico_plus.png";
import ico_minus from "@/assets/images/ico_minus.png";
import ico_sure from "@/assets/images/ico_sure.png";
import ico_cancle from "@/assets/images/ico_cancle.png";
import type { IBackStatus } from "@/types/IData";
import { showErrorMsg } from "@/types/IMessage";
import { verify_methods } from "@/utils/utils";
import { storeToRefs } from "pinia";
let store = useApptStore();
let {} = storeToRefs(store);
let { addtAllDiscountApi } = store;

const props = defineProps<{
  showAddUIFn: Function;
  //   addDetailTypeID?: any;
}>();

let formInputRef: any = ref({
  name: "",
  unit: null,
  capacity: null,
  NameNo: null,
  GoodsTypeId: null,
  price: null,
  sellPrice: null,
  total: 0,
  state: false,
  msg: "",
});

onMounted(() => {
  formInputRef.value.name = "";
  formInputRef.value.unit = "";
  formInputRef.value.capacity = "";
  formInputRef.value.NameNo = "";
  formInputRef.value.GoodsTypeId = "";
  formInputRef.value.price = "";
  formInputRef.value.sellPrice = "";
  formInputRef.value.total = 0;
  formInputRef.value.state = false;
  formInputRef.value.msg = "";
});

function countTotalBtn(data: number) {
  console.log(formInputRef.value.total);
  if (!formInputRef.value.total) formInputRef.value.total = 0;
  formInputRef.value.total += data;
  if (formInputRef.value.total < 0) formInputRef.value.total = 0;
}
function updataOnlineBtn(data: boolean) {
  formInputRef.value.state = data;
}
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
        props.showAddUIFn(false);
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
    unit: {
      type: "number",
      rules: {
        required: {
          warn: "此項為必填",
        },
        length: {
          max: 5,
          warn: "不高於5字",
        },
      },
      is_error: false,
      warn: "",
    },
    capacity: {
      type: "number",
      rules: {
        required: {
          warn: "此項為必填",
        },
        length: {
          max: 5,
          warn: "不高於5字",
        },
      },
      is_error: false,
      warn: "",
    },
    NameNo: {
      type: "number",
      rules: {
        required: {
          warn: "此項為必填",
        },
        length: {
          max: 5,
          warn: "不高於5字",
        },
      },
      is_error: false,
      warn: "",
    },
    GoodsTypeId: {
      type: "number",
      rules: {
        required: {
          warn: "此項為必填",
        },
        length: {
          max: 5,
          warn: "不高於5字",
        },
      },
      is_error: false,
      warn: "",
    },
    price: {
      type: "number",
      rules: {
        required: {
          warn: "此項為必填",
        },
        length: {
          max: 5,
          warn: "不高於5字",
        },
      },
      is_error: false,
      warn: "",
    },
    sellPrice: {
      type: "number",
      rules: {
        required: {
          warn: "此項為必填",
        },
        length: {
          max: 5,
          warn: "不高於5字",
        },
      },
      is_error: false,
      warn: "",
    },
    total: {
      type: "number",
      rules: {
        required: {
          warn: "此項為必填",
        },
        length: {
          max: 5,
          warn: "不高於5字",
        },
      },
      is_error: false,
      warn: "",
    },
    state: {
      type: "number",
      rules: {
        required: {
          warn: "此項為必填",
        },
        length: {
          max: 5,
          warn: "不高於5字",
        },
      },
      is_error: false,
      warn: "",
    },
    msg: {
      type: "number",
      rules: {
        required: {
          warn: "此項為必填",
        },
        length: {
          max: 5,
          warn: "不高於5字",
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

  .add-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    // width: 400px;

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
    .main-img {
      width: 300px;
      height: 300px;
    }
    .main-form {
      display: flex;
      width: 100%;
      .main-info {
        .main-input {
          width: 100%;
          display: flex;
          justify-content: left;
          > div {
            display: flex;
            justify-content: center;
            padding: 5px 3px;
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
              font-size: 10px;
            }

            :deep(.el-input__wrapper) {
              vertical-align: middle;
              margin: 5;
              border: solid 2px #877059;
              background-color: #fff;
              border-radius: 0px;
              &:focus {
                box-shadow: 0 0 0 1px var(--el-input-focus-border-color) inset; //输入内容原本样式
                background-color: #877059;
              }
              ::placeholder {
                color: #877059;
                font-weight: bold;
              }
              font-size: 15px;
            }
            .input-basic {
              height: 45px;
              width: 206px;
            }
            .input-name {
              height: 45px;
              width: 206px;
            }
            .input-unit {
              height: 45px;
              width: 100px;
            }
            .input-capacity {
              height: 45px;
              width: 100px;
            }
            .input-msg {
              width: 418px;
              height: 140px;
              border: solid 2px #877059;
              background-color: #fff;
              ::placeholder {
                color: #877059;
                font-size: 15px;
                font-weight: bold;
              }
              :deep(.el-textarea__inner) {
                width: 418px;
                height: 140px;
                font-size: 15px;
              }
            }
          }
          .form-total {
            width: 206px;
            height: 100px;
            > div {
              width: 206px;
              border: solid 2px #877059;
              background-color: #fff;
              > div {
                display: flex;
                justify-content: center;
                align-items: center;
                .input-total {
                  width: 66px;
                  font-size: 20px;
                  margin: 0px 10px;
                  :deep(.el-input__wrapper) .el-input__inner {
                    text-align: center;
                    font-size: 20px;
                  }
                }
                img {
                  width: 30px;
                  height: 30px;
                }
              }
              > p {
                display: flex;
                justify-content: center;
                height: 10px;
                font-weight: bold;
                font-size: 15px;
              }
            }
          }
          .form-state {
            width: 206px;
            height: 100px;
            > div {
              width: 206px;
              border: solid 2px #877059;
              background-color: #fff;
              > div {
                display: flex;
                justify-content: center;
                align-items: center;
                .input-state {
                  opacity: 0;
                  width: 66px;
                  font-size: 20px;
                  margin: 0px 10px;
                  :deep(.el-input__wrapper) .el-input__inner {
                    text-align: center;
                  }
                }
              }
              > p {
                display: flex;
                justify-content: center;
                height: 10px;
                font-weight: bold;
                font-size: 15px;
              }
            }
          }
          .p_error {
            color: #fc0505;
            width: 100%;
            height: 20px;
          }
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
