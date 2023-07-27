<script setup lang="ts">
import Alert from "@/components/alertCmpt";
import { showHttpsStatus, showErrorMsg } from "@/types/IMessage";
import { storeToRefs } from "pinia";
import { useManagerStore } from "@/stores/manager";
import { useCounterStore } from "@/stores/counter";
const counterStore = useCounterStore();
const { handLogOut } = counterStore;
const managerStore = useManagerStore();
const { getWorkingDefault, submitWorkingDefault } = managerStore;
const { workingHoursList, } = storeToRefs(managerStore);
const managerActive: any = ref("");
const title = ref("人員快速排班");
let weeks = ["週日", "週一", "週二", "週三", "週四", "週五", "週六", "休息時間"];
const workingDefaultList: any = reactive({ data: [] });
const timeDefault = [
  {
    "workingHoursId": 0,
    "week": 0,
    "dayOn": "09:00",
    "dayOff": "18:00",
    "times": 540,
    "restTime": []
  },
  {
    "workingHoursId": 0,
    "week": 1,
    "dayOn": "09:00",
    "dayOff": "18:00",
    "times": 540,
    "restTime": [

    ]
  },
  {
    "workingHoursId": 0,
    "week": 2,
    "dayOn": "09:00",
    "dayOff": "18:00",
    "times": 540,
    "restTime": [

    ]
  },
  {
    "workingHoursId": 0,
    "week": 3,
    "dayOn": "09:00",
    "dayOff": "18:00",
    "times": 540,
    "restTime": [

    ]
  },
  {
    "workingHoursId": 0,
    "week": 4,
    "dayOn": "09:00",
    "dayOff": "18:00",
    "times": 540,
    "restTime": [

    ]
  },
  {
    "workingHoursId": 0,
    "week": 5,
    "dayOn": "09:00",
    "dayOff": "18:00",
    "times": 540,
    "restTime": [

    ]
  },
  {
    "workingHoursId": 0,
    "week": 6,
    "dayOn": "09:00",
    "dayOff": "18:00",
    "times": 540,
    "restTime": []
  }
];
const props = defineProps<{
  handQuicklyscheduleView: Function;
  requestWorkingHoursList: Function;
}>();
const handCheckBox = (item: any) => {
  if (item.dayOn == "") {
    item.dayOn = "09:00";
  } else {
    item.dayOn = "";
  }
}
const handAaddRestTime = (data: any) => {
  let restVal = {
    dayOff: "",
    dayOn: "",
    times: 0,
    ttrId: 0,
  }
  data.restTime.push(restVal);
}
const handDelRestTime = (data: any, index: any) => {
  console.log(data)
  data.restTime.splice(index, 1);
}
const filterRestTime = ((data: any) => {
  let filter = data.dayOn == "" ? [] : data.restTime;
  return filter;
})
const handSubmit = () => {
  submitWorkingDefault(workingDefaultList.data)
    .then((res) => {
      if (res.state == 1) {
        Alert.warning('修改成功', 2000);
        setTimeout(() => {
          props.requestWorkingHoursList();
          props.handQuicklyscheduleView();
        }, 2000);
      } else {
        Alert.warning(showErrorMsg(res.msg), 2000);
      }
    })
    .catch((e: any) => {
      Alert.warning(showHttpsStatus(e.response.status), 2000);
      if (e.response.status == 401) {
        setTimeout(() => {
          handLogOut();
        }, 2000);
      }
    })
};

const getWorkingDefaultList = () => {
  workingDefaultList.data = [];
  let data = {
    managerId: managerActive.value.managerId
  }
  getWorkingDefault(data)
    .then((res) => {
      if (res.state == 1) {
        if (res.data.table) {
          workingDefaultList.data = res.data.table;
        } else {
          workingDefaultList.data = {
            managerId: managerActive.value.managerId,
            managerName: managerActive.value.nameView,
            timeTableList: []
          }
          workingDefaultList.data.timeTableList = JSON.parse(JSON.stringify(timeDefault));
        }
      }
    })
    .catch((e: any) => {
      Alert.warning(showHttpsStatus(e.response.status), 2000);
      if (e.response.status == 401) {
        setTimeout(() => {
          handLogOut();
        }, 2000);
      }
    })

}

onMounted(() => {

});
</script>

