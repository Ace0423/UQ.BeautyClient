<template>
    <div class="container">
        <Header :Icon="Icon" :moduleType="'預約紀錄'"></Header>
        <div class="appointment_main">
            <div class="appointment_box">
                <div class="item-tab">
                    <div>
                        <button :class='mainTabIndexRef == index ? "active" : ""' v-for="(item, index) in mainTypeDataRef"
                            :key="item.id" v-on:click="changeMainTab(index)">{{ item.title }} </button>
                    </div>
                    <div class="weektoday_div" v-show="mainTabIndexRef == 0">
                        <div class="weektoday_btn" @click="changeWeekToday(false)"
                            :class="{ 'noSelbtn': showWeekBoxRef, 'selbtn': !showWeekBoxRef }">日曆
                        </div>
                        <div class=" weektoday_btn" @click="changeWeekToday(true)"
                            :class="{ 'selbtn': showWeekBoxRef, 'noSelbtn': !showWeekBoxRef }">週曆</div>
                    </div>
                </div>
                <div>
                    <div class="week_main" v-show="showWeekBoxRef && mainTabIndexRef != 1">
                        <div>
                            <div class="appointment_schedule" v-show="mainTabIndexRef == 0">
                                <div class="appointment_week">
                                    <div class="week-top">
                                        <div class="btn_wrap">
                                            <div class="dateBox_title">
                                                <span>TODAY </span>
                                                <img class="arrow arrow-left" :src="arrow_left" @click="getLastWeek()" />
                                                <span class="todayDate">{{ todayDate }} </span>
                                                <img class="arrow arrow-right" :src="arrow_right" @click="getNextWeek()" />

                                            </div>
                                        </div>
                                    </div>
                                    <div class="week_table">
                                        <div class="table_header">
                                            <div class="table_date">
                                                <template v-for="(item, index) of months" :key="index">
                                                    <span class="first" v-if="index === 0">
                                                        {{ }}
                                                    </span>
                                                    <span v-else :key="index + 0">
                                                        <span class="day_item"
                                                            :class="{ 'isCurDate': item && item.isCurDate }">
                                                            {{ `${item && item.isCurDate ? item && item.showDate || '' :
                                                                item
                                                                &&
                                                                item.showDate
                                                                || ''}` }}
                                                        </span>
                                                        <span> {{ item.weekTitle }} </span>
                                                    </span>
                                                </template>
                                            </div>
                                        </div>
                                        <div class="weekTable_main">
                                            <table class="Listinfotbody" style="">
                                                <tbody>
                                                    <tr class="timePeriod_col2" v-for="(period, p_index) in monthsThingsRef"
                                                        align="center" valign="center" :key="`period${p_index}`">
                                                        <td class="timeGroup">{{ period.time }}</td>
                                                        <template v-for="(thingGroup, t_index) of period.newThings"
                                                            :key="`thing${t_index}`">
                                                            <td :class='thingGroup.things.length > 1 ? "more_things" : "one_things"'
                                                                class="thing_group" :rowspan=thingGroup.range>
                                                                <template v-for="(thing, t_index) of thingGroup.things "
                                                                    :key="`thing${t_index}`">
                                                                    <div class="thing_item" @click="handleDetail(thing)"
                                                                        :class="{ 'finish': thing.state == 1, 'waiting': thing.state == 0, 'seldated': thing.state == 99 }">
                                                                        <span>{{
                                                                            thing.timePeriod.split(':')[0] + ':' +
                                                                            thing.timePeriod.split(':')[1]
                                                                        }}</span>
                                                                        <span>{{ thing.name }}</span>
                                                                        <span>{{ thing.course }}</span>
                                                                    </div>
                                                                </template>
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
                        <div class="weekEdit_btn" v-show="showWeekBoxRef && mainTabIndexRef != 1">
                            <div class="list_btn">
                                <div class="btn_add" @click="addAddReserveBtn()">新增預約</div>
                                <div class="btn_add" @click="editAddReserveBtn()">修改預約</div>
                                <div class="btn_add" @click="delReserveId()">刪除預約</div>
                            </div>
                        </div>
                    </div>
                    <div class="date_main" v-show="!showWeekBoxRef && mainTabIndexRef != 1">
                        <div class="date_schedule" v-show="mainTabIndexRef == 0">
                            <div class="appointment_date">
                                <div class="date_top">
                                    <span>TODAY </span>
                                    <span class="todayDate">{{ todayDate }} </span>
                                </div>
                                <div class="date_table">
                                    <div class="date_timePeriodList">
                                        <table class="date_Listinfotbody" style="">
                                            <tbody>
                                                <tr class="date_timePeriod_col2" v-for="(period, p_index) in todayThingsRef"
                                                    align="center" valign="center" :key="`period${p_index}`">
                                                    <td class="time_row">{{ period.time }}</td>
                                                    <template v-for="(thingGroup, t_index) of period.newThings"
                                                        :key="`thing${t_index}`">
                                                        <td :class='thingGroup.things.length > 1 ? "more_things" : "one_things"'
                                                            class="thing_group" :rowspan=thingGroup.range>
                                                            <template v-for="(thing, t_index) of thingGroup.things "
                                                                :key="`thing${t_index}`">
                                                                <div class="thing_item" @click="handleDetail(thing)" :class="{
                                                                        'finish': thing.state === 3, 'waiting': thing.state === 1, 'seldated': thing.state === 2,
                                                                        'oneitem_size': thingGroup.things.length == 1
                                                                    }">
                                                                    <span>{{
                                                                        thing.timePeriod.split(':')[0] + ':' +
                                                                        thing.timePeriod.split(':')[1]
                                                                    }}</span>
                                                                    <span>{{ thing.name }}</span>
                                                                    <span>{{ thing.course }}</span>
                                                                </div>
                                                            </template>
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
                                        <img class="arrow arrow-left" :src="arrow_left" @click="lastMonth()" />
                                        <div class="data">{{ currentYear }}-{{ currentMonthChinese }}</div>
                                        <img class="arrow arrow-right" :src="arrow_right" @click="nextMonth()" />
                                    </div>
                                    <div class="dateBox_content">
                                        <div class="row title">
                                            <span v-for="item in title" :key="item">{{ item }}</span>
                                        </div>
                                        <div class="row content ">
                                            <span class="prevDay" v-for="item in prevDays" :key="'A' + item">{{ item
                                            }}</span>
                                            <span class="thisDay"
                                                :class="{ 'active': currentDayValue == index && selMonthDay, 'todayEff': datetime.getDate() == (item) }"
                                                v-for="(item, index) in currentDays" :key="item"
                                                v-on:click="onSelect(index)">{{
                                                    item
                                                }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="list_btn">
                                    <div class="btn_add" @click="addAddReserveBtn()">新增預約</div>
                                    <div class="btn_add" @click="editAddReserveBtn()">修改預約</div>
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
                                        <th v-for="(item) in aptTitle" :key="item">
                                            <p>{{ item }}</p>
                                        </th>
                                        <input v-model="searchList" />
                                    </tr>
                                </thead>
                                <tbody id="content">
                                    <tr v-for="(item, index) in filterAptData" :key="item.id">
                                        <td class="td_time">
                                            <div class="dateBox">
                                                <p class="p_month">{{ item.date.split('-')[1] + '月' }}</p>
                                                <p class="p_date">{{ item.date.split('-')[2] }}</p>
                                                <p class="p_year">{{ item.date.split('-')[0] }}</p>
                                            </div>
                                            <p>{{ 'PM' + item.timePeriod }}</p>
                                        </td>
                                        <td>
                                            <p v-for="(courseitem) in item.course.split(',')" :key="courseitem">{{
                                                courseitem }}</p>
                                        </td>
                                        <td>
                                            <p>{{ item.name }}</p>
                                        </td>
                                        <td>
                                            <input class="checked_state" type="checkbox" name="sub" value="item"
                                                :checked="item.state == 1" v-on:click="changeStutusFn(index, item)">
                                        </td>
                                        <td>
                                            <button v-on:click="handleDelete(index, item.id)"><img
                                                    :src="DeleteIcon" /></button>
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
    <div id="add_form" class="form_bg" v-show="showAddReserveFormRef">
        <div class="add-reserve-form">
            <div class="basic_info_main">
                <div class="basic_info_item">
                    <p>姓名(電話)</p>
                    <select v-model="selAddMember">
                        <option v-for="(item) in memberList.data" :key="item" :value="item">
                            {{ item.nameView + '(' + item.phone + ')' }}
                        </option>
                    </select>
                </div>
                <div class="basic_info_item">
                    <p>選擇時段</p>
                    <div class="news-filter">
                        <select name="name" v-model="selTimePeriodRef">
                            <option v-for="(item) in timeGroup" :key="item" :value="item">{{ item }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <p>選擇課程</p>
            <div>
                <div>
                    <label v-for="(item, index) in courseDataList" :key="item" :value="item">
                        <input class="add-reserve-btn2" type="radio" :value="item" v-model="selApptCourseIdRef" />
                        <span :class="{ 'checkLesson': selApptCourseIdRef == index }" value={{item}} name={{item.nameTw}}>{{
                            item.nameTw
                        }}</span>
                    </label>
                </div>
            </div>
            <div class="row">
                <button class="confirm-reserve-btn" v-show="!showOkBtnRef" @click="confirmReserveForm('add')">確認</button>
                <button class="confirm-reserve-btn" v-show="showOkBtnRef" @click="confirmReserveForm('edit')">修改</button>
                <button class="confirm-reserve-btn" @click="showAddReserveForm(false)">取消</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" >
import DeleteIcon from '@/assets/Icon material-delete.svg';
import Icon from '@/assets/Icon zocial-guest.svg';
import arrow_left from '@/assets/Icon appointment-left.svg';
import arrow_right from '@/assets/Icon appointment-right.svg';
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';
import { getApptDataRequest } from '@/api/apptRequest';

let searchList = ref('')
let showWeekBoxRef = ref(true)
let mainTabIndexRef = ref(0);
let aptTitle = reactive(['預約時間', '預約項目', '顧客', '已完成']);

let datetime = new Date();
let year = datetime.getFullYear();
let month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
let date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
let nowdatetime = `${year}-${month}-${date}`

let store = useCounterStore();
let { timePeriodList, memberList, courseDataList } = storeToRefs(store);
let { getApptDataApi, postAddApptDataApi, getMemberData, getCourseDetailApi, postEditApptDataApi } = store;



function getApptInfpApi() {
    getCourseDetailApi(0, 0);
    //先取得會員清單
    getMemberData().then((res: any) => {
        //預先呼叫api獲取數據
        getApptDataApi(new Date().getFullYear(), (new Date().getMonth() + 1)).then((res: any) => {
            resetApptTable();
        }).catch((error) => {
            console.log(error, "error");
        });
    }).catch((error) => {
        console.log(error, "error");
    });
}
getApptInfpApi();


let filterAptData: any = computed(() => {
    let curAptData: any = [];
    for (let i = 0; i < timePeriodList.value.length; i++) {
        let element = timePeriodList.value[i];
        for (let j = 0; j < element.things.length; j++) {
            let element2 = element.things[j];
            if (!searchList.value || element2.course.toLowerCase().includes(searchList.value.toLowerCase())) {
                curAptData.push(element2);
            }
        }
    }
    return curAptData;
})


let filterWeekThingsData: any = computed(() => {

})

let mainTypeDataRef = ref([
    {
        id: 1,
        title: '預約排程'
    },
    {
        id: 2,
        title: '預約列表'
    },
]);
let weeks = ['週日', '週一', '週二', '週三', '週四', '週五', '週六']
let todayDate = ref('');
let months: any = ref(['']);
let curDate: any = ref();
let nowDate = new Date();
let showCourseDetail = false;
let monthsThingsRef: any = ref([]);
let todayThingsRef: any = ref([]);

let changeMainTab = (index: number) => {
    mainTabIndexRef.value = index;
}
onMounted(() => {
    // resetApptTable();
});
//刪除課程
let handleDelete = (index: number, itemId: string) => {
    for (let i = 0; i < timePeriodList.value.length; i++) {
        let element = timePeriodList.value[i];
        for (let j = 0; j < element.things.length; j++) {
            let element2 = element.things[j];
            if (itemId.toString() === element2.id.toString()) {
                timePeriodList.value[i].things.splice(j, 1);
            }
        }
    }

    resetApptTable();
}
//改變課程狀態
let changeStutusFn = (index: number, item: any) => {
    // for (let i = 0; i < timePeriodList.value.length; i++) {
    //     let element = timePeriodList.value[i].things;
    //     for (let j = 0; j < element.length; j++) {
    //         let element2 = element[j];
    //         if (itemId === element2.id) {
    //             if (element2.state == 3)
    //                 timePeriodList.value[i].things[j].state = 0;
    //             else {
    //                 timePeriodList.value[i].things[j].state = 3;
    //                 oldSelList = null
    //             }
    //         }
    //     }
    // }
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
        bookingMemo: item.bookingMemo
    }
    //修改預約
    postEditApptDataApi(editApptDate).then((res: any) => {
        console.log();

    }).catch((error) => {

        console.log(error, "error");
    });

    getApptInfpApi();
}

let oldWeekDateTime: any = null;
/**获取时间 */
function getWeek(time: any) {
    oldWeekDateTime = time;
    //計算禮拜幾 (Sunday - Saturday : 0 - 6)
    let week = time.getDay();
    //處理算出禮拜一
    time = addDate(time, week * -1);
    curDate.value = new Date(time);
    for (let i = 0; i < 7; i++) {
        let { year, month, day } = formatDate(i === 0 ? time : addDate(time, 1))
        let curWeekDay = `${year}-${month}-${day}`;
        months.value.push({
            date: curWeekDay,
            showDate: `${day}`,
            weekTitle: weeks[i]
        })
    }

    //表格數據計算
    monthsThingsRef.value = []
    todayThingsRef.value = []
    let weekThings = [];
    let todayThings = [];
    if (selLittleYMDateRef.value == '') selLittleYMDateRef.value = getCurDay2();
    for (let j = 0; j < timePeriodList.value.length; j++) {
        //3
        const element = timePeriodList.value[j];
        weekThings = []
        todayThings = []
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
                    weekThingsGroups.push(element2)
                    if (element3.date === selLittleYMDateRef.value) { todayThingsGroups.push(element2); }
                    dataStatus = true
                    element2.range = element2.range ? element2.range : 1
                    if (curRange <= element2.range)
                        curRange = element2.range;
                }
            }
            if (weekThingsGroups.length > 0) {
                weekThings.push({ id: 1, time: element.timePeriod, date: element3.date, things: weekThingsGroups, range: curRange })
            } else {
                weekThings.push({ id: 0, date: element3.date, things: {}, range: 1 })
            }

            if (todayThingsGroups.length > 0) {
                todayThings.push({ id: 1, time: element.timePeriod, date: element3.date, things: todayThingsGroups, range: curRange })
            }
        }

        if (todayThings.length == 0) {
            todayThings.push({ id: 0, date: selLittleYMDateRef.value, things: {}, range: 1 })
        }


        monthsThingsRef.value.push({
            time: element.timePeriod_tw,
            newThings: weekThings
        })
        todayThingsRef.value.push({
            time: element.timePeriod_tw,
            newThings: todayThings
        })


    }
    //刪除合併後多餘的儲存格
    for (let i = monthsThingsRef.value.length - 1; i > -1; i--) {
        const element = monthsThingsRef.value[i];
        for (let j = element.newThings.length - 1; j > -1; j--) {
            const element2 = element.newThings[j];
            if (element2.range > 1) {
                for (let l = 1; l < element2.range; l++) {
                    monthsThingsRef.value[i + l].newThings.splice(j, 1);
                }
            }
        }
    }


    delete months.value[0];
    var selWeek = months.value[1].date
    var selWeekYear = selWeek.split('-')[0]
    var selWeekMonth = selWeek.split('-')[1]
    todayDate.value = selWeekYear + '    ' + selWeekMonth + '月';
}
/**
 * 处理日期
 * @param date
 * @param n
 * @returns {*}
 */
