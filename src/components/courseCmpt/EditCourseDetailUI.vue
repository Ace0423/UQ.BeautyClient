
<template>
  <div id="ck1" class="editDetail_main" @click.self="showEditForm(false)">
    <div class="edit-coursetype-form">
      <div class="edit-coursetype-bg">
        <p>修改課程</p>
        <div class="edit_input">
          <input v-model="editCourseInfo.nameTw" />
          <span class="p_error" v-if="ruleItem.name.is_error">
            {{ ruleItem.name.warn }}
          </span>
          <input
            v-model="editCourseInfo.servicesTime"
            onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
          />
          <span class="p_error" v-if="ruleItem.timer.is_error">
            {{ ruleItem.timer.warn }}
          </span>
          <input
            v-model="editCourseInfo.price"
            onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
          />
          <span class="p_error" v-if="ruleItem.price.is_error">
            {{ ruleItem.price.warn }}
          </span>
        </div>
        <div class="edit_submit">
          <button class="confirm-coursetype-btn" v-on:click="editConfirmHdr()">
            確認
          </button>
          <button
            class="confirm-coursetype-btn"
            v-on:click="showEditForm(false)"
          >
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
import { useApptStore } from "@/stores/apptStore";
import { verify_methods } from "@/types/utils";
//alertUI
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
const newData: any = reactive({
  userId: 0,
  email: "",
});
const props = defineProps<{
  editCourseInfo: any;
  showEditForm: Function;
}>();

if (props.editCourseInfo) {
  newData.nameTw = props.editCourseInfo.nameTw;
  newData.servicesTime = props.editCourseInfo.servicesTime;
  newData.price = props.editCourseInfo.price;
}

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
    timer: {
      label: "時長",
      component: "input",
      type: "number",
      is_readonly: false,
      value: "",
      rules: {
        required: {
          warn: "此項為必填",
        },
      },
      is_error: false,
      warn: "",
      is_show: true,
    },
    price: {
      label: "價格",
      component: "input",
      type: "number",
      is_readonly: false,
      value: "",
      rules: {
        required: {
          warn: "此項為必填",
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
const { updateCourseDetailApi, getCourseDetailApi } = store;
onMounted(() => {});

//編輯課程
const editConfirmHdr = () => {
  ruleLists.ruleItem.name.value = props.editCourseInfo.nameTw;
  ruleLists.ruleItem.timer.value = props.editCourseInfo.servicesTime;
  ruleLists.ruleItem.price.value = props.editCourseInfo.price;
  if (!verify_all()) return;

  let apiEditCourseData = {
    lessonId: props.editCourseInfo.lessonId,
    lessonTypeId: props.editCourseInfo.lessonTypeId,
    display: props.editCourseInfo.display,
    nameEn: "",
    nameTw: props.editCourseInfo.nameTw,
    servicesTime: props.editCourseInfo.servicesTime,
    price: props.editCourseInfo.price,
    discount: 0,
  };
  updateCourseDetailApi(apiEditCourseData)
    .then((res: any) => {
      let resData = res.data;
      if (resData.state == 1) {
        handAlertView("修改成功", 2, 2);
        // console.log('成功');
        getCourseDetailApi(props.editCourseInfo.lessonTypeId, 0);
        setTimeout(() => {
          props.showEditForm(false);
        }, 1000);
      } else {
        console.log(res, "api失敗");
        handAlertView("修改失敗", 2, 2);
      }
    })
    .catch((error) => {
      console.log(error, "error");
    });
};
</script>


<style lang="scss" scoped>
.editDetail_main {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.5);
  z-index: 3;

  .edit-coursetype-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 250px;

    .edit-coursetype-bg {
      padding: 15px 15px;
      background-color: #e6e2de;
      width: 100%;

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

      .edit_input {
        > input {
          width: 95%;
          height: 43px;
          border: solid 1px #707070;
          background-color: #fff;
          font-size: 20px;
          font-weight: bold;
          color: #717171;
          margin-top: 5px;
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
        .p_error {
          color: #fc0505;
          width: 100%;
        }
      }
      .edit_submit {
        display: flex;
        justify-content: center;
      }

      p {
        text-align: left;
        font-size: 20px;
        font-weight: bold;
        text-align: left;
        color: #877059;
        font-weight: bold;
      }
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
  }
}
</style>
