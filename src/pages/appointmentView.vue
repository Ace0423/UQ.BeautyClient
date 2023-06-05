<template>
  <div class="container">
    <div class="top_box">
      <Header
        :Icon="Icon"
        :moduleType="'預約紀錄'"
        :memuState="props.memuState"
        :handmemuStateBtn="props.handmemuStateBtn"
      ></Header>
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
                <el-dropdown-item command="addRest"
                  >加入休息時間</el-dropdown-item
                >
                <el-dropdown-item command="addBill"
                  >新增快速結帳單</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>

    <div class="appointment_main">
      <div class="appointment_box">
        <div class="item-tab">
          <div>
            <button
              :class="mainTabIndexRef == index ? 'active' : ''"
              v-for="(item, index) in mainTypeDataRef"
              :key="item.id"
              v-on:click="changeMainTab(index)"
            >
              {{ item.title }}
            </button>
          </div>
          <div class="weektoday_div" v-show="mainTabIndexRef == 0">
            <div
              class="weektoday_btn"
              @click="changeWeekToday(false)"
              :class="{ noSelbtn: showWeekBoxRef, selbtn: !showWeekBoxRef }"
            >
              日曆
            </div>
            <div
              class="weektoday_btn"
              @click="changeWeekToday(true)"
              :class="{ selbtn: showWeekBoxRef, noSelbtn: !showWeekBoxRef }"
            >
              週曆
            </div>
          </div>
        </div>
        <div>
          <div
            class="week_main"
            v-show="showWeekBoxRef && mainTabIndexRef != 1"
          >
            <div>
              <div class="appointment_schedule" v-show="mainTabIndexRef == 0">
                <div class="appointment_week">
                  <div class="week-top">
                    <div class="btn_wrap">
                      <div class="dateBox_title">
                        <span @click="goTodayHdr()">TODAY </span>
                        <img
                          v-if="stopDown"
                          class="arrow arrow-left"
                          :src="arrow_left_ico"
                          @click="getLastWeek()"
                        />
                        <img
                          v-if="!stopDown"
                          class="arrow arrow-left"
                          :src="stop_left_ico"
                        />
                        <span class="todayDate"
                          >{{ weeekTodayTitle + "月" }}
                        </span>
                        <img
                          v-if="stopDown"
                          class="arrow arrow-right"
                          :src="arrow_right_ico"
                          @click="getNextWeek()"
                        />
                        <img
                          v-if="!stopDown"
                          class="arrow stop-right"
                          :src="stop_left_ico"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="week_table">
                    <div class="weekTable_main">
                      <table class="Listinfotbody" style="">
                        <thead>
                          <tr>
                            <template
                              v-for="(item, index) of months"
                              :key="index"
                            >
                              <th v-on:click="onWeekSeldate(item.date)">
                                <span class="first" v-if="index === 0">
                                  {{}}
                                </span>
                                <span v-else :key="index + 0">
                                  <span
                                    class="day_item"
                                    :class="{
                                      isCurDate: item.isCurDate,
                                      isSelDate: selDate == item.date,
                                    }"
                                  >
                                    {{ item.showDate }}
                                  </span>
                                  <span> {{ item.weekTitle }} </span>
                                </span>
                              </th>
                            </template>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            class="timePeriod_col2"
                            v-for="(period, p_index) in monthsThingsRef"
                            align="center"
                            valign="center"
                            :key="`period${p_index}`"
                          >
                            <td class="timeGroup">{{ period.time }}</td>
                            <template
                              v-for="(thingGroup, t_index) of period.newThings"
                              :key="`thing${t_index}`"
                            >
                              <td
                                class="thing_group"
                                :rowspan="thingGroup.range"
                              >
                                <div
                                  :class="{
                                    one_things: thingGroup.things.length == 1,
                                    more_things: thingGroup.things.length > 1,
                                    zero_things: thingGroup.things.length == 0,
                                  }"
                                >
                                  <template
                                    v-for="(
                                      thing, t_index
                                    ) of thingGroup.things"
                                    :key="`thing${t_index}`"
                                  >
                                    <div
                                      class="thing_item"
                                      @click="handleDetail(thing)"
                                      :class="{
                                        finish: thing.state == 1,
                                        waiting: thing.state == 0,
                                      }"
                                    >
                                      <span class="timeSpan">{{
                                        thing.timePeriod
                                      }}</span>
                                      <span class="nameSpan">{{
                                        thing.customer
                                      }}</span>
                                      <span class="lessonSpan">{{
                                        thing.lesson + "(" + thing.timer + ")"
                                      }}</span>
                                    </div>
                                  </template>
                                </div>
                              </td>
                            </template>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div
              class="weekEdit_btn"
              v-show="showWeekBoxRef && mainTabIndexRef != 1"
            >
              <div class="list_btn">
                <div class="btn_add" @click="addAddReserveBtn()">新增預約</div>
                <div class="btn_add" @click="editAddReserveBtn()">修改預約</div>
                <div class="btn_add" @click="delReserveId()">刪除預約</div>
              </div>
            </div> -->
          </div>
          <div
            class="date_main"
            v-show="!showWeekBoxRef && mainTabIndexRef != 1"
          >
            <div class="date_schedule" v-show="mainTabIndexRef == 0">
              <div class="appointment_date">
                <div class="date_top">
                  <span @click="goTodayHdr()">TODAY</span>
                  <span class="todayDate">{{ weeekTodayTitle + "月" }} </span>
                </div>
                <div class="date_table">
                  <div class="date_timePeriodList">
                    <table class="date_Listinfotbody" style="">
                      <tbody>
                        <tr
                          class="date_timePeriod_col2"
                          v-for="(period, p_index) in todayThingsRef"
                          align="center"
                          valign="center"
                          :key="`period${p_index}`"
                        >
                          <td class="time_row">{{ period.time }}</td>
                          <template
                            v-for="(thingGroup, t_index) of period.newThings"
                            :key="`thing${t_index}`"
                          >
                            <td class="thing_group" :rowspan="thingGroup.range">
                              <div
                                :class="{
                                  one_things: thingGroup.things.length == 1,
                                  more_things: thingGroup.things.length > 1,
                                  zero_things: thingGroup.things.length == 0,
                                }"
                              >
                                <template
                                  v-for="(thing, t_index) of thingGroup.things"
                                  :key="`thing${t_index}`"
                                >
                                  <div
                                    class="thing_item"
                                    @click="handleDetail(thing)"
                                    :class="{
                                      finish: thing.state == 1,
                                      waiting: thing.state == 0,
                                      seldated: thing.state == 99,
                                    }"
                                  >
                                    <span>{{ thing.timePeriod }}</span>
                                    <span>{{ thing.customer }}</span>
                                    <span>{{
                                      thing.lesson + "(" + thing.timer + ")"
                                    }}</span>
                                  </div>
                                </template>
                              </div>
                            </td>
                          </template>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="little_date">
                <div class="dateBox">
                  <div class="dateBox_title">
                    <img
                      class="arrow arrow-left"
                      :src="arrow_left_ico"
                      @click="lastMonth()"
                    />
                    <div class="data">
                      {{ currentYear }}-{{ curMonthAdd + "月" }}
                    </div>
                    <img
                      class="arrow arrow-right"
                      :src="arrow_right_ico"
                      @click="nextMonth()"
                    />
                  </div>
                  <div class="dateBox_content">
                    <div class="row title">
                      <span v-for="item in title" :key="item">{{ item }}</span>
                    </div>
                    <div class="row content">
                      <span
                        class="prevDay"
                        v-for="item in prevDays"
                        :key="'A' + item"
                        >{{ item }}</span
                      >
                      <span
                        class="thisDay"
                        :class="{
                          active: currentDay == index + 1 && checkYM,
                          todayEff: new Date().getDate() == item && checkToday,
                        }"
                        v-for="(item, index) in currentDays"
                        :key="item"
                        v-on:click="onSelect(index + 1)"
                        >{{ item }}</span
                      >
                    </div>
                  </div>
                </div>
                <div class="list_btn">
                  <div class="btn_add" @click="addAddReserveBtn()">
                    新增預約
                  </div>
                  <div class="btn_add" @click="editAddReserveBtn()">
                    修改預約
                  </div>
                  <div class="btn_add" @click="delReserveId()">刪除預約</div>
                </div>
              </div>
            </div>
          </div>

          <div class="appointment_list" v-show="mainTabIndexRef == 1">
            <div class="table_title">
              <table class="table_main">
                <thead align="left">
                  <tr>
                    <th v-for="item in aptTitle" :key="item">
                      <p>{{ item }}</p>
                    </th>
                    <input
                      v-model="searchList"
                      class="seach-control"
                      placeholder="搜尋顧客"
                    />
                  </tr>
                </thead>
                <tbody id="content">
                  <tr v-for="(item, index) in filterAptData" :key="item.id">
                    <td class="td_time">
                      <div class="dateBox">
                        <p class="p_month">
                          {{ item.date.split("-")[1] + "月" }}
                        </p>
                        <p class="p_date">{{ item.date.split("-")[2] }}</p>
                        <p class="p_year">{{ item.date.split("-")[0] }}</p>
                      </div>
                      <p>{{ item.timePeriod }}</p>
                    </td>
                    <td>
                      <p>{{ item.lesson }}</p>
                    </td>
                    <td>
                      <p>{{ item.customer }}</p>
                    </td>
                    <td>
                      <!-- <input
                        class="checked_state"
                        type="checkbox"
                        name="sub"
                        value="item"
                        :checked="item.state == 1"
                        v-on:click="changeStutusFn(index, item)"
                      /> -->
                      <div class="checked_state">
                        <input
                          type="checkbox"
                          :id="item.bookingNo"
                          :checked="item.state == 1"
                          v-on:click="changeStutusFn(index, item)"
                        />
                        <label :for="item.bookingNo"></label>
                      </div>
                    </td>
                    <td>
                      <button
                        v-show="item.state == 0"
                        v-on:click="delCourseListHdr(index, item.id)"
                      >
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
  <AddApptUI
    v-if="showAddReserveFormRef"
    :showAddReserveForm="showAddReserveForm"
    :curApptDataRef="newApptDataRef"
    :showOkBtnRef="showOkBtnRef"
    :getApptInfpApi="getApptInfpApi"
    :oldSelList="oldSelList"
    :resetApptTable="resetApptTable"
  ></AddApptUI>
  <LittleDateUI
    v-if="showLittleDateRef"
    :showUIFn="updataShowLittleDate"
    :selDate="selDate"
    :selLittleDateFn="selLittleDateFn"
  />
  <!-- <Tui_calendar
  ></Tui_calendar> -->
  <ApptInfoUI
    v-if="showApptInfoRef"
    :showUIHdr="updataShowApptInfoRef"
    :selItemData="oldSelList"
    :infoBtnState="infoBtnState"
  />
  <Alert
    v-if="alertInformation.showAlert"
    :alert-information="alertInformation"
    :hand-alert-view="handAlertView"
    @callbackBtn="btnSumitHdr"
  ></Alert>
</template>

<script setup lang="ts">
import DeleteIcon from "@/assets/Icon material-delete.svg";
import arrow_left_ico from "@/assets/Icon appointment-left.svg";
import arrow_right_ico from "@/assets/Icon appointment-right.svg";
import stop_left_ico from "@/assets/Icon_stop_left.svg";
import Icon from "@/assets/images/icon_appt.png";
import btn_add_ico from "@/assets/images/icon_add.png";
import btn_msg_ico from "@/assets/images/icon_msg.png";
import { storeToRefs } from "pinia";
import { getApptDataRequest } from "@/api/apptRequest";
import type { IBackStatus } from "@/types/IData";
import { useApptStore } from "@/stores/apptStore";
// import Alert from "@/components/alertCmpt";
import { showErrorMsg } from "@/types/IMessage";

// let alertBtnState: any = ref(false);
// const onAlertBtn = (data: any) => {
//   alertBtnState = data;
//   console.log(alertBtnState, "alertBtnState");
// };
// Alert({ type: 0, message: "登录失败", duration: 1000,onAlertBtn });
// Alert.warning("登录失败", 1000);

const props = defineProps<{
  memuState: any;
  handmemuStateBtn: Function;
}>();
let searchList = ref("");
let showWeekBoxRef = ref(true);
let mainTabIndexRef = ref(0);
let aptTitle = reactive(["預約時間", "預約項目", "顧客", "已完成"]);

let title = ["日", "一", "二", "三", "四", "五", "六"];
let weeks = ["週日", "週一", "週二", "週三", "週四", "週五", "週六"];
let weeekTodayTitle = ref("");
let months: any = ref([""]);
let curDate: any = ref();
let monthsThingsRef: any = ref([]);
let todayThingsRef: any = ref([]);

let showAddReserveFormRef = ref(false);
let showApptInfoRef = ref(false);
let showLittleDateRef = ref(false);
let showOkBtnRef = ref(false);

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

let newApptDataRef: any = ref({
  memberId: null,
  timer: null,
  beauticianId: 0,
  courses: [],
  selDate: selDate,
});

let store = useApptStore();
let { bookingList, courseDataList, timeGroup } = storeToRefs(store);
let {
  getApptDataApi,
  getMemberData,
  getCourseDetailApi,
  postEditApptDataApi,
  getBeauticianApi,
} = store;

const handAlertView = (msg: string, btnState: number, timer: number) => {
  alertInformation.messageText = msg;
  alertInformation.buttonState = btnState;
  alertInformation.timerVal = timer;
  alertInformation.showAlert = !alertInformation.showAlert;
};

const alertInformation = reactive({
  selfData: {},
  selfType: "",
  messageText: "是否刪除", // 提示內容
  buttonState: 0, //按鈕顯示狀態 0:全部 1:只顯示確定按鈕 2:不顯示按鈕
  timerVal: 0, //時間計時器
  showAlert: false, //時間計時器
});

const handleCommand = (command: string | number | object) => {
  console.log(command);
  switch (command) {
    case "addAppt":
      addAddReserveBtn();
      break;
    case "addRest":
      break;
    case "addBill":
      break;

    default:
      break;
  }
};

const btnSumitHdr = (val: IBackStatus) => {
  switch (alertInformation.selfType) {
    case "delReserveData":
      if (val.btnStatus) {
        oldSelList.state = 3;
        let editApptDate = {
          bookingNo: oldSelList.id,
          userId: oldSelList.userId,
          lessonId: oldSelList.lessonId,
          serverId: oldSelList.serverId,
          dateBooking: oldSelList.dateBooking,
          timer: oldSelList.timer,
          tradeDone: oldSelList.tradeDone,
          state: oldSelList.state,
          price: oldSelList.price,
          discount: oldSelList.discount,
          dateCreate: oldSelList.dateCreate,
          bookingMemo: oldSelList.bookingMemo,
        };

        console.log("刪除成功");
        //修改預約
        postEditApptDataApi(editApptDate).then((res: any) => {
          let resData = res.data;
          if (resData.state == 1) {
            handAlertView("刪除成功", 2, 1);
          } else {
            handAlertView(showErrorMsg(resData.msg), 2, 1);
            // alertInformation.messageText = resData.msg;
          }
        });
        getApptInfpApi(currentYear.value, currentMonth.value + 1);
      } else {
        console.log(val.btnStatus, "取消");
      }
      break;
    default:
      break;
  }
  alertInformation.showAlert = false;
};
/**抓取預約紀錄 */
function getApptInfpApi(
  year: number,
  month: number,
  date: number = currentDay.value
) {
  getCourseDetailApi(0, 0);
  //先取得會員清單
  getMemberData().then((res: any) => {
    //預先呼叫api獲取數據
    getApptDataApi(year, month).then((res: any) => {
      resetApptTable(year, month, date);
    });
  });
}
getApptInfpApi(new Date().getFullYear(), new Date().getMonth() + 1);
// 獲取美容師
getBeauticianApi(0);

let filterAptData: any = computed(() => {
  let curAptData: any = [];
  for (let i = 0; i < bookingList.value.length; i++) {
    let element = bookingList.value[i];
    for (let j = 0; j < element.things.length; j++) {
      let element2 = element.things[j];
      if (
        !searchList.value ||
        element2.customer.toLowerCase().includes(searchList.value.toLowerCase())
      ) {
        curAptData.push(element2);
      }
    }
  }

  curAptData.sort(function (a: any, b: any) {
    return a.dateBooking > b.dateBooking ? 1 : -1;
  });

  return curAptData;
});

let changeMainTab = (index: number) => {
  mainTabIndexRef.value = index;
};
onMounted(() => {
  // resetApptTable();
});
//刪除課程
let delCourseListHdr = (index: number, itemId: string) => {
  if (itemId)
    for (let i = 0; i < bookingList.value.length; i++) {
      let element = bookingList.value[i];
      for (let j = 0; j < element.things.length; j++) {
        let element2 = element.things[j];
        if (itemId.toString() === element2.id.toString()) {
          if (element2.state == 0) {
            oldSelList = element2;
            alertInformation.selfType = "delReserveData";
            alertInformation.selfData = element2;
            handAlertView("是否刪除", 0, 0);
          } else {
          }
          // bookingList.value[i].things.splice(j, 1);
        }
      }
    }
  // resetApptTable(currentYear.value, currentMonth.value, currentDay.value);
};
//改變課程狀態
let changeStutusFn = (index: number, item: any) => {
  item.state = item.state == 0 ? 1 : 0;
  let editApptDate = {
    bookingNo: item.id,
    userId: item.userId,
    lessonId: item.lessonId,
    serverId: item.serverId,
    dateBooking: item.dateBooking,
    timer: item.timer,
    tradeDone: item.tradeDone,
    state: item.state,
    price: item.price,
    discount: item.discount,
    dateCreate: item.dateCreate,
    bookingMemo: item.bookingMemo,
  };
  //修改預約
  postEditApptDataApi(editApptDate).then((res: any) => {
    console.log();
  });

  getApptInfpApi(currentYear.value, currentMonth.value + 1);
};

function goTodayHdr() {
  currentYear.value = new Date().getFullYear();
  currentMonth.value = new Date().getMonth();
  currentDay.value = new Date().getDate();
  selDate.value = curDateFn();
  getSelectWeek();

  getApptInfpApi(currentYear.value, currentMonth.value + 1);
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
  //刪除合併後多餘的儲存格
  for (let i = monthsThingsRef.value.length - 1; i > -1; i--) {
    const element = monthsThingsRef.value[i];
    for (let j = element.newThings.length - 1; j > -1; j--) {
      const element2 = element.newThings[j];
      if (element2.things.length > 1) {
      }
      if (element2.range > 1) {
        // for (let l = element2.range; l > 0; l--) {
        for (let l = 1; l < element2.range; l++) {
          if (monthsThingsRef.value[i + l]) {
            //同事件衝突
            if (monthsThingsRef.value[i + l].newThings[j].id == 1) {
              let readyDelData =
                monthsThingsRef.value[i + l].newThings[j].things;
              monthsThingsRef.value[i].newThings[j].range += 1;
              for (let k = 0; k < readyDelData.length; k++) {
                const element = readyDelData[k];
                monthsThingsRef.value[i].newThings[j].things.push(element);
              }
            }

            // if (monthsThingsRef.value[i + l].newThings.length == 0)
            monthsThingsRef.value[i + l].newThings.splice(j, 1);
          }
        }
      }
    }
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
  // getApptInfpApi(date.getFullYear, date.getMonth + 1);
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
  getApptInfpApi(
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
  getApptInfpApi(
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
    updataShowApptInfoRef(true);
  }

  onWeekSeldate(row.dateBooking.split("T")[0]);
}
const updataShowApptInfoRef = (state: boolean) => {
  showApptInfoRef.value = state;
};
const updataShowLittleDate = (state: boolean) => {
  showLittleDateRef.value = state;
};
const infoBtnState = (state: number) => {
  switch (state) {
    case 1:
      //完成
      showApptInfoRef.value = false;
      changeStutusFn(0, oldSelList);
      break;
    case 2:
      //修改
      showApptInfoRef.value = false;
      editAddReserveBtn();
      break;
    case 3:
      //刪除
      showApptInfoRef.value = false;
      delReserveId();
      break;

    default:
      break;
  }
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
  onCheckYM();
  onCheckToday();
}
function nextMonth() {
  if (currentMonth.value == 11) {
    currentYear.value++;
    currentMonth.value = 0;
  } else {
    currentMonth.value++;
  }
  onCheckYM();
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
  getApptInfpApi(currentYear.value, currentMonth.value + 1);
  onSelect(data.split("-")[2]);
};

function onSelect(value: any) {
  currentDay.value = value;
  getSelectWeek();
  selDate.value = curDateFn();
  getApptInfpApi(currentYear.value, currentMonth.value + 1);
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

function visibleChange(value: any) {}

//新增預約表單-顯示
let showAddReserveForm = (state: boolean) => {
  showAddReserveFormRef.value = state;
  if (!state) resetAddReserveForm();
};

function resetAddReserveForm() {
  newApptDataRef.value.courses = [];
  newApptDataRef.value.memberId = null;
  newApptDataRef.value.timer = null;
  newApptDataRef.value.beauticianId = 0;
  newApptDataRef.value.selDate = selDate;
}

function addAddReserveBtn() {
  showOkBtnRef.value = false;
  resetAddReserveForm();
  showAddReserveForm(true);
}

function changeWeekToday(state: boolean) {
  showWeekBoxRef.value = state;
}
function editAddReserveBtn() {
  if (oldSelList) {
    newApptDataRef.value.memberId = oldSelList.userId;

    for (let i = 0; i < courseDataList.value.length; i++) {
      let element = courseDataList.value[i];
      if (element.lessonId == oldSelList.lessonId) {
        newApptDataRef.value.courses = element;
      }
    }

    for (let i = 0; i < timeGroup.value.length; i++) {
      let element = timeGroup.value[i];
      if (element == oldSelList.timePeriod) {
        newApptDataRef.value.timer = element;
      }
    }
    newApptDataRef.value.beauticianId = oldSelList.serverId;
    newApptDataRef.value.selDate = oldSelList.date;

    showOkBtnRef.value = true;
    showAddReserveForm(true);
  }
}

//刪除預約
let delReserveId = () => {
  if (oldSelList) {
    alertInformation.selfType = "delReserveData";
    alertInformation.selfData = oldSelList;
    handAlertView("是否刪除", 0, 0);
  }
};

//-------------------------------------------新增預約FORM
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
  height: calc(var(--vh, 1vh) * 100);
  position: relative;
  width: 100%;

  .top_box {
    display: flex;
    width: 100%;
    .top_menu {
      display: flex;
      width: calc(100%);
      justify-content: right;
      height: 80px;
      > div {
        height: 29px;
        position: relative;
        right: 15px;
        top: 15px;
        > img {
          margin-right: 10px;
          height: 29px;
          width: 29px;
        }
      }
    }
  }

  .appointment_main {
    position: absolute;
    top: 83px;
    bottom: 0px;
    left: 0px;
    right: 0px;

    .appointment_box {
      // height: 100%;
      height: 99%;
      position: relative;
      > .item-tab {
        display: flex;
        height: 6%;
        left: 0%;
        // height: 45px;
        width: 98%;
        > div {
          display: flex;
          width: 71%;
          height: 100%;

          > button {
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

          > button.active {
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
          width: 25%;
          min-width: 105px;
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

      > div {
        position: relative;
        display: flex;
        height: 92%;
        width: 94%;
        // margin-left: 5%;
        margin-left: 3%;

        .week_main {
          display: flex;
          position: relative;
          width: 100%;
          height: 100%;

          > div {
            position: relative;
            width: 100%;
            height: 100%;
            border: 1px solid #ddd;

            .appointment_schedule {
              position: relative;
              display: flex;
              align-items: center;
              // justify-content: center;
              top: 1%;
              width: 98%;
              height: 98%;
              border-radius: 15px;
              background: #e6e2de;
              margin: 0 auto;
              border: 1px solid #707070;

              .appointment_week {
                width: 100%;
                // min-width: 600px;
                height: 100%;
                padding: 1%;
                box-sizing: border-box;

                .week-top {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  width: 90%;
                  // height: 40px;
                  // padding: 0 1%;
                  margin-left: 3%;

                  .btn_wrap {
                    width: 100%;
                    display: flex;
                    justify-content: space-around;
                    // color: #409EFF;

                    span {
                      cursor: pointer;
                      // display: flex;
                      justify-content: center;
                      align-items: center;
                      font-size: 15px;
                    }

                    .dateBox_title {
                      width: 100%;
                      display: flex;
                      text-align: center;
                      cursor: pointer;

                      span {
                        // width: 10%;
                        height: 100%;
                        text-align: center;
                        display: flex;
                        font-family: ArialBlack;
                        font-size: 25px;
                        font-weight: bold;
                        color: #906e6c;
                      }

                      .arrow {
                        display: flex;
                        text-align: center;
                        width: 10%;
                        height: 35%;
                        color: #b89087;
                        padding: 15px 0 0 0;
                      }

                      .arrow-right {
                        color: #b89087;
                      }
                      .stop-right {
                        transform: scaleX(-1);
                      }

                      .arrow-left {
                        color: #b89087;
                      }

                      img {
                        display: flex;
                        height: 50%;
                        top: 10%;
                      }

                      .data {
                        font-size: 20px;
                        display: flex;
                        text-align: center;
                      }

                      .todayDate {
                        font-weight: bold;
                        font-size: 16px;
                        cursor: default;
                        color: #b89087;
                        white-space: nowrap;
                        display: block;
                        position: relative;
                        display: flex;
                        text-align: center;
                      }
                    }
                  }

                  .chooseMonth {
                    display: flex;
                    justify-content: flex-end;
                    width: 18%;

                    div {
                      // flex: 1;
                      display: flex;
                      padding: 0 2%;
                      white-space: nowrap;
                      line-height: 20px;
                      box-sizing: border-box;

                      .square {
                        display: flex;
                        width: 16px;
                        height: 16px;
                        border-radius: 4px;
                        box-sizing: border-box;
                      }

                      .title {
                        display: flex;
                        align-items: center;
                        line-height: 16px;
                        margin-left: 4px;
                        font-size: 14px;
                      }

                      .in_progress {
                        background: #ff6200;
                      }

                      .has_not_started {
                        background: #3291f8;
                      }

                      .is_expired {
                        background: #8e8e93;
                      }
                    }
                  }
                }

                .week_table {
                  height: 87%;
                  display: flex;
                  flex-direction: column;

                  .weekTable_main {
                    width: 100%;
                    padding-bottom: 0%;
                    position: relative;
                    display: flex;
                    height: 100%;
                    overflow: auto;
                    overflow-y: scroll;

                    .Listinfotbody {
                      // display: flex;
                      width: 100%;
                      height: 100%;
                      word-break: break-all;

                      > thead {
                        display: flex;
                        width: 100%;

                        > tr {
                          display: flex;
                          width: 100%;

                          > th {
                            display: flex;
                            width: 100%;
                            text-align: left;
                            justify-content: center;
                            align-items: center;
                            // border: 1px solid #ffffff;

                            > span {
                              flex: 1;
                              height: 100%;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              display: flex;
                              flex-direction: column;
                              color: #b89087;

                              .day_item {
                                font-size: 22px;
                                justify-content: center;
                                align-items: center;
                                color: #b89087;
                                padding: 5px;
                              }

                              > span {
                                // color: #000;
                                font-size: 15px;
                              }
                            }

                            .first {
                              // cursor: pointer;
                              i {
                                margin-left: 1%;
                                font-size: 16px;
                                font-weight: bold;
                              }
                            }
                          }
                          > th:nth-child(1) {
                            width: 9%;
                          }
                          > th:nth-child(2) {
                            width: 13%;
                          }
                          > th:nth-child(3) {
                            width: 13%;
                          }
                          > th:nth-child(4) {
                            width: 13%;
                          }
                          > th:nth-child(5) {
                            width: 13%;
                          }
                          > th:nth-child(6) {
                            width: 13%;
                          }
                          > th:nth-child(7) {
                            width: 13%;
                          }
                          > th:nth-child(8) {
                            width: 13%;
                          }
                        }
                      }

                      // border: 1px solid #000000;
                      > tbody {
                        width: 100%;
                        border: 3px gary solid;
                        height: 100%;
                        display: inherit;
                        // table-layout: fixed;

                        .timePeriod_col2 {
                          border-top: 1px solid #906e6c;
                          height: 56px;
                          // display: flex;
                          width: 100%;
                          > td {
                            height: 50px;
                            // border: 1px solid #ffffff;
                            //網格
                            width: 5%;
                            color: #906e6c;
                            table-layout: fixed;

                            > span {
                              flex: 1;
                              color: #000;
                              height: 100%;
                              font-size: 14px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              font-weight: bold;
                            }
                          }

                          // > td:nth-child(1) {
                          //   justify-content: left;
                          //   // display: inherit;
                          // }
                          // > td:nth-child(0) {
                          //   height: 9%;
                          // }
                          > td:nth-child(1) {
                            width: 9%;
                          }
                          > td:nth-child(2) {
                            width: 13%;
                          }
                          > td:nth-child(3) {
                            width: 13%;
                          }
                          > td:nth-child(4) {
                            width: 13%;
                          }
                          > td:nth-child(5) {
                            width: 13%;
                          }
                          > td:nth-child(6) {
                            width: 13%;
                          }
                          > td:nth-child(7) {
                            width: 13%;
                          }
                          > td:nth-child(8) {
                            width: 13%;
                          }

                          .timeGroup {
                            vertical-align: top;
                          }

                          .more_things {
                            display: flex;
                            width: 100%;
                            height: 100%;
                          }

                          .s {
                            display: flex;
                            width: 100%;
                            height: 100%;
                          }

                          .one_things {
                            // display: contents;
                            height: 100%;
                          }

                          .thing_group {
                            // height: 100%;
                            height: 70px;
                            > div {
                              .thing_item {
                                height: 100%;
                                min-height: 70px;
                                flex: 1;
                                display: flex;
                                font-size: 14px;
                                flex-direction: column;
                                color: #906e6c;
                                border-radius: 10px;
                                cursor: pointer;
                                box-sizing: border-box;
                                border: 1px solid #000000;
                                justify-content: center;
                                align-items: center;

                                // .thing_coursename {
                                //   overflow: hidden;
                                // }
                                .timeSpan {
                                  max-height: 15px;
                                  overflow: hidden;
                                }
                                .nameSpan {
                                  max-height: 15px;
                                  overflow: hidden;
                                }
                                .lessonSpan {
                                  max-height: 40px;
                                  overflow: hidden;
                                }
                              }

                              .waiting {
                                background: #ffffff;
                              }

                              .finish {
                                color: #906e6c;
                                background: #ecdbd3;
                              }
                              .seldated {
                                // color: #fbff00;
                                background: #79baff;
                                width: 150px;
                                z-index: 2;
                                position: relative;
                                > span {
                                  width: 120px;
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
          }

          .weekEdit_btn {
            position: relative;
            width: 10%;
            min-width: 78px;
            left: 3px;
            border-radius: 15px;
            background: #ffffff;
            height: 100%;
            border: solid 0px #707070;

            .list_btn {
              position: relative;
              width: 100%;
              // margin: 0px;
              display: grid;
              margin-top: 12px;

              .btn_add {
                position: relative;
                width: 100%;
                height: 35px;
                margin-bottom: 5%;
                // margin-top: 12px;
                // margin-bottom: 10%;
                // width: 80px;
                // height: 20px;
                // margin: 0;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                display: flex;
                // padding: 7px 11px 6px;
                border-radius: 8px;
                border: solid 1px #707070;
                background-color: #ffffff;
                color: #906e6c;
                cursor: pointer;
              }
            }
          }
        }

        .date_main {
          position: relative;
          width: 100%;
          height: 100%;
          border: 1px solid #ddd;
          // min-width: 900px;

          .date_schedule {
            position: relative;
            top: 0px;
            display: flex;
            align-items: center;
            top: 1%;
            width: 98%;
            height: 98%;
            border-radius: 15px;
            background: #e6e2de;
            margin: 0 auto;
            border: 1px solid #707070;

            .appointment_date {
              width: 70%;
              // min-width: 600px;
              height: 100%;
              padding: 1%;
              box-sizing: border-box;

              .date_top {
                display: flex;
                width: 100%;
                // justify-content: space-between;
                align-items: center;
                height: 10%;
                // padding: 0 1%;

                span {
                  display: flex;
                  // width: 10%;
                  height: 100%;
                  text-align: center;
                  display: flex;
                  font-family: ArialBlack;
                  font-size: 30px;
                  font-weight: bold;
                  color: #906e6c;
                }

                .todayDate {
                  display: flex;
                  height: 100%;
                  text-align: center;
                  font-family: ArialBlack;
                  font-size: 20px;
                  font-weight: normal;
                  color: #906e6c;
                  margin-left: 10px;
                }
              }

              .date_table {
                height: 90%;
                display: flex;
                flex-direction: column;

                .date_timePeriodList {
                  width: 100%;
                  overflow: auto;
                  padding-bottom: 0%;
                  position: relative;
                  display: flex;
                  height: 100%;

                  .date_Listinfotbody {
                    width: 100%;

                    .date_timePeriod_col2 {
                      border-bottom: 1px solid #906e6c;
                      // height: 10%;

                      > td {
                        height: 39px;
                        width: 1px;
                        color: #906e6c;
                      }

                      .time_row {
                        width: 20%;
                      }

                      .thing_group {
                        // height: 100%;
                        height: 0px;

                        > div {
                          display: flex;
                          height: 100%;

                          .more_things {
                            display: flex;
                            width: 100%;
                            height: 100%;
                          }

                          .one_things {
                            // display: contents;
                            display: flex;
                            height: 100%;
                          }

                          .thing_item {
                            height: 100%;
                            flex: 1;
                            display: flex;
                            font-size: 14px;
                            flex-direction: column;
                            color: #906e6c;
                            background: #ffffff;
                            border-radius: 10px;
                            cursor: pointer;
                            box-sizing: border-box;
                            border: 1px solid #000000;

                            > span {
                              overflow: hidden;
                            }
                          }

                          .waiting {
                            background: #ffffff;
                          }

                          .finish {
                            color: #906e6c;
                            background: #ecdbd3;
                          }

                          .seldated {
                            background: #79baff;
                          }

                          .oneitem_size {
                            width: 50%;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }

            .little_date {
              position: relative;
              top: 12px;
              right: 2px;
              border-radius: 15px;
              background: #ffffff;
              // height: 528px;
              height: 86%;
              width: 28%;
              border: 1px solid #707070;

              .dateBox {
                width: 100%;
                height: 68%;

                .dateBox_title {
                  display: flex;
                  width: 100%;
                  height: 40px;
                  line-height: 40px;
                  text-align: center;
                  justify-content: center;
                  cursor: pointer;

                  .arrow {
                    width: 30%;
                    height: 35%;
                    color: #b89087;
                    margin-top: 10px;
                  }

                  .arrow-right {
                    color: #b89087;
                    text-align: right;
                  }

                  .arrow-left {
                    color: #b89087;
                    text-align: left;
                  }

                  .data {
                    justify-content: center;
                    font-size: 20px;
                    width: 100%;
                    color: #b89087;
                    cursor: default;
                  }
                }

                .dateBox_content {
                  width: 100%;
                  height: 250px;

                  .row {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                  }

                  .title {
                    height: 40px;
                    line-height: 40px;
                    color: #b89087;
                  }

                  .title span {
                    width: calc(14.285714285714286%);
                    text-align: center;
                  }

                  .content {
                    -webkit-box-pack: start;
                    -ms-flex-pack: start;
                    justify-content: flex-start;
                    -ms-flex-wrap: wrap;
                    flex-wrap: wrap;

                    span {
                      width: calc(14.285714285714286%);
                      height: 30px;
                      line-height: 30px;
                      text-align: center;
                    }

                    .prevDay {
                      color: #fff;
                      background-color: #fff;
                      // background-color: #eee;
                    }

                    .thisDay {
                      width: calc(14.285714285714286%);
                      height: 30px;
                      line-height: 30px;
                      text-align: center;
                      border-radius: 5px;
                      color: #b89087;

                      &:active {
                        // transition: all 0.2s;
                        background: #b89087;
                        color: #fff;
                      }

                      &:hover {
                        transition: all 0.2s;
                        cursor: pointer;
                        background: #b89087;
                        color: #fff;
                      }

                      &.current {
                        transition: all 0.2s;
                        background: #b89087;
                        color: #fff;
                      }

                      &.grey {
                        color: #999;
                      }
                    }

                    .todayEff {
                      color: #ff0000;
                    }

                    .thisDay.active {
                      background-color: #b89087;
                      color: #fff;
                    }
                  }
                }
              }

              .list_btn {
                position: relative;
                width: 100%;
                // left: 50%;
                margin: 0px;
                // margin-top: 12px;
                display: grid;
                justify-content: center;

                .btn_add {
                  width: 80px;
                  height: 20px;
                  margin: 0;
                  align-items: center;
                  justify-content: center;
                  font-weight: bold;
                  display: flex;
                  padding: 7px 11px 6px;
                  border-radius: 8px;
                  border: solid 1px #707070;
                  background-color: #ffffff;
                  color: #906e6c;
                  cursor: pointer;
                  margin-top: 2px;
                }
              }
            }
          }
        }

        .appointment_list {
          position: relative;
          top: 0px;
          left: 0px;
          align-items: center;
          width: 100%;
          height: 100%;
          background: #ffffff;
          margin: 0 auto;
          // border: 1px solid #707070;

          .table_title {
            height: 100%;
            width: 100%;
            font-weight: bold;
            color: #717171;

            .table_main {
              width: 100%;
              font-weight: bold;
              height: 100%;

              > thead {
                width: 100%;
                height: 47px;
                align-items: center;
                font-weight: bold;
                color: #717171;
                border-bottom: solid 1px #707070;
                background-color: #e6e2de;
                width: calc(100% - 1em);

                > tr {
                  // border: solid 1px #707070; //格線
                  display: table;
                  width: 100%;
                  table-layout: fixed; //core code
                  height: 10%;
                  height: 100%;

                  > th:nth-child(1) {
                    width: 20%;
                    > p {
                      display: flex;
                      justify-content: center;
                    }
                  }

                  > th:nth-child(2) {
                    width: 30%;
                    > p {
                      margin: 3px 5px;
                    }
                  }

                  > th:nth-child(3) {
                    width: 20%;
                    > p {
                      margin: 3px 5px;
                    }
                  }

                  > th:nth-child(4) {
                    width: 10%;
                    > p {
                      margin: 3px 5px;
                    }
                  }

                  > th {
                    // border: solid 1px #707070; //格線
                    flex-wrap: nowrap;
                    padding: 2px 0px 2px 0px;
                    // width: 100%;

                    > img {
                      width: 40px;
                      height: 40px;
                      border-radius: 45px;
                    }

                    > button {
                      background-color: transparent;
                      border: none;
                    }
                  }

                  > input {
                    display: flex;
                    float: right;
                    margin-top: 12px;
                    width: 150px;
                    height: 30px;
                    border-radius: 6px;
                    border: solid 1px #707070;
                    background-color: #fff;
                    margin-right: 10px;

                    background: url("@/assets/images/icon_seach.png") no-repeat;
                    background-color: #fff;
                    background-position: 97%;
                    background-origin: content-box;
                    text-indent: 5px;
                  }
                }
              }

              > tbody {
                //滾動
                display: block;
                position: relative;
                overflow-y: scroll;
                height: 100%;

                > tr {
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
                        line-height: 1px;
                        display: flex;
                        justify-content: center;
                      }

                      .p_date {
                        font-size: 20px;
                        line-height: 1px;
                        display: flex;
                        justify-content: center;
                      }

                      .p_year {
                        font-size: 10px;
                        line-height: 1px;
                        display: flex;
                        justify-content: center;
                      }
                    }
                  }

                  > td:nth-child(1) {
                    width: 20%;
                    > p {
                      margin: 3px 5px;
                    }
                  }

                  > td:nth-child(2) {
                    width: 30%;
                    > p {
                      margin: 3px 5px;
                    }
                  }

                  > td:nth-child(3) {
                    width: 20%;
                    > p {
                      margin: 3px 5px;
                    }
                  }

                  > td:nth-child(4) {
                    width: 10%;
                    > p {
                      margin: 3px 5px;
                    }
                  }

                  > td {
                    // border: solid 1px #707070; //格線
                    height: 47px;
                    padding: 2px;
                    position: relative;
                    table-layout: fixed;

                    > img {
                      width: 20px;
                      height: 40px;
                      // padding: 0 20px;
                      // border-radius: 45px;
                    }

                    // > p {
                    //   margin: 3px 5px;
                    // }

                    > button {
                      background-color: transparent;
                      border: none;
                      display: inline;
                      float: right;
                      margin-right: 15px;
                    }

                    .checked_state {
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
                      input:checked + label {
                        background: #8b6f6d;
                      }
                      input:checked + label::before {
                        opacity: 1;
                        transform: all 0.5s;
                      }
                    }
                  }
                  > th:nth-child(0) {
                    width: 20%;
                    > p {
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
</style>
