<template>
  <div class="container">
    <div class="top_box">
      <Header :Icon="Icon" :moduleType="'預約紀錄'" :memuState="props.memuState" :handmemuStateBtn="props.handmemuStateBtn">
      </Header>
      <div class="top_menu">
        <div>
          <img :src="btn_msg_ico" />
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

          <div class="weektoday_div" v-show="mainTabIndexRef == 0">
            <div class="weektoday_btn" @click="changeWeekToday(0)" :class="{
              noSelbtn: showWeekBoxRef != 0,
              selbtn: showWeekBoxRef == 0,
            }">
              月曆
            </div>
            <div class="weektoday_btn" @click="changeWeekToday(1)" :class="{
              noSelbtn: showWeekBoxRef != 1,
              selbtn: showWeekBoxRef == 1,
            }">
              週曆
            </div>
            <div class="weektoday_btn" @click="changeWeekToday(2)" :class="{
              noSelbtn: showWeekBoxRef != 2,
              selbtn: showWeekBoxRef == 2,
            }">
              日曆
            </div>

          </div>
        </div>
        <div class="appt_box" name="預約">
          <div class="appt_calendar" name="預約排程" v-show="mainTabIndexRef == 0">
            <div v-show="false">
              <div class="little_date" v-show="showWeekBoxRef == 2">
                <div>
                  <div class="dateBox_title">
                    <img class="arrow arrow-left" :src="arrow_left_ico" @click="lastMonth()" />
                    <div class="data">
                      {{ currentYear }}-{{ curMonthAdd + "月" }}
                    </div>
                    <img class="arrow arrow-right" :src="arrow_right_ico" @click="nextMonth()" />
                  </div>
                  <div class="dateBox_content">
                    <div class="row_title">
                      <span v-for="item in title" :key="item">{{ item }}</span>
                    </div>
                    <div class="row_content">
                      <span class="prevDay" v-for="item in prevDays" :key="'A' + item">{{ item }}</span>
                      <span class="thisDay" :class="{
                        active: currentDay == index + 1 && checkYM,
                        todayEff: new Date().getDate() == item && checkToday,
                      }" v-for="(item, index) in currentDays" :key="item" v-on:click="onSelect(index + 1)">{{ item
}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div :class="tuiOptions.tuiType == 2 ? ' Tui_calendar_date' : 'Tui_calendar_main'
              " class="Tui_calendar_main" v-if="mainTabIndexRef == 0 && showWeekBoxRef != 3">
              <Tui_calendar v-if="showTuiApptRef" :tuiList="showTuiList" :tuiOptions="tuiOptions" :selectDate="selectDate"
                :selTuiListFn="selTuiListFn" :tuiSetDate="tuiSetDate"></Tui_calendar>
            </div>
          </div>

          <div class="appt_list" name="預約列表" v-show="mainTabIndexRef == 1">
            <div>
              <table>
                <thead align="left">
                  <tr>
                    <th v-for="item in aptTitle" :key="item">

                      <p>{{ item }}</p>
                    </th>
                    <input v-model="searchList" class="search-control" placeholder="搜尋顧客" />
                  </tr>
                </thead>
                <tbody id="content">
                  <tr v-for="(item, index) in filterApptData" :v-if="item.state < 2" :key="item.id">
                    <td class="td_time">
                      <div class="dateBox">
                        <span class="p_month">
                          {{ item.dateBooking.split("-")[1] + "月" }}
                        </span>
                        <span class="p_date">{{
                          item.dateBooking.split("-")[2].split("T")[0]
                        }}</span>
                        <span class="p_year">{{
                          item.dateBooking.split("-")[0]
                        }}</span>
                      </div>
                      <p>{{ item.timePeriod }}</p>
                    </td>
                    <td>
                      <p>{{ item.serviceInfo.name }}</p>
                    </td>
                    <td>
                      <p>{{ item.memberInfo.nameView }}</p>
                    </td>
                    <td>
                      <div class="checked_state">
                        <input type="checkbox" :id="item.bookingNo" :checked="item.state == 1"
                          v-on:click="changeStutusFn(item.state == 1 ? 0 : 1, item)" />
                        <label :for="item.bookingNo"></label>
                      </div>
                    </td>
                    <td>
                      <button v-show="item.state == 0" v-on:click="delCourseListHdr(index, item.id)">
                        <img :src="DeleteIcon" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <AddApptUI v-if="showAddRef" :showAddApptFn="showAddApptFn"></AddApptUI>
  <AddRestTimeUI v-if="showAddRestUIRef" :showAddRestUIFn="showAddRestUIFn"></AddRestTimeUI>
  <FastCheckOutUI v-if="showFastCheckOutRef" :showUIFn="showFastCheckOutUIHdr" :selData="'快速結帳'" />

  <LittleDateUI v-if="showLittleDateRef" :showUIFn="updateShowLittleDate" :selDate="selDate"
    :selLittleDateFn="selLittleDateFn" />
  <InfoApptUI v-if="showApptInfoRef" :showUIHdr="updateShowApptInfoRef" :selItemData="oldSelList" />
  <FullCalendarUI v-if="showApptInfoRef" />
  
  <!-- <div :class="tuiOptions.tuiType == 2 ? ' Tui_calendar_date' : 'Tui_calendar_main'
    " class="Tui_calendar_main" v-if="mainTabIndexRef == 0 && showWeekBoxRef != 3">
    <Tui_calendar v-if="showTuiApptRef" :tuiList="showTuiList" :tuiOptions="tuiOptions" :selectDate="selectDate"
      :selTuiListFn="selTuiListFn" :tuiSetDate="tuiSetDate"></Tui_calendar>
  </div> -->

  <div v-if="mainTabIndexRef == 0 && showWeekBoxRef == 3">

  </div>
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
import { colorValues, countTimeUtil, getColorNum } from "@/utils/utils";
import Alert from "@/components/alertCmpt";
import { useManagerStore } from "@/stores/manager";
import { useCounterStore } from "@/stores/counter";

const props = defineProps<{
  memuState: any;
  handmemuStateBtn: Function;
}>();

const managerstore = useManagerStore();
const { managerList, managerRoleList } = storeToRefs(managerstore);
const { getManagerListNew } = managerstore;

const counterStore = useCounterStore();
const { handLogOut } = counterStore;
const managerStore = useManagerStore();
const { getWorkingHours } = managerStore;
const { workingHoursList } = storeToRefs(managerStore);


let searchList = ref("");
let showWeekBoxRef = ref(2);
let showFastCheckOutRef = ref(false);
let mainTabIndexRef = ref(0);
let aptTitle = reactive(["預約時間", "預約項目", "顧客", "已完成"]);

let title = ["日", "一", "二", "三", "四", "五", "六"];
let weeks = ["週日", "週一", "週二", "週三", "週四", "週五", "週六"];
let weeekTodayTitle = ref("");
let months: any = ref([""]);
let curDate: any = ref();
let monthsThingsRef: any = ref([]);
let todayThingsRef: any = ref([]);

let showAddRef = ref(false);
let showAddRestUIRef = ref(false);
let showApptInfoRef = ref(false);
let showLittleDateRef = ref(false);
let showOkBtnRef = ref(false);
let showTuiApptRef = ref(false);

let checkYM = ref(true);
let currentDay = ref(new Date().getDate());
let currentMonth = ref(new Date().getMonth());
let currentYear = ref(new Date().getFullYear());

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

let beauticianRef: any = ref([]);
getManagerListNew({ id: 0, pageindex: 0, count: 0 }).then((res: any) => {
  beauticianRef.value = managerRoleList.value
  beauticianRef.value.unshift({
    managerId: -1,
    nameView: "全部",
    phone: "0000000000",
    roleList: [
      {
        roleId: 5,
        mgrId: -1,
        label: "Expert",
        nameView: "All",
      },
    ],
  })
})
//--------------------------------------------------tui套件設置
let tuiList: any = ref([
]);
let restList: any = ref([
]);

let showTuiList = computed(() => {
  return (
    tuiList.value.concat(restList.value));
});

let tuiOptions = reactive({
  leftArea: false,
  menuArea: true,
  tuiType: 2,
});
//日曆連動外層日曆
const tuiSetDate = (date: any) => {
  let curDate = date.split("-");
  currentYear.value = parseInt(curDate[0]);
  currentMonth.value = parseInt(curDate[1]) - 1;
  currentDay.value = parseInt(curDate[2]);
  // getApptInfoFn(currentYear.value, currentMonth.value+1, currentDay.value);
  getRestList(0, currentYear.value, currentMonth.value + 1, currentDay.value);
  // onCheckToday();
};
//--------------------------------------------------tui套件設置
//選擇那天 xxxx-xx-xx
function curDateFn() {
  return (
    currentYear.value +
    "-" +
    addZeroDateFn(currentMonth.value, 1) +
    "-" +
    addZeroDateFn(currentDay.value)
  );
}
const curDateFn2 = () => {
  return (
    currentYear.value +
    "-" +
    addZeroDateFn(currentMonth.value, 1) +
    "-" +
    addZeroDateFn(currentDay.value)
  );
};
let selectDate = computed(() => {
  return (
    currentYear.value +
    "-" +
    addZeroDateFn(currentMonth.value, 1) +
    "-" +
    addZeroDateFn(currentDay.value)
  );
});

let newApptDataRef: any = ref({
  memberId: null,
  timer: null,
  beauticianId: 0,
  courses: [],
  selDate: selDate,
});

let store = useApptStore();
let { bookingList, courseDataList, timeGroup, tuiBookingListRef } =
  storeToRefs(store);
let {
  getApptDataApi,
  getMemberListApi,
  getCourseDetailApi,
  postEditApptDataApi,
  postEditApptStateApi,
  getBeauticianApi,
} = store;

const handleCommand = (command: string | number | object) => {
  switch (command) {
    case "addAppt":
      oldSelList = null;
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
};
//新增分類-顯示
let showFastCheckOutUIHdr = (state: boolean) => {
  showFastCheckOutRef.value = state;
  // getGoodsGroupApi(0);
};
onFirstTime();
function onFirstTime() {
  // 獲取美容師
  getBeauticianApi(0);
  getApptInfoFn(new Date().getFullYear(), new Date().getMonth() + 1);
}
onMounted(() => {
  // resetApptTable();
});

/**抓取預約紀錄 */
function getApptInfoFn(
  year: number,
  month: number,
  date: number = currentDay.value
) {
  // getCourseDetailApi(0, 0);
  //先取得會員清單
  // getMemberListApi().then((res: any) => {
  //預先呼叫api獲取數據
  getApptDataApi("", "", year = 0, month = 0).then((res: any) => {
    resetApptTable(year, month, date)
    tuiList.value = [];
    showTuiApptRef.value = false;
    for (let i = 0; i < tuiBookingListRef.value.length; i++) {

      const element = tuiBookingListRef.value[i];
      let courseBgColor = getColorNum(element.serviceInfo.color);
      courseBgColor = element.state == 1 ? 999 : courseBgColor;
      let curTimer = element.serviceInfo.servicesTime == 0 ? element.serviceInfo.subInfo.servicesTime : element.serviceInfo.servicesTime;

      //顯示課程ITEM
      tuiList.value.push({
        id: element.bookingNo,
        //顏色
        calendarId: courseBgColor,
        //顯示內容
        title:
          "<br>" +
          element.memberInfo.nameView +
          "<br>" +
          element.serviceInfo.name +
          "(" +
          curTimer +
          " Min)",
        titleMonth: "" + element.memberInfo.nameView + " - " + element.serviceInfo.name,
        category: "time",
        dueDateClass: "",
        managerId: element.serviceId,
        start: element.dateBooking,
        end: countTimeUtil(element.dateBooking, "add", 0, 0, curTimer),
        raw: element,
      });
    }
    getRestList(0, year, month, date);
  });
  // });
}

let filterApptData: any = computed(() => {
  let curAptData: any = [];
  for (let i = 0; i < tuiBookingListRef.value.length; i++) {
    let element = tuiBookingListRef.value[i];
    if (
      !searchList.value ||
      element.customer.toLowerCase().includes(searchList.value.toLowerCase())
    ) {
      curAptData.push(element);
    }
  }

  curAptData.sort(function (a: any, b: any) {
    return a.dateBooking > b.dateBooking ? 1 : -1;
  });
  return curAptData;
});

let changeMainTab = (index: number) => {
  mainTabIndexRef.value = index;
  changeWeekToday(2);
};
//刪除課程
let delCourseListHdr = (index: number, itemId: string) => {
};
//改變課程狀態
let changeStutusFn = (state: number, item: any) => {
  item.state = state;
  let editApptDate = {
    bookingNo: item.id ? item.id : item.bookingNo,
    state: item.state,
  };
  //修改預約
  postEditApptStateApi(editApptDate).then((res: any) => {
    getApptInfoFn(currentYear.value, currentMonth.value + 1);
  });
};

function goTodayHdr() {
  currentYear.value = new Date().getFullYear();
  currentMonth.value = new Date().getMonth();
  currentDay.value = new Date().getDate();
  selDate.value = curDateFn();
  getSelectWeek();

  getApptInfoFn(currentYear.value, currentMonth.value + 1);
}
/**获取时间 */
function getWeek(time: any) {
  // let oldWeekDateTime = time;
  //計算禮拜幾 (Sunday - Saturday : 0 - 6)
  let week = time.getDay();

  //處理算出禮拜一
  time = addDate(time, week * -1);
  curDate.value = new Date(time);

  for (let i = 0; i < 7; i++) {
    let { year, month, day } = formatDate(i === 0 ? time : addDate(time, 1));
    let curWeekDay = `${year}-${month}-${day}`;
    months.value.push({
      date: curWeekDay,
      showDate: `${day}`,
      weekTitle: weeks[i],
    });
  }

  //表格數據計算
  monthsThingsRef.value = [];
  todayThingsRef.value = [];
  let weekThings = [];
  let todayThings = [];
  if (selLittleYMDateRef.value == "") selLittleYMDateRef.value = getCurDay2();
  for (let j = 0; j < bookingList.value.length; j++) {
    //3
    const element = bookingList.value[j];
    weekThings = [];
    todayThings = [];
    let todayThingsGroups = [];
    for (let i = 1; i < months.value.length; i++) {
      //7
      const element3 = months.value[i];
      let dataStatus: boolean = false;
      let weekThingsGroups = [];
      todayThingsGroups = [];
      let curRange: number = 0;
      for (let k = 0; k < element.things.length; k++) {
        //3-5
        const element2 = element.things[k];
        if (element2.date === element3.date) {
          weekThingsGroups.push(element2);
          if (element3.date === selLittleYMDateRef.value) {
            todayThingsGroups.push(element2);
          }
          dataStatus = true;
          element2.range = element2.range ? element2.range : 1;
          if (curRange <= element2.range) curRange = element2.range;
        }
      }
      if (weekThingsGroups.length > 0) {
        weekThings.push({
          id: 1,
          time: element.timePeriod,
          date: element3.date,
          things: weekThingsGroups,
          range: curRange,
        });
      } else {
        weekThings.push({ id: 0, date: element3.date, things: {}, range: 1 });
      }

      if (todayThingsGroups.length > 0) {
        todayThings.push({
          id: 1,
          time: element.timePeriod,
          date: element3.date,
          things: todayThingsGroups,
          range: curRange,
        });
      }
    }

    if (todayThings.length == 0) {
      todayThings.push({
        id: 0,
        date: selLittleYMDateRef.value,
        things: {},
        range: 1,
      });
    }

    monthsThingsRef.value.push({
      time: element.timePeriod_tw,
      newThings: weekThings,
    });

    todayThingsRef.value.push({
      time: element.timePeriod_tw,
      newThings: todayThings,
    });
  }

  delete months.value[0];
  let selWeek = months.value[7].date;
  let selWeekYear = selWeek.split("-")[0];
  let selWeekMonth = selWeek.split("-")[1];
  weeekTodayTitle.value = selWeekYear + "    " + selWeekMonth;
}
/**处理日期 */
function addDate(date: any, n: any) {
  date.setDate(date.getDate() + n);
  return date;
}
/**日期格式处理 */
function formatDate(date: any) {
  let year = date.getFullYear();
  let curmonths = date.getMonth() + 1;

  let month = (curmonths < 10 ? "0" + curmonths : curmonths).toString();

  let day = (
    date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
  ).toString();
  return {
    year,
    month,
    day,
  };
}

function resetApptTable(year: any, month: any, date: any) {
  dealDate(new Date(year, month - 1, date));
}
/**获取当天日期 */
function getCurDay2() {
  let datetime = new Date();
  let year = datetime.getFullYear();
  let month = addZeroDateFn(datetime.getMonth(), 1);
  let date = addZeroDateFn(datetime.getDate());
  return `${year}-${month}-${date}`;
}
/**显示当天日期状态 */
function dealDate(date: any) {
  months.value = [""];
  // getApptInfoFn(date.getFullYear, date.getMonth + 1);
  getWeek(date);
  let newcurDate = getCurDay2();
  months.value.forEach((item: { isCurDate: boolean; date: string }) => {
    item.isCurDate = item.date === newcurDate;
  });
}
let stopDown = ref(1);
/**上周 */
function getLastWeek() {
  stopDown.value = 0;
  dealDate(addDate(curDate.value, -7));
  getApptInfoFn(
    curDate.value.getFullYear(),
    curDate.value.getMonth() + 1,
    curDate.value.getDate()
  );
  setTimeout(function () {
    stopDown.value = 1;
  }, 1500);
}
/**下周 */
function getNextWeek() {
  stopDown.value = 0;
  dealDate(addDate(curDate.value, 7));
  getApptInfoFn(
    curDate.value.getFullYear(),
    curDate.value.getMonth() + 1,
    curDate.value.getDate()
  );
  setTimeout(function () {
    stopDown.value = 1;
  }, 1500);
}
let selLittleYMDateRef = ref("");

/**指定日期 */
function getSelectWeek() {
  setSelectdate();
  let newDate = new Date(
    currentYear.value,
    currentMonth.value + 0,
    currentDay.value
  );
  dealDate(newDate);
}

function setSelectdate() {
  let month = addZeroDateFn(currentMonth.value, 1);
  let date = addZeroDateFn(currentDay.value);

  selLittleYMDateRef.value = currentYear.value + "-" + month + "-" + date;
}

let oldSelList: any = null;
/**点击查看详情 */
function handleDetail(row: any) {
  // 0:未點選 1:完成 99:點選
  if (row.state != 1) {
    if (oldSelList && oldSelList.id != row.id) {
      //有舊數據點其他
      oldSelList.state = 0;
      // row.state = 99;
      oldSelList = row;
    } else if (oldSelList && oldSelList.id == row.id) {
      //點同訂單
      if (row.state == 0) {
        // row.state = 99;
        oldSelList = row;
      } else {
        row.state = 0;
        oldSelList = null;
        resetAddReserveForm();
      }
    } else {
      //第一次點訂單
      // row.state = 99;
      oldSelList = row;
    }
  } else {
    oldSelList = row;
  }

  if (row.serviceInfo) {
    onWeekSeldate(row.dateBooking.split("T")[0]);
    updateShowApptInfoRef(true);
  }
}
const updateShowApptInfoRef = (state: boolean) => {
  showApptInfoRef.value = state;
  if (!state) {
    getApptInfoFn(currentYear.value, currentMonth.value + 1);
  }
};
const updateShowLittleDate = (state: boolean) => {
  showLittleDateRef.value = state;
};

//---------------------------日曆

//显示：8月
let curMonthAdd = computed(() => {
  let month_tw = addZeroDateFn(currentMonth.value, 1);
  return month_tw;
});
//這個月
let currentDays = computed(() => {
  // Date中的月份是从0开始的
  return new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
});
//插入上個月
let prevDays = computed(() => {
  let data = new Date(currentYear.value, currentMonth.value, 0).getDate();
  let num = new Date(currentYear.value, currentMonth.value, 1).getDay();
  let days = [];
  //num > 1 第一天是禮拜一
  while (num > 0) {
    days.push(data--);
    num--;
  }
  // 排序
  return days.sort();
});

function addZeroDateFn(data: any, num: number = 0) {
  let numDate = parseInt(data) + num;
  return numDate < 10 ? "0" + numDate : numDate;
}
let checkToday = ref(true);
function lastMonth() {
  // 点击上个月，若是0月则年份-1
  // 0是1月  11是12月
  if (currentMonth.value == 0) {
    currentYear.value -= 1;
    currentMonth.value = 11;
  } else {
    currentMonth.value--;
  }
  // onCheckYM();
  onCheckToday();
}
function nextMonth() {
  if (currentMonth.value == 11) {
    currentYear.value++;
    currentMonth.value = 0;
  } else {
    currentMonth.value++;
  }
  // onCheckYM();
  onCheckToday();
}

function onCheckYM() {
  if (
    selDate.value.split("-")[0] == currentYear.value.toString() &&
    selDate.value.split("-")[1] == addZeroDateFn(currentMonth.value, 1)
  )
    checkYM.value = true;
  else checkYM.value = false;
}
function onCheckToday() {
  if (
    nowdatetime.split("-")[0] == currentYear.value.toString() &&
    nowdatetime.split("-")[1] == addZeroDateFn(currentMonth.value, 1)
  )
    checkToday.value = true;
  else checkToday.value = false;
}

//
let selLittleDateFn = (data: any) => {
  currentYear.value = parseInt(data.split("-")[0]);
  currentMonth.value = parseInt(data.split("-")[1]) - 1;
  currentDay.value = parseInt(data.split("-")[2]);
  // selDate = data;
  getSelectWeek();
  getApptInfoFn(currentYear.value, currentMonth.value + 1);
  onSelect(data.split("-")[2]);
};

function onSelect(value: any) {
  currentDay.value = value;
  getSelectWeek();
  selDate.value = curDateFn();
  getApptInfoFn(currentYear.value, currentMonth.value + 1);
}
//-----------------------------------------------------------------------------------------------
function onWeekSeldate(data: any) {
  selDate.value = data;
  let curData = data.split("-");
  currentYear.value = parseInt(curData[0]);
  currentMonth.value = parseInt(curData[1]) - 1;
  currentDay.value = parseInt(curData[2]);
  checkYM.value = true;
}
//新增預約表單-顯示
let showAddApptFn = (state: boolean) => {
  showAddRef.value = state;
  if (!state) getApptInfoFn(currentYear.value, currentMonth.value + 1);
};
//休息時間-顯示
function showAddRestUIFn(state: boolean) {
  showAddRestUIRef.value = state;
  if (!state) getApptInfoFn(currentYear.value, currentMonth.value + 1);
}

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

function changeWeekToday(data: number) {
  showTuiApptRef.value = false;
  showWeekBoxRef.value = data;
  tuiOptions.tuiType = data;
  getApptInfoFn(currentYear.value, currentMonth.value + 1);
  // showTuiApptRef.value = true;
}

function dateBtn(btn: any, date: any) {

}

function selTuiListFn(data: any) {
  if (!data.raw) {
    for (let i = 0; i < tuiList.value.length; i++) {
      const element = tuiList.value[i];
      if (element.id == data.id) {
        data.raw = element.raw;
        break;
      }
    }
  }
  if (data.raw) handleDetail(data.raw);
}


//-------------------------------------------休息日
function getRestList(id: any, y: any, m: any, d: any) {
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
function setRestTimeFn(data: any) {
  showTuiApptRef.value = false;
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
  showTuiApptRef.value = true;
}
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
      width: calc(100%);
      justify-content: right;
      height: 70px;

      >div {
        height: 29px;
        position: relative;
        right: 15px;
        top: 15px;

        >img {
          margin-right: 10px;
          height: 29px;
          width: 29px;
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

        .addcoursetype-btn {
          justify-content: center;
          text-align: right;
        }

        .weektoday_div {
          position: relative;
          display: flex;
          width: 240px;
          // min-width: 105px;
          justify-content: right;
          align-items: center;

          .weektoday_btn {
            display: flex;
            width: 80px;
            font-size: 20px;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            border-radius: 8px;
            border: solid 1px #707070;
            background-color: #ffffff;
            color: #906e6c;
            cursor: pointer;
            padding: 2px;
            margin-right: 5px;
          }

          .selbtn {
            background-color: #906e6c;
            color: #d8cac8;
          }

          .noSelbtn {
            background-color: #ffffff;
            color: #d8cac8;
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
        }

        .appt_list {
          position: relative;
          top: 0px;
          left: 0px;
          align-items: center;
          width: 100%;
          height: 100%;
          background: #ffffff;
          margin: 0 auto;
          border: 1px solid #ddd;

          >div {
            height: 100%;
            width: 100%;
            font-weight: bold;
            color: #717171;

            >table {
              width: 100%;
              font-weight: bold;
              height: 100%;

              >thead {
                width: 100%;
                height: 47px;
                align-items: center;
                font-weight: bold;
                color: #717171;
                border-bottom: solid 1px #707070;
                background-color: #e6e2de;
                width: calc(100% - 1em);

                >tr {
                  // border: solid 1px #707070; //格線
                  display: table;
                  width: 100%;
                  table-layout: fixed; //core code
                  height: 10%;
                  height: 100%;

                  >th:nth-child(1) {
                    width: 20%;

                    >p {
                      margin: 3px 5px;
                      display: flex;
                      justify-content: center;
                      // align-content: center;
                    }
                  }

                  >th:nth-child(2) {
                    width: 30%;

                    >p {
                      margin: 3px 5px;
                    }
                  }

                  >th:nth-child(3) {
                    width: 20%;

                    >p {
                      margin: 3px 5px;
                    }
                  }

                  >th:nth-child(4) {
                    width: 10%;

                    >p {
                      margin: 3px 5px;
                    }
                  }

                  >th {
                    // border: solid 1px #707070; //格線
                    flex-wrap: nowrap;
                    padding: 2px 0px 2px 0px;
                    // width: 100%;
                    font-size: 18px;

                    >img {
                      width: 40px;
                      height: 40px;
                      border-radius: 45px;
                    }

                    >button {
                      background-color: transparent;
                      border: none;
                    }
                  }

                  >input {
                    display: flex;
                    float: right;
                    margin-top: 9px;
                    width: 150px;
                    height: 30px;
                    border-radius: 6px;
                    border: solid 1px #707070;
                    background-color: #fff;
                    margin-right: 10px;
                    font-size: 18px;

                    background: url("@/assets/images/icon_search.png") no-repeat;
                    background-color: #fff;
                    background-position: 97%;
                    background-origin: content-box;
                    text-indent: 5px;
                  }
                }
              }

              >tbody {
                //滾動
                display: block;
                position: relative;
                overflow-y: scroll;
                height: 100%;

                >tr {
                  // border: solid 1px #707070; //格線
                  border-bottom: 2px solid rgba(112, 112, 112, 0.5);
                  display: table;
                  width: 100%;
                  table-layout: fixed;
                  text-align: left; //If disabled, default align central
                  // height: 10%;

                  .td_time {
                    text-align: center;
                    justify-content: center;

                    .dateBox {
                      width: 63px;
                      height: 63px;
                      border: solid 1px #707070;
                      border-radius: 10px;

                      display: inline-block;
                      position: relative;
                      text-align: center;
                      justify-content: center;

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
                  }

                  >td:nth-child(1) {
                    width: 20%;

                    >p {
                      margin: 3px 5px;
                    }
                  }

                  >td:nth-child(2) {
                    width: 30%;

                    >p {
                      margin: 3px 5px;
                    }
                  }

                  >td:nth-child(3) {
                    width: 20%;

                    >p {
                      margin: 3px 5px;
                    }
                  }

                  >td:nth-child(4) {
                    width: 10%;

                    >p {
                      margin: 3px 5px;
                    }
                  }

                  >td {
                    // border: solid 1px #707070; //格線
                    height: 47px;
                    padding: 2px;
                    position: relative;
                    table-layout: fixed;
                    font-size: 18px;

                    >img {
                      width: 20px;
                      height: 40px;
                      // padding: 0 20px;
                      // border-radius: 45px;
                    }

                    // > p {
                    //   margin: 3px 5px;
                    // }

                    >button {
                      background-color: transparent;
                      border: none;
                      display: inline;
                      float: right;
                      margin-right: 15px;
                    }

                    .checked_state {
                      display: flex;
                      align-items: center;

                      input {
                        display: none;
                      }

                      label {
                        display: inline-block;
                        width: 20px;
                        height: 20px;
                        border-radius: 5px;
                        border: 1px solid #8b6f6d;
                        position: relative;
                        cursor: pointer;
                      }

                      label::before {
                        display: inline-block;
                        content: " ";
                        width: 12px;
                        border: 2px solid #fff;
                        height: 4px;
                        border-top: none;
                        border-right: none;
                        transform: rotate(-45deg);
                        top: 5px;
                        left: 3px;
                        position: absolute;
                        opacity: 0;
                      }

                      input:checked+label {
                        background: #8b6f6d;
                      }

                      input:checked+label::before {
                        opacity: 1;
                        transform: all 0.5s;
                      }
                    }
                  }

                  >th:nth-child(0) {
                    width: 20%;

                    >p {
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
