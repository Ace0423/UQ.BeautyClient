<template>
  <div class="container">
    <div class="top_box">
      <Header :Icon="Icon" :moduleType="'預約紀錄'" :memuState="props.memuState" :handmemuStateBtn="props.handmemuStateBtn">
      </Header>
      <div class="top_menu">
        <div>
          <div>
            <img :src="btn_msg_ico" @click="showNoticeFn(true)" />
            <div class="msg-count" v-if="newApptDataRef.noticeCount > 0">
              <span>{{ newApptDataRef.noticeCount }}</span>
            </div>
          </div>
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              <img :src="btn_add_ico" />
            </span>
            <template #dropdown>
              <el-dropdown-menu class="top-menu-drop">
                <el-dropdown-item command="addAppt">新增預約</el-dropdown-item>
                <el-dropdown-item command="addRest">加入休息時間</el-dropdown-item>
                <el-dropdown-item command="addCheckOut">新增快速結帳單</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="appt_main">
      <div>
        <div class="item-tab" name="上選單">
          <div>
            <button :class="mainTabIndexRef == index ? 'active' : ''" v-for="(item, index) in mainTypeDataRef"
              :key="item.id" v-on:click="changeMainTab(index)">
              {{ item.title }}
            </button>
          </div>
          <el-select v-if="showManagerSelect && mainTabIndexRef == 0" v-model="selectManager" multiple clearable
            collapse-tags value-key="id" placeholder="人員" popper-class="custom-select" :max-collapse-tags="1"
            class="my-select">
            <template #header>
              <el-checkbox v-model="checkAll" :indeterminate="indeterminate" @change="handleCheckAll">
                All
              </el-checkbox>
            </template>
            <el-option v-for="item in managerListRef" :key="item.id" :label="item.title" :value="item">
            </el-option>
          </el-select>
        </div>
        <div class="appt_box" name="預約">
          <div class="appt_calendar" name="預約排程" v-show="mainTabIndexRef == 0">
            <div v-if="mainTabIndexRef == 0">
              <FullCalendarUI v-if="showFullUIRef" :bookList="bookingListRef" :clickBookInfoFn="clickBookInfoFn"
                :selectManager="selectManager" :changeDateTabsFn="changeDateTabsFn" :changeDateDayFn="changeDateDayFn" />
            </div>
          </div>
          <div class="apptList_list" name="預約列表" v-show="mainTabIndexRef == 1">
            <div class="content-topBar">
              <p>訂單(全部{{ filterApptData.length }}個)</p>
              <div>
                <input v-model="searchList" class="search-control" placeholder="搜尋編號、顧客" />
              </div>
            </div>
            <div class="content-main">
              <el-table :data="filterApptData" id="dragTable" style="width: 100%; height: 100%; " :cell-style="rowStyle"
                :header-cell-style="headerRowStyle">
                <el-table-column prop="dateBooking" label="預約時間" min-width="20%" :sort-by="['name']" align="center" sortable>
                  <template #default="scope">
                    <div class="order-name">
                      <div class="td_time">
                        <div class="dateBox">
                          <div class="date-title">
                            <span class="p_month">
                              {{ scope.row.dateBooking.split("-")[1] + "月" }}
                            </span>
                            <span class="p_date">{{
                              scope.row.dateBooking.split("-")[2].split("T")[0]
                            }}</span>
                            <span class="p_year">{{
                              scope.row.dateBooking.split("-")[0]
                            }}</span>
                          </div>
                          <span>{{ scope.row.dateBooking.split("-")[2].split("T")[1].substring(0, 5) }}</span>
                        </div>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="serviceInfo.name" label="預約項目" min-width="20%" />
                <el-table-column prop="memberInfo.nameView" label="顧客" min-width="20%" />
                <el-table-column prop="bookingState[item.state]" label="已完成" min-width="20%" >
                  <template #default="scope">
                    <div class="appt-bookingState">
                      <span>
                        {{ bookingState[scope.row.state] }}
                      </span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="" min-width="20%">
                  <template #default="scope">
                    <div class="appt-operate">
                      <button v-show="scope.row.state == 0" v-on:click="delApptListHdr(scope.row)">
                        <img :src="DeleteIcon" />
                      </button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <AddApptUI v-if="showAddRef" :showAddApptFn="showAddApptFn"></AddApptUI>
  <AddRestTimeUI v-if="showAddRestUIRef" :showAddRestUIFn="showAddRestUIFn"></AddRestTimeUI>
  <FastCheckOutUI v-if="showFastCheckOutRef" :showUIFn="showFastCheckOutUIHdr" :selData="'快速結帳'" />
  <InfoApptUI v-if="showApptInfoRef" :showUIHdr="showApptInfoHdr" :selItemData="selBookData" />
  <NoticeApptUI v-if="showNoticeRef" :showUIHdr="showNoticeFn" />
