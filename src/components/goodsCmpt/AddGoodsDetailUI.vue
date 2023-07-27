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
                  <el-select
                    class="select-unit"
                    filterable
                    placeholder="請選擇單位"
                    v-model="formInputRef.unit"
                  >
                    <el-option
                      v-for="(item, index) in unitGroup"
                      :key="item"
                      :value="index"
                      :label="item"
                    >
                      {{ item }}
                    </el-option>
                  </el-select>
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
                    onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
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
                      onkeyup="value=value.replace(' ','')"
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
                    <!-- <el-input
                      class="input-basic"
                      v-model="formInputRef.GoodsTypeId"
                      placeholder="請選擇分類"
                      onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
                    </el-input>
                    > -->
                    <el-select
                      class="input-basic"
                      filterable
                      placeholder="請選擇分類"
                      v-model="formInputRef.GoodsTypeId"
                    >
                      <el-option
                        v-for="(item, index) in filterTypesTabs"
                        :key="item.pgTitle"
                        :value="item.pgId"
                        :label="item.pgTitle"
                      >
                        {{ item.pgTitle }}
                      </el-option>
                    </el-select>
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
                      placeholder="請輸入價格"
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
              <div class="form-total">
                <div>
                  <p>庫存數量</p>
                  <div>
                    <img :src="icon_minus" @click="countTotalBtn(-1)" />
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
                    <div>
                      <img
                        v-if="formInputRef.state"
                        :src="icon_sure"
                        @click="updataOnlineBtn(1)"
                      />
                      <img
                        v-if="!formInputRef.state"
                        :src="icon_cancle"
                        @click="updataOnlineBtn(1)"
                      />
                      <span> 永久 </span>
                    </div>
                    <el-input
                      class="input-state"
                      v-model="formInputRef.state"
                      placeholder="請輸入上架"
                      onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
                    >
                    </el-input>
                    <div>
                      <img
                        v-if="formInputRef.state"
                        :src="icon_cancle"
                        @click="updataOnlineBtn(0)"
                      />
                      <img
                        v-if="!formInputRef.state"
                        :src="icon_sure"
                        @click="updataOnlineBtn(0)"
                      />
                      <span> 暫停 </span>
                    </div>
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
                    <el-input
                      class="input-msg"
                      v-model="formInputRef.msg"
                      placeholder="請輸入說明"
                      type="textarea"
                    />
                  </div>
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
</template>
<script setup lang="ts">
import { useApptStore } from "@/stores/apptStore";
import icon_plus from "@/assets/images/icon_plus.png";
import icon_minus from "@/assets/images/icon_minus.png";
import icon_sure from "@/assets/images/icon_sure.png";
import icon_cancle from "@/assets/images/icon_cancle.png";
import type { IBackStatus } from "@/types/IData";
import { showErrorMsg } from "@/types/IMessage";
import { GetRandomChar, GetRandomNumStr, verify_methods } from "@/utils/utils";
import { storeToRefs } from "pinia";
import Alert from "../alertCmpt";
let store = useApptStore();
let { goodsTypesListRef } = storeToRefs(store);
let { addGoodsDetailApi } = store;
const props = defineProps<{
  showAddUIFn: Function;
}>();
let unitGroup: string[] = [
  "不選擇",
  "毫升",
  "公升",
  "功課",
  "公斤",
  "盎司",
  "片",
  "袋",
  "包",
  "個",
  "組",
  "式",
  "瓶",
  "罐",
];

let formInputRef: any = ref({
  name: "",
  unit: null,
  capacity: null,
  NameNo: null,
  GoodsTypeId: null,
  price: null,
  total: 0,
  state: 0,
  msg: "",
});

let filterTypesTabs: any = computed(() =>
  goodsTypesListRef.value.filter(function (value: any) {
    return value.pgId > 0;
  })
);
onBeforeFn();
function onBeforeFn() {
  formInputRef.value.name = "";
  formInputRef.value.unit = "";
  formInputRef.value.capacity = "";
  formInputRef.value.NameNo =
    GetRandomChar(3) + "-" + GetRandomNumStr(1, 99999);
  formInputRef.value.GoodsTypeId = "";
  formInputRef.value.price = "";
  formInputRef.value.total = 0;
  formInputRef.value.state = 0;
  formInputRef.value.msg = "";
}

onMounted(() => {});

function countTotalBtn(data: number) {
  if (!formInputRef.value.total) formInputRef.value.total = 0;
  formInputRef.value.total += data;
  if (formInputRef.value.total < 0) formInputRef.value.total = 0;
}
function updataOnlineBtn(data: number) {
  formInputRef.value.state = data;
}
//新增課程-確認
let submitBtn = () => {
  console.log(formInputRef.value);

  ruleLists.ruleItem.name.value = formInputRef.value.name;
  ruleLists.ruleItem.price.value = formInputRef.value.price;
  ruleLists.ruleItem.unit.value = formInputRef.value.unit;
  ruleLists.ruleItem.capacity.value = formInputRef.value.capacity;
  ruleLists.ruleItem.NameNo.value = formInputRef.value.NameNo;
  ruleLists.ruleItem.GoodsTypeId.value = formInputRef.value.GoodsTypeId;
  ruleLists.ruleItem.total.value = formInputRef.value.total;
  ruleLists.ruleItem.state.value = formInputRef.value.state;
  if (!verify_all()) return;

  let curdata: any = {
    pCode: formInputRef.value.NameNo,
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
    bonusOpen: false,
    updateOpen: false,
    display: formInputRef.value.state == 1,
    productGroup: [formInputRef.value.GoodsTypeId],
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
      rules: {},
      is_error: false,
      warn: "",
    },
    capacity: {
      type: "number",
      rules: {},
      is_error: false,
      warn: "",
    },
    NameNo: {
      type: "number",
      rules: {
        required: {
          warn: "此項為必填",
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
      },
      is_error: false,
      warn: "",
    },
    total: {
      type: "number",
      rules: {},
      is_error: false,
      warn: "",
    },
    state: {
      type: "number",
      rules: {},
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
                // color: #877059;
                font-weight: bold;
              }
              font-size: 15px;
              height: 38px;
            }
            .input-basic {
              height: 45px;
              width: 230px;
            }
            .input-name {
              height: 45px;
              width: 230px;
            }
            .select-unit {
              height: 45px;
              width: 125px;
            }
            .input-capacity {
              height: 45px;
              width: 100px;
            }
            .input-msg {
              width: 460px;
              height: 140px;
              border: solid 2px #877059;
              background-color: #fff;
              ::placeholder {
                // color: #877059;
                font-size: 15px;
                font-weight: bold;
              }
              :deep(.el-textarea__inner) {
                width: 460px;
                height: 140px;
                font-size: 15px;
              }
            }
          }
          .form-total {
            width: 230px;
            height: 100px;
            > div {
              width: 230px;
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
            width: 230px;
            height: 100px;
            > div {
              width: 230px;
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
