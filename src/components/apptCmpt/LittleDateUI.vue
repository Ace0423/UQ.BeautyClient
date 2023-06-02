<script setup lang="ts">
import arrow_left_ico from "@/assets/Icon appointment-left.svg";
import arrow_right_ico from "@/assets/Icon appointment-right.svg";

let title = ["日", "一", "二", "三", "四", "五", "六"];
let currentDay = ref(new Date().getDate());
let currentMonth = ref(new Date().getMonth());
let currentYear = ref(new Date().getFullYear());

let nowdatetime =
  new Date().getFullYear() +
  "-" +
  addZeroDateFn(new Date().getMonth(), 1) +
  "-" +
  addZeroDateFn(new Date().getDate());

let checkYM = ref(true);
let checkToday = ref(false);

let selDate = ref("");

const props = defineProps<{
  showUIFn: Function;
  selLittleDateFn: Function;
  selDate: any;
}>();
onMounted(() => {
  currentYear.value = props.selDate.split("-")[0];
  currentMonth.value = props.selDate.split("-")[1] - 1;
  currentDay.value = props.selDate.split("-")[2];
  selDate.value = props.selDate;
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  let nav: any = document.getElementById("nav");
  //滑出
  nav.style.right = 0;
});

function showDateUIFn(state: any) {
  let nav: any = document.getElementById("nav");
  nav.style.right = "-100%";
  setTimeout(() => {
    props.showUIFn(state);
  }, 300);
}

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

function addZeroDateFn(data: any, num: number = 0) {
  let numDate = parseInt(data) + num;
  return numDate < 10 ? "0" + numDate : numDate;
}
function onSelect(value: any) {
  currentDay.value = value;
  selDate.value = curDateFn();
  props.selLittleDateFn(selDate.value);
  showDateUIFn(false);
}
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
</script>

<template>
  <div id="popup-mask" class="popup-mask" v-on:click.self="showDateUIFn(false)">
    <div class="dateBar">
      <div id="nav" class="nav">
        <div class="little_date">
          <div class="dateBox">
            <div class="dateBox_title">
              <img
                class="arrow arrow-left"
                :src="arrow_left_ico"
                @click="lastMonth()"
              />
              <div class="data">{{ currentYear }}-{{ curMonthAdd + "月" }}</div>
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
                    todayEff: new Date().getDate() == item && checkYM,
                  }"
                  v-for="(item, index) in currentDays"
                  :key="item"
                  v-on:click="onSelect(index + 1)"
                  >{{ item }}</span
                >
              </div>
            </div>
            {{ curMonthAdd + "月" }}{{ currentDay + "日" }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.popup-mask {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 2;
  background: rgba(255, 255, 255, 0.5);
  .dateBar {
    top: 142px;
    left: 2px;
    width: 310px;
    min-width: 180px;
    height: 100vh;
    // height: calc(var(--vh, 1vh) * 100 - 82px);
    height: 450px;
    box-sizing: border-box;
    position: relative;

    .nav {
      position: fixed;
      z-index: 11;
      right: -100%;
      top: auto;
      width: 310px;
      height: 450px;
      background: #ffffff;
      transition: right linear 0.3s;
      border-radius: 15px;

      .little_date {
        position: relative;
        // top: 12px;
        right: 2px;
        border-radius: 15px;
        background: #ffffff;
        // height: calc(100% - 12px);
        height: 100%;
        width: 100%;
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
            height: 230px;
            border-bottom: 1px solid #707070;

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
    .nav a {
      display: block;
      padding: 1em 0;
      border-bottom: 1px solid #888;
      font-size: 16px;
      color: #eee;
      text-align: center;
    }
    .nav .avatar-big {
      width: 259px;
      border-radius: 50%;
      box-shadow: 0 6px 12px #eee;
    }
  }
}
</style>
