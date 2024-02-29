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
              <span>*折扣名稱</span>
              <div>
                <el-input class="input-name" v-model="formInputRef.name" placeholder="請輸入名稱" />
                <span class="p_error" v-if="ruleItem.name.is_error">
                  {{ ruleItem.name.warn }}
                </span>
              </div>
            </div>
          </div>
          <div class="userinfo">
            <div class="formprice">
              <span>*折扣金額</span>
              <div>
                <div>
                  <input v-if="formInputRef.dType==2"  class="input-price" type="text" v-model="formInputRef.discount" maxlength="2" max="100" min="1"
                  onkeyup="value=value.replace(/[^\d]/g,'');if(value>99){value=99;}" />
                  <input v-else class="input-price" type="text" v-model="formInputRef.discount" 
                  onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"/>
                  <span v-if="!formInputRef.dType&&formInputRef.discount!=0">{{ (100 - parseInt(formInputRef.discount)) / 10 + "折" }}</span>
                  <div class="switch">
                    <span class="box_item" :class="{ actived_box: formInputRef.dType }"></span>
                    <span class="left" :class="{ actived_Area: !formInputRef.dType }"
                      @click="formInputRef.dType = !formInputRef.dType">%</span>
                    <span class="right" :class="{ actived_Area: formInputRef.dType }"
                      @click="formInputRef.dType = !formInputRef.dType">$</span>
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
</template>
<script setup lang="ts">
import { usePriceStore } from "@/stores/priceStore";
import { checkVerify_all } from "@/utils/utils";
import { storeToRefs } from "pinia";
let store = usePriceStore();
let { } = storeToRefs(store);
let { updateAllDiscountApi } = store;

const props = defineProps<{
  showEditUIFn: Function;
  formInfo: any;
}>();

let formInputRef: any = ref({
  name: "",
  dType: false,
  discount:0,
  discountNo: null,
});
onBeforeFn();
function onBeforeFn() {
  formInputRef.value.discountNo = props.formInfo.value.discountNo;
  formInputRef.value.name = props.formInfo.value.title;
  formInputRef.value.dType = props.formInfo.value.dType == 2;
  formInputRef.value.discount = props.formInfo.value.dType==1
    ? props.formInfo.value.discount* 100
    : props.formInfo.value.discount ;
}
onMounted(() => { });

//新增課程-確認
let submitBtn = () => {
  ruleLists.ruleItem.discount.value = formInputRef.value.discount;
  ruleLists.ruleItem.name.value = formInputRef.value.name;
  // if (!verify_all()) return;
  if (!checkVerify_all(ruleLists)) return;

  let curdata: any = {
    title: formInputRef.value.name,
    discount: formInputRef.value.dType
      ? formInputRef.value.discount
      : formInputRef.value.discount / 100,
    dType: formInputRef.value.dType ? 2 : 1,
    discountNo: formInputRef.value.discountNo,
  };
  /**新增明細 */
  updateAllDiscountApi(curdata).then((res: any) => {
    if (res.state == 1) {
      setTimeout(() => {
        props.showEditUIFn(false);
      }, 1000);
    }
  });
};

//-------------------------------------form驗證
const ruleLists: any = reactive({
  ruleItem: {
    name: {
      label: "名稱",
      rules: {
        required: {
          warn: "名稱為必填",
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
      label: "金額",
      rules: {
        required: {
          warn: "金額為必填",
        },
      },
      is_error: false,
      warn: "",
    },
  },
});
let { ruleItem } = toRefs(ruleLists);
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

        >div {
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

          >input {
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

          >span {
            width: 110px;
            font-size: 20px;
          }

          >div {
            .input-name {
              width: 210px;
              height: 40px;
            }

            >span {
              font-size: 10px;
            }
          }
        }

        .formprice {
          display: flex;
          justify-content: center;
          width: 100%;
          padding: 0px 10px;

          >span {
            width: 110px;
            font-size: 20px;
          }

          >div {
            >span {
              font-size: 10px;
            }

            >div {
              display: flex;
              width: 210px;
              justify-content: space-between;

              .input-price {
                width: 110px;
                border: none;
              }

              >span {
                display: flex;
                width: 40px;
                justify-content: center;
                align-items: center;
              }

              .switch {
                width: 60px;
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
                  width: 30px;
                }

                .actived_Area {
                  color: #877059;
                  border-radius: 5px;
                  z-index: 1;
                  font-weight: 60;
                  width: 30px;
                }

                .actived_box {
                  margin-left: 30px;
                  width: 30px;
                }
              }
            }
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

              >span {
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

.p_error {
  color: #fc0505 !important;
  width: 100% !important;
  font-weight: bold !important;
  font-size: 12px !important;
}
</style>
