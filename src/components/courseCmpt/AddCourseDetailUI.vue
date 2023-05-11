
<template>
  <div id="ck1" class="form_bg" @click.self="showAddDetailForm(false)">
    <div class="add-coursedetail-form">
      <div class="add-coursedetail-bg Column">
        <p>新增課程</p>
        <div class="userinfo">
          <div class="formname">
            <span>名稱</span>
            <input v-model="newCourseDetailRef.name" />
            <span class="p_error" v-if="ruleItem.name.is_error">
              {{ ruleItem.name.warn }}
            </span>
          </div>
          <div class="formtime">
            <span>時長(Min)</span>
            <input
              v-model="newCourseDetailRef.timer"
              onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
            />
            <span class="p_error" v-if="ruleItem.timer.is_error">
              {{ ruleItem.timer.warn }}
            </span>
          </div>
          <div class="formprice">
            <span>售價(NT)</span>
            <input
              v-model="newCourseDetailRef.price"
              onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
            />
            <span class="p_error" v-if="ruleItem.price.is_error">
              {{ ruleItem.price.warn }}
            </span>
          </div>
          <div>
            <div class="online">
              <span>上架</span>
              <input
                class="checked_status"
                type="checkbox"
                name="sub"
                value=""
                v-model="newCourseDetailRef.state"
              />
            </div>
          </div>
        </div>
        <div class="add-coursedetail-btndiv">
          <div>
            <div v-for="(item, index) in filterCourseData" :key="item.lessonId">
              <button
                class="add-coursedetail-btn"
                v-on:click="delCourseDetailHdr(index, item.lessonId)"
              >
                <span>{{ item.nameTw }}</span>
                <img class="add-coursedetail-ico" :src="formDeleteIcon" />
              </button>
            </div>
          </div>
        </div>
        <div class="decide">
          <button
            class="confirm-coursedetail-btn"
            @click="confirmAddCourseDataForm()"
          >
            確認
          </button>
          <button
            class="confirm-coursedetail-btn"
            @click="showAddDetailForm(false)"
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
    @callbackBtn="btnSumitHdr"
  ></Alert>
</template>
<script setup lang="ts">
import { useApptStore } from "@/stores/apptStore";
import formDeleteIcon from "@/assets/Icon course-delete.svg";
import type { IBackStatus } from "@/types/IData";
import { verify_methods } from "@/types/utils";
const alertState = ref(false);
let addCourseTypesName = ref("");

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
const props = defineProps<{
  showAddDetailForm: Function;
  filterCourseData: any;
  addDetailTypeID?: any;
}>();
let newCourseDetailRef: any = ref({
  name: "",
  timer: "",
  price: "",
  state: false,
});
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
const { delCourseDetailApi, addCourseDetailApi } = store;

onMounted(() => {
  newCourseDetailRef.value.name = "";
  newCourseDetailRef.value.timer = "";
  newCourseDetailRef.value.price = "";
  newCourseDetailRef.value.state = false;
});

//刪除課程2
let delCourseDetailHdr = (index: number, itemId: number) => {
  // delCourseDetailApi(itemId);
  alertInformation.selfType = "delCourseDetail";
  alertInformation.buttonState = 0;
  alertInformation.messageText = "是否刪除";
  alertInformation.showAlert = true;
  alertInformation.selfData = itemId;
};

const btnSumitHdr = (val: IBackStatus) => {
  switch (alertInformation.selfType) {
    case "delCourseDetail":
      if (val.btnStatus) {
        delCourseDetailApi(alertInformation.selfData);
      } else {
        console.log(val.btnStatus, "取消");
      }
      break;
    default:
      break;
  }
  alertInformation.showAlert = !alertInformation.showAlert;
};
//新增課程-確認
let confirmAddCourseDataForm = () => {
  ruleLists.ruleItem.timer.value = newCourseDetailRef.value.timer;
  ruleLists.ruleItem.price.value = newCourseDetailRef.value.price;
  ruleLists.ruleItem.name.value = newCourseDetailRef.value.name;
  if (!verify_all()) return;

  let curdata: any = {
    lessonId: 0,
    lessonTypeId: props.addDetailTypeID,
    display: newCourseDetailRef.value.state,
    nameEn: newCourseDetailRef.value.name + "_en",
    nameTw: newCourseDetailRef.value.name,
    servicesTime: newCourseDetailRef.value.timer,
    price: newCourseDetailRef.value.price,
    discount: 0,
  };
  /**新增明細 */
  addCourseDetailApi(curdata)
    .then((res: any) => {
      let resData = res.data;
      if (resData.state == 1) {
        handAlertView("新增成功", 2, 1);
        setTimeout(() => {
          props.showAddDetailForm(false);
        }, 1000);
      } else {
        handAlertView("新增失敗", 2, 1);
      }
    })
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

  .add-coursedetail-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 566px;

    .Column {
      // width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }

    .add-coursedetail-bg {
      padding: 10px 10px 10px 10px;
      background-color: #e6e2de;
      width: 566px;

      p {
        font-weight: bold;
        width: 80px;
        height: 20px;
        font-family: HeitiTC;
        font-size: 20px;
        text-align: left;
        color: #877059;
      }

      .decide,
      .userinfo {
        width: 566px;
        display: flex;
        height: 90px;
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

          // width: 98%;
          > input {
            vertical-align: middle;
            width: 95%;
            margin: 5;
            height: 30px;
            border: solid 1px #707070;
            background-color: #fff;
          }

          > div {
            width: 40px;

            .checked_status {
              width: 34px;
              height: 34px;
              display: flex;
              justify-content: center;
              // margin: 43px 329px 30px 123.5px;
              object-fit: contain;
              // margin: 7px;
            }

            .checked_status:checked::after {
              content: "✓";
              color: #fff;
              font-size: 45px;
              line-height: 30px;
              font-weight: bold;
              background-color: #84715c;
            }
          }
        }

        .formname {
          width: 260px;
          // margin-right: 10px;
          padding: 0px 10px;
        }

        .formtime {
          width: 95px;
          padding: 0px 10px;
        }

        .formprice {
          width: 80px;
          padding: 0px 10px;
        }

        .online {
          padding: 0px 10px;
        }
        .p_error {
          color: #fc0505;
          width: 100%;
        }

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
  }
}
</style>
