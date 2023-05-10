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
          <div>
            <div
              v-for="(item, index) in courseTypesTabs"
              :key="item.lessonTypeId"
            >
              <button
                v-if="item.lessonTypeId != 0"
                class="add-coursedetail-btn"
                v-on:click="delCourseTypeHdr(index, item.lessonTypeId)"
              >
                <span>{{ item.nameTw }}</span>
                <img class="add-coursedetail-ico" :src="formDeleteIcon" />
              </button>
            </div>
          </div>
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
  <Alert
    v-if="alertInformation.showAlert"
    :alertInformation="alertInformation"
    :handAlertView="handAlertView"
    @callbackBtn="btnSumitHdr"
  ></Alert>
</template>
<script setup lang="ts">
import { useApptStore } from "@/stores/apptStore";
import formDeleteIcon from "@/assets/Icon course-delete.svg";
import type { IBackStatus } from "@/types/IData";
import { verify_methods } from "@/types/utils";
let addCourseTypesName = ref("");
//alertUI
const alertInformation = reactive({
  selfData: {},
  selfType: "",
  messageText: "", // 提示內容
  buttonState: 0, //按鈕顯示狀態 0:全部 1:只顯示確定按鈕 2:不顯示按鈕
  timerVal: 2, //時間計時器
  showAlert: false, //顯示
});
const handAlertView = (msg: string, btnState: number, timer: number) => {
  alertInformation.messageText = msg;
  alertInformation.buttonState = btnState;
  alertInformation.timerVal = timer;
  alertInformation.showAlert = !alertInformation.showAlert;
  console.log("handAlertView");
};
const props = defineProps<{
  showAddForm: Function;
  courseTypesTabs: any;
}>();

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

const store = useApptStore();
const { addCourseTypeApi, delCourseTypeApi } = store;
onMounted(() => {
  addCourseTypesName.value = "";
});

//新增分類--確認
let confirmShowAddForm = () => {
  ruleLists.ruleItem.name.value = addCourseTypesName.value;
  if (!verify_all()) return;

  let curdata: any = {
    lessonTypeId: 0,
    display: true,
    nameEn: addCourseTypesName.value + "_en",
    nameTw: addCourseTypesName.value,
  };
  addCourseTypeApi(curdata)
    .then((res: any) => {
      let resData = res.data;
      if (resData.state == 1) {
        console.log("成功");
        handAlertView("新增成功", 2, 2);
        setTimeout(() => {
          props.showAddForm(false);
        }, 1000);
      } else {
        console.log(res, "api失敗");
        handAlertView("新增失敗", 2, 2);
      }
    })
    .catch((error) => {
      console.log(error, "error");
    });
};
//刪除課程2
let delCourseTypeHdr = (index: number, itemId: number) => {
  // delCourseTypeApi(itemId);
  alertInformation.selfType = "delCourseDetail";
  alertInformation.selfData = itemId;
  handAlertView("是否刪除", 0, 0);
};

const btnSumitHdr = (val: IBackStatus) => {
  switch (alertInformation.selfType) {
    case "delCourseDetail":
      if (val.btnStatus) {
        console.log(val.btnStatus, "確定");
        delCourseTypeApi(alertInformation.selfData).then((res: any) => {
      let resData = res.data;
      if (resData.state == 1) {
        handAlertView("刪除成功", 2, 2);
        setTimeout(() => {
          
        }, 1000);
      } else {
        console.log(res, "api失敗");
        handAlertView("刪除失敗", 2, 2);
      }
    })
    .catch((error) => {
      console.log(error, "error");
    });
        
      } else {
        console.log(val.btnStatus, "取消");
      }
      break;
    default:
      break;
  }
  alertInformation.showAlert = false;
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
  .add-coursetype-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 520px;

    .add-coursetype-bg {
      padding: 15px 15px 15px 15px;
      background-color: #e6e2de;
      width: 100%;

      > div {
        padding: 10px 0;
        > input {
          width: 96%;
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
  }
}
</style>