</template>

<script setup lang="ts">
import DeleteIcon from "@/assets/Icon material-delete.svg";
import arrow_left_ico from "@/assets/Icon appointment-left.svg";
import arrow_right_ico from "@/assets/Icon appointment-right.svg";
import Icon from "@/assets/images/icon_appt.png";
import btn_add_ico from "@/assets/images/icon_add.png";
import btn_msg_ico from "@/assets/images/icon_msg.png";
import { storeToRefs } from "pinia";
import { useApptStore } from "@/stores/apptStore";
import { showErrorMsg, showHttpsStatus } from "@/types/IMessage";
import { addZeroDateFn, bookingState, colorValues, countTimeUtil, formatDateTime, getColorNum } from "@/utils/utils";
import Alert from "@/components/alertCmpt";
import { useManagerStore } from "@/stores/manager";
import { useCounterStore } from "@/stores/counter";
import icon_right_arrow from "@/assets/images/icon_right_arrow.png";

const props = defineProps<{
  memuState: any;
  handmemuStateBtn: Function;
}>();

const counterStore = useCounterStore();
const { handLogOut } = counterStore;
const managerStore = useManagerStore();
const { getWorkingHours } = managerStore;
const { workingHoursList } = storeToRefs(managerStore);

let store = useApptStore();
let { managerList, tuiBookingListRef } =
  storeToRefs(store);
let {
  getApptDataApi,
  getDayOffApi,
  postEditApptStateApi,
  getManagerListApi,
  getRestApi,
  getNoticeCountApi,
} = store;

let searchList = ref("");
let showWeekBoxRef = ref(2);
let showFastCheckOutRef = ref(false);
let showFullUIRef = ref(true);
let mainTabIndexRef = ref(0);
let aptTitle = reactive(["預約時間", "預約項目", "顧客", "已完成"]);
let title = ["日", "一", "二", "三", "四", "五", "六"];

let showAddRef = ref(false);
let showAddRestUIRef = ref(false);
let showApptInfoRef = ref(false);
let showNoticeRef = ref(false);
let showOkBtnRef = ref(false);
let showTuiApptRef = ref(false);
let showManagerSelect = ref(false);
let selectManager = ref([]);
let checkAll = ref(false)
let indeterminate = ref(false)

let checkYM = ref(true);
let currentDay = ref(new Date().getDate());
let currentMonth = ref(new Date().getMonth());
let currentYear = ref(new Date().getFullYear());
let bookingListRef: any = ref([]);

let nowdatetime = curDateFn();
let selDate = ref(nowdatetime);

let mainTypeDataRef = ref([
  {
    id: 1,
    title: "預約排程",
  },
  {
    id: 2,
    title: "預約列表",
  },
]);
let tuiList: any = ref([
]);

let newApptDataRef: any = ref({
  memberId: null,
  timer: null,
  beauticianId: 0,
  courses: [],
  selDate: selDate,
  noticeCount: 0,
});
//列表資訊
let filterApptData: any = computed(() => {
  let curAptData: any = [];
  for (let i = 0; i < tuiBookingListRef.value.length; i++) {
    let element = tuiBookingListRef.value[i];
    if (
      !searchList.value ||
      element.memberInfo.nameView.toLowerCase().includes(searchList.value.toLowerCase())
    ) {
      curAptData.push(element);
    }
  }

  curAptData.sort(function (a: any, b: any) {
    return a.dateBooking > b.dateBooking ? 1 : -1;
  });
  return curAptData;
});
let filterManagerCpt: any = computed(() =>
  managerList.value.filter(getDataFn)
);

function getDataFn(data: any) {
  if (data && data.roleList.length > 0 && data.roleList[0].roleId == 5) {
    return {
      id: data.managerId,
      title: data.nameView,
      managerInfo: data,
    }
  }
}
let managerListRef: any = ref([]);
onBefore();
function onBefore() {
  getApptInfoFn(new Date().getFullYear(), new Date().getMonth() + 1);
}
onMounted(() => {
  // resetApptTable();
});

