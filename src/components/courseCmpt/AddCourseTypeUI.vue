<template>
  <div id="ck1" class="form_bg" @click.self="showAddForm(false)">
    <div class="add-coursetype-form">
      <div class="add-coursetype-bg">
        <p>新增分類</p>
        <div class="typeInput_div">
          <input v-model="addCourseTypesName" />
          <span class="p_error" v-if="ruleItem.name.is_error">
            {{ ruleItem.name.warn }}
          </span>
        </div>
        <div class="add-coursedetail-btndiv">
          <draggable
            v-model="courseTypesTabs"
            group="people"
            @start="drag = true"
            @end="drag = false"
            item-key="id"
          >
            <template #item="{ element }">
              <div style="">
                <button
                  v-if="element.lessonTypeId != 0"
                  class="add-coursedetail-btn"
                >
                  <span v-show="!element.editState">{{
                    element.editNameTw
                  }}</span>
                  <input
                    v-show="element.editState"
                    :id="element.nameTw"
                    type="text"
                    v-model="element.editNameTw"
                  />
                  <img
                    class="edit_img"
                    :src="Icon_edit"
                    v-on:click="editCourseTypeHdr(element, element)"
                  />
                  <img
                    class="add-coursedetail-ico"
                    :src="Icon_back"
                    v-on:click="deleteHdr(element, element.lessonTypeId)"
                  />
                </button>
              </div>
            </template>
          </draggable>
        </div>
        <div>
          <button class="confirm-coursetype-btn" @click="confirmShowAddForm()">
            確認
          </button>
          <button class="confirm-coursetype-btn" @click="showAddForm(false)">
            取消
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useApptStore } from "@/stores/apptStore";
import Icon_edit from "@/assets/images/icon_edit.png";
import Icon_back from "@/assets/images/icon_back.png";
import { storeToRefs } from "pinia";

import draggable from "vuedraggable";
import { verify_methods } from "@/utils/utils";
import Alert from "../alertCmpt";
let addCourseTypesName = ref("");
const props = defineProps<{
  showAddForm: Function;
}>();

const store = useApptStore();
const {
  addCourseTypeApi,
  delCourseTypeApi,
  editCourseTypeApi,
  editCourseTypeOrderApi,
} = store;
let { courseTypesTabs } = storeToRefs(store);

onMounted(() => {
  addCourseTypesName.value = "";
});

//新增分類--確認
let confirmShowAddForm = () => {
  let changeNameList = [];
  let changeOrderList: any = [];
  for (let i = 0; i < courseTypesTabs.value.length; i++) {
    const element = courseTypesTabs.value[i];
    if (element.lessonTypeId != 0) {
      /**判斷改名 */
      if (element.nameTw != element.editNameTw) {
        ruleLists.ruleItem.name.value = element.editNameTw;
        if (!verify_all()) return;
        element.nameTw = element.editNameTw;
        changeNameList.push(element);
        editCourseTypeApi(element).then((res: any) => {});
      }
      /**判斷改排序 */
      if (element.order != i + 1) {
        element.order = i + 1;
        changeOrderList.push({
          lid: element.lessonTypeId,
          order: element.order,
        });
      }
    }
  }

  if (changeOrderList.length > 0) {
    editCourseTypeOrderApi(changeOrderList).then((res: any) => {});
  }

  if (changeOrderList.length == 0 && changeNameList.length == 0) {
    ruleLists.ruleItem.name.value = addCourseTypesName.value;
    if (!verify_all()) return;
  }

  if (addCourseTypesName.value) {
    let curdata: any = {
      lessonTypeId: 0,
      order: 1,
      display: true,
      nameEn: addCourseTypesName.value + "_en",
      nameTw: addCourseTypesName.value,
    };
    addCourseTypeApi(curdata).then((res: any) => {
      // if (res.state == 1)
      //   setTimeout(() => {
      //     props.showAddForm(false);
      //   }, 1000);
    });
  }

  setTimeout(() => {
    props.showAddForm(false);
  }, 1000);
};
let selItem: any = ref([]);
// //刪除課程
// let delCourseTypeHdr = (item: any, itemId: number) => {
//   selItem = item;
//   Alert({
//     type: 0,
//     message: "是否刪除",
//     duration: 1000,
//     onAlertBtn: onDelReturn,
//   });
// };
// const onDelReturn = (data: any) => {
//   if (data) {
//     delCourseTypeApi(selItem.lessonTypeId).then((res: any) => {});
//   }
// };

//刪除
let deleteHdr = (item: any, index: number) => {
  selItem = item;
  Alert.check("是否刪除", 1000, onDeleteAlertBtn);
};
const onDeleteAlertBtn = (data: any) => {
  if (data) {
    let curId = selItem.lessonTypeId;
    delCourseTypeApi(curId).then((res: any) => {
      props.showAddForm(false);
    });
  } else {
    console.log("取消刪除");
  }
  selItem.value = [];
};

//編輯課程
let oldInput: any = "";
let editCourseTypeHdr = (index: number, item: any) => {
  item.editState = !item.editState;
  const input = document.getElementById(item.nameTw) as HTMLInputElement | null;
  if (oldInput) {
    input?.blur();
    oldInput = input;
  }
  setTimeout(() => {
    input?.focus();
  }, 10);
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

  .add-coursetype-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 650px;
    background-color: #e6e2de;

    .add-coursetype-bg {
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

      .add-coursetype-btn {
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

        .add-coursetype-ico {
          margin-top: 10px;
          width: 20px;
          height: 20px;
          display: flex;
          justify-content: center;
          flex: 1;
        }
      }

      > div {
        display: flex;
        justify-content: center;
        .confirm-coursetype-btn {
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
      .add-coursedetail-btndiv {
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
            .add-coursedetail-btn {
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
                width: 20px;
                height: 20px;
                display: flex;
                justify-content: center;
                flex: 1;
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
  }
}
</style>
