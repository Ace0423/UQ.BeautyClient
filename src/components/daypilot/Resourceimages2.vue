<template>
    <DayPilotCalendar id="dp" :config="config" ref="calendarRef" />
</template>
  
<script>
import { DayPilot, DayPilotCalendar } from '@daypilot/daypilot-lite-vue'
import { onMounted, ref } from "vue";

export default {
    name: 'WeeklyCalendar',
    props: {
    },
    components: {
        DayPilotCalendar
    },
    setup() {
        const calendarRef = ref(null);

        const picker = new DayPilot.DatePicker({
            target: 'start',
            pattern: 'yyyy-MM-dd',
            onTimeRangeSelected: args => {
                console.log(args.start);
                dp.startDate = args.start;
                dp.update();
            }
        });
        const config = {
            viewType: "Resources",
            columns: [
                { name: "Room A", id: "A", image: "../src/components/daypilot/img/pat-yellow.jpg" },
                { name: "Room B", id: "B", image: "../src/components/daypilot/img/pat-blue.jpg" },
                { name: "Room C", id: "C", image: "../src/components/daypilot/img/pat-orange.jpg" },
                { name: "Room D", id: "D", image: "../src/components/daypilot/img/pat-red.jpg" },
            ],
            startDate: DayPilot.Date.today(),
            onTimeRangeSelected: (args) => {
                DayPilot.Modal.prompt('Create a new event:', 'Event 1').then((modal) => {
                    var dp = args.control;
                    dp.clearSelection();
                    if (modal.canceled) {
                        return;
                    }
                    dp.events.add({
                        start: args.start,
                        end: args.end,
                        id: DayPilot.guid(),
                        text: modal.result,
                    });
                });
                dp.startDate = args.start;
                dp.update();
            },
            headerHeight: 90,
            cellHeight: 45,
            onBeforeHeaderRender: args => {
                args.header.verticalAlignment = "top";
                args.header.areas = [
                    {
                        left: "calc(50% - 30px)",
                        bottom: 5,
                        width: 60,
                        height: 60,
                        fontColor: "#999999",
                        image: args.column.data.image,
                        style: "box-sizing: border-box; border-radius: 50%; border: 3px solid #ffffff; overflow: hidden;",
                    }
                ];
            },
            eventDeleteHandling: 'Disabled',
            onEventMoved: () => {
                console.log('Event moved');
            },
            onEventResized: () => {
                console.log('Event resized');
            },
        };

        const loadEvents = () => {
            // placeholder for an HTTP call
            var data = [
                {
                    id: 1,
                    start: DayPilot.Date.today().addHours(10),
                    end: DayPilot.Date.today().addHours(11),
                    text: 'Event 1',
                },
                {
                    id: 2,
                    start: DayPilot.Date.today().addHours(13),
                    end: DayPilot.Date.today().addHours(16),
                    text: 'Event 2',
                }, {
                    start: DayPilot.Date.today().addHours(13),
                    end: DayPilot.Date.today().addHours(16),
                    id: 3,
                    resource: "A",
                    text: "Event 1",
                    barColor: "#c7fffe",
                    backColor: "#c7fffe"
                },
            ];
            calendarRef.value.control.update({ events: data });
            // calendarRef.value.control.zoom(15);
            console.log(calendarRef.value.control);
        };

        onMounted(() => {
            loadEvents();
            console.log('Mounted.');
            // picker.show();
            console.log(picker);
        });

        return {
            config,
            calendarRef
        };
    }
}
</script>
<style lang="scss">
.calendar_default_colheader_inner {
    display: flex;
    align-items: flex-start;
}

/*
    .calendar_default_corner>div:nth-child(2) {
        background: rgb(243, 243, 243);
        background-color: rgb(243, 243, 243) !important;
        display: none!important;
    } */
</style>