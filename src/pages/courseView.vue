<template>
  <div class="course_div">
    <Header :moduleType="'課程管理'" :Icon="Icon"></Header>
    <div class="customer-top">
      <div class="customer-tab">
        <div class="item-tab">
          <button
            :class="courseTypesTabsValue == index ? 'active' : ''"
            v-for="(item, index) in courseTypesTabs"
            :key="item.lessonTypeId"
            v-on:click="changeTab(index, item)"
          >
            {{ item.nameTw }}
          </button>
        </div>
        <div class="addcoursetype-btn" @click="showAddForm(true)">
          <img :src="addcoursetype" />
        </div>
      </div>
      <div class="course_table">
        <div class="header-tab">
          <p>客戶(全部{{ filterCourseData.length }}個)</p>
          <input v-model="search" />
          <div class="btn-open" @click="showAddCourseForm(true)">新增課程</div>
        </div>
        <table>
          <thead>
            <td v-for="item in coursetitle" :key="item">
              <p>{{ item }}</p>
            </td>
          </thead>
          <tbody>
            <tr v-for="(item, index) in filterCourseData" :key="item.lessonId">
              <!-- <td><img :src="item.img" /></td> -->
              <td>
                <p>{{ item.nameTw }}</p>
              </td>
              <td>
                <p>{{ item.servicesTime }}</p>
              </td>
              <td>
                <p>{{ item.price }}</p>
              </td>
              <td>
                <!-- <p>{{ item.display ? '1' : '0' }}</p> -->
                <input
                  class="checked_status"
                  type="checkbox"
                  name="sub"
                  value=""
                  :checked="item.display == true"
                  v-on:click="changeStutusFn(index, item)"
                />
              </td>
              <td>
                <button v-on:click="showEditFormBtn(index, item)">
                  <img class="edit_img" :src="Icon_edit" />
                </button>
                <!-- <button v-on:click="deleteHdr(index, item.lessonId)">
                  <img class="edit_img" :src="DeleteIcon" />
                </button> -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div
      id="ck1"
      class="form_bg"
      v-show="courseTypeBoxRef"
      @click.self="showAddForm(false)"
    >
      <div v-show="courseTypeBoxRef" class="add-coursetype-form">
        <div v-show="courseTypeBoxRef" class="add-coursetype-bg">
          <p>新增分類</p>
          <div>
            <input v-model="addCourseTypesName" />
          </div>
          <tr v-for="(item, index) in courseTypesTabs" :key="item.lessonTypeId">
            <button
              class="add-coursetype-btn"
              v-on:click="handleDelCourseType(index, item.lessonTypeId)"
            >
              <span>{{ item.nameTw }}</span>
              <img class="add-coursetype-ico" :src="formDeleteIcon" />
            </button>
          </tr>
          <div>
            <button
              class="confirm-coursetype-btn"
              @click="confirmShowAddForm()"
            >
              確認
            </button>
            <button class="confirm-coursetype-btn" @click="showAddForm(false)">
              取消
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      id="ck1"
      class="form_bg"
      v-show="showCourseFormRef"
      @click.self="showAddCourseForm(false)"
    >
      <div v-show="showCourseFormRef" class="add-coursedetail-form">
        <div v-show="showCourseFormRef" class="add-coursedetail-bg Column">
          <p>新增課程</p>
          <div class="userinfo">
            <div class="formname">
              <p>名稱</p>
              <input v-model="newCourseDetailRef.name" />
            </div>
            <div class="formtime">
              <p>時長(Min)</p>
              <input v-model="newCourseDetailRef.timer" />
            </div>
            <div class="formprice">
              <p>售價(NT)</p>
              <input v-model="newCourseDetailRef.price" />
            </div>
            <div>
              <div class="online">
                <p>上架</p>
                <input
                  class="checked_status"
                  type="checkbox"
                  name="sub"
                  value=""
                  v-model="newCourseDetailRef.state"
                />
              </div>
            </div>
          </div>
          <div class="add-coursedetail-btndiv">
            <div>
              <div
                v-for="(item, index) in filterCourseData"
                :key="item.lessonId"
              >
                <button
                  class="add-coursedetail-btn"
                  v-on:click="handleDelCourseType(index, item.lessonId)"
                >
                  <span>{{ item.nameTw }}</span>
                  <img class="add-coursedetail-ico" :src="formDeleteIcon" />
                </button>
              </div>
            </div>
          </div>
          <div class="decide">
            <button
              class="confirm-coursedetail-btn"
              @click="confirmAddCourseDataForm()"
            >
              確認
            </button>
            <button
              class="confirm-coursedetail-btn"
              @click="showAddCourseForm(false)"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      id="ck1"
      class="form_bg"
      v-show="showEditCourse"
      @click.self="showEditForm(false)"
    >
      <div class="edit-coursetype-form">
        <div class="edit-coursetype-bg">
          <p>修改課程</p>
          <div class="edit_input">
            <input v-model="editCourseInfo.nameTw" />
            <input v-model="editCourseInfo.servicesTime" />
            <input v-model="editCourseInfo.price" />
          </div>
          <div class="edit_submit">
            <button class="confirm-coursetype-btn" @click="EditConfirmHdr()">
              確認
            </button>
            <button class="confirm-coursetype-btn" @click="showEditForm(false)">
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Alert
    v-if="alertInformation.alertState"
    :alert-information="alertInformation"
    :hand-alert-view="handAlertView"
    @callbackBtn="btnSumitHdr"
  ></Alert>
