<template>
    <div class="container">
        <Header :Icon="Icon" :moduleType="'預約紀錄'"></Header>
        <div class="appointment_main">
            <div class="item-tab">
                <button :class='mainTabIndexRef == index ? "active" : ""' v-for="(item, index) in mainTypeDataRef"
                    :key="item.id" v-on:click="changeMainTab(index)">{{ item.title }} </button>
            </div>
            <div class="appointment_box">
                <div class="appointment_schedule" v-show="mainTabIndexRef == 0">
                    <div class="appointment_week">
                        <div class="week-top">
                            <div class="btn_wrap">
                                <div class="dateBox_title">
                                    <div class="arrow arrow-left" @click="getLastWeek()">&lt;&lt;</div>
                                    <!-- <span @click="getCurWeek">本周</span> -->
                                    <span class="todayDate">{{ todayDate }} </span>
                                    <div class="arrow arrow-right" @click="getNextWeek()">>></div>
                                </div>
                            </div>
                        </div>
                        <div class="week_table">
                            <div class="table_header">
                                <div class="table_week">
                                    <template v-for="(item, index) of weeks">
                                        <span class="first" v-if="index === 0" :key="index">
                                            {{ item }}
                                            <i class="el-icon-edit"></i>
                                        </span>
                                        <span v-else :key="index + 0">{{ item }}</span>
                                    </template>
                                </div>
                                <div class="table_date">
                                    <template v-for="(item, index) of months">
                                        <span class="first" v-if="index === 0" :key="index">
                                            {{ }}
                                        </span>
                                        <span v-else :key="index + 0">
                                            <span class="day_item" :class="{ 'isCurDate': item && item.isCurDate }">
                                                <!-- {{ `${item && item.isCurDate ? item && item.showDate + '(今天)' || '' : item && item.showDate || ''}` }} -->
                                                {{ `${item && item.isCurDate ? item && item.showDate + '(今天)' || '' : item
                                                    &&
                                                    item.showDate
                                                    || ''}` }}
                                            </span>
                                        </span>
                                    </template>
                                </div>
                            </div>
                            <div class="timePeriodList">
                                <ul class="timePeriod_row">
                                    <!--循环时段，看时段有多少个-->
                                    <template v-if="timePeriodList.length > 0">
                                        <li class="timePeriod_col" v-for="(period, p_index) in timePeriodList"
                                            :key="`period${p_index}`">
                                            <!--第一列显示时段-->
                                            <div class="timePeriod"> {{ period.timePeriod_tw }}</div>
                                            <!-- 后面显示周一到周日的计划-->
                                            <div class="row_day">
                                                <!-- 循环显示每周的日期-->
                                                <template v-for="(month, m_index) of months">
                                                    <!-- v-if="month" 去除数据处理的时候移除数组第一个为empty的问题-->
                                                    <div v-if="month" :key="`month${m_index}`" class="things">
                                                        <!-- 循环每个时间段的计划-->
                                                        <template v-for="(thing, t_index) of period.things">
                                                            <!-- 根据日期和计划的日期匹配 显示 然后根据状态显示进行中 已过期 未开始-->
                                                            <div v-if="thing.date === month.date" :key="`thing${t_index}`"
                                                                class="thing_item" @click="handleDetail(thing)"
                                                                :class="{ 'finish': thing.status === 3, 'waiting': thing.status === 1, 'seldated': thing.status === 2 }">
                                                                <span>{{ thing.timePeriod }}</span>
                                                                <span>{{ thing.name }}</span>
                                                                <span>{{ thing.course }}</span>
                                                                <!-- <span>值班员：{{ thing.watchman }}</span>
                                                        <span>地点：{{ thing.place }}</span> -->
                                                            </div>
                                                        </template>

                                                    </div>
                                                </template>
                                            </div>
                                        </li>
                                    </template>
                                    <div class="noMore" v-else><span>暂无数据</span></div>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="date_main">
                        <div class="dateBox">
                            <div class="dateBox_title">
                                <div class="arrow arrow-left" @click="prev()">&lt;&lt;</div>
                                <div class="data">{{ currentYear }}-{{ currentMonthChinese }}</div>
                                <div class="arrow arrow-right" @click="next()">>></div>
                            </div>
                            <div class="dateBox_content">
                                <div class="row title">
                                    <span v-for="item in title" :key="item">{{ item }}</span>
                                </div>
                                <div class="row content ">
                                    <span class="prevDay" v-for="item in prevDays" :key="'A' + item">{{ item }}</span>
                                    <!-- <template> -->
                                    <span class="thisDay" :class='currentDayValue == index && selMonthDay ? "active" : ""'
                                        v-for="(item, index) in currentDays" :key="item" v-on:click="onSelect(index)">{{
                                            item
                                        }}</span>
                                    <!-- </template> -->
                                </div>
                            </div>
                        </div>
                        <div class="list_btn">
                            <div class="btn_add" @click="addAddReserveBtn()">新增預約</div>
                            <div class="btn_add" @click="editAddReserveBtn()">修改預約</div>
                            <div class="btn_add" @click="delReserveId()">刪除預約</div>
                        </div>
                    </div>

                    <div id="ck1" v-show="showAddReserveFormRef">
                        <div class="add-reserve-form">
                            <div class="basic_info_main">
                                <div class="basic_info_item">
                                    <p>姓名</p>
                                    <input v-model="customNameRef" />
                                </div>
                                <div class="basic_info_item">
                                    <p>電話</p>
                                    <input v-model="customPhoneRef" />
                                </div>
                                <div class="basic_info_item">
                                    <p>選擇時段</p>
                                    <div class="news-filter">
                                        <select name="name" id="" v-model="selTimePeriodRef">
                                            <option v-for="(item) in timeGroup" :key="item" :value="item">{{ item }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="basic_info_item">
                                    <!-- <p>指定芳療師</p>
                            <div class="news-filter">
                                <select name="name" v-model="seldoctorRef">
                                    <option v-for="(item) in witerGroup" :key="item" :value="item">{{ item }}</option>
                                </select>
                            </div> -->
                                </div>
                            </div>
                            <p>選擇課程</p>
                            <div>
                                <div>
                                    <label v-for="(item, index) in courseGroup" :key="item">
                                        <input class="add-reserve-btn2" type="checkbox" :value="item"
                                            v-on:click="handleSelCourseType(index, item)" />
                                        <span value={{{item}}} name='item'>{{ item
                                        }}</span>
                                    </label>

                                </div>
                            </div>
                            <div class="row">
                                <button class="confirm-reserve-btn" v-show="!showOkBtnRef"
                                    @click="confirmReserveForm('add')">確認</button>
                                <button class="confirm-reserve-btn" v-show="showOkBtnRef"
                                    @click="confirmReserveForm('edit')">修改</button>
                                <button class="confirm-reserve-btn" @click="showAddReserveForm(false)">取消</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="appointment_list" v-show="mainTabIndexRef == 1">
                    <!-- <div class="table_title">
                        <p>客戶(全部個)</p>
                        <input v-model="searchList" />
                    </div> -->
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
                            <!-- </table>
                        <table class="table_main"> -->
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
                                        <!-- <p>{{ item.status }}</p> -->
                                        <input class="checked_status" type="checkbox" name="sub" value=""
                                            :checked="item.status == 3" v-on:click="changeStutusFn(index, item.id)">
                                    </td>
                                    <td>
                                        <button v-on:click="handleDelete(index, item.id)"><img :src="DeleteIcon" /></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" >
import DeleteIcon from '@/assets/Icon material-delete.svg';
import Icon from '@/assets/Icon zocial-guest.svg';

let searchList = ref('')
let mainTabIndexRef = ref(0);
let aptTitle = reactive(['預約時間', '預約項目', '顧客', '已完成']);

let datetime = new Date();
let year = datetime.getFullYear();
let month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
let date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
let nowdatetime = `${year}-${month}-${date}`

let filterAptData: any = computed(() => {
    let curAptData: any = [];
    for (let i = 0; i < timePeriodList.length; i++) {
        let element = timePeriodList[i].things;
        for (let j = 0; j < element.length; j++) {
            let element2 = element[j];
            if (!searchList.value || element2.course.toLowerCase().includes(searchList.value.toLowerCase())) {
                curAptData.push(element2);

            }
        }
    }
    return curAptData;
})


let mainTypeDataRef = ref([
    {
        id: 1,
        title: '預約排成'
    },
    {
        id: 2,
        title: '預約列表'
    },
]);
let weeks = ['时段', '周日', '周一', '周二', '周三', '周四', '周五', '周六',]
let timePeriodList = reactive([
    {
        timePeriod_tw: '上午10點',
        timePeriod: '10:00',
        things: [
            {
                id: 1,
                timePeriod: '10:00',
                date: '2023-04-19',
                name: '顧客A',
                phone: '0000000000',
                course: '腹部塑型智能管理',
                status: 1,
            },
            {
                id: 2,
                date: '2023-04-20',
                timePeriod: '10:00',
                name: '顧客B',
                phone: '0000000000',
                course: '義式靜懿暖臀SPA',
                status: 1,
            },
            {
                id: 3,
                date: '2023-04-21',
                timePeriod: '10:00',
                name: '顧客C',
                phone: '0000000000',
                course: '鬆背收胛芳香調理',
                status: 1,
            }

        ]
    },
    {
        timePeriod_tw: '上午11點',
        timePeriod: '11:00',
        things: [
            {
                id: 4,
                timePeriod: '11:00',
                date: '2023-04-19',
                name: '顧客D',
                phone: '0000000000',
                course: '鬆背收胛芳香調理',
                status: 1,
            },
            // {
            //     id: 4,
            //     timePeriod: '11:00',
            //     date: '2023-04-19',
            //     name: '顧客D',
            //     phone: '0000000000',
            //     course: '鬆背收胛芳香調理',
            //     status: 1,
            // },
            {
                id: 5,
                date: '2022-01-18',
                timePeriod: '11:00',
                name: '顧客E',
                phone: '0000000000',
                course: '腹部塑型智能管理',
                status: 1,
            },
            {
                id: 6,
                date: '2023-04-17',
                timePeriod: '11:00',
                name: '顧客D',
                phone: '0000000000',
                course: '暖腹收腰芳香調理',
                status: 3,
            }

        ]
    },
    {
        timePeriod_tw: '下午12點',
        timePeriod: '12:00',
        things: [
            {
                id: 7,
                timePeriod: '12:00',
                date: '2023-04-19',
                name: '顧客A',
                phone: '0000000000',
                course: '腹部塑型智能管理,腹部塑型智能管理',
                status: 1,
            },
            {
                id: 8,
                date: '2023-04-18',
                timePeriod: '12:00',
                name: '顧客B',
                phone: '0000000000',
                course: '義式靜懿暖臀SPA',
                status: 1,
            },
            {
                id: 9,
                date: '2023-04-17',
                timePeriod: '12:00',
                name: '顧客D',
                phone: '0000000000',
                course: '腹部塑型智能管理',
                status: 3,
            }
        ]
    },
    {
        timePeriod_tw: '下午13點',
        timePeriod: '13:00',
        things: [
        ]
    },
    {
        timePeriod_tw: '上午14點',
        timePeriod: '14:00',
        things: [
        ]
    },
    {
        timePeriod_tw: '下午15點',
        timePeriod: '15:00',
        things: [
        ]
    },
    {
        timePeriod_tw: '下午16點',
        timePeriod: '16:00',
        things: [
        ]
    },
    {
        timePeriod_tw: '下午17點',
        timePeriod: '17:00',
        things: [
        ]
    },
    {
        timePeriod_tw: '下午18點',
        timePeriod: '18:00',
        things: [
        ]
    }
])
let todayDate = ref('');
let months: any = ref(['']);
let curDate: any = ref();
let nowDate = new Date();
let showCourseDetail = false;

let changeMainTab = (index: number) => {
    mainTabIndexRef.value = index;
}
onMounted(() => {
    getCurWeek();
    // settable();
});
function settable() {
    // let contentSum = "";
    // for (let i = 0; i < 16; i++) {
    //     var content = '<tr>'
    //         + '<td class="per10">' + i + '</td>'
    //         + '<td class="per10">BBB</td>'
    //         + '<td class="per20">CCCcontent</td>'
    //         + '<td class="per10">DDD</td>'
    //         + '<td class="per40">EEEBigbig</td>'
    //         + '<td class="per10">FFFXXX</td>'
    //         + '</tr>';
    //     contentSum += content;
    // }
    // //$('#content').html(contentSum);
    // // document.getElementById('content').innerHTML = contentSum;
    // let cal: any = document.getElementById('content')!;
    // cal.innerHTML = contentSum;
}
//刪除課程
let handleDelete = (index: number, itemId: number) => {
    for (let i = 0; i < timePeriodList.length; i++) {
        let element = timePeriodList[i].things;
        for (let j = 0; j < element.length; j++) {
            let element2 = element[j];
            if (itemId === element2.id) {
                timePeriodList[i].things.splice(i, 1);
            }
        }
    }
}
//改變課程狀態
let changeStutusFn = (index: number, itemId: number) => {
    for (let i = 0; i < timePeriodList.length; i++) {
        let element = timePeriodList[i].things;
        for (let j = 0; j < element.length; j++) {
            let element2 = element[j];
            if (itemId === element2.id) {
                if (element2.status == 3)
                    timePeriodList[i].things[j].status = 0;
                else
                    timePeriodList[i].things[j].status = 3;
            }
        }
    }
}
/**
 * 获取 时间
 * @param time
 */
function getWeek(time: any) {
    //計算禮拜幾 (Sunday - Saturday : 0 - 6)
    let week = time.getDay();
    //處理算出禮拜一
    time = addDate(time, week * -1);
    console.log(time, 'time');

    curDate.value = new Date(time);

    for (let i = 0; i < 7; i++) {
        let { year, month, day } = formatDate(i === 0 ? time : addDate(time, 1))
        months.value.push({
            date: `${year}-${month}-${day}`,
            //   showDate: `${month}-${day}`
            showDate: `${day}`
        })
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

function getCurWeek() {
    dealDate(new Date())
}
/**
* 获取当天日期
*/
function getCurDay2() {
    var datetime = new Date();
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
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
/**指定日期 */
function getSelectWeek(date: any) {
    let newDate = new Date(currentYear.value, currentMonth.value + 0, currentDayValue.value + 1);
    dealDate(newDate);
}
let oldSelList: any = null
/**
     * 点击查看详情
     * @param row
     */
function handleDetail(row: any) {
    // 1:未點選 3:完成 2:點選
    showCourseDetail = true;
    if (row.status != 3) {
        if (oldSelList && oldSelList.id != row.id) {
            oldSelList.status = 1
            row.status = 2
            oldSelList = row;
        } else if (oldSelList && oldSelList.id == row.id) {
            if (row.status == 1) {
                row.status = 2
                oldSelList = row;
            } else {
                row.status = 1
                oldSelList = null
                resetAddReserveForm();
            }
        } else {
            row.status = 2
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

function prev() {
    // 点击上个月，若是0月则年份-1
    // 0是1月  11是12月
    if (currentMonth.value == 0) {
        currentYear.value -= 1;
        currentMonth.value = 11;
    } else {
        currentMonth.value--;
    }
    console.log(selDate.value, "next");
    if (selDate.value == ((currentYear.value + " - " + (currentMonth.value + 1)))) selMonthDay.value = true
    else selMonthDay.value = false
}
function next() {

    if (currentMonth.value == 11) {
        currentYear.value++;
        currentMonth.value = 0;
    } else {
        currentMonth.value++;
    }

    console.log(selDate.value, "next");
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
    console.log(value);

}

//新增預約
let showAddReserveForm = (state: boolean) => {
    showAddReserveFormRef.value = state;
}

function resetAddReserveForm() {
    customNameRef.value = '';
    customPhoneRef.value = '';
    selTimePeriodRef.value = '';
    seldoctorRef.value = '未指定';
    //重製鎖選課程
    var chked: any = document.querySelectorAll("[type=checkbox]:checked");
    for (var i = 0; i < chked.length; i++) {
        chked[i].checked = false
    }
}

function addAddReserveBtn() {
    showOkBtnRef.value = false;
    resetAddReserveForm()
    showAddReserveForm(true)
}

function editAddReserveBtn() {
    console.log(oldSelList);

    if (oldSelList) {
        customNameRef.value = oldSelList.name;
        customPhoneRef.value = oldSelList.phone;
        selTimePeriodRef.value = oldSelList.timePeriod;
        seldoctorRef.value = '未指定';
        //重製鎖選課程
        var chked: any = document.querySelectorAll("[type=checkbox]");
        for (var i = 0; i < chked.length; i++) {
            if (oldSelList.course.indexOf(chked[i].value) > -1)
                chked[i].checked = true
        }
        showOkBtnRef.value = true;
        showAddReserveForm(true)
    }
}

//新增預約
let delReserveId = () => {
    if (oldSelList) {
        for (let i = 0; i < timePeriodList.length; i++) {
            let element = timePeriodList[i].things;
            for (let j = 0; j < element.length; j++) {
                let element2 = element[j];
                if (oldSelList.id == element2.id) {
                    timePeriodList[i].things.splice(j, 1)
                    break;
                }
            }
        }
        oldSelList = null;
    }
}



//-------------------------------------------新增預約FORM
let showAddReserveFormRef = ref(false);
let showOkBtnRef = ref(false);

let customNameRef = ref('')
let customPhoneRef = ref('')
let selTimePeriodRef = ref('')
let seldoctorRef = ref('未指定')
let selLlist: any = [];
let timeGroup = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
let witerGroup = ['未指定', 'A治療師', 'B治療師', 'C治療師', 'D治療師'];
let courseGroup = ['義式靜懿暖臀SPA', '收跨順腿芳香調理', '腹部塑型智能管理', '溫感砭石臀療SPA', '揉臀推腰芳香調理', '暖腹收腰芳香調理',
    '纖腿翹臀排酸體雕', '臉部提拉撥筋SPA', '鬆背收胛芳香調理', '增肌豊臀震波脂雕', '美胸集中緊緻SPA', '沉浸式全身按摩', '美臀光感補水護理', '沉浸睡眠頭療SPA']



//選擇課程
let handleSelCourseType = (index: number, itemId: any) => {


}
//預約--確認
let confirmReserveForm = (btn: string) => {

    //計算所選課程
    let curCourse = '';
    var chked: any = document.querySelectorAll("[type=checkbox]:checked");
    for (var i = 0; i < chked.length; i++) {
        selLlist.push(chked[i].value);
        curCourse += chked[i].value
        curCourse += ' , '
    }
    if (btn == 'add') {
        //計算新的id
        let oldTimePeriodListId: number = NaN
        for (let i = 0; i < timePeriodList.length; i++) {
            let element = timePeriodList[i].things;
            for (let j = 0; j < element.length; j++) {
                let element2 = element[j];
                if (oldTimePeriodListId) {
                    if (oldTimePeriodListId < element2.id)
                        oldTimePeriodListId = element2.id
                } else {
                    oldTimePeriodListId = element2.id
                }
            }
        }

        //計算時間
        let mmm = (currentMonth.value + 1) < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
        let seldd = currentYear.value + '-' + mmm + '-' + (currentDayValue.value + 1)
        //加入
        for (let i = 0; i < timePeriodList.length; i++) {
            let element = timePeriodList[i];
            if (element.timePeriod == selTimePeriodRef.value) {
                timePeriodList[i].things.push({
                    id: oldTimePeriodListId + 1,
                    date: seldd,
                    timePeriod: selTimePeriodRef.value,
                    name: customNameRef.value,
                    phone: customPhoneRef.value,
                    course: curCourse,
                    status: 1,
                })
            }
        }
    } else if (btn = 'edit' && oldSelList) {
        //計算新的id
        let oldTimePeriodListId: number = NaN
        for (let i = 0; i < timePeriodList.length; i++) {
            let element = timePeriodList[i].things;
            for (let j = 0; j < element.length; j++) {
                let element2 = element[j];
                if (oldSelList.id == element2.id) {
                    element2.timePeriod = selTimePeriodRef.value;
                    element2.name = customNameRef.value;
                    element2.phone = customPhoneRef.value;
                    element2.course = curCourse;
                    element2.status = 1;
                } else {
                }
            }
        }
    }

    showAddReserveForm(false)
    resetAddReserveForm()
}
</script>

<style scoped lang="scss">
$borderCoder: #EAEDF2;

.container {
    height: 100%;
    width: 100%;

    .appointment_main {
        position: relative;
        top: 0px;
        margin: 0 auto;
        height: 85%;
        margin: 2px 40px;
        // min-width: 1000px;

        >.item-tab {
            display: flex;
            height: 5.5%;

            >button {
                justify-content: center;
                align-items: center;
                border: none;
                // width: 120px;
                height: 45px;
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

            .addcoursetype-btn {
                // display: flex;
                justify-content: center;
                // flex: 1;
                text-align: right;
            }
        }

        .appointment_box {
            position: relative;
            width: 100%;
            height: 94.5%;
            border: 1px solid #ddd;
            min-width: 900px;

            // background: #e6e2de;
            .appointment_schedule {
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
                // padding: 7px 11px 6px;



                .appointment_week {
                    width: 100%;
                    min-width: 600px;
                    height: 100%;
                    padding: 1%;
                    box-sizing: border-box;

                    .week-top {
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        width: 100%;
                        height: 40px;
                        padding: 0 1%;

                        .btn_wrap {
                            width: 100%;
                            display: flex;
                            justify-content: space-around;
                            color: #409EFF;

                            span {
                                cursor: pointer;
                                // display: flex;
                                justify-content: center;
                                align-items: center;
                                font-size: 15px;
                            }


                            .dateBox_title {
                                display: flex;
                                width: 100%;
                                // height: 40px;
                                // line-height: 40px;
                                text-align: center;
                                cursor: pointer;

                                .arrow {
                                    width: 50px;
                                    height: 100%;
                                    color: #b89087;
                                }

                                .data {
                                    font-size: 20px;
                                    color: #409EFF;
                                }

                                .todayDate {
                                    font-weight: bold;
                                    font-size: 16px;
                                    cursor: default;
                                    color: #b89087;

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
                        height: 95%;
                        display: flex;
                        flex-direction: column;

                        .table_header {
                            width: 100%;
                            height: 80px;
                            background: #EAEDF2;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            border-bottom: 1px solid $borderCoder;
                            box-sizing: border-box;

                            .table_date,
                            .table_week {
                                width: 100%;
                                height: 40px;
                                text-align: left;
                                display: flex;
                                justify-content: center;
                                align-items: center;

                                span {
                                    flex: 1;
                                    color: #000;
                                    height: 100%;
                                    font-size: 14px;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    font-weight: bold;

                                    .day_item {
                                        // color: #db1f1f;
                                        font-size: 14px;
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
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

                        .timePeriodList {
                            width: 100%;
                            overflow: auto;
                            padding-bottom: 0%;

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

                                        .things {
                                            flex: 1;
                                            display: flex;
                                            flex-direction: column;
                                            align-items: center;
                                            border-left: 1px solid $borderCoder;
                                            border-bottom: 1px solid $borderCoder;
                                            box-sizing: border-box;

                                            &:last-child {
                                                border-right: 1px solid $borderCoder;
                                            }

                                            .thing_item {
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
                                                background: #fbff00;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }



                .date_main {
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
                                height: 100%;
                                color: #b89087;
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

                .add-reserve-form {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 76%;

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
                                color: #875959;
                            }

                            >input {
                                // width: 10%;
                                height: 35px;
                                border: solid 1px #707070;
                                background-color: #fff;
                                border-radius: 10px;
                            }

                        }


                        .news-filter select {
                            height: 40px;
                            width: 200px;
                            font-size: 20px;
                            padding: 7px 7.7px 6px 9px;
                            border-radius: 10px;
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
                        // height: 45px;
                        line-height: 45px;
                        justify-content: space-between;
                        margin: 5px 5px 5px 5px;
                        // padding: 5px 5px 5px 5px;
                        text-align: center;
                        vertical-align: middle;
                        border-radius: 10px;

                        font-size: 20px;
                        // font-weight: bold;
                        background-color: #fff;
                        color: #d8cac8;
                        cursor: pointer;



                        display: inline-block;
                        border: 2px solid #707070;
                        user-select: none;
                        /* 防止文字被滑鼠選取反白 */
                    }

                    .add-reserve-btn2:checked+span {
                        // color: yellow;
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
                    // display: flex;
                    color: #717171;
                    // border: solid 1px #707070;


                    .table_main {
                        width: 100%;
                        font-weight: bold;
                        // border: "1px solid";

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
                                height: 47px;
                                table-layout: fixed; //core code

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
                            // width: 100%;
                            // position: relative;

                            //滾動
                            display: block;
                            width: 700;
                            height: 655px;
                            overflow-y: scroll;



                            >tr {
                                // border: solid 1px #707070; //格線
                                border-bottom: 2px solid rgba(112, 112, 112, 0.5);
                                display: table;
                                width: 100%;
                                table-layout: fixed;
                                text-align: left; //If disabled, default align central

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
                                    }

                                    .checked_status {
                                        width: 27px;
                                        height: 27px;
                                        display: flex;
                                        justify-content: center;
                                        // margin: 43px 329px 30px 123.5px;
                                        object-fit: contain;
                                    }

                                    .checked_status:checked::after {
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

.isCurDate {
    color: #FF2525 !important;
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
</style>