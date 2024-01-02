<template>
  <div class="popup-subService" v-on:click.self="showRdDFn(false)">
    <div class="popup-content">
      <div class="header-content">
        <span>折扣</span>
        <img :src="icon_closeX" v-on:click="showRdDFn(false)" />
      </div>
      <div class="main-content">
        <div class="tabs-content">
          <!--   tab group -->
          <input type="radio" id="tab-1" name="tab" checked>
          <label for="tab-1">折扣選項</label>
          <div class="tab-content">
            <div class="options-content">
              <div v-for="item in filterCourseData" :key="item">
                <label class="label-item" :value="item" v-if="item.dType == 0">
                  <input class="input-item" type="radio" :key="item" :value="item" :id="'RdAllDiscountUI_' + item"
                    v-model="formInputRef.allDiscount" @click="clickItem(item, item.SubId)" />
                  <!-- <label :for="'RdAllDiscountUI_' + item.SubId"></label> -->
                  <div class="title-input">
                    <span value="{{item}}" name="{{item.title}}">{{
                      item.title
                    }}</span>
                  </div>
                  <div class="discount-input">
                    <span>{{ " - " + item.discount * 100 + " % " }}</span>
                  </div>
                </label>
                <label class="label-item" :value="item" v-if="item.dType == 1">
                  <input class="input-item" type="radio" :key="item" :value="item" :id="'RdAllDiscountUI_' + item"
                    v-model="formInputRef.allDiscount" @click="clickItem(item, item.SubId)" />
                  <!-- <label :for="'RdAllDiscountUI_' + item.SubId"></label> -->
                  <div class="title-input">
                    <span value="{{item}}" name="{{item.title}}">{{
                      item.title
                    }}</span>
                  </div>
                  <div class="discount-input">
                    <span>{{ " $ - " + item.discount }}</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <!--   tab group end -->

          <!--   tab group -->
          <input type="radio" name="tab" id="tab-2">
          <label for="tab-2">自訂折扣</label>
          <div class="tab-content">
            <div class="input-content">
              <div class='key-title'>
                <div class='switch-box'>
                  <div class="switch" @click="resetSwitchFn()">
                    <span class="box_item" :class="{ actived_box: formInputRef.dType }"></span>
                    <span class="left" :class="{ actived_Area: !formInputRef.dType }"
                      @click="formInputRef.dType = !formInputRef.dType">%</span>
                    <span class="right" :class="{ actived_Area: formInputRef.dType }"
                      @click="formInputRef.dType = !formInputRef.dType">$</span>
                  </div>
                </div>
                <div class='input-box'>
                  <div class='input-type' v-if="formInputRef.dType">折扣金额</div>
                  <div class='input-type' v-else> 折扣%數 <span v-if="inputDiscount != '0'">{{ "(" + (100 -
                    parseInt(inputDiscount)) + "折)"
                  }}</span> </div>
                  <div class='input-num'>{{ inputDiscount }}</div>
                </div>
              </div>
              <div class='key-container'>
                <div class='keyboard' @click.stop='_handleKeyPress'>
                  <div class='key-row'>
                    <div class='key-cell' data-num='7'>7</div>
                    <div class='key-cell' data-num='8'>8</div>
                    <div class='key-cell' data-num='9'>9</div>
                  </div>
                  <div class='key-row'>
                    <div class='key-cell' data-num='4'>4</div>
                    <div class='key-cell' data-num='5'>5</div>
                    <div class='key-cell' data-num='6'>6</div>
                  </div>
                  <div class='key-row'>
                    <div class='key-cell' data-num='1'>1</div>
                    <div class='key-cell' data-num='2'>2</div>
                    <div class='key-cell' data-num='3'>3</div>
                  </div>
                  <div class='key-row'>
                    <div class='key-cell' data-num='C'>C</div>
                    <div class='key-cell' data-num='0'>0</div>
                    <div class='key-cell' data-num='D'>D</div>
                  </div>
                  <button class="key-confirm" @click="submitBtn()">確認折扣</button>
                </div>
              </div>
            </div>

          </div>
          <!--   tab group end -->

        </div>
      </div>
      <div class="bottom-content">
        <!-- <button class="submit-btn" @click="submitBtn()">確認</button>
        <button class="cancle-btn" @click="showServiceUIFn(0)">取消</button> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useApptStore } from "@/stores/apptStore";
import search_ico from "@/assets/images/icon_search.png";
import icon_right_arrow from "@/assets/images/icon_right_arrow.png";
import icon_closeX from "@/assets/images/icon_closeX.png";
import { usePriceStore } from "@/stores/priceStore";
import { mathDiscount } from "@/utils/utils";


let store = usePriceStore();
let { allDiscountList } = storeToRefs(store);
let { getAllDiscountApi, delAllDiscountApi } = store;
const props = defineProps<{
  showRdDFn: Function;
  getDataFn: Function;
  selData: any;
}>();
let formInputRef: any = ref({
  name: "",
  search: "",
  allDiscount: null,
  dType: false,
  isManual: false,//是否手動輸入
});

let inputDiscount = ref("0");
onBeforeFn();
function onBeforeFn() {
  console.log(props.selData);
  getAllDiscountFn();
}
function getAllDiscountFn() {
  getAllDiscountApi();
}
onMounted(() => {
  // console.log('onMounted');
});

if (props.selData) {
  // formInputRef.value.allDiscount = props.selData;
}
let filterCourseData: any = computed(() =>
  allDiscountList.value.filter(getDiscountFn)
);
function getDiscountFn(data: any) {
  return (
    data
  );
}

function _handleKeyPress(params: any) {
  let num: string = params.target.dataset.num;
  if (num == "-1") return;
  // if (condition) {

  // }
  switch (num) {
    case "S":
      console.log("鍵盤S", num);
      break;
    case "C":
      inputDiscount.value = "0";
      break;
    case "D":
      console.log("鍵盤D", num);
      if (inputDiscount.value != "0") {
        inputDiscount.value = inputDiscount.value.slice(0, -1);
      }
      if (inputDiscount.value == "") {
        inputDiscount.value = "0";
      }
      break;
    default:
      console.log("鍵盤", num);
      if (inputDiscount.value == "0") {
        inputDiscount.value = "";
      }
      if (inputDiscount.value != "0" || num != "0") {
        inputDiscount.value += num;
      }
      break;
  }


}

function resetSwitchFn() {
  console.log("switch");
  inputDiscount.value = "0";
}

function submitBtn() {
  let nameDC = formInputRef.value.dType ? formInputRef.value.discount + " 折 " : mathDiscount(formInputRef.value.discount) + " 元 "
  let curDiscount = {
    isManual: true,
    dType: formInputRef.value.dType,
    discount: parseInt(formInputRef.value.discount) / 100,
    title: "自訂折扣" + nameDC
  }
  props.getDataFn(curDiscount);
  // props.showRdDFn(false)
}

function clickItem(item: any, id: number) {
  item.isManual = false;
  console.log(item);
  props.getDataFn(item);
  // props.showRdDFn(false)
}
</script>