/**抓取預約紀錄 */
function getApptInfoFn(year: number = 0, month: number = 0, date: number = currentDay.value) {
  bookingListRef.value = [];
  managerListRef.value = [];
  // 獲取美容師
  getManagerListApi(0, 5).then((res) => {
    for (let i = 0; i < res.length; i++) {
      const element = res[i];
      managerListRef.value.push({
        id: element.managerId,
        title: element.nameView,
        managerInfo: element,
      })
      handleCheckAll(true);
    }
    //預設全選
  });
  getApptDataApi("", "", year, month).then((res: any) => {
    showFullUIFn(false);
    // resetApptTable(year, month, date)
    tuiList.value = [];
    for (let i = 0; i < tuiBookingListRef.value.length; i++) {
      //{ id: '1', resourceId: 'b', start: '2024-01-18T02:00:00', end: '2024-01-18T07:00:00', title: '課程1', user: '會員1', manager: '管理員1', color: '#6ffff3' }
      const element = tuiBookingListRef.value[i];
      let curColor = element.state == 0 ? element.serviceInfo.color : "#717171";
      bookingListRef.value.push({
        bookInfo: element,
        id: element.bookingNo,
        resourceId: element.managerInfo.managerId,
        start: element.dateBooking,
        end: countTimeUtil(element.dateBooking, "add", 0, 0, element.timer),
        title: element.serviceInfo.name,
        user: element.memberInfo.nameView,
        manager: element.managerInfo.nameView,
        color: curColor,
      })
    }
    // getRestList(0, year, month, date);
    showFullUIFn(true);
  });
  getDayOffList(0, year, month, date);
  getRestList(0, year, month, date);
  updateNoticeCount();
}

function getCurDate() {
  getApptInfoFn(currentYear.value, currentMonth.value + 1)
}

let dayOffList: any = ref([]);
/**取休息日 */
function getDayOffList(id: any, yy: any, mm: any, dd: any) {
  getDayOffApi(id, yy, mm, dd).then((res: any) => {
    for (let i = 0; i < res.length; i++) {
      const element = res[i];
      bookingListRef.value.push({
        bookInfo: element,
        id: element.mwNo,
        resourceId: element.managerInfo.managerId,
        start: element.date,
        title: element.title,
        user: "",
        manager: element.managerInfo.nameView,
        color: element.color,
      })
    }
  })
}
/**取休息時間 */
function getRestList(id: any, yy: any, mm: any, dd: any) {
  getRestApi(id, yy, mm, dd).then((res: any) => {
    for (let i = 0; i < res.length; i++) {
      const element = res[i];
      bookingListRef.value.push({
        bookInfo: element,
        id: element.mwNo,
        resourceId: element.managerInfo.managerId,
        start: element.date + "T" + element.dayOn,
        end: element.date + "T" + element.dayOff,
        title: element.title,
        user: "",
        manager: element.managerInfo.nameView,
        color: element.color,
      })
    }
  })
}

let restList: any = ref([]);
///**獲取休息日 */
function getRestList1(id: any, y: any, m: any, d: any) {
  let data = {
    managerId: id,
    year: y,
    month: m,
    day: d,
    pageIndex: 0,
    count: 0,
  };

  getWorkingHours(data)
    .then(() => {
      setRestTimeFn(workingHoursList.value.data);
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
///**格式化休息日 */
function setRestTimeFn(data: any) {
  // showTuiApptRef.value = false;
  showFullUIFn(false);
  let tidyRestData = [];
  restList.value = [];
  for (let i = 0; i < data.length; i++) {
    const eleTable = data[i];
    for (let j = 0; j < eleTable.timeTableList.length; j++) {
      const eleTimeTableList = eleTable.timeTableList[j];
      for (let k = 0; k < eleTimeTableList.restTime.length; k++) {
        const eleRestTime = eleTimeTableList.restTime[k];
        if (eleRestTime.mwrNo) {
          tidyRestData.push({
            mwrNo: eleRestTime.mwrNo,
            managerId: eleTable.managerId,
            nameView: eleTable.nameView,
            date: eleTimeTableList.date,
            dayOn: eleRestTime.dayOn,
            dayOff: eleRestTime.dayOff,
            times: eleRestTime.times,
          });
          // 顯示課程ITEM
          restList.value.push({
            id: eleRestTime.mwrNo,
            //顏色
            calendarId: "888", // (element.lessonId / 2).toString(),
            //顯示內容
            title:
              "" +
              eleTable.nameView +
              "<br>" +
              "休息時間" +
              "<br>" +
              eleRestTime.times +
              " Min",
            titleMonth: eleTable.nameView + " - 休息時間",
            category: "time",
            dueDateClass: "",
            start: eleTimeTableList.date + "T" + eleRestTime.dayOn + ":00",
            end: eleTimeTableList.date + " " + eleRestTime.dayOff + ":00",
            // raw: tidyRestData[tidyRestData.length - 1],
            raw: {
              title: "休息時間",
              customer: tidyRestData[tidyRestData.length - 1].nameView,
              serverName: "",//tidyRestData[tidyRestData.length - 1].nameView,
              lesson: "休息時間",
              times: tidyRestData[tidyRestData.length - 1].times,
            }
          });
        }
      }
    }
  }
  // showTuiList = [];
  // showTuiList = tuiList;
  // showTuiApptRef.value = true;

  showFullUIFn(true);
}
/**取未讀訊息數量 */
function updateNoticeCount() {
  getNoticeCountApi().then((res) => {
    console.log(res.unReadCount);

    if (res)
      newApptDataRef.value.noticeCount = res.unReadCount;
  });
}
let selBookData: any = null;
///**選單 新增預約 休息 快速結帳 */
const handleCommand = (command: string | number | object) => {
  switch (command) {
    case "addAppt":
      selBookData = null;
      resetAddReserveForm();
      addAddReserveBtn();
      break;
    case "addRest":
      showAddRestUIFn(true);
      break;
    case "addCheckOut":
      showFastCheckOutUIHdr(true);
      break;

    default:
      break;
  }
  // updateNoticeCount();
};
function resetAddReserveForm() {
  newApptDataRef.value.courses = [];
  newApptDataRef.value.memberId = null;
  newApptDataRef.value.timeBooking = null;
  newApptDataRef.value.beauticianId = 0;
  newApptDataRef.value.selDate = selDate;
}
function addAddReserveBtn() {
  showOkBtnRef.value = false;
  resetAddReserveForm();
  showAddApptFn(true);
}
//新增預約表單-顯示
let showAddApptFn = (state: boolean) => {
  showAddRef.value = state;
  if (!state) {
    getCurDate();
    // updateNoticeCount();
  }
};
//休息時間-顯示
function showAddRestUIFn(state: boolean) {
  showAddRestUIRef.value = state;
  if (!state) {
    getCurDate();
    // updateNoticeCount();
  }
}
//新增分類-顯示
let showFastCheckOutUIHdr = (state: boolean) => {
  showFastCheckOutRef.value = state;
  // getGoodsGroupApi(0);
  if (!state) updateNoticeCount();
};
//更新預約資訊
const showApptInfoHdr = (state: boolean) => {
  showApptInfoRef.value = state;
  if (!state) {
    selBookData = null;
    bookingListRef.value = null;
    getCurDate();
    updateNoticeCount();
  }
};
function showNoticeFn(state: boolean) {
  showNoticeRef.value = state;
  updateNoticeCount();
}
//改變預約狀態
let changeStutusFn = (state: number, item: any) => {
  item.state = state;
  let editApptDate = {
    bookingNo: item.id ? item.id : item.bookingNo,
    state: item.state,
  };
  //修改預約
  postEditApptStateApi(editApptDate).then((res: any) => {
    getCurDate();
  });
};
//切換列表獲取資訊
function changeWeekToday(data: number) {
  getCurDate();
}
function showFullUIFn(params: boolean) {
  showFullUIRef.value = params;
}
//刪除預約
let delApptListHdr = (item: any) => {
  Alert.check("是否刪除", 0, (data: any) => {
    if (data) {
      let delApptDate = {
        bookingNo: item.bookingNo,
        state: 3,
      };
      //修改預約
      postEditApptStateApi(delApptDate).then((res: any) => {
        // props.showUIHdr(false);
        getCurDate();
      });
    }
  });
};
//選擇那天 yyyy-mm-dd
function curDateFn() {
  return (
    currentYear.value +
    "-" +
    addZeroDateFn(currentMonth.value, 1) +
    "-" +
    addZeroDateFn(currentDay.value)
  );
}
let changeMainTab = (index: number) => {
  mainTabIndexRef.value = index;
  changeWeekToday(2);
};
//--------------------------------------------------人員選單
const handleCheckAll = (val: any) => {
  indeterminate.value = false
  if (val) {
    selectManager.value = managerListRef.value.map((_: any) => _)
  } else {
    selectManager.value = []
  }
}

watch(selectManager, (val) => {
  if (val.length === 0) {
    checkAll.value = false
    indeterminate.value = false
  } else if (val.length === managerListRef.value.length) {
    checkAll.value = true
    indeterminate.value = false
  } else {
    indeterminate.value = true
  }
})

//-------------------------------------------------------------------------表格css
//內容css
const rowStyle = ({ row, column, rowIndex, columnIndex }: any) => {
  return {
    backgroundColor: '#fff',
    color: '#717171',
    fontSize: "16px",
    fontWeight: "bold",
    margin: "3px 5px",
    fontFamily: " STXihei",
    borderBottom: "2px solid rgba(112, 112, 112, 0.5)"
  }
}
//標頭css
const headerRowStyle = ({ row, column, rowIndex, columnIndex }: any) => {
  return {
    height: "50px",
    backgroundColor: '#fff',
    fontSize: "20px",
    borderBottom: "0px solid rgba(112, 112, 112, 0.5)"
  }
}
//--------------------------------------------------full套件設置
let xxx: any = ref([]);
function clickBookInfoFn(data: any) {
  if (data.bookingNo) {
    selBookData = data;
    showApptInfoHdr(true);
  }
};
function changeDateTabsFn(data: any) {
  if (data == 2)//日曆
    showManagerSelect.value = true;
  else//月曆週曆
    showManagerSelect.value = false;
};
//日曆換日期按鈕
function changeDateDayFn(start: any, end: any, date: any) {
  getApptInfoFn(start.getFullYear(), end.getMonth() + 1, 0);
};

</script>

// 套件css
<style lang="scss">
.top-menu-drop li {
  font-weight: bold;
}
</style>

<style scoped lang="scss">
$borderCoder: #eaedf2;

.container {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  position: relative;
  // width: 100%;

  .top_box {
    display: flex;
    width: 100%;
    height: 70px;

    .top_menu {
      display: flex;
      // width: calc(50%);
      flex: 1;
      justify-content: right;
      height: 29px;

      >div {
        // height: 29px;
        width: 58px;
        justify-content: right;
        display: flex;
        position: relative;
        right: 15px;
        top: 15px;

        >img {
          margin-right: 10px;
          height: 29px;
          width: 29px;
        }

        >div {
          >img {
            // margin-right: 10px;
            height: 29px;
            width: 26px;
          }

          width: 29px;

          .msg-count {
            width: 20px;
            height: 15px;
            border-radius: 50px;
            // border: 1px solid #8b6f6d;
            background: #ff1100;
            position: absolute;
            top: -5px;
            left: 5px;

            >span {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
              height: 100%;
              color: #fff;
              font-weight: bold;
              font-size: 12px;
            }
          }
        }
      }
    }
  }

  .appt_main {
    position: absolute;
    top: 80px;
    bottom: 0px;
    left: 0px;
    right: 0px;

    >div {
      // height: 100%;
      height: 100%;
      position: relative;

      .item-tab {
        display: flex;
        height: 45px;
        width: 94%;
        position: relative;
        left: 3%;

        >div {
          display: flex;
          width: calc(100% - 240px);
          height: 100%;

          >button {
            white-space: nowrap;
            min-width: 120px;
            justify-content: center;
            align-items: center;
            border: none;
            border-radius: 10px;
            background-color: #faf9f8;
            font-size: 20px;
            font-weight: bold;
            font-family: HeitiTC;
            color: #717171;
            border-radius: 10px 10px 0 0;
          }

          >button.active {
            background-color: #e6e2de;
          }
        }

        // .el-select {
        //   height: 32px;
        // }

        .my-select {
          height: 32px;
          width: 214px;

          :deep(.el-select__wrapper) {
            width: 100%;
          }
        }

      }

      .appt_box {
        position: absolute;
        display: flex;
        width: 94%;
        margin-left: 3%;
        // height: calc(100% - 45px);
        top: 45px;
        bottom: 10px;

        .appt_calendar {
          position: relative;
          width: 100%;
          height: 100%;
          border: 1px solid #ddd;
          box-sizing: border-box;

          >div {
            width: 100%;
            height: 100%;
          }
        }

        .apptList_list {
          position: relative;
          top: 0px;
          left: 0px;
          align-items: center;
          width: 100%;
          height: 100%;
          background: #ffffff;
          margin: 0 auto;
          border: 1px solid #ddd;

          .content-topBar {
            height: 50px;
            width: calc(100%);
            font-weight: bold;
            display: flex;
            align-items: center;
            color: #717171;
            border: solid 1px #707070;
            box-sizing: border-box;
            background-color: #e6e2de;

            >div {
              display: flex;
              height: 100%;
              align-items: center;
              justify-content: right;
              width: 88%;

              .search-control {
                width: 200px;
                height: 60%;
                border-radius: 6px;
                border: solid 1px #707070;
                box-sizing: border-box;
                background-color: #fff;
                margin-right: 10px;

                background: url("@/assets/images/icon_search.png") no-repeat;
                background-color: #fff;
                background-position: 99%;
                background-origin: content-box;
                text-indent: 5px;
              }

              >.btn-open {
                width: 90px;
                height: 30px;
                margin: 0;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                display: flex;
                // padding: 7px 11px 6px;
                border-radius: 6px;
                border: solid 1px #707070;
                box-sizing: border-box;
                background-color: #84715c;
                color: #ffffff;
              }
            }
          }

          .content-main {
            .el-table {
              .td_time {
                >div {
                  justify-content: center;
                  display: grid;
                  width: 100%;
                  height: 100%;

                  .date-title {
                    width: 63px;
                    height: 63px;
                    border: solid 1px #707070;
                    box-sizing: border-box;
                    border-radius: 10px;

                    // display: inline-block;
                    // position: relative;
                    // text-align: center;
                    // justify-content: center;

                    .p_month {
                      font-size: 10px;
                      height: 20px;
                      display: flex;
                      justify-content: center;
                      height: 30%;
                    }

                    .p_date {
                      font-size: 20px;
                      height: 20px;
                      display: flex;
                      justify-content: center;
                      height: 40%;
                    }

                    .p_year {
                      font-size: 10px;
                      // line-height: 1px;
                      height: 20px;
                      display: flex;
                      justify-content: center;
                      height: 30%;
                    }
                  }

                  >span {
                    text-align: center;
                  }
                }
              }

              .appt-bookingState {}

              .appt-operate {
                background-color: #ff1100;

                >button {
                  background-color: transparent;
                  border: none;
                  display: inline;
                  float: right;
                  margin-right: 15px;
                }
              }

              >th:nth-child(0) {
                background-color: #ff1100;
                min-width: 20%;
                >span {
                  justify-content: center;
                }
              }

            }
          }

        }
      }
    }
  }
}

.isCurDate {
  color: #ff1100 !important;
  // background-color: #8b6f6d !important;
  // border-radius: 50%; // 99em;
}

.isSelDate {
  // color: #d7cac9 !important;
  background-color: #8b6f6d !important;
  border-radius: 50%; // 99em;
}

ul,
li {
  margin: 0;
  padding: 0;
}

.noMore {
  min-height: 200px;
  padding: 2%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(156, 173, 173, 0.3);
  color: #9cadadb7;
  box-sizing: border-box;
}


.Tui_calendar_main {
  height: 100%;
  width: 100%;

  >div {
    border-radius: 15px; // 99em;
    border: 1px solid #707070;
    position: absolute;
    height: 98%;
    width: 98%;
    top: 1%;
    left: 1%;
  }
}

.Tui_calendar_date {
  height: 100%;
  width: 100%;

  >div {
    border-radius: 15px; // 99em;
    border: 1px solid #707070;
    position: absolute;
    height: 98%;
    width: 98%;
    top: 1%;
    left: 1%;
  }
}

.border-box {
  /* 常规 */
  box-sizing: border-box;
  /* firefox */
  -moz-box-sizing: border-box;
  /* chrome */
  -webkit-box-sizing: border-box;
  /* IE8以下 */
  -ms-box-sizing: border-box;
  /* opera */
  -o-box-sizing: border-box;
}
</style>