</template>
    
<script lang="ts" setup>
import { useCounterStore } from "@/stores/counter";
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import formDeleteIcon from "@/assets/Icon course-delete.svg";
import addcoursetype from "@/assets/Icon course-addcoursetype.svg";
import DeleteIcon from "@/assets/Icon material-delete.svg";
import Icon from "@/assets/Icon zocial-guest.svg";
import Icon_edit from "@/assets/Ico_edit.svg";

let search = ref("");

let courseTypeBoxRef = ref(false);

let showCourseFormRef = ref(false);
let coursetitle = reactive(["產品名稱", "服務時長(Min)", "售價(NT)", "上架"]);
let newCourseDetailRef: any = ref({
  name: "",
  timer: "",
  price: "",
  state: false,
});

const handAlertView = (msg: string, btnState: number, timer: number) => {
  alertInformation.messageText = msg;
  alertInformation.buttonState = btnState;
  alertInformation.timerVal = timer;
  alertInformation.alertState = !alertInformation.alertState;
};

const alertInformation = reactive({
  selfData: {},
  selfType: "",
  messageText: "是否刪除", // 提示內容
  buttonState: 0, //按鈕顯示狀態 0:全部 1:只顯示確定按鈕 2:不顯示按鈕
  timerVal: 0, //時間計時器
  alertState: false, //時間計時器
});

interface IBackStatus {
  btnStatus: boolean;
}
const btnSumitHdr = (val: IBackStatus) => {
  switch (alertInformation.selfType) {
    case "delCourseDetail":
      if (val.btnStatus) {
        console.log(val.btnStatus, "確定");
        // delCourseDetailApi(alertInformation.selfData);
      } else {
        console.log(val.btnStatus, "取消");
      }
      break;

    default:
      break;
  }
  alertInformation.alertState = !alertInformation.alertState;
};

let store = useCounterStore();
let { courseTypesTabs, courseDataList, courseTypesTabsValue } =
  storeToRefs(store);
let {
  getCourseTypeApi,
  delCourseTypeApi,
  getCourseDetailApi,
  addCourseTypeApi,
  addCourseDetailApi,
  delCourseDetailApi,
  updateCourseDetailApi,
} = store;
let addCourseTypesName = ref("");
let filterCourseData = computed(() => courseDataList.value.filter(getCourseFn));
function getCourseFn(data: any) {
  return (
    !search.value ||
    data.nameTw.toLowerCase().includes(search.value.toLowerCase())
  );
}

getCourseTypeApi(0);
onMounted(() => {});