function addDate(date: any, n: any) {
    date.setDate(date.getDate() + n);
    return date;
}
// 日期格式处理
function formatDate(date: any) {
    var year = date.getFullYear();
    let curmonths = date.getMonth() + 1;

    var month = (curmonths < 10 ? '0' + curmonths : curmonths).toString();

    var day = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()).toString();
    return {
        year,
        month,
        day
    }
}

function resetApptTable() {
    dealDate(new Date())
}
/**
* 获取当天日期
*/
function getCurDay2() {
    let datetime = new Date();
    let year = datetime.getFullYear();
    let month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    let date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    // selLittleYMDateRef.value = year + '-' + month + '-' + date
    return `${year}-${month}-${date}`
}
/**
 * 显示当天日期状态
 * @param date
 */
function dealDate(date: any) {
    months.value = ['']
    getWeek(date);
    let newcurDate = getCurDay2()
    months.value.forEach((item: { isCurDate: boolean; date: string; }) => {
        item.isCurDate = item.date === newcurDate
    })
}
/**上周 */
function getLastWeek() {
    dealDate(addDate(curDate.value, -7));
}
/**下周 */
function getNextWeek() {
    dealDate(addDate(curDate.value, 7));
}
let selLittleYMDateRef = ref('');
/**指定日期 */
function getSelectWeek(date: any) {
    setSelectdate();
    let newDate = new Date(currentYear.value, currentMonth.value + 0, currentDayValue.value + 1);
    dealDate(newDate);
}

function setSelectdate() {
    let m = (currentMonth.value + 1) < 10 ? '0' + (currentMonth.value + 1) : (currentMonth.value + 1)
    selLittleYMDateRef.value = currentYear.value + '-' + m + '-' + (currentDayValue.value + 1)
}

let oldSelList: any = null
/**
     * 点击查看详情
     * @param row
     */
function handleDetail(row: any) {
    // 0:未點選 1:完成 99:點選
    showCourseDetail = true;
    if (row.state != 1) {
        if (oldSelList && oldSelList.id != row.id) {
            oldSelList.state = 0
            row.state = 99
            oldSelList = row;
        } else if (oldSelList && oldSelList.id == row.id) {
            if (row.state == 0) {
                row.state = 99
                oldSelList = row;
            } else {
                row.state = 0
                oldSelList = null
                resetAddReserveForm();
            }
        } else {
            row.state = 99
            oldSelList = row;
        }
    }
}

//---------------------------日曆

let title = ["日", "一", "二", "三", "四", "五", "六"];
let currentDay = ref(new Date().getDate());
let currentMonth = ref(new Date().getMonth());
let currentYear = ref(new Date().getFullYear());
let currentDayValue = ref(new Date().getDate() - 1);
let selMonthDay = ref(true);
let selDate = ref(new Date().getFullYear() + " - " + (new Date().getMonth() + 1));

//显示：8月
let currentMonthChinese = computed(() => {
    return new Date(currentYear.value, currentMonth.value).toLocaleString(
        "default",
        { month: "short" }
    );
})
//這個月
let currentDays = computed(() => {
    // Date中的月份是从0开始的
    return new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
})
//插入上個月
let prevDays = computed(() => {
    let data = new Date(currentYear.value, currentMonth.value, 0).getDate();
    let num = new Date(currentYear.value, currentMonth.value, 1).getDay();
    var days = [];
    //num > 1 第一天是禮拜一
    while (num > 0) {
        days.push(data--);
        num--;
    }
    // 排序
    return days.sort();
})

function lastMonth() {
    // 点击上个月，若是0月则年份-1
    // 0是1月  11是12月
    if (currentMonth.value == 0) {
        currentYear.value -= 1;
        currentMonth.value = 11;
    } else {
        currentMonth.value--;
    }
    if (selDate.value == ((currentYear.value + " - " + (currentMonth.value + 1)))) selMonthDay.value = true
    else selMonthDay.value = false
}
function nextMonth() {

    if (currentMonth.value == 11) {
        currentYear.value++;
        currentMonth.value = 0;
    } else {
        currentMonth.value++;
    }
    if (selDate.value == ((currentYear.value + " - " + (currentMonth.value + 1)))) selMonthDay.value = true
    else selMonthDay.value = false
}

function onSelect(value: any) {
    currentDayValue.value = value;
    selDate.value = (currentYear.value + " - " + (currentMonth.value + 1));
    getSelectWeek(value);
    selMonthDay.value = true
}

function visibleChange(value: any) {

}

//新增預約表單-顯示
let showAddReserveForm = (state: boolean) => {
    showAddReserveFormRef.value = state;
    if (!state)
        resetAddReserveForm();
}

function resetAddReserveForm() {
    // customNameRef.value = '';
    // customPhoneRef.value = '';
    // selTimePeriodRef.value = null;
    // seldoctorRef.value = '未指定';
    // //重製鎖選課程
    // var chked: any = document.querySelectorAll("[type=checkbox]:checked");
    // for (var i = 0; i < chked.length; i++) {
    //     chked[i].checked = false
    // }
    selApptCourseIdRef.value = null;
    selAddMember.value = null;
    selTimePeriodRef.value = null;
}

function addAddReserveBtn() {
    showOkBtnRef.value = false;
    resetAddReserveForm()
    showAddReserveForm(true)
}

function changeWeekToday(state: boolean) {
    showWeekBoxRef.value = state;
}

let selApptCourseIdRef: any = ref(null)
let selAddMember: any = ref(null);
let selTimePeriodRef: any = ref(null)
function editAddReserveBtn() {
    if (oldSelList) {
        for (let i = 0; i < memberList.value.data.length; i++) {
            let element = memberList.value.data[i];
            if (element.userId == oldSelList.userId) {
                selAddMember.value = element;
            }
        }

        for (let i = 0; i < courseDataList.value.length; i++) {
            let element = courseDataList.value[i];
            if (element.lessonId == oldSelList.lessonId) {
                selApptCourseIdRef.value = element;
            }
        }

        for (let i = 0; i < timeGroup.length; i++) {
            let element = timeGroup[i];
            if (element + ':00' == oldSelList.timePeriod) {
                selTimePeriodRef.value = element;
            }
        }
        showOkBtnRef.value = true;
        showAddReserveForm(true)

    }
}

//刪除預約
let delReserveId = () => {
    if (oldSelList) {
        for (let i = 0; i < timePeriodList.value.length; i++) {
            let element = timePeriodList.value[i].things;
            for (let j = 0; j < element.length; j++) {
                let element2 = element[j];
                if (oldSelList.id == element2.id) {
                    timePeriodList.value[i].things.splice(j, 1)
                    break;
                }
            }
        }
        oldSelList = null;
    }
    resetApptTable();
}



//-------------------------------------------新增預約FORM
let showAddReserveFormRef = ref(false);
let showOkBtnRef = ref(false);

let customNameRef = ref('')
let customPhoneRef = ref('')
let seldoctorRef = ref('未指定')
let selLlist: any = [];
let timeGroup = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
let witerGroup = ['未指定', 'A治療師', 'B治療師', 'C治療師', 'D治療師'];
// let courseGroup = ['義式靜懿暖臀SPA', '收跨順腿芳香調理', '腹部塑型智能管理', '溫感砭石臀療SPA', '揉臀推腰芳香調理', '暖腹收腰芳香調理',
//     '纖腿翹臀排酸體雕', '臉部提拉撥筋SPA', '鬆背收胛芳香調理', '增肌豊臀震波脂雕', '美胸集中緊緻SPA', '沉浸式全身按摩', '美臀光感補水護理', '沉浸睡眠頭療SPA']


//選擇課程
let handleSelCourseType = (index: number, item: any) => {
    // selApptCourseIdRef=item.lessonId
}
//預約--確認
let confirmReserveForm = (btn: string) => {
    if (selAddMember.value == null || selApptCourseIdRef.value == null || !selTimePeriodRef.value == null) {
        console.log('輸入框不為空');
        showAddReserveForm(false)
        resetAddReserveForm()
        return
    };
    if (selAddMember.value == undefined || selApptCourseIdRef.value == undefined || !selTimePeriodRef.value == undefined) {
        console.log('輸入框不為空');
        showAddReserveForm(false)
        resetAddReserveForm()
        return
    };

    if (btn == 'add') {
        let nowTime = getCurDay2() + '  ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
        let addApptData = {
            bookingNo: "",
            userId: selAddMember.value.userId,
            lessonId: selApptCourseIdRef.value.lessonId,
            serverId: 0,
            dateBooking: selLittleYMDateRef.value + '  ' + selTimePeriodRef.value, //"2023-04-20T07:25:10.372Z",
            timer: 60,
            tradeDone: true,
            state: 0,
            price: selApptCourseIdRef.value.price,
            discount: 0,
            dateCreate: nowTime,
            bookingMemo: "string"
        }
        console.log(addApptData, '新增預約');

        //新增預約
        postAddApptDataApi(addApptData).then((res: any) => {
            //新增厚查詢
            getApptDataApi(selLittleYMDateRef.value.split('-')[0], selLittleYMDateRef.value.split('-')[1]).then((res: any) => {
                resetApptTable();
            }).catch((error) => {
                console.log(error, "error");
            });
        }).catch((error) => {
            console.log(error, "error");
        });

    } else if (btn = 'edit' && oldSelList) {
        // for (let i = 0; i < timePeriodList.value.length; i++) {
        //     let element = timePeriodList.value[i];
        //     for (let j = 0; j < element.things.length; j++) {
        //         let element2 = element.things[j];
        //         if (oldSelList.id == element2.id) {
        //             element2.timePeriod = selTimePeriodRef.value;
        //             element2.name = selAddMember.value.nameView;
        //             element2.phone = selAddMember.value.phone;
        //             element2.course = selApptCourseIdRef.value.nameTw
        //             element2.state = 2;
        //         } else {
        //         }
        //     }
        // }

        let editApptDate = {
            bookingNo: oldSelList.id,
            userId: selAddMember.value.userId,
            lessonId: selApptCourseIdRef.value.lessonId,
            serverId: oldSelList.serverId,
            dateBooking: oldSelList.dateBooking.split('T')[0] + 'T' + selTimePeriodRef.value,
            timer: oldSelList.timer,
            tradeDone: oldSelList.tradeDone,
            state: oldSelList.state,
            price: oldSelList.price,
            discount: oldSelList.discount,
            dateCreate: oldSelList.dateCreate,
            bookingMemo: oldSelList.bookingMemo
        }

        //修改預約
        postEditApptDataApi(editApptDate).then((res: any) => {
            console.log();

        }).catch((error) => {

            console.log(error, "error");
        });
    }

    getApptInfpApi();
    // resetAddReserveForm()
    // resetApptTable();
    showAddReserveForm(false)
}
</script>

<style scoped lang="scss">
$borderCoder: #EAEDF2;

