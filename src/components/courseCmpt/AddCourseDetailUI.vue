<template>
  <div id="ck1" class="form_bg" @click.self="showAddDetailForm(false)">
    <div class="add-coursedetail-form">
      <div class="add-coursedetail-bg Column">
        <p>新增課程</p>
        <div class="userinfo">
          <div class="formname">
            <span>名稱</span>
            <!-- <input
              v-model="formInputRef.name"
              placeholder="請輸入課程名稱"
            /> -->
            <el-input class="input-name" v-model="formInputRef.name" placeholder="請輸入課程名稱" />
            <span class="p_error" v-if="ruleItem.name.is_error">
              {{ ruleItem.name.warn }}
            </span>
          </div>
          <div class="formtime">
            <span>時長(min)</span>
            <el-select class="input-timer" v-model="formInputRef.timer" allow-create default-first-option
              :reserve-keyword="false" placeholder=" ">
              <el-option v-for="(item, index) in timeGroup" :key="index" :label="item" :value="item" />
            </el-select>
            <!-- <el-input
              class="input-timer"
              v-model="formInputRef.timer"
              onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
            /> -->
            <span class="p_error" v-if="ruleItem.timer.is_error">
              {{ ruleItem.timer.warn }}
            </span>
          </div>
        </div>
        <div class="userinfo">
          <div class="formtype">
            <span>群組</span>
            <el-select class="info-type" filterable placeholder="請選擇類別" v-model="formInputRef.lessonTypeId">
              <el-option v-for="item in filterTypesTabs" :key="item.nameTw" :value="item.lessonTypeId"
                :label="item.nameTw">
                {{ item.nameTw + "" }}
              </el-option>
            </el-select>
            <span class="p_error" v-if="ruleItem.lessonTypeId.is_error">
              {{ ruleItem.lessonTypeId.warn }}
            </span>
          </div>
          <div class="formprice">
            <span>售價(NT)</span>
            <el-input class="input-price" v-model="formInputRef.price"
              onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')" />
            <span class="p_error" v-if="ruleItem.price.is_error">
              {{ ruleItem.price.warn }}
            </span>
          </div>
        </div>
        <!-- <div class="userinfo">
          <div class="formcolor">
            <span>顏色</span>
            <div class="color-group">
              <input class="color-btn" :class="curColorIndex == 1 ? 'selected' : 'noselected'" type="button"
                style="background-color: #fb9ea6" @click="clickColorFn(1)" />
              <input class="color-btn" :class="curColorIndex == 2 ? 'selected' : 'noselected'" type="button"
                style="background-color: #f7bf9a" @click="clickColorFn(2)" />
              <input class="color-btn" :class="curColorIndex == 3 ? 'selected' : 'noselected'" type="button"
                style="background-color: #eddb9d" @click="clickColorFn(3)" />
              <input class="color-btn" :class="curColorIndex == 4 ? 'selected' : 'noselected'" type="button"
                style="background-color: #c3eda0" @click="clickColorFn(4)" />
              <input class="color-btn" :class="curColorIndex == 5 ? 'selected' : 'noselected'" type="button"
                style="background-color: #98e8eb" @click="clickColorFn(5)" />
              <input class="color-btn" :class="curColorIndex == 6 ? 'selected' : 'noselected'" type="button"
                style="background-color: #aac9e2" @click="clickColorFn(6)" />
              <input class="color-btn" :class="curColorIndex == 7 ? 'selected' : 'noselected'" type="button"
                style="background-color: #abadd7" @click="clickColorFn(7)" />
              <input class="color-btn" :class="curColorIndex == 8 ? 'selected' : 'noselected'" type="button"
                style="background-color: #d8baea" @click="clickColorFn(8)" />
              <input class="color-btn" :class="curColorIndex == 9 ? 'selected' : 'noselected'" type="button"
                style="background-color: #e7b1e6" @click="clickColorFn(9)" />
            </div>
          </div>
        </div> -->
        <RadioColorUI :selColorIndex="formInputRef.color" :updateColorFn="updateColorFn" />
        <div class="switch-info">
          <span>上架</span>
          <div class="online">
            <div class="switch">
              <input type="checkbox" id="switch" v-model="formInputRef.isBonusOpen" /><label for="switch">Toggle</label>
            </div>
            <div class="label-info">
              <label>服務是否提供抽成</label>
              <span>開啟後，系統將按人員分潤設定比例白動計算抽成金額</span>
            </div>
          </div>
          <div class="online">
            <div class="switch">
              <input type="checkbox" id="switch2" v-model="formInputRef.isEditAccounting" /><label
                for="switch2">Toggle1</label>
            </div>
            <div class="label-info">
              <label>是否允許結帳畤修改金額 </label>
              <span>開啟後，結帳時可手動調整服務金額</span>
            </div>
          </div>
          <div class="online">
            <div class="switch">
              <input type="checkbox" id="switch3" v-model="formInputRef.state" /><label for="switch3">Toggle2</label>
            </div>
            <div class="label-info">
              <label>上架 </label>
              <span>開啟後，該項目即為可供客戶預約之正式課程</span>
            </div>
          </div>
        </div>
        <div class="decide">
          <button class="confirm-coursedetail-btn" @click="confirmAddCourseDataForm()">
            確認
          </button>
          <button class="confirm-coursedetail-btn" @click="showAddDetailForm(false)">
            取消
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useApptStore } from "@/stores/apptStore";
import formDeleteIcon from "@/assets/Icon course-delete.svg";
import type { IBackStatus } from "@/types/IData";
import { showErrorMsg } from "@/types/IMessage";
import { verify_methods } from "@/utils/utils";
import { storeToRefs } from "pinia";
import type { FormInstance, FormRules } from "element-plus";
const props = defineProps<{
  showAddDetailForm: Function;
  filterCourseData: any;
  addDetailTypeID?: any;
}>();
let formInputRef: any = ref({
  name: null,
  timer: null,
  lessonTypeId: null,
  price: null,
  isBonusOpen: false,
  isEditAccounting: false,
  state: false,
});
let store = useApptStore();
let { courseTypesTabs } = storeToRefs(store);
let { addCourseDetailApi } = store;

let timeGroup: any = ref(["30", "60", "90", "120", "150", "180", "210", "240"]);
let filterTypesTabs: any = computed(() =>
  courseTypesTabs.value.filter(function (value: any) {
    return value.lessonTypeId > 0;
  })
);
onBeforeFn();
function onBeforeFn() {
  formInputRef.value.name = "";
  formInputRef.value.timer = "";
  formInputRef.value.lessonTypeId = "";
  formInputRef.value.price = "";
  formInputRef.value.state = false;
  formInputRef.value.isBonusOpen = true;
  formInputRef.value.isEditAccounting = false;
  formInputRef.value.color = "";
}
onMounted(() => { });
//新增課程-確認
let confirmAddCourseDataForm = () => {
  ruleLists.ruleItem.lessonTypeId.value = formInputRef.value.lessonTypeId;
  ruleLists.ruleItem.timer.value = formInputRef.value.timer;
  ruleLists.ruleItem.price.value = formInputRef.value.price;
  ruleLists.ruleItem.name.value = formInputRef.value.name;
  if (!verify_all()) return;

  let curdata: any = {
    lessonId: 0,
    lessonTypeId: formInputRef.value.lessonTypeId,
    display: formInputRef.value.state,
    nameEn: formInputRef.value.name + "_en",
    nameTw: formInputRef.value.name,
    servicesTime: formInputRef.value.timer,
    price: formInputRef.value.price,
    discount: 0,
    isBonusOpen: formInputRef.value.isBonusOpen,
    isEditAccounting: formInputRef.value.isEditAccounting,
    color: formInputRef.value.color,
  };
  /**新增明細 */
  addCourseDetailApi(curdata).then((res: any) => {
    if (res.state == 1) {
      setTimeout(() => {
        props.showAddDetailForm(false);
      }, 1000);
    }
  });
};

function updateColorFn(params: any) {
  formInputRef.value.color = params
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
    lessonTypeId: {
      label: "類別",
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
    width: 400px;

    .Column {
      // width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }

    .add-coursedetail-bg {
      padding: 10px 10px 10px 10px;
      background-color: #e6e2de;
      width: 400px;

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
        width: 400px;
        display: flex;
        // height: 80px;
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

          // width: 98%;
          >input {
            vertical-align: middle;
            width: 95%;
            margin: 5;
            height: 30px;
            border: solid 1px #707070;
            background-color: #fff;
          }

          >div {
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

        .formcolor {
          width: 100%;
          padding: 0px 15px;

          .color-group {
            display: flex;
            width: 100%;

            .color-btn {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              border: none;
              background-color: #fc0505;
            }

            .selected {
              border: 2px solid rgb(251, 255, 0);
            }

            .noselected {
              border: 0px solid rgb(251, 255, 0);
            }
          }
        }

        .formname {
          width: 260px;
          // margin-right: 10px;
          padding: 0px 10px;

          .input-name {
            width: 255px;
            // border: solid 1px #707070;
          }
        }

        .formtype {
          width: 260px;
          padding: 0px 10px;

          .info-type {
            width: 255px;
            // border: solid 1px #707070;
          }
        }

        .formtime {
          width: 95px;
          padding: 0px 10px;

          .input-timer {
            width: 95px;
            margin-left: 0;
          }
        }

        .formprice {
          width: 95px;
          padding: 0px 10px;

          .input-price {
            width: 95px;
          }
        }

        .p_error {
          color: #fc0505;
          width: 100%;
          height: 20px;
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

      .switch-info {
        padding: 0px 15px;
        width: 100%;

        >span {
          display: block;
          height: 30px;
          width: 95%;
          text-align: left;
          font-size: 15px;
          text-align: left;
          color: #877059;
          font-weight: bold;
        }

        >div {
          display: flex;
          width: 100%;

          .label-info {
            display: grid;
            width: 80%;

            >label {
              color: #707070;
              font-size: 15px;
            }

            >span {
              color: #c1bdb8;
              font-size: 8px;
            }
          }
        }

        .switch {
          align-items: center;
          display: flex;
          width: 20%;

          input[type="checkbox"] {
            height: 0;
            width: 0;
            visibility: hidden;
          }

          label {
            cursor: pointer;
            text-indent: -9999px;
            width: 50px;
            height: 28px;
            background: grey;
            display: block;
            border-radius: 50px;
            position: relative;
          }

          label:after {
            content: "";
            position: absolute;
            top: 1px;
            left: 0px;
            width: 25px;
            height: 25px;
            background: #fff;
            border-radius: 90px;
            transition: 0.3s;
          }

          input:checked+label {
            background: #877059;
          }

          input:checked+label:after {
            left: calc(100% - 1px);
            transform: translateX(-100%);
          }

          label:active:after {
            width: 25px;
          }

          // centering
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
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
  }
}
</style>