watchEffect(() => {
  courseTypesTabs.value;
});

// }

let changeTab = (index: number, item: any) => {
  courseTypesTabsValue.value = index;
  getCourseDetailApi(item.lessonTypeId, 0);
};
//刪除類型
let handleDelCourseType = (index: number, itemId: number) => {
  delCourseTypeApi(itemId);
};

//改變課程狀態
let changeStutusFn = (index: number, item: any) => {
  // for (let i = 0; i < courseDataList.value.length; i++) {
  //   let element = courseDataList.value[i];
  //   if (item.lessonId === element.lessonId) {
  //     if (element.display == true)
  //       courseDataList.value[i].display = false;
  //     else
  //       courseDataList.value[i].display = true;
  //   }
  // }

  let curdata: any = {
    lessonId: item.lessonId,
    lessonTypeId: item.lessonTypeId,
    display: !item.display,
    nameEn: item.nameEn,
    nameTw: item.nameTw,
    servicesTime: item.servicesTime,
    price: item.price,
    discount: item.discount,
  };
  updateCourseDetailApi(curdata);
  getCourseDetailApi(item.lessonTypeId, 0);
};
let alertSumit: boolean = false;
//刪除課程
let deleteHdr = (index: number, itemId: number) => {
  alertInformation.selfType = "delCourseDetail";
  alertInformation.buttonState = 0;
  alertInformation.messageText = "是否刪除";
  alertInformation.alertState = true;
  // delCourseDetailApi(itemId);
  alertInformation.selfData = itemId;
};

let showEditCourse: any = ref(false);
let editCourseInfo: any = ref([]);
function showEditFormBtn(index: number, item: any) {
  editCourseInfo.value = item;
  showEditForm(true);
}

function showEditForm(state: boolean) {
  showEditCourse.value = state;
}
//編輯課程
let EditConfirmHdr = () => {
  editCourseInfo;
  let apiEditCourseData = {
    lessonId: editCourseInfo.value.lessonId,
    lessonTypeId: editCourseInfo.value.lessonTypeId,
    display: true,
    nameEn: "",
    nameTw: editCourseInfo.value.nameTw,
    servicesTime: editCourseInfo.value.servicesTime,
    price: editCourseInfo.value.price,
    discount: 0,
  };
  updateCourseDetailApi(apiEditCourseData);
  getCourseDetailApi(editCourseInfo.value.lessonTypeId, 0);
  showEditForm(false);
};
//新增分類-顯示
let showAddForm = (state: boolean) => {
  addCourseTypesName.value = "";
  courseTypeBoxRef.value = state;
};
//新增分類--確認
let confirmShowAddForm = () => {
  if (addCourseTypesName.value != "") {
  }

  let curdata: any = {
    lessonTypeId: 0,
    display: true,
    nameEn: "Personal Customization1",
    nameTw: addCourseTypesName.value,
  };
  addCourseTypeApi(curdata);
  courseTypeBoxRef.value = false;
};
//新增課程-顯示
let showAddCourseForm = (state: boolean) => {
  newCourseDetailRef.value.name = "";
  showCourseFormRef.value = state;
};
//新增課程-確認
let confirmAddCourseDataForm = () => {
  if (
    newCourseDetailRef.value.name == "" ||
    newCourseDetailRef.value.timer == "" ||
    newCourseDetailRef.value.price == ""
  ) {
    showCourseFormRef.value = false;
    return;
  }

  let curdata: any = {
    lessonId: 0,
    lessonTypeId:
      courseTypesTabs.value[courseTypesTabsValue.value].lessonTypeId,
    display: newCourseDetailRef.value.state,
    nameEn: "Personal Customization1",
    nameTw: newCourseDetailRef.value.name,
    servicesTime: newCourseDetailRef.value.timer,
    price: newCourseDetailRef.value.price,
    discount: 0,
  };

  addCourseDetailApi(curdata);
  showCourseFormRef.value = false;
};
</script>
    
