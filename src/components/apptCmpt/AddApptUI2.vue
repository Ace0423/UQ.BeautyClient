<template>
  <div id="add_form" class="form_bg" @click.self="showAddReserveForm(false)">
    <div class="add-reserve-form">
      <div class="basic_info_main">
        <div class="basic_info_item name">
          <p>姓名(電話)</p>
          <el-select v-model="newApptDataRef.memberId" filterable allow-create default-first-option
            :reserve-keyword="false" placeholder=" ">
            <el-option v-for="item in memberList" :key="item.nameView" :value="item.userId" :label="item.nameView">
              {{ item.nameView + "(" + item.phone + ")" }}
            </el-option>
          </el-select>
          <span class="p_error" v-if="ruleItem.name.is_error">
            {{ ruleItem.name.warn }}
          </span>
        </div>
        <div class="basic_info_item time">
          <p>選擇時段</p>
          <div class="news-filter">
            <el-select v-model="newApptDataRef.timeBooking" allow-create default-first-option :reserve-keyword="false"
              placeholder=" ">
              <el-option v-for="(item, index) in timeGroup" :key="index" :label="item" :value="item" />
            </el-select>
            <span class="p_error" v-if="ruleItem.timeBooking.is_error">
              {{ ruleItem.timeBooking.warn }}
            </span>
          </div>
        </div>
        <div class="basic_info_item beautician">
          <p>美容師</p>
          <div class="news-filter">
            <el-select v-model="newApptDataRef.beauticianId" allow-create default-first-option :reserve-keyword="false"
              placeholder=" ">
              <el-option v-for="item in beauticianRef" :key="item.managerId" :value="item.managerId"
                :label="item.nameView">
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
        <div v-if="true" class="add-reserve-div">
          <template v-for="item in serviceDetailList" :key="item">
            <label v-if="item.display" :value="item">
              <input class="add-reserve-btn2" type="checkbox" :value="item" v-model="newApptDataRef.courses" />
              <span class="lesson-span" value="{{item}}" name="{{item.name}}">{{ item.name + "(" + item.servicesTime +
                ")" }}</span>
            </label>
          </template>
        </div>
        <div v-else class="edit-reserve-div">
          <template v-for="(item, index) in serviceDetailList" :key="item">
            <label v-if="item.display" :value="item">
              <input class="add-reserve-btn2" type="radio" :value="item" v-model="newApptDataRef.courses" />
              <span :class="{
                checkLesson: newApptDataRef.courses == index,
              }" value="{{item}}" name="{{item.name}}">{{ item.name + "(" + item.servicesTime + ")" }}</span>
            </label>
          </template>
        </div>
        <span class="p_error" v-if="ruleItem.lessonItem.is_error">
          {{ ruleItem.lessonItem.warn }}
        </span>
      </div>
      <div class="row">
        <button class="confirm-reserve-btn" @click="confirmReserveForm()">
          新增
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
import { checkVerify_all, formatZeroDate } from "@/utils/utils";
import { useManagerStore } from "@/stores/manager";
import Alert from "../alertCmpt";
import { useCounterStore } from "@/stores/counter";
let addCourseTypesName = ref("");

let aptTitle = reactive(["預約時間", "預約項目", "顧客", "已完成"]);

const props = defineProps<{
  showAddReserveForm: Function;
}>();

let newApptDataRef: any = ref({
  memberId: null,
  timeBooking: "",
  beauticianId: 0,
  courses: [],
  selDate: "",
});

let options: [{
  value: '选项1',
  label: '黄金糕'
}, {
  value: '选项2',
  label: '双皮奶'
}, {
  value: '选项3',
  label: '蚵仔煎'
}, {
  value: '选项4',
  label: '龙须面'
}, {
  value: '选项5',
  label: '北京烤鸭'
}]
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
//-------------------------------------------------------------------

let store = useApptStore();
const { postAddApptDataApi, getMemberListApi, getServiceDetailApi } = store;
let { memberList, timeGroup, serviceDetailList } =
  storeToRefs(store);
