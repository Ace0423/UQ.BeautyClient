<template>
  <div class="popup-EditBrandGoodsUI" v-on:click.self="showEditUI(false)">
    <div>
      <div class="header">
        <img :src="icon_closeX" v-on:click="showEditUI(false)" />
        <span>編輯商品品牌</span>
      </div>
      <div class="main-content">
        <div class="input-item">
          <div class="link-bottom"></div>
          <div class="text-input">
            <span>*品牌名稱</span>
            <input v-model="formInputRef.name" placeholder="請輸入名稱" type="text" />
          </div>
          <span class="p_error" v-if="ruleLists.ruleItem.brandName.is_error">
            {{ ruleLists.ruleItem.brandName.warn }}
          </span>
          <div class="brand-input">
            <span>服務列表</span>
            <div class="link-bottom"></div>
            <div class="check-item" name="check_item">
              <div>
                <table>
                  <tbody v-for="(item, index) in formInputRef.selGoodsItems" :key="item.pId">
                    <tr>
                      <td>
                        <p>{{ item.pName }}</p>
                      </td>
                      <td>
                        <p>{{ item.price }}</p>
                      </td>
                      <td>
                        <img class="delete_img" :src="icon_cancleItem" @click="cancleGoodsFn(item, index)" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <span class="link-url" v-on:click="showBrandUIFn(true)">加入商品列表</span>
              <div class="link-bottom"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="link-bottom"></div>
        <div class="box-footer">
          <button class="otherpay-btn" v-on:click="submitBtn()">確認編輯</button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showCGoodsRef" style="justify-content: center;">
    <CbGoodsdDetailUI :showCGoodsUIFn="showBrandUIFn" :selData="formInputRef.selGoodsItems" :getDataFn="getCheckGoodsFn">
    </CbGoodsdDetailUI>
  </div>
</template>
<script setup lang="ts">
import icon_closeX from "@/assets/images/icon_closeX.png";
import { storeToRefs } from "pinia";
import { useApptStore } from "@/stores/apptStore";
import icon_cancleItem from "@/assets/images/icon_cancleItem.png";
import { checkVerify_all } from "@/utils/utils";
import Alert from "../alertCmpt";
import { showErrorMsg } from "@/types/IMessage";

let apptstore = useApptStore();
const { } = storeToRefs(apptstore);
const {
  getGoodsBrandApi, updateGoodsBrandApi } = apptstore;
const props = defineProps<{
  selData: any;
  showEditUI: Function;
}>();
let formInputRef: any = ref({
  name: "",
  selGoodsItems: [],
});


onBefore();
function onBefore() {
  getGoodsBrandApi(props.selData.pbId, 1).then((res: any) => {
    setInputData(res[0]);
  });
}

onMounted(() => {
});

function setInputData(params: any) {
  formInputRef.value.name = params.pbTitle;
  formInputRef.value.selGoodsItems = params.pIdList;
}

function cancleGoodsFn(item: any, index: number) {
  formInputRef.value.selGoodsItems.splice(index, 1);
}
function submitBtn() {
  console.log("提交formInputRef", formInputRef.value);
  ruleLists.ruleItem.brandName.value = formInputRef.value.name;
  // if (!verify_all()) return;
  if (!checkVerify_all(ruleLists)) return;

  let goodsNums = [];
  for (let i = 0; i < formInputRef.value.selGoodsItems.length; i++) {
    const element = formInputRef.value.selGoodsItems[i];
    goodsNums.push(element.pId)
  }

  let apiData = {
    pbId: props.selData.pbId,
    pbTitle: formInputRef.value.name,
    pIdList: goodsNums,
  };
  console.log("提交apiData", apiData);

  /**新增 */
  updateGoodsBrandApi(apiData).then((res: any) => {
    if (res.state == 1) {
      Alert.sussess("成功", 1000);
      setTimeout(() => {
        props.showEditUI(false);
      }, 1000);
    } else {
      Alert.warning(showErrorMsg(res.msg), 1000);
    }
  });
}

function showBrandUIFn(params: any) {
  showCGoodsRef.value = params;
}

//1:服務，2:商品，
let showCGoodsRef: any = ref(false);

function getCheckGoodsFn(data: any) {
  formInputRef.value.selGoodsItems = data;
  // props.getDataFn(formInputRef.value);
  showBrandUIFn(false);
}
//-------------------------------------form驗證
const ruleLists: any = reactive({
  ruleItem: {
    brandName: {
      label: "名稱",
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
</script>

<style scoped lang="scss">
.popup-EditBrandGoodsUI {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1002;
  background: rgba(137, 137, 137, 0.5);

  display: flex;
  align-items: center;
  justify-content: end;

  >div {
    height: 100%;
    width: 350px;
    border-radius: 10px 0 0 10px;
    border: solid 1px #707070;
    background-color: #faf9f8;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    .header {
      display: flex;
      height: 52px;

      >img {
        width: 35px;
        height: 35px;
        justify-content: center;
        margin: 10px 10px 10px 10px;
      }

      >span {
        display: flex;
        width: 350px;
        font-family: STXihei;
        font-size: 26px;
        color: #717171;
        font-weight: bold;
        align-items: center;
        justify-content: center;
        margin-right: 55px;
      }

    }

    .main-content {
      height: calc(100% - 80px - 52px);

      .input-item {
        display: grid;
        width: 90%;
        margin-left: 5%;
        // margin-top: 3%;

        .title-content {
          font-size: 28px;
          width: 100%;
        }

        .select-content {
          width: calc(100% - 180px);

          .el-select {
            width: 100%;

            :deep(.el-input__wrapper) {
              width: 370.5px;
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

        .msg-content {
          font-size: 20px;
          color: #c1bdb8;
          margin-bottom: 10px;
        }

        .text-input {
          display: flex;
          height: 60px;
          width: 100%;
          border: solid 0.5px #ddd;
          box-sizing: border-box;

          >span {
            height: 100%;
            width: 110px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #faf9f8;
            font-size: 20px;
            font-weight: bold;
          }

          >input {
            border: solid 0px #c1bdb8;
            box-sizing: border-box;
            height: 100%;
            width: calc(100% - 110px);
            font-size: 20px;
          }

          div {
            display: flex;
            width: calc(100% - 180px);
            height: 100%;

            >p {
              display: flex;
              color: #87ceeb;
              width: calc(100% - 180px);
            }
          }

          ::placeholder {
            color: #c1bdb8;
          }
        }

        .brand-input {

          >span {
            display: block;
            font-weight: bold;
            font-size: 20px;
            color: #727272;
            margin: 20px 0px;
            // height:50px;
          }

          .check-item {
            display: grid;
            width: 100%;
            // margin-left: 5%;
            // margin-top: 3%;

            >span {
              height: 100%;
              width: 180px;
              display: flex;
              // justify-content: center;
              align-items: center;
              background-color: #faf9f8;
            }

            .title-content {
              font-size: 28px;
              width: 100%;
              // .el-select{
            }

            .link-url {
              color: #87ceeb;
              font-weight: bold;
              font-size: 22px;
              height: 30px;
              font-size: 24px;
              margin: 15px 0px;
              // width: calc(100% - 180px);
            }

            div {
              width: 100%;

              table {
                width: 100%;

                p {
                  color: #000000;
                }

                tbody {
                  tr {

                    // display: flex;
                    td {
                      // display: flex;
                      border-bottom: solid 0.5px #ddd;
                      box-sizing: border-box;
                    }
                  }

                  >tr>td:nth-child(1) {
                    width: 60%;
                  }

                  >tr>td:nth-child(2) {
                    text-align: center;
                  }

                  >tr>td:nth-child(3) {
                    text-align: center;
                  }

                  >tr>td:nth-child(4) {
                    text-align: center;
                  }

                  >tr>td:nth-child(5) {
                    text-align: center;
                  }
                }
              }
            }
          }
        }
      }
    }

    .footer {
      // display: ;
      width: 100%;
      height: 80px;

      .box-footer {
        display: grid;
        // width: 100%;
        justify-content: right;
        align-items: center;
        right: 20px;
        margin: 10px 10px;

        >button {
          width: 100px;
          height: 50px;
          border-radius: 5px;
          border: none;
          background-color: #84715c;
          color: #fff;
          margin: auto;
        }
      }
    }
  }

  .link-bottom {
    opacity: 0.5;
    margin: auto;
    width: 100%;
    height: 2px;
    background-color: #707070;
    margin: 10px 0%;
  }
}

.p_error {
  color: #fc0505;
  width: 100%;
}
</style>