<style scoped lang="scss">
.popup-subService {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 3;
  background: rgba(80, 80, 80, 0.8);

  display: flex;
  align-items: center;
  justify-content: space-around;

  .popup-content {
    width: 500px;
    height: 70%;
    background-color: #ffffff;
    // padding: 15px 50px;
    font-size: 20px;
    font-family: HeitiTC;
    color: #84715c;
    font-weight: bold;
    border-radius: 12px;

    .header-content {
      display: flex;
      height: 70px;
      width: calc(100%);
      border-bottom: solid 1px #ddd;
      box-sizing: border-box;

      >span {
        position: absolute;
        display: flex;
        width: calc(100%);
        justify-content: center;
        align-items: center;
        font-size: 28px;
        height: 70px;
        justify-content: center;
        left: 0;
        right: 0;

      }

      >img {
        position: relative;
        width: 41px;
        height: 38px;
        top: 15px;
        left: 15px;
      }


      >button {
        position: relative;
        width: 41px;
        height: 38px;
        top: 15px;
        right: 15px;
      }

    }

    .main-content {
      display: block;
      height: calc(100% - 70px - 70px);
      padding: 0 10px;
      // width: calc(100% - 10px);

      .tabs-content {
        display: flex;
        justify-content: center;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        height: calc(100%);
        width: 100%;

        input[type="radio"] {
          display: none;

          &:checked {
            +label {
              background-color: white;
              border-bottom: 2px solid #1be4ff;
              transform: translatey(1px);

              +.tab-content {
                display: block;
              }
            }
          }
        }

        >label {
          padding: 0.5em 0.75em;
          color: #1be4ff;
          border-bottom: unset;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          cursor: pointer;
          order: 0;

          &:hover {
            // color: black;
            color: #1be4ff;
          }
        }

        .tab-content {
          display: none;
          // padding: 1em;
          width: 90%;
          order: 1;
          height: calc(100%);

          .options-content {
            height: calc(100% - 35px);
            box-sizing: border-box;
            overflow-y: auto;

            >div {
              height: 50px;
              border-bottom: solid 1px #8b6f6d;

              .label-group {
                display: flex;
                align-items: center;
                width: 100%;
                margin-left: 5px;

                input {
                  display: none;
                }

                label {
                  color: black;
                  display: inline-block;
                  width: 17px;
                  height: 100%;
                  border-radius: 5px;
                  border: 1px solid #8b6f6d;
                  position: relative;
                  cursor: pointer;
                }

                label::before {
                  display: inline-block;
                  content: " ";
                  width: 10px;
                  border: 2px solid #fff;
                  height: 4px;
                  border-top: none;
                  border-right: none;
                  transform: rotate(-45deg);
                  top: 4px;
                  left: 3px;
                  position: absolute;
                  opacity: 0;
                }

                input:checked+label {
                  background: #8b6f6d;
                }

                input:checked+label::before {
                  opacity: 1;
                  transform: all 0.5s;
                }

                >span {
                  margin-left: 10px;
                  font-size: 27px;
                }
              }

              .label-item {
                display: flex;
                align-items: center;
                width: calc(100% - 15px - 15px);
                margin-left: 15px;
                box-sizing: border-box;
                padding: 5px;
                height: 100%;

                input {
                  display: none;
                }

                >label {
                  display: inline-block;
                  width: 20px;
                  height: 20px;
                  border-radius: 5px;
                  border: 1px solid #8b6f6d;
                  position: relative;
                  cursor: pointer;
                }

                >label::before {
                  display: inline-block;
                  content: " ";
                  width: 12px;
                  border: 2px solid #fff;
                  height: 4px;
                  border-top: none;
                  border-right: none;
                  transform: rotate(-45deg);
                  top: 5px;
                  left: 3px;
                  position: absolute;
                  opacity: 0;
                }

                >input:checked+label {
                  background: #8b6f6d;
                }

                >input:checked+label::before {
                  opacity: 1;
                  transform: all 0.5s;
                }

                >span {
                  margin-left: 10px;
                }

                >div {
                  display: grid;
                  margin-left: 10px;

                  .pCode-msg {
                    font-size: 25px;
                  }
                }

                .title-input {
                  flex: 1;

                  >span {
                    font-size: 25px;
                  }
                }

                .discount-input {
                  width: 80px;

                  >span {
                    font-size: 25px;
                  }
                }

              }
            }
          }


          .input-content {
            width: 100%;

            .key-title {
              display: flex;
              align-items: center;
              width: 100%;
              height: 60px;
              background-color: #dddddd;
              padding: 0 5px;
              justify-content: space-between;

              .switch-box {
                width: 60px;

                .switch {
                  width: 60px;
                  display: flex;
                  align-items: center;
                  border-radius: 5px;
                  padding: 2px 2px;
                  background-color: #877059;
                  filter: brightness(90%);
                  height: 30px;


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
                    height: calc(90%);
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

              .input-box {
                width: calc(100% - 80px);
                height: 100%;

                .input-type {
                  height: 40%;
                  display: flex;
                  justify-content: right;
                  align-items: center;
                  font-size: 16px;

                }

                .input-num {
                  height: 60%;
                  display: flex;
                  justify-content: right;
                  align-items: center;
                  font-size: 35px;
                  overflow: hidden;
                }
              }
            }

            .key-container {
              width: 100%;

              .keyboard {
                width: 100%;

                .key-row {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: 100%;

                  .key-cell {
                    display: grid;
                    justify-content: center;
                    align-items: center;
                    width: 90px;
                    height: 60px;
                    font-weight: bold;
                    font-size: 25px;
                  }
                }

                .key-confirm {
                  position: relative;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: 100%;
                  height: 50px;
                  border-radius: 8px;
                  font-size: 20px;
                  font-weight: bold;
                  color: #717171;
                  background-color: #fff;
                }
              }
            }
          }
        }
      }

    }

    .bottom-content {
      display: flex;
      align-items: end;
      justify-content: center;

      // height: calc(65px);
      // width: 100px;
      >button {
        position: relative;
        width: 100px;
        height: 45px;
        margin: 10px;
        border-radius: 10px;
        font-size: 20px;
        font-weight: bold;
        color: #717171;
        background-color: #fff;
      }

      .submit-btn {
        display: block;
        width: 100px;
      }

      .cancle-btn {
        display: block;
        width: 100px;
      }
    }
  }
}
</style>