const managerstore = useManagerStore();
const { managerList, managerRoleList } = storeToRefs(managerstore);
const { getManagerListNew } = managerstore;
const counterStore = useCounterStore();
const { handLogOut } = counterStore;
const managerStore = useManagerStore();
const { getWorkingHours } = managerStore;
const { workingHoursList } = storeToRefs(managerStore);
/**true:新增 false:修改 */
onBefore();
function onBefore() {
  getManagerListNew({ id: 0, pageindex: 0, count: 0 })
  getRestList();
  getServiceDetailApi();
}
onMounted(() => {
  newApptDataRef.value.selDate = getNowDay();
});
let beauticianRef: any = ref([]);
getManagerListNew({ id: 0, pageindex: 0, count: 0 }).then((res: any) => {
  beauticianRef.value = managerRoleList.value
  beauticianRef.value.unshift({
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
  })
})

function getNowDay() {
  let datetime = new Date();
  let year = formatZeroDate(datetime.getFullYear());
  let month = formatZeroDate(datetime.getMonth() + 1);
  let date = formatZeroDate(datetime.getDate());
  return `${year}-${month}-${date}`;
}
//預約--確認
let confirmReserveForm = () => {
  ruleLists.ruleItem.name.value = newApptDataRef.value.memberId;
  ruleLists.ruleItem.timeBooking.value = newApptDataRef.value.timeBooking;

  ruleLists.ruleItem.lessonItem.value =
    newApptDataRef.value.courses.length > 0
      ? newApptDataRef.value.courses[0].name
      : null;

  // if (!verify_all()) return;
  if (!checkVerify_all(ruleLists)) return;

  //判斷是否與休息時間重疊
  for (let i = 0; i < workingHoursList.value.data.length; i++) {
    const element = workingHoursList.value.data[i];
    if (element.managerId == newApptDataRef.value.memberId) {
    }
  }

  let courseListData = [];
  for (let i = 0; i < newApptDataRef.value.courses.length; i++) {
    const element = newApptDataRef.value.courses[i];
    courseListData.push({
      listNo: i + 1,
      lid: element.sId,
      time: element.servicesTime,
      bookingNo: "",
      price: element.price,
      discount: element.discount ? element.discount : 0,
    });
  }

  let addApptData = {
    userId: newApptDataRef.value.memberId,
    lessonlist: courseListData,
    serverId: newApptDataRef.value.beauticianId,
    dateBooking:
      newApptDataRef.value.selDate + "  " + newApptDataRef.value.timeBooking, //"2023-04-20T07:25:10.372Z",
    tradeDone: true,
    state: 0,
    bookingMemo: "string",
  };

  //新增預約
  postAddApptDataApi(addApptData).then((res: any) => {
    let resData = res;
    if (resData.state == 1) {
      props.showAddReserveForm(false);
    }
  });
};

function getRestList() {
  let data = {
    managerId: 0,
    year: 0,
    month: 0,
    day: 0,
    pageIndex: 0,
    count: 0,
  };

  getWorkingHours(data)
    .then(() => {
      // setRestTimeFn(workingHoursList.value.data);
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
/**
 * 判断两个时间段是否有重叠,时间 （20:30）
 */
function isTimeOverlap(
  startTime: any,
  endTime: any,
  startTime2: any,
  endTime2: any
) {
  startTime = startTime.split(":")[0] + startTime.split(":")[1];
  endTime = endTime.split(":")[0] + endTime.split(":")[1];
  startTime2 = startTime2.split(":")[0] + startTime2.split(":")[1];
  endTime2 = endTime2.split(":")[0] + endTime2.split(":")[1];
  if (endTime2 <= startTime) {
    //如果跨天了
    if (endTime < startTime) {
      if (endTime > startTime2) {
        // 重叠
        return true;
      }
    }
    console.log("isTimeOverlap: `` 不重叠");
  } else if (endTime <= startTime2) {
    //如果跨天了
    if (endTime2 < startTime2) {
      if (endTime2 > startTime) {
        // 重叠
        return true;
      }
    }
    console.log("isTimeOverlap: `` 不重叠");
  } else {
    // 重叠
    return true;
  }
  return false;
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
          display: block;
          height: 30px;
          width: 95%;
          text-align: left;
          font-size: 15px;
          text-align: left;
          color: #877059;
          font-weight: bold;
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

      >input {
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

.p_error {
  color: #fc0505 !important;
  width: 100% !important;
  font-weight: bold !important;
  font-size: 12px !important;
}
</style>