<style lang="scss" scoped>
.course_div {
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  min-width: 500px;

  > .customer-top {
    margin: 2px 40px;

    > .customer-tab {
      display: flex;
      justify-content: space-between;

      // display: flex;
      > .item-tab {
        display: flex;

        > button {
          display: flex;
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

        > button.active {
          background-color: #e6e2de;
        }

        .addcoursetype-btn {
          // display: flex;
          justify-content: center;
          flex: 1;
          text-align: right;
        }
      }
    }

    > .course_table {
      > .header-tab {
        height: 47px;
        // width: 100%;
        font-weight: bold;
        display: flex;
        align-items: center;
        color: #717171;
        border: solid 1px #707070;
        background-color: #e6e2de;

        > .btn-open {
          width: 80px;
          height: 20px;
          margin: 0;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          display: flex;
          padding: 7px 11px 6px;
          border-radius: 6px;
          border: solid 1px #707070;
          background-color: #84715c;
        }

        > p {
          margin: 0 10px;
        }

        > input {
          width: 134px;
          height: 33px;
          border-radius: 6px;
          border: solid 1px #707070;
          background-color: #fff;
          margin-right: 10px;
        }
      }

      > table {
        width: 100%;
        // display: inline-block;
        padding: 10px 25px;
        width: 100%;
        font-family: STXihei;
        background-color: #faf9f8;
        border: solid 0.5px #ddd;
        color: #717171;

        > tbody {
          // display: block;
          width: 100%;

          > tr {
            //   display: block;
            width: 100%;
            border-bottom: 2px solid rgba(112, 112, 112, 0.5);

            > td {
              height: 47px;
              padding: 2px;

              .edit_img {
                width: 30px;
                height: 30px;
              }

              > img {
                width: 40px;
                height: 40px;
                padding: 0 10px;
                border-radius: 45px;
              }

              > p {
                margin: 3px 5px;
              }

              > button {
                background-color: transparent;
                border: none;
              }

              > input {
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

    .current {
      display: none;
    }
  }
}

.pop_form {
  position: absolute;
  // left: 50%;
  // top: 20%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #f6f6f6;
  border-radius: 10px;
  padding: 20px 30px;
  box-shadow: 0 5px 5px rgb(16, 16, 16, 0.5);
  overflow: hidden;
  z-index: 99;
}

/* 弹窗页面 */
.pop_bgcover {
  position: absolute;
  left: 0;
  top: 0;
  background: rgb(0, 0, 0, 0.5);
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 98;
}

.btn-open {
  width: 200px;
  color: white;
  line-height: 50px;
  text-align: center;
  background-color: brown;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
}

.right_main {
  z-index: -1;
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

// #ck1 {
//   top: 0;
//   left: 0;
//   bottom: 0;
//   right: 0;
//   position: relative;
//   background: rgba(255, 255, 255, 0.5);
// }

.form_bg {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.5);
}

.add-coursetype-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;

  .add-coursetype-bg {
    padding: 15px 15px 15px 15px;
    background-color: #e6e2de;
    width: 100%;

    > div {
      > input {
        width: 100%;
        height: 43px;
        border: solid 1px #707070;
        background-color: #fff;
        font-size: 20px;
        font-weight: bold;
        color: #717171;
        margin-top: 5px;
      }
    }

    > tr {
      display: flex;
      justify-content: center;
    }

    .add-coursetype-btn {
      width: 260px;
      height: 45px;
      margin: 5px;
      border-radius: 10px;

      font-size: 20px;
      font-weight: bold;
      background-color: #fff;
      color: #717171;
      display: flex;

      > span {
        margin-top: 5px;
        width: 85%;
        justify-content: center;
      }

      .add-coursetype-ico {
        margin-top: 10px;
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        flex: 1;
      }
    }

    > div {
      display: flex;
      justify-content: center;

      .confirm-coursetype-btn {
        width: 100px;
        height: 45px;
        margin: 5px;
        border-radius: 10px;
        font-size: 20px;
        font-weight: bold;
        color: #717171;
        background-color: #fff;
      }
    }

    p {
      text-align: left;
      font-size: 20px;
      font-weight: bold;
      text-align: left;
      color: #877059;
      font-weight: bold;
    }
  }
}
.edit-coursetype-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 250px;

  .edit-coursetype-bg {
    padding: 15px 15px;
    background-color: #e6e2de;
    width: 100%;

    > tr {
      display: flex;
      justify-content: center;
    }

    .add-coursetype-btn {
      width: 260px;
      height: 45px;
      margin: 5px;
      border-radius: 10px;

      font-size: 20px;
      font-weight: bold;
      background-color: #fff;
      color: #717171;
      display: flex;

      > span {
        margin-top: 5px;
        width: 85%;
        justify-content: center;
      }

      .add-coursetype-ico {
        margin-top: 10px;
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        flex: 1;
      }
    }

    .edit_input {
      > input {
        width: 95%;
        height: 43px;
        border: solid 1px #707070;
        background-color: #fff;
        font-size: 20px;
        font-weight: bold;
        color: #717171;
        margin-top: 5px;
      }
    }
    .edit_submit {
      display: flex;
      justify-content: center;
    }

    p {
      text-align: left;
      font-size: 20px;
      font-weight: bold;
      text-align: left;
      color: #877059;
      font-weight: bold;
    }
    .confirm-coursetype-btn {
      width: 100px;
      height: 45px;
      margin: 5px;
      border-radius: 10px;
      font-size: 20px;
      font-weight: bold;
      color: #717171;
      background-color: #fff;
    }
  }
}

.add-coursedetail-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 566px;

  .Column {
    // width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .add-coursedetail-bg {
    padding: 10px 10px 10px 10px;
    background-color: #e6e2de;
    width: 566px;

    p {
      font-weight: bold;
      width: 80px;
      height: 20px;
      font-family: HeitiTC;
      font-size: 20px;
      text-align: left;
      color: #877059;
    }

    .decide,
    .userinfo {
      width: 566px;
      display: flex;
      height: 90px;
      justify-content: center;

      > div {
        p {
          text-align: left;
          font-size: 15px;
          // font-weight: bold;
          text-align: left;
          color: #877059;
        }

        // width: 98%;
        > input {
          vertical-align: middle;
          width: 95%;
          margin: 5;
          height: 30px;
          border: solid 1px #707070;
          background-color: #fff;
        }

        > div {
          width: 40px;

          .checked_status {
            width: 34px;
            height: 34px;
            display: flex;
            justify-content: center;
            // margin: 43px 329px 30px 123.5px;
            object-fit: contain;
            margin: 7px;
          }

          .checked_status:checked::after {
            content: "✓";
            color: #fff;
            font-size: 45px;
            line-height: 30px;
            font-weight: bold;
            background-color: #84715c;
          }
        }
      }

      .formname {
        width: 260px;
        // margin-right: 10px;
        padding: 0px 10px;
      }

      .formtime {
        width: 80px;
        padding: 0px 10px;
      }

      .formprice {
        width: 80px;
        padding: 0px 10px;
      }

      .online {
        padding: 0px 10px;
      }

      .confirm-coursedetail-btn {
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

    .add-coursedetail-btndiv {
      padding: 0px 20px;
      div {
        flex-wrap: wrap;
        display: flex;

        // padding: 10px;
        div {
          .add-coursedetail-btn {
            width: 250px;
            height: 45px;
            margin: 5px;
            border-radius: 10px;

            font-size: 20px;
            font-weight: bold;
            background-color: #fff;
            color: #717171;
            display: flex;

            > span {
              margin-top: 5px;
              width: 88%;
              justify-content: center;
            }

            .add-coursedetail-ico {
              margin-top: 10px;
              width: 20px;
              height: 20px;
              display: flex;
              justify-content: center;
              flex: 1;
            }
          }
        }
      }

      p {
        text-align: left;
        font-size: 20px;
        font-weight: bold;
        text-align: left;
        color: #877059;
      }
    }
  }
}
</style>
    
    