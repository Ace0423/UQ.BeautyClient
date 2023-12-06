<template>
  <div id="add_form" class="form_bg" @click.self="showAddRestUIFn(false)">
    <div class="add-reserve-form">
      <div class="basic_info_main">
        <div class="basic_info_item name">
          <span>姓名(電話)</span>
          <div class="error-msg">
            <el-select v-model="newApptDataRef.managerId" filterable allow-create default-first-option
              :reserve-keyword="false" placeholder="">
              <el-option v-for="item in filterManagerCpt" :key="item.nameView" :value="item.managerId"
                :label="item.nameView">
                {{ item.nameView + "(" + item.phone + ")" }}
              </el-option>
            </el-select>

            <span class="p_error" v-if="ruleItem.managerId.is_error">
              {{ ruleItem.managerId.warn }}
            </span>
          </div>
          <!-- <SelectSearchUI :dataList="memberList.data" /> -->
        </div>
        <div class="basic_info_item time">
          <span>日期</span>
          <div class="add_seldate error-msg">
            <input type="date" v-model="newApptDataRef.date" />
            <span class="p_error" v-if="ruleItem.dayOn.is_error">
              {{ ruleItem.dayOn.warn }}
            </span>
          </div>
        </div>
        <div class="basic_info_item time">
          <span>開始時段</span>
          <div class="news-filter error-msg">
            <el-select v-model="newApptDataRef.dayOn" allow-create default-first-option :reserve-keyword="false"
              placeholder=" ">
              <el-option v-for="(item, index) in timeGroup" :key="index" :label="item" :value="item" />
            </el-select>
            <span class="p_error" v-if="ruleItem.dayOn.is_error">
              {{ ruleItem.dayOn.warn }}
            </span>
          </div>
        </div>
        <div class="basic_info_item time">
          <span>結束時段</span>
          <div class="news-filter error-msg">
            <el-select v-model="newApptDataRef.dayOff" allow-create default-first-option :reserve-keyword="false"
              placeholder=" ">
              <el-option v-for="(item, index) in timeGroup" :key="index" :label="item" :value="item" />
            </el-select>
            <span class="p_error" v-if="ruleItem.dayOff.is_error">
              {{ ruleItem.dayOff.warn }}
            </span>
          </div>
        </div>
      </div>
      <div class="row">
        <button class="confirm-reserve-btn" @click="confirmReserveForm()">
          新增
        </button>
        <button class="confirm-reserve-btn" @click="showAddRestUIFn(false)">
          取消
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useApptStore } from "@/stores/apptStore";
import formDeleteIcon from "@/assets/Icon course-delete.svg";
import { storeToRefs } from "pinia";
import { showErrorMsg, showHttpsStatus } from "@/types/IMessage";
import { formatZeroDate, verify_methods } from "@/utils/utils";
import { useManagerStore } from "@/stores/manager";
import Alert from "../alertCmpt";
import { useCounterStore } from "@/stores/counter";
let addCourseTypesName = ref("");

let aptTitle = reactive(["預約時間", "預約項目", "顧客", "已完成"]);

const props = defineProps<{
  showAddRestUIFn: Function;
}>();
let newApptDataRef: any = ref({
  managerId: null,
  date: "",
  dayOn: "",
  dayOff: "",
});

let store = useApptStore();
const { getManagerListApi, updateRestApi } = store;
let { managerList, timeGroup } = storeToRefs(store);

// const managerstore = useManagerStore();
// const { managerList } = storeToRefs(managerstore);
// const { getManagerList, postWorkingHours } = managerstore;
// const counterStore = useCounterStore();
// const { handLogOut } = counterStore;

/**true:新增 false:修改 */
onBeforeFn();
function onBeforeFn() {
  getManagerListApi(0).then((res) => { });
}
onMounted(() => {
  newApptDataRef.value.date = getNowDay();
});


let filterManagerCpt: any = computed(() =>
  managerList.value.filter(getDataFn)
);

function getDataFn(data: any) {
  return (
    data && data.roleList.length > 0 && data.roleList[0].roleId == 5
  );
}

function getNowDay() {
  let datetime = new Date();
  let year = formatZeroDate(datetime.getFullYear());
  let month = formatZeroDate(datetime.getMonth() + 1);
  let date = formatZeroDate(datetime.getDate());
  return `${year}-${month}-${date}`;
}
//預約--確認
let confirmReserveForm = () => {
  ruleLists.ruleItem.managerId.value = newApptDataRef.value.managerId;
  ruleLists.ruleItem.date.value = newApptDataRef.value.date;
  ruleLists.ruleItem.dayOn.value = newApptDataRef.value.dayOn;
  ruleLists.ruleItem.dayOff.value = newApptDataRef.value.dayOff;

  if (!verify_all()) return;

  let apiData = {
    mwNo: "",
    managerId: newApptDataRef.value.managerId,
    date: newApptDataRef.value.date,
    dayOn: "",
    dayOff: "",
    restList: [
      {
        dayOn: newApptDataRef.value.dayOn,
        dayOff: newApptDataRef.value.dayOff,
      },
    ],
  };
  updateRestApi(apiData).then((res) => { })
};
//-------------------------------------form驗證
const ruleLists: any = reactive({
  ruleItem: {
    managerId: {
      label: "名稱",
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
    date: {
      label: "時程",
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
    dayOn: {
      label: "課程",
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
    dayOff: {
      label: "課程",
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

  .add-reserve-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;

    background-color: #faf9f8;
    border-radius: 10px;
    padding: 15px 15px 15px 15px;
    border: solid 1px #000000;

    .basic_info_main {
      // display: flex;
      align-items: baseline;

      .basic_info_item {
        // padding: 8px 8px 8px 8px;
        display: flex;
        width: 100%;
        margin: 15px;

        .error-msg {
          display: grid;
        }

        span {
          text-align: left;
          font-size: 22px;
          font-weight: bold;
          width: 150px;
          // width: 1000px;
          // color: #875959;
        }

        >input {
          width: 100%;
          height: 25px;
          border: solid 1px #707070;
          background-color: #fff;
          border-radius: 5px;
        }

        >select {
          width: 300px;
          height: 30px;
          font-size: 20px;
          border: solid 1px #707070;
          background-color: #fff;
          border-radius: 5px;
        }

        .news-filter {
          >select {
            >option {
              .form_name {
                color: #ff0000;
              }
            }
          }
        }

        .search_item {
          height: 100px;

          .search_item2 {
            height: 100px;

            .search_item3 {
              height: 100px;
            }
          }

          >datalist {
            height: 100px;
          }

          >input {
            width: 270px;
            height: 26px;
            font-size: 20px;
            border: solid 1px #707070;
            background-color: #fff;
            border-radius: 5px;
          }

          >select {
            width: 300px;
            height: 30px;
            font-size: 20px;
            border: solid 1px #707070;
            background-color: #fff;
            border-radius: 5px;
          }
        }

        span {
          // display: block;
          // height: 30px;
          // width: 95%;
          // text-align: left;
          // font-size: 15px;
          // text-align: left;
          // color: #877059;
          // font-weight: bold;
        }

        .p_error {
          color: #fc0505;
          width: 100%;
        }

        .el-select {
          border: solid 1px #707070;
          background-color: #fff;
          border-radius: 5px;
        }
      }

      .name {
        // width: 60%;
      }

      .time {
        // width: 20%;
      }

      .beautician {
        // width: 20%;
      }

      .news-filter select {
        height: 30px;
        width: 100%;
        font-size: 20px;
        // padding: 7px 7.7px 6px 9px;
        border-radius: 5px;
        border: solid 1px #707070;
        background-color: var(--white);
        background-color: #ffffff;
        color: #707070;
      }

      option {
        appearance: none;
        background: #fff;
        position: absolute;
        color: #707070;
      }
    }

    .add_seldate {
      display: grid;
      // width: 99%;
      // justify-content: right;
      font-size: 20px;
      font-family: HeitiTC;
      color: #84715c;
      font-weight: bold;

      >input {
        width: 178px;
        height: 30px;
        text-align: center;
        border-radius: 6px;
        border: solid 1px #707070;
      }
    }

    >p {
      font-size: 20px;
      font-weight: bold;
    }

    .Column {
      // width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }

    .add-reserve-btn {
      width: 262px;
      height: 45px;
      justify-content: space-between;
      margin: 5px 5px 5px 5px;
      // padding: 5px 5px 5px 5px;
      text-align: center;
      border-radius: 10px;

      font-size: 20px;
      background-color: #fff;
      color: #d8cac8;

      .add-reserve-ico {
        // margin: -2px;
        justify-content: center;
        flex: 1;
        text-align: right;
      }
    }

    .add-reserve-btn:checked+span {
      // color: yellow;
      background-color: #444;
    }

    .add-reserve-btn2 {
      display: none;
    }

    .add-reserve-btn2+span {
      width: 262px;
      line-height: 45px;
      justify-content: space-between;
      margin: 5px 5px 5px 5px;
      text-align: center;
      vertical-align: middle;
      border-radius: 10px;

      font-size: 20px;
      background-color: #fff;
      color: #d8cac8;
      cursor: pointer;

      display: inline-block;
      border: 2px solid #707070;
      user-select: none;
      /* 防止文字被滑鼠選取反白 */
    }

    .add-reserve-btn2+.checkLesson {
      background-color: #906e6c;
    }

    .lesson-span {
      font-weight: 500;
    }

    .add-reserve-btn2:checked+span {
      background-color: #906e6c;
    }

    // }

    .row {
      position: relative;
      display: flex;
      // width: 100%;
      justify-content: center;

      // flex-wrap: wrap;
      .confirm-reserve-btn {
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
