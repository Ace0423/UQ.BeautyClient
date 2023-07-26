<template>
  <div id="add_form" class="form_bg" @click.self="showAddReserveForm(false)">
    <div class="add-reserve-form">
      <div class="basic_info_main">
        <div class="basic_info_item name">
          <p>姓名(電話)</p>
          <!-- <select v-model="newApptDataRef.memberId">
            <option v-for="item in memberList.data" :key="item" :value="item">
              {{ item.nameView + "(" + item.phone + ")" }}
            </option>
          </select> -->
          <el-select
            v-model="newApptDataRef.memberId"
            filterable
            allow-create
            default-first-option
            :reserve-keyword="false"
            placeholder=" "
          >
            <el-option
              v-for="item in memberList"
              :key="item.nameView"
              :value="item.userId"
              :label="item.nameView"
            >
              {{ item.nameView + "(" + item.phone + ")" }}
            </el-option>
          </el-select>
          <span class="p_error" v-if="ruleItem.name.is_error">
            {{ ruleItem.name.warn }}
          </span>
          <!-- <SelectSearchUI :dataList="memberList.data" /> -->
        </div>
        <div class="basic_info_item time">
          <p>選擇時段</p>
          <div class="news-filter">
            <el-select
              v-model="newApptDataRef.timeBooking"
              allow-create
              default-first-option
              :reserve-keyword="false"
              placeholder=" "
            >
              <el-option
                v-for="(item, index) in timeGroup"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
            <span class="p_error" v-if="ruleItem.timeBooking.is_error">
              {{ ruleItem.timeBooking.warn }}
            </span>
          </div>
        </div>
        <div class="basic_info_item beautician">
          <p>美容師</p>
          <div class="news-filter">
            <el-select
              v-model="newApptDataRef.beauticianId"
              allow-create
              default-first-option
              :reserve-keyword="false"
              placeholder=" "
            >
              <el-option
                v-for="item in filterBeauticianCpt"
                :key="item.managerId"
                :value="item.managerId"
                :label="item.nameView"
              >
                <span class="form_name"> {{ item.nameView }}</span>
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="add_seldate">
        <input type="date" v-model="newApptDataRef.selDate" />
      </div>
      <p>選擇課程</p>
      <div>
        <div v-if="false" class="add-reserve-div">
          <template v-for="item in courseDataList" :key="item">
            <label v-if="item.display" :value="item">
              <input
                class="add-reserve-btn2"
                type="checkbox"
                :value="item"
                v-model="newApptDataRef.courses"
              />
              <span
                class="lesson-span"
                value="{{item}}"
                name="{{item.nameTw}}"
                >{{ item.nameTw + "(" + item.servicesTime + ")" }}</span
              >
            </label>
          </template>
        </div>
        <div v-else class="edit-reserve-div">
          <template v-for="(item, index) in courseDataList" :key="item">
            <label v-if="item.display" :value="item">
              <input
                class="add-reserve-btn2"
                type="radio"
                :value="item"
                v-model="newApptDataRef.courses"
              />
              <span
                :class="{
                  checkLesson: newApptDataRef.courses == index,
                }"
                value="{{item}}"
                name="{{item.nameTw}}"
                >{{ item.nameTw + "(" + item.servicesTime + ")" }}</span
              >
            </label>
          </template>
        </div>
        <span class="p_error" v-if="ruleItem.lessonItem.is_error">
          {{ ruleItem.lessonItem.warn }}
        </span>
      </div>
      <div class="row">
        <button class="confirm-reserve-btn" @click="confirmReserveForm()">
          修改
        </button>
        <button class="confirm-reserve-btn" @click="showAddReserveForm(false)">
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
import { verify_methods } from "@/utils/utils";
import { useManagerStore } from "@/stores/manager";
import { useCounterStore } from "@/stores/counter";
import Alert from "../alertCmpt";
let addCourseTypesName = ref("");

let aptTitle = reactive(["預約時間", "預約項目", "顧客", "已完成"]);

const props = defineProps<{
  showAddReserveForm: Function;
  curApptDataRef: any;
  oldSelList: any;
}>();

let newApptDataRef: any = ref({
  memberId: null,
  timeBooking: "",
  beauticianId: 0,
  courses: [],
  selDate: "",
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
      },
      is_error: false,
      warn: "",
      is_show: true,
    },
    timeBooking: {
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
    lessonItem: {
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

let store = useApptStore();
const { postEditApptDataApi } = store;
let { memberList, timeGroup, beauticianList, courseDataList } =
  storeToRefs(store);
const managerstore = useManagerStore();
const { managerList } = storeToRefs(managerstore);
const { getManagerList } = managerstore;
const counterStore = useCounterStore();
const { handLogOut } = counterStore;

onBefore();
function onBefore() {
  getManagerList({ id: 0, pageindex: 0, count: 0 })
    .then((res) => {
      if (res.state == 2) {
        Alert.warning(showErrorMsg(res.msg), 2000);
      }
    })
    .catch((e: any) => {
      Alert.warning(showHttpsStatus(e.response.status), 2000);
      if (e.response.status == 401) {
        setTimeout(() => {
          handLogOut();
        }, 2000);
      }
    });
}
onMounted(() => {
  newApptDataRef.value = props.curApptDataRef;
});
let filterBeauticianCpt: any = computed(() => {
  let curBeautician = [];
  curBeautician.push({
    managerId: 0,
    nameView: "不指定",
    phone: "0000000000",
    roleList: [
      {
        roleId: 5,
        mgrId: 4,
        label: "Expert",
        nameView: "CCCAdmin",
      },
    ],
  });
  for (let i = 0; i < managerList.value.data.length; i++) {
    const element = managerList.value.data[i];
    if (element.roleList.length > 0 && element.roleList[0].roleId == 5)
      curBeautician.push(element);
  }
  return curBeautician;
});

function getNowDay() {
  let datetime = new Date();
  let year = datetime.getFullYear();
  let month = (datetime.getMonth(), 1);
  let date = datetime.getDate();
  return `${year}-${month}-${date}`;
}
//預約--確認
let confirmReserveForm = () => {
  ruleLists.ruleItem.name.value = newApptDataRef.value.memberId;
  ruleLists.ruleItem.timeBooking.value = newApptDataRef.value.timeBooking;

  ruleLists.ruleItem.lessonItem.value = newApptDataRef.value.courses
    ? newApptDataRef.value.courses.nameTw
    : newApptDataRef.value.courses;

  if (!verify_all()) return;

  let editApptDate = {
    bookingNo: props.oldSelList.bookingNo,
    userId: newApptDataRef.value.memberId,
    lessonId: newApptDataRef.value.courses.lessonId,
    serverId: newApptDataRef.value.beauticianId,
    dateBooking:
      newApptDataRef.value.selDate + "T" + newApptDataRef.value.timeBooking,
    timer: newApptDataRef.value.courses.servicesTime,
    tradeDone: props.oldSelList.tradeDone,
    state: props.oldSelList.state == 99 ? 0 : props.oldSelList.state,
    price: newApptDataRef.value.courses.price,
    discount: props.oldSelList.discount,
    dateCreate: props.oldSelList.dateCreate,
    bookingMemo: props.oldSelList.bookingMemo,
  };
  //修改預約
  postEditApptDataApi(editApptDate).then((res: any) => {
    let resData = res;
    if (resData.state == 1) {
      props.showAddReserveForm(false);
    }
  });
};
function resetAddReserveForm() {
  newApptDataRef.value.courses = [];
  newApptDataRef.value.memberId = null;
  newApptDataRef.value.timeBooking = null;
  newApptDataRef.value.beauticianId = 0;
  newApptDataRef.value.selDate = newApptDataRef.value.selDate;
}
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
    // width: 54%;
    width: 600px;
    // min-width: 560px;

    background-color: #faf9f8;
    border-radius: 10px;
    padding: 15px 15px 15px 15px;
    border: solid 1px #000000;

    .basic_info_main {
      display: flex;
      align-items: baseline;
      .basic_info_item {
        padding: 8px 8px 8px 8px;
        display: grid;
        p {
          text-align: left;
          font-size: 20px;
          font-weight: bold;
          // color: #875959;
        }

        > input {
          width: 100%;
          height: 25px;
          border: solid 1px #707070;
          background-color: #fff;
          border-radius: 5px;
        }

        > select {
          width: 300px;
          height: 30px;
          font-size: 20px;
          border: solid 1px #707070;
          background-color: #fff;
          border-radius: 5px;
        }

        .news-filter {
          > select {
            > option {
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
          > datalist {
            height: 100px;
          }
          > input {
            width: 270px;
            height: 26px;
            font-size: 20px;
            border: solid 1px #707070;
            background-color: #fff;
            border-radius: 5px;
          }

          > select {
            width: 300px;
            height: 30px;
            font-size: 20px;
            border: solid 1px #707070;
            background-color: #fff;
            border-radius: 5px;
          }
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
        .el-select {
          border: solid 1px #707070;
          background-color: #fff;
          border-radius: 5px;
        }
      }
      .name {
        width: 60%;
      }
      .time {
        width: 20%;
      }
      .beautician {
        width: 20%;
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
      display: flex;
      width: 99%;
      justify-content: right;
      font-size: 20px;
      font-family: HeitiTC;
      color: #84715c;
      font-weight: bold;
      > input {
        width: 178px;
        height: 30px;
        text-align: center;
        border-radius: 6px;
        border: solid 1px #707070;
      }
    }

    .add-reserve-div {
      max-height: 200px;
      overflow-y: scroll;
    }
    .edit-reserve-div {
      max-height: 200px;
      overflow-y: scroll;
      span {
        font-weight: 500;
      }
    }

    > div {
      .p_error {
        color: #fc0505;
        width: 100%;
        font-weight: bold;
      }
    }

    > p {
      font-size: 20px;
      font-weight: bold;
    }

    .Column {
      // width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }

    // .add-reserve-bg {
    //     padding: 15px 15px 15px 15px;
    //     justify-content: space-between;
    //     display: flex;
    //     flex-wrap: wrap;

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

    .add-reserve-btn:checked + span {
      // color: yellow;
      background-color: #444;
    }

    .add-reserve-btn2 {
      display: none;
    }

    .add-reserve-btn2 + span {
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

    .add-reserve-btn2 + .checkLesson {
      background-color: #906e6c;
    }
    .lesson-span {
      font-weight: 500;
    }

    .add-reserve-btn2:checked + span {
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
