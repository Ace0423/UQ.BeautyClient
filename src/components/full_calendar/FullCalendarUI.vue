<script lang='ts'>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import { INITIAL_EVENTS, INITIAL_RESOURCES, createEventId } from './event-utils';
import type { DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/core';
import { goods_basicImg } from '@/utils/utils';

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  // props: {
  //   bookList: Array,
  //   clickBookInfoFn:[

  //   ],
  // },
  props: ['bookList', 'clickBookInfoFn', 'selectManager', 'changeDateTabsFn', 'changeDateDayFn'],
  data: function () {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          resourceTimeGridPlugin],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,resourceTimeGridDay'
        },
        locale: 'zh-tw',
        initialView: 'resourceTimeGridDay',
        schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
        // initialEvents: INITIAL_EVENTS, // 預設資料
        buttonText: {
          today: '今天',
          month: '月曆',
          week: '週曆',
          day: '日曆',
        },
        allDayText: '整日',
        allDaySlot: true,// 是否显示全天
        nowIndicator: true,// 是否显示当前时间轴
        editable: false, // 能否编辑事件。如果需要拖拽事件，必须开启它
        droppable: false,   // 是否把其它日历上的事件拖拽到这个日历上
        selectOverlap: false, // 用户选择时能否重叠到事件上, selectable必须为true才生效
        unselectAuto: true, // 选中时，点击页面其它位置是否取消选中
        selectable: false, // 允许用户点击或拖拽选中
        dayHeaders: true, // 是否显示日期标题
        dayMinWidth: 'auto',  // 日最小宽度，如果日期单元格没办法满足，会出现水平滚动条
        refetchResourcesOnNavigate: true, // 当用户切换不同视图时，是否重新加载数据
        resourceOrder: 'index', // 资源按照index属性排序
        selectMirror: true,
        weekends: true,
        slotEventOverlap: true,
        eventSources: [], // 事件列表
        dayMaxEvents: true,  // 在dayGrid视图中如果每个单元格事件超出单元格会出现'+more'
        resourceAreaWidth: '280px', // 横轴资源视图的左侧列表宽度
        customButtons: {
          // 自定义button，如果想显示页面上，把timeline放到headerToolbar对象里。
          timeline: {
            text: '自定义',
            click: this.timelineEvent
          },
          next: {
            click: this.nextClick
          },
          prev: {
            click: this.prevClick
          },
          today: {
            text: '今天',
            click: this.todayClick
          }
        },
        businessHours: {
          // days of week. an array of zero-based day of week integers (0=Sunday)
          daysOfWeek: [1, 2, 3, 4, 5], // Monday - Thursday
          startTime: '10:00', // a start time (10am in this example)
          endTime: '18:00', // an end time (6pm in this example)
        },
        slotLabelInterval: {
          hour: 1,
        },
        eventShortHeight: 15, // 具有最小事件的样式
        slotDuration: "00:15", // 事件轴以15分钟为一刻度
        eventMinHeight: "15", // 事件最小高度
        resources: [],
        resourceLabelDidMount: function (info: any) {
          ////大頭貼
          // var questionMark = document.createElement('img');
          // questionMark.src = goods_basicImg;
          // questionMark.width = 20;
          // questionMark.height = 20;
          // info.el.appendChild(questionMark);
        },
        events: [],
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,

        eventDidMount: (arg: any) => {
          //#region 渲染預約Item
          const event = arg.event;//規則變數
          if (event.id != "") {
            let htmlStr = arg.el.innerHTML = "";
            let serverName = event.extendedProps.bookInfo.managerInfo.nameView
            let fontColor = event.backgroundColor

            if (event.backgroundColor == "#F0F0F0" || event.backgroundColor == "#717171") {
              fontColor = "#FFFFFF";
            } else {
              fontColor = "#000000";
            }
            if (event.title == "休假") {
              //#region 渲染休假
              htmlStr += "<div class='fc-event-main'style='overflow:hidden;background-color:" + event.backgroundColor + "' >"
              htmlStr += "<span style='white-space: nowrap; color: black; font-size: 14px;font-weight: bold;'>" + serverName + " " + "</span>"
              htmlStr += "<span style='white-space: nowrap; color: black;'>" + event.title + "</span>"
              //#endregion
            } else if (event.title == "休息") {
              console.log('休息');
              switch (arg.view.type) {
                case 'timeGridWeek'://週曆
                case 'resourceTimeGridDay'://日曆
                  fontColor = "#000000";
                  htmlStr += "<div class='fc-event-main' style='overflow:hidden;' >"
                  htmlStr += "<span style='white-space: nowrap; font-weight: bolder; font-size: 14px;color:" + fontColor + ";'>" + event.startStr.slice(11, 16) + "</span>"
                  htmlStr += "<br/><strong  style='  border-radius:20%;  font-weight: normal; color:" + fontColor + ";'>" + serverName + "</strong> "
                  htmlStr += "<br/><span  style='white-space: nowrap; font-weight: normal;color:" + fontColor + ";'>" + event.title + "</span>"
                  htmlStr += "</div>";
                  break;
                default:
                  console.log('無分類', arg.view.type);
                  break;
              }
            } else {
              //#region 渲染工作日
              const info = event.extendedProps.bookInfo;//額外變數
              let managerId = event.extendedProps.bookInfo.managerId
              switch (arg.view.type) {
                case 'dayGridMonth'://月曆
                  htmlStr += "<div class='fc-event-main'style='overflow:hidden;background-color:" + event.backgroundColor + "' >"
                  if (info.isAssign)//指定
                    htmlStr += "<strong  style='  border-radius:20%; color:" + fontColor + ";'>" + serverName + "</strong> "
                  else {//不指定
                    htmlStr += "<span style='white-space: nowrap;  background-color:#5B5B5B; color:white; '>" + serverName + "</span>"
                    // htmlStr += "<span style='white-space: nowrap;  background-color:#5B5B5B; font-weight: normal; color:white;'>" + serverName + "</span>"
                  }

                  htmlStr += "<span style='white-space: nowrap; color:" + fontColor + ";'>" + " - " + info.memberInfo.nameView + "</span>"
                  htmlStr += "<span  style='white-space: nowrap; color:" + fontColor + ";'>" + " - " + event.title + "</span>"
                  htmlStr += "</div>";
                  break;
                case 'timeGridWeek'://週曆
                case 'resourceTimeGridDay'://日曆
                  htmlStr += "<div class='fc-event-main' style='overflow-y:auto;' >"
                  htmlStr += "<div style='display: flex; justify-content: space-between;'  >"
                  htmlStr += "<span style='white-space: nowrap; font-weight: bolder; font-size: 14px;color:" + fontColor + ";'>" + event.startStr.slice(11, 16) + "</span>"
                  if (!info.isAssign)//指定
                  htmlStr += "<span style='background: #444444; white-space: nowrap; font-weight: bolder; font-size: 14px;color:" + "#FFFFFF" + ";'>" + "不指定" + "</span>"
                  htmlStr += "</div>";
                  htmlStr += "<span style='white-space: nowrap; font-weight: bolder; font-size: 14px;color:" + fontColor + ";'>" + info.memberInfo.nameView + "</span>"

                  // if (info.isAssign)//指定
                  //   htmlStr += "<br/><strong  style='  border-radius:20%;  font-weight: normal; color:" + fontColor + ";'>" + serverName + "</strong> "
                  // else//不指定
                  //   htmlStr += "<br/><span style='white-space: nowrap;  background-color:#5B5B5B; font-weight: normal; color:white;'>" + serverName + "</span>"

                  htmlStr += "<br/><span  style='white-space: nowrap; font-weight: normal;color:" + fontColor + ";'>" + event.title + "</span>"
                  console.log();
                  if (info.serviceInfo.subInfo)
                  htmlStr += "<span  style='white-space: nowrap; font-weight: normal;color:" + fontColor + ";'>" +" - "+ info.serviceInfo.subInfo.name + "</span>"

                  if (info.bookingMemo != "") {
                    htmlStr += "<br/><span  style='white-space: nowrap; font-weight: normal;color:" + fontColor + ";'>" + "備註- " + info.bookingMemo + "" + "</span>"
                  }
                  htmlStr += "</div>";
                  break;
                default:
                  console.log('無分類', arg.view.type);
                  break;
              }
              //#endregion


            }
            arg.el.innerHTML = htmlStr;//替换HTML文本
          }
          //#endregion
        },
      } as any,
      proptuiList: this.bookList,
      currentEvents: [] as EventApi[],
      newsList: '',
      calendarApi: null,
      selectBooking: 0,
      // 日历尺寸发生改变
      windowResize: (arg: any) => {
        this.fullcalendarResize(arg.view.type)
      }
    }
  },
  methods: {
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends // update a property
    },
    handleDateSelect(selectInfo: DateSelectArg) {

    },
    handleEventClick(clickInfo: any) {
      this.clickBookInfoFn(clickInfo.event._def.extendedProps.bookInfo);
    },
    handleEvents(events: any) {
      if (events.length > 0) {
        let dType = events[0]._context.currentViewType
        if (dType == 'dayGridMonth')
          this.changeDateTabsFn(0)
        else if (dType == 'timeGridWeek')
          this.changeDateTabsFn(1)
        else if (dType == 'resourceTimeGridDay')
          this.changeDateTabsFn(2)
      }
      this.currentEvents = events
    },
    loadBookList() {
      this.calendarOptions.events = this.bookList as any;
      // this.calendarOptions.events = INITIAL_EVENTS;
    },
    loadManagerList() {
      this.calendarOptions.resources = this.selectManager as any;
      // this.calendarOptions.resources = INITIAL_RESOURCES;
    },
    nextClick(mouseEvent: any, htmlElement: any) {
      let cApi = ((this.$refs.fullCalendar) as any).getApi();
      cApi.next();
      this.changeDateDayFn(cApi.view.currentStart, cApi.view.currentEnd, cApi.view.title)
    },
    prevClick(mouseEvent: any, htmlElement: any) {
      let cApi = ((this.$refs.fullCalendar) as any).getApi();
      cApi.prev();
      this.changeDateDayFn(cApi.view.currentStart, cApi.view.currentEnd, cApi.view.title)
    },
    todayClick(mouseEvent: any, htmlElement: any) {
      let cApi = ((this.$refs.fullCalendar) as any).getApi();
      cApi.today();
      this.changeDateDayFn(cApi.view.currentStart, cApi.view.currentEnd, cApi.view.title)
    },
  },
  async beforeMount() {
    // 在挂載之前，從服務器加載新聞數據
    try {
      this.newsList = 'https://api.example.com/news';
    } catch (error) {
      console.error('加載新聞數據時出錯：', error);
    }
  },

  mounted: function () {
    this.calendarApi = ((this.$refs.fullCalendar) as any).getApi();
  },
  watch: {
    bookList: {
      handler(newVal, oldVal) {
        this.proptuiList = this.bookList;
        this.loadBookList();
      },
      deep: true,
    },
    selectManager: {
      handler(newVal, oldVal) {
        this.loadManagerList();
      },
      deep: true,
    },
  },

}
</script>

<template>
  <!-- <FullCalendar :options='calendarOptions' /> -->
  <div class='fullcalendar-ui'>
    <div class='content-nav' v-if="false">
      <div class='content-sidebar-section'>
        <h2>Instructions</h2>
        <ul>
          <li>Select dates and you will be prompted to create a new event</li>
          <li>Drag, drop, and resize events</li>
          <li>Click an event to delete it</li>
        </ul>
      </div>
      <div class='content-sidebar-section'>
        <label>
          <input type='checkbox' :checked='calendarOptions.weekends' @change='handleWeekendsToggle' />
          toggle weekends
        </label>
      </div>
      <div class='content-sidebar-section'>
        <h2>All Events ({{ currentEvents.length }})</h2>
        <ul>
          <li v-for='event in currentEvents' :key='event.id'>
            <b>{{ event.startStr }}</b>
            <i>{{ event.title }}</i>
          </li>
        </ul>
      </div>
    </div>
    <div class='content-main'>
      <FullCalendar id="box1" class='content-calendar' :options='calendarOptions' ref="fullCalendar">
        <template v-slot:eventContent='arg'>
          <!-- <b>{{ arg }}</b>
          <i>{{ arg.event.title }}</i>
          <span>{{ }}</span> -->
        </template>
      </FullCalendar>
    </div>
  </div>
</template>

<style lang='css'>
/* h2 {
  margin: 0;
  font-size: 16px;
}

ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}

li {
  margin: 1.5em 0;
  padding: 0;
}

b {
  margin-right: 3px;
} */

.fullcalendar-ui {
  display: flex;
  width: 100%;
  height: 609px;
  /* min-height: 100%; */
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

.fc-popover {
  z-index: 1002 !important;
}

.content-calendar {
  display: flex;
  width: 100%;
  height: 100%;
}

.fc-daygrid-event-harness {
  overflow: hidden;
}

/* .fc-view-harness-active {
  display: flex;
  width: 100%;
  height: 100%;
} */

/* .content-nav {
  width: 300px;
  line-height: 1.5;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
}

.content-sidebar-section {
  padding: 2em;
}


.fc {
  max-width: 1100px;
  margin: 0 auto;
}


.fc-event-main {
  >span {
    font-size: 20px;
  }
} */
.fc-toolbar {
  /* margin: 10px 0 !important; */
  /* display: none !important; */
}

.content-main {
  height: 100%;
  width: 100%;
}
</style>