.container {
    >Header {
        // height: 9%;
    }

    height: 100%;
    width: 100%;

    .appointment_main {
        position: absolute;
        top: 83px;
        bottom: 0px;
        left: 208px;
        right: 0px;

        .appointment_box {
            // height: 100%;
            height: 92%;

            >.item-tab {
                display: flex;
                // height: 6%;
                left: 0%;
                height: 45px;

                >div {
                    display: flex;
                    width: 65.5%;
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
                    width: 20%;
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
                        color: #d8cac8
                    }

                    .noSelbtn {
                        background-color: #ffffff;
                        color: #d8cac8
                    }
                }
            }

            >div {
                position: relative;
                display: flex;
                height: 100%;
                width: 97%;
                // margin-left: 5%;
                margin-left: 1%;

                .week_main {
                    display: flex;
                    position: relative;
                    width: 100%;
                    height: 100%;

                    >div {
                        position: relative;
                        width: 100%;
                        height: 100%;
                        border: 1px solid #ddd;

                        .appointment_schedule {
                            position: relative;
                            display: flex;
                            align-items: center;
                            // justify-content: center;
                            top: 13px;
                            width: 96%;
                            height: 96%;
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
                                                background: #FF6200;
                                            }

                                            .has_not_started {
                                                background: #3291F8;
                                            }

                                            .is_expired {
                                                background: #8E8E93;
                                            }
                                        }
                                    }
                                }

                                .week_table {
                                    height: 93%;
                                    display: flex;
                                    flex-direction: column;

                                    .table_header {
                                        width: 100%;
                                        height: 10%;
                                        background: #e6e2de;
                                        display: flex;
                                        flex-direction: column;
                                        align-items: center;
                                        border-bottom: 1px solid $borderCoder;
                                        box-sizing: border-box;

                                        .table_date,
                                        .table_week {
                                            width: 100%;
                                            height: 90%;
                                            text-align: left;
                                            display: flex;
                                            justify-content: center;
                                            align-items: center;

                                            >span {
                                                flex: 1;
                                                // color: #000;
                                                height: 100%;
                                                // font-size: 14px;
                                                display: flex;
                                                justify-content: center;
                                                align-items: center;
                                                // font-weight: bold;
                                                display: flex;
                                                flex-direction: column;
                                                color: #b89087;

                                                .day_item {
                                                    // color: #db1f1f;
                                                    font-size: 22px;
                                                    justify-content: center;
                                                    align-items: center;
                                                    color: #b89087;
                                                    padding: 5px;
                                                }

                                                >span {
                                                    // color: #000;
                                                    font-size: 5px;
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
                                    }

                                    .weekTable_main {
                                        width: 100%;
                                        overflow: auto;
                                        padding-bottom: 0%;
                                        position: relative;
                                        display: flex;
                                        height: 100%;

                                        .Listinfotbody {
                                            display: flex;
                                            width: 100%;
                                            height: 100%;
                                            // height: 540px;
                                            // display: flex;

                                            // border: 1px solid #000000;
                                            >tbody {
                                                width: 100%;
                                                border: 3px gary solid;
                                                height: 100%;
                                                overflow-y: scroll;
                                                display: grid;
                                                table-layout: fixed;

                                                .timePeriod_col2 {
                                                    border-bottom: 1px solid #906e6c;

                                                    >td {
                                                        width: 10%;
                                                        color: #906e6c;
                                                        table-layout: fixed;

                                                        >span {
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

                                                    .timeGroup {
                                                        vertical-align: bottom;
                                                    }

                                                    .more_things {
                                                        display: flex;
                                                        width: 100%;
                                                    }

                                                    .one_things {
                                                        // display: contents;
                                                    }

                                                    .thing_group {
                                                        height: 100%;

                                                        .thing_item {
                                                            height: 100%;
                                                            flex: 1;
                                                            display: flex;
                                                            font-size: 14px;
                                                            flex-direction: column;
                                                            color: #906e6c;
                                                            border-radius: 10px;
                                                            cursor: pointer;
                                                            box-sizing: border-box;
                                                            border: 1px solid #000000;

                                                            >span {
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
                                                        }

                                                    }
                                                }
                                            }
                                        }

                                        .timePeriod_row {
                                            width: 100%;
                                            // min-height: 60px;
                                            height: 100%;
                                            // overflow-y: scroll;



                                            .timePeriod_col {
                                                width: 100%;
                                                // min-height: 60px;
                                                min-height: 10%;
                                                display: flex;

                                                .timePeriod {
                                                    width: 12.5%;
                                                    display: flex;
                                                    justify-content: center;
                                                    align-items: center;
                                                    border-left: 1px solid $borderCoder;
                                                    border-bottom: 1px solid $borderCoder;
                                                    box-sizing: border-box;
                                                }

                                                .row_day {
                                                    width: 87.5%;
                                                    display: flex;
                                                    justify-content: center;

                                                    .things2 {
                                                        flex: 1;
                                                        display: flex;
                                                        flex-direction: column;
                                                        align-items: center;
                                                        // border-left: 1px solid $borderCoder;
                                                        // border-bottom: 1px solid $borderCoder;
                                                        border: 1px solid #000000;
                                                        box-sizing: border-box;

                                                        &:last-child {
                                                            border-right: 1px solid $borderCoder;
                                                        }

                                                        .thing_item2 {
                                                            flex: 1;
                                                            display: flex;
                                                            font-size: 14px;
                                                            flex-direction: column;
                                                            justify-content: space-around;
                                                            color: #906e6c;
                                                            background: #ffffff;
                                                            min-height: 90px;
                                                            border-radius: 10px;
                                                            margin: 2% 1%;
                                                            padding: 1% 2%;
                                                            cursor: pointer;
                                                            box-sizing: border-box;
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
                        width: 15%;
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
                    width: 90%;
                    height: 100%;
                    border: 1px solid #ddd;
                    // min-width: 900px;

                    .date_schedule {
                        position: relative;
                        top: 0px;
                        display: flex;
                        align-items: center;
                        top: 25px;
                        width: 95%;
                        height: 92%;
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
                                height: 40px;
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
                                height: 93%;
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
                                            // border: 1px solid #906e6c;
                                            border-bottom: 1px solid #906e6c;
                                            height: 10%;

                                            >td {
                                                width: 1px;
                                                // border: 1px solid #000000;
                                                color: #906e6c;

                                            }

                                            .time_row {
                                                width: 20%;
                                            }


                                            .more_things {
                                                display: flex;
                                                width: 100%;
                                            }

                                            .one_things {
                                                // display: contents;
                                            }

                                            .thing_group {
                                                // height: 100%;
                                                height: 0px;


                                                .thing_item {
                                                    height: 100%;
                                                    flex: 1;
                                                    display: flex;
                                                    font-size: 14px;
                                                    flex-direction: column;
                                                    // justify-content: space-around;
                                                    color: #906e6c;
                                                    background: #ffffff;
                                                    border-radius: 10px;
                                                    cursor: pointer;
                                                    box-sizing: border-box;
                                                    border: 1px solid #000000;

                                                    >span {
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
                                // width: 300px;
                                // height: 300px;
                                width: 100%;
                                height: 55%;
                                // margin: 10 auto;
                                // border: solid 1px #707070;

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
                                        text-align: right
                                    }

                                    .arrow-left {
                                        color: #b89087;
                                        text-align: left
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
                                    margin-top: 12px;
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
                                    }

                                    >th:nth-child(2) {
                                        width: 30%;
                                    }

                                    >th:nth-child(3) {
                                        width: 20%;
                                    }

                                    >th:nth-child(4) {
                                        width: 10%;
                                    }

                                    >th {
                                        // border: solid 1px #707070; //格線
                                        flex-wrap: nowrap;
                                        padding: 2px 0px 2px 0px;
                                        // width: 100%;

                                        >img {
                                            width: 40px;
                                            height: 40px;
                                            border-radius: 45px;
                                        }

                                        >p {
                                            margin: 3px 5px;
                                        }

                                        >button {
                                            background-color: transparent;
                                            border: none;
                                        }

                                    }

                                    >input {
                                        width: 100px;
                                        display: inline;
                                        float: right;
                                        margin-top: 10px;
                                        margin-right: 10px;
                                        // padding: 0 10px;
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

                                    >td:nth-child(1) {
                                        width: 20%;
                                    }

                                    >td:nth-child(2) {
                                        width: 30%;
                                    }

                                    >td:nth-child(3) {
                                        width: 20%;
                                    }

                                    >td:nth-child(4) {
                                        width: 10%;
                                    }

                                    >td {
                                        // border: solid 1px #707070; //格線
                                        height: 47px;
                                        padding: 2px;
                                        position: relative;
                                        table-layout: fixed;

                                        >img {
                                            width: 20px;
                                            height: 40px;
                                            // padding: 0 20px;
                                            // border-radius: 45px;
                                        }

                                        >p {
                                            margin: 3px 5px;
                                        }

                                        >button {
                                            background-color: transparent;
                                            border: none;
                                            display: inline;
                                            float: right;
                                            margin-right: 15px;
                                        }

                                        .checked_state {
                                            width: 27px;
                                            height: 27px;
                                            display: flex;
                                            justify-content: center;
                                            // margin: 43px 329px 30px 123.5px;
                                            object-fit: contain;
                                        }

                                        .checked_state:checked::after {
                                            content: "✓";
                                            color: #fff;
                                            font-size: 36px;
                                            line-height: 27px;
                                            font-weight: bold;
                                            background-color: #84715c;
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

.add-reserve-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 54%;

    background-color: #faf9f8;
    border-radius: 10px;
    padding: 15px 15px 15px 15px;
    border: solid 1px #000000;

    .basic_info_main {
        display: flex;

        .basic_info_item {
            padding: 8px 8px 8px 8px;

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
        // font-weight: bold;
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

.isCurDate {
    color: #d7cac9 !important;
    background-color: #8b6f6d !important;
    border-radius: 99em;

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
    color: #9CADADB7;
    box-sizing: border-box;
}

.form_bg {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.5);
}
</style>