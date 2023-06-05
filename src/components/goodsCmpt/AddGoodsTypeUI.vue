<template>
  <div id="ck1" class="form_bg" @click.self="showAddUIFn(false)">
    <div class="add-goodsType-form">
      <div class="add-goodsType-bg">
        <p>新增分類</p>
        <div class="typeInput_div">
          <input v-model="formInputRef.name" />
          <span class="p_error" v-if="ruleItem.name.is_error">
            {{ ruleItem.name.warn }}
          </span>
        </div>
        <div class="add-goodsType-btndiv">
          <draggable
            v-model="goodsTypesListRef"
            group="people"
            @start="drag = true"
            @end="drag = false"
            item-key="id"
          >
            <template #item="{ element }">
              <div style="">
                <button v-if="element.pgId != 0" class="add-goodsType-btn">
                  <span v-show="!element.editState">{{
                    element.editNameTw
                  }}</span>
                  <input
                    v-show="element.editState"
                    :id="element.pgTitle"
                    type="text"
                    v-model="element.editNameTw"
                  />
                  <img
                    class="edit_img"
                    :src="Icon_edit"
                    v-on:click="editTypeHdr(element, element)"
                  />
                  <img
                    class="add-goodsType-ico"
                    :src="Icon_back"
                    v-on:click="delTypeHdr(element, element.lessonTypeId)"
                  />
                </button>
              </div>
            </template>
          </draggable>
        </div>
        <div>
          <button class="confirm-goodsType-btn" @click="submitTypeHdr()">
            確認
          </button>
          <button class="confirm-goodsType-btn" @click="showAddUIFn(false)">
            取消
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import draggable from "vuedraggable";
import { storeToRefs } from "pinia";
import { useApptStore } from "@/stores/apptStore";
import Icon_edit from "@/assets/images/icon_edit.png";
import Icon_back from "@/assets/images/icon_back.png";
import Alert from "../alertCmpt";
import { showErrorMsg } from "@/types/IMessage";
import { verify_methods } from "@/utils/utils";

const store = useApptStore();
const { delGoodsTypeApi, updataGoodsTypeApi, addGoodsTypeApi } = store;
let { goodsTypesListRef } = storeToRefs(store);
const props = defineProps<{
  showAddUIFn: Function;
}>();
onMounted(() => {});

let formInputRef: any = ref({
  name: "",
});

onMounted(() => {});

let oldInput: any = "";
let editTypeHdr = (index: number, item: any) => {
  item.editState = !item.editState;
  const input = document.getElementById(
    item.pgTitle
  ) as HTMLInputElement | null;
  if (oldInput) {
    input?.blur();
    oldInput = input;
  }
  setTimeout(() => {
    input?.focus();
  }, 10);
};

let delTypeHdr = (item: any, index: number) => {
  selItemBtn = item;
  Alert({
    type: 0,
    message: "是否刪除",
    duration: 1000,
    onAlertBtn: onDelReturn,
  });
};
let selItemBtn: any = ref(false);
const onDelReturn = (data: any) => {
  if (data) {
    delGoodsTypeApi(selItemBtn.pgId).then((res: any) => {
      if (res.state == 1) {
        Alert.sussess("成功", 1000);
      } else Alert.warning(showErrorMsg(res.msg), 2);
    });
  }
};

let submitTypeHdr = () => {
  let changeNameList = [];
  console.log(goodsTypesListRef.value);

  for (let i = 0; i < goodsTypesListRef.value.length; i++) {
    const element = goodsTypesListRef.value[i];
    if (element.pgId != 0) {
      /**判斷改名 */
      if (element.pgTitle != element.editNameTw) {
        ruleLists.ruleItem.name.value = element.editNameTw;
        if (!verify_all()) return;
        element.nameTw = element.editNameTw;
        changeNameList.push(element);
        let curdata: any = {
          pgId: element.pgId,
          pgTitle: element.nameTw,
          pIdList: element.pIdList,
          isList: 0,
        };

        updataGoodsTypeApi(curdata).then((res: any) => {
          if (res.state == 1) {
            Alert.sussess("成功", 1000);
          } else Alert.warning(showErrorMsg(res.msg), 2);
        });
      }
    }
  }
  if (changeNameList.length == 0) {
    ruleLists.ruleItem.name.value = formInputRef.value.name;
    if (!verify_all()) return;
  }

  if (formInputRef.value.name) {
    let curdata: any = {
      pgId: 0,
      pgTitle: formInputRef.value.name,
    };
    addGoodsTypeApi(curdata).then((res: any) => {
      let resData = res.data;
      if (res.state == 1) {
        Alert.sussess("成功", 1000);
        setTimeout(() => {
          props.showAddUIFn(false);
        }, 1000);
      } else {
        Alert.warning(showErrorMsg(res.msg), 2);
      }
    });
  } else {
    setTimeout(() => {
      props.showAddUIFn(false);
    }, 1000);
  }
};

//-------------------------------------form驗證
const ruleLists: any = reactive({
  ruleItem: {
    name: {
      label: "名稱",
      component: "input",
      type: "number",
      is_readonly: false,
      value: "",
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
      is_show: true,
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
//-------------------------------------------------------------------
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

  .add-goodsType-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 650px;
    background-color: #e6e2de;

    .add-goodsType-bg {
      // padding: 15px 15px 15px 15px;
      background-color: #e6e2de;
      width: 92%;
      display: grid;
      margin-left: 4%;

      > div {
        padding: 10px 0;
        > input {
          width: 99%;
          height: 43px;
          border: solid 1px #707070;
          background-color: #fff;
          font-size: 20px;
          font-weight: bold;
          color: #717171;
          margin-top: 5px;
        }
      }

      > tr {
        display: flex;
        justify-content: center;
      }

      .add-goodsType-btn {
        width: 260px;
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
          width: 85%;
          justify-content: center;
        }

        .add-goodsType-ico {
          margin-top: 10px;
          width: 21px;
          height: 20px;
          display: flex;
          justify-content: center;
          flex: 1;
        }
      }

      > div {
        display: flex;
        justify-content: center;
        .confirm-goodsType-btn {
          width: 100px;
          height: 45px;
          margin: 5px;
          border-radius: 10px;
          font-size: 20px;
          font-weight: bold;
          color: #717171;
          background-color: #fff;
        }
      }

      .typeInput_div {
        display: block;
        justify-content: center;
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
        .p_error {
          color: #fc0505;
          width: 100%;
        }
      }

      p {
        text-align: left;
        font-size: 20px;
        font-weight: bold;
        text-align: left;
        color: #877059;
        font-weight: bold;
      }
      .add-goodsType-btndiv {
        padding: 0px 0px;
        max-height: 250px;
        overflow-y: scroll;
        justify-content: left;
        div {
          flex-wrap: wrap;
          display: flex;
          justify-content: center;

          // padding: 10px;
          div {
            .add-goodsType-btn {
              width: 275px;
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
                width: 85%;
                justify-content: center;
              }
              > input {
                margin-top: 5px;
                width: 85%;
                justify-content: center;
                border-style: none;
                text-align: center;
              }
              .edit_img {
                margin-top: 10px;
                width: 21px;
                height: 20px;
                display: flex;
                justify-content: center;
                flex: 1;
              }
              .add-goodsType-ico {
                margin-top: 14px;
                width: 20px;
                height: 16px;
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
  }
}
</style>
