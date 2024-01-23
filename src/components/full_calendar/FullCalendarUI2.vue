<script lang='ts'>
import { defineComponent } from 'vue'
import { CalendarOptions, EventApi, DateSelectArg, EventClickArg } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';

import { INITIAL_EVENTS, createEventId } from './event-utils'

export default defineComponent({
  components: {
    FullCalendar,
  },
  data() {
    return {
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin, // needed for dateClick,
          resourceTimeGridPlugin
        ],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,resourceTimeGridDay'
        },
        initialView: 'resourceTimeGridDay',
        initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        allDaySlot: false,//全天
        nowIndicator: true,//時間線
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        resources: [
          { id: 'a', title: 'User A' },
          { id: 'b', title: 'User B' },
          { id: 'c', title: 'User C' },
          { id: 'd', title: 'User D' }
        ],
        events: [
          { id: '1', resourceId: 'b', start: '2024-01-18T02:00:00', end: '2024-01-18T07:00:00', title: '課程1', user: '會員1', manager: '管理員1', color: '#fff' },
          { id: '2', resourceId: 'c', start: '2024-01-18T05:00:00', end: '2024-01-18T22:00:00', title: '課程2', user: '會員2', manager: '管理員2' },
          { id: '3', resourceId: 'd', start: '2024-01-18', end: '2024-01-18', title: '課程3', user: '會員3', manager: '管理員3' },
          {
            id: '4', resourceId: 'a', start: new Date().toISOString().replace(/T.*$/, '') + 'T03:00:00',
            end: new Date().toISOString().replace(/T.*$/, '') + 'T08:00:00', title: '課程4', user: '會員4', manager: '管理員4', color: '#6ffff3'
          },
        ],

        eventRender: function (event: any, element: any, view: any) {
          if (event.customRender == true) {
            var el = element.html();
            // element.html("<div style='width:90%;float:left;'>" + el + "</div><div style='text-align:right;' class='close'><span class='glyphicon glyphicon-trash'></span></div>");
            //...etc
          }
        },
        eventDidMount: (arg: any) => {
          let htmlStr = ""
          arg.el.fcSeg.eventRange.title
          const event = arg.event;
          const info = event._def.extendedProps;
          console.log(event);//規則變數
          console.log(info);//額外變數

          htmlStr =
            // "<div class='fc-event-main'>" + "<span><i>" +
            // event.endStr.slice(11, 16)
            // + "<strong  style='float:right;  border-radius:20%;'>" + 'managerName' + "</strong> "
            // + "</i><br/><span>" +
            // info.user
            // + "</i><br/><span>" +
            // event._def.title
            // + "</p></span></div>"; 
            htmlStr += "<div class='fc-event-main'>" + "<span><i>" + event.startStr.slice(11, 16)
          if (true)
            htmlStr += "<strong  style='float:right; background-color:#5B5B5B; '>" + '不指定' + "</strong> ";
          else
            htmlStr += "<strong  style='float:right;  border-radius:20%;'>" + 'managerName' + "</strong> "
          htmlStr += "</i><br/><span>" + info.user
          htmlStr += "</i><br/><span>" + event._def.title
          htmlStr += "</p></span></div>";

          arg.el.innerHTML = htmlStr;//替换HTML文本
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
        slotDuration: {
          minute: 20,
        }
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      } as CalendarOptions,
      currentEvents: [] as EventApi[],
    }
  },
  methods: {
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends // update a property
    },
    handleDateSelect(selectInfo: DateSelectArg) {
      let title = prompt('Please enter a new title for your event')
      let calendarApi = selectInfo.view.calendar

      calendarApi.unselect() // clear date selection

      if (title) {
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay
        })
      }
    },
    handleEventClick(clickInfo: EventClickArg) {
      if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        clickInfo.event.remove()
      }
    },
    handleEvents(events: EventApi[]) {
      this.currentEvents = events
    },
  }
})

</script>

<template>
  <div class='demo-app'>
    <div class='demo-app-sidebar' v-if="false">
      <div class='demo-app-sidebar-section'>
        <h2>Instructions</h2>
        <ul>
          <li>Select dates and you will be prompted to create a new event</li>
          <li>Drag, drop, and resize events</li>
          <li>Click an event to delete it</li>
        </ul>
      </div>
      <div class='demo-app-sidebar-section'>
        <label>
          <input type='checkbox' :checked='calendarOptions.weekends' @change='handleWeekendsToggle' />
          toggle weekends
        </label>
      </div>
      <div class='demo-app-sidebar-section'>
        <h2>All Events ({{ currentEvents.length }})</h2>
        <ul>
          <li v-for='event in currentEvents' :key='event.id'>
            <b>{{ event.startStr }}</b>
            <i>{{ event.title }}</i>
          </li>
        </ul>
      </div>
    </div>
    <div class='demo-app-main'>
      <FullCalendar class='demo-app-calendar' :options='calendarOptions'>
        <template v-slot:eventContent='arg'>
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
    </div>
  </div>
</template>

<style lang='scss'>
h2 {
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
  /* used for event dates/times */
  margin-right: 3px;
}

.demo-app {
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

.demo-app-sidebar {
  width: 300px;
  line-height: 1.5;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
}

.demo-app-sidebar-section {
  padding: 2em;
}

.demo-app-main {
  flex-grow: 1;
  padding: 3em;
}

.fc {
  /* the calendar root */
  max-width: 1100px;
  margin: 0 auto;
}

.done:before {
  content: '[666]';
}

.fc-toolbar {
  display: none !important;
}

.fc-event-main {
  >span {
    font-size: 20px;
  }
}
</style>