<template>
  <div class="popup-mask" v-on:click.self="handQuicklyscheduleView()">
    <!-- 提示弹窗 -->
    <div class="popup-content">
      <h1>{{ title }}</h1>
      <p>可安排未來人員未來每周排班工時。</p>
      <div class="select-box">
        <table>
          <tbody>
            <tr>
              <td class="td-p">*人員</td>
              <td class="td-select">
                <select v-model="managerActive" @change="getWorkingDefaultList">
                  <option disabled value="">請選擇人員</option>
                  <option v-for="item in workingHoursList.data" :key="item.managerId" :value=item>
                    {{ item.nameView }}</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            <div class="time-tab" v-for="i in workingDefaultList.data.timeTableList" :key="i.week">
              <tr>
                <td>
                  <div>
                    <input type="checkbox" :checked="i.dayOn.length > 0" v-on:change="handCheckBox(i)">
                    <span>{{ weeks[i.week] }}</span>
                  </div>
                </td>
                <td class="td-bg" v-if="i.dayOn.length > 0">
                  <input type="time" :value="i.dayOn">
                </td>
                <td class="td-bg" v-if="i.dayOn.length > 0">
                  <input type="time" :value="i.dayOff">
                </td>
                <td class="td-bg" v-if="i.dayOn.length > 0">
                  <button @click="handAaddRestTime(i)">+休息時間</button>
                </td>
                <td class="td-bg-rest" v-if="i.dayOn.length == 0">店休</td>
              </tr>
              <tr v-for="j, index in filterRestTime(i)" :key="index">
                <td>
                  <div>
                    <span>休息時間</span>
                  </div>
                </td>
                <td class="td-bg">
                  <input type="time" v-model="j.dayOn">
                </td>
                <td class="td-bg">
                  <input type="time" v-model="j.dayOff">
                </td>
                <td class="td-bg">
                  <button @click="handDelRestTime(i, index)">X</button>
                </td>
              </tr>
            </div>
          </tbody>
        </table>
      </div>
      <div class="sub-btn">
        <button class="btn" type="submit" v-on:click="handSubmit()">確認儲存</button>
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

  display: flex;
  align-items: center;
  justify-content: space-around;

  .popup-content {
    // max-width: 360px;
    position: relative;
    width: 40%;
    height: 80%;
    background-color: #e6e2de;
    padding: 5px 20px;
    font-size: 16px;
    font-family: HeitiTC;
    color: #84715c;
    // font-weight: bold;
    text-align: center;

    >h1 {
      font-size: 20px;
      margin: 10px 0;
    }

    >.select-box {
      overflow: auto;
      // display: flex;
      // height: 48px;
      position: absolute;
      left: 0px;
      right: 0px;
      top: 80px;
      bottom: 70px;
      padding: 5px 10px;

      >table {

        width: 100%;

        >tbody {
          >tr {
            display: flex;
            height: 70px;
            line-height: 70px;

            td {
              position: relative;
              color: #717171;
              border: solid 0.5px #707070;
              box-sizing: border-box;
            }

            .td-p {
              width: 25%;
            }

            .td-select {
              width: 75%;

              >select {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                border: transparent;
              }
            }
          }

          >.time-tab {
            >tr {
              display: flex;
              height: 70px;
              line-height: 70px;

              >td {
                color: #717171;
                text-align: center;
                width: 25%;
                border: solid 0.5px #707070;
                box-sizing: border-box;

                input {
                  text-align: center;
                  border: transparent;
                }

                input[type="checkbox"] {
                  // display: flex;
                  // justify-content: center;
                  margin-right: 10px;
                  width: 20px;
                  height: 20px;
                  top: 2px;
                  position: relative;
                  appearance: none;
                  border: 1px solid;
                  box-sizing: border-box;

                  &:checked {
                    background-color: #e6e2de;

                    &::after {
                      content: '✓';
                      color: #717171;
                      position: absolute;
                      top: 50%;
                      left: 4px;
                      transform: translateY(-50%);
                    }
                  }
                }

                button {
                  border: transparent;
                  background-color: transparent;
                }

                button:hover {
                  border-radius: 6px;
                  border: solid 0.5px #ddd;
                  background-color: #ddd;
                  // padding: 0px 15px;
                  height: 60%;
                  line-height: 50%;
                }

                &.td-bg {
                  background: #fff;
                  font-size: 13px;
                }

                &.td-bg-rest {
                  width: 75%;
                  background: #fff;
                }

              }
            }
          }
        }
      }
    }



    >.sub-btn {
      position: absolute;
      // width: 98%;
      left: 0px;
      right: 0px;
      bottom: 0px;
      border-top: solid 0.5px#707070;

      >.btn {
        padding: 10px 10px;
        margin: 10px 10px;
        font-size: 18px;
        color: #717171;
        border-radius: 10px;
        background-color: #faf9f8;
        border: solid 1px #707070;
      }
    }

  }
}
</style>