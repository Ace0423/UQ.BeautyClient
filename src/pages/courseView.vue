<template>
  <div class="course_div">
    <div class="top_box">
      <Header :moduleType="'課程管理'" :Icon="Icon" :memuState="props.memuState" :handmemuStateBtn="props.handmemuStateBtn">
      </Header>
      <div class="top_menu">
        <img @click="showAddDetailFn(true)" :src="icon_add" />
      </div>
    </div>
    <div class="customer-top">
      <div class="customer-tab">
        <div class="item-tab">
          <button :class="courseTypesTabsValue == index ? 'active' : ''" v-for="(item, index) in courseTypesTabs"
            :key="item.lessonTypeId" v-on:click="changeTab(index, item)">
            {{ item.nameTw }}
          </button>
        </div>
      </div>
      <div class="course_table">
        <div class="header-tab">
          <p>課程(全部{{ filterCourseData.length }}個)</p>
          <input v-model="search" placeholder="搜尋產品" />
          <div class="btn-open" @click="showAddUIHdr(true)">分類管理</div>
        </div>
        <table>
          <thead>
            <tr>
              <td v-for="(item, value) in coursetitle" :key="item">
                <p @click="sortthradFn(value)">{{ item }}</p>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in filterCourseData" :key="item.lessonId">
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
                <div class="checked_state">
                  <input class="checked_status" type="checkbox" name="sub" value="" :id="item.lessonId"
                    :checked="item.display == true" v-on:click="changeStutusHdr(index, item)" />
                  <label :for="item.lessonId"></label>
                </div>
              </td>
              <td>
                <button v-on:click="showEditUIFn(index, item)">
                  <img class="edit_img" :src="Icon_edit" />
                </button>
                <button v-on:click="deleteHdr(index, item.lessonId)">
                  <img class="edit_img" :src="DeleteIcon" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <AddCourseTypeUI v-if="showAddType" :show-add-form="showAddUIHdr" />
    <AddCourseDetailUI v-if="showCourseFormRef" :showAddDetailForm="showAddDetailFn" :filterCourseData="filterCourseData"
      :addDetailTypeID="addDetailTypeID" />
    <EditCourseDetailUI v-if="showEditCourse" :show-edit-form="showEditUI" :edit-course-info="editCourseInfo" />
    <!-- <Resourceimages2 /> -->
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { useApptStore } from "@/stores/apptStore";
import Alert from "@/components/alertCmpt";
import DeleteIcon from "@/assets/Icon material-delete.svg";
import Icon from "@/assets/Icon awesome-spa.svg";
import Icon_edit from "@/assets/Ico_edit.svg";
import icon_add from "@/assets/images/icon_add.png";
let store = useApptStore();
let { courseTypesTabs, courseDataList, courseTypesTabsValue } =
  storeToRefs(store);
let {
  getCourseTypeApi,
  delCourseTypeApi,
  getCourseDetailApi,
  delCourseDetailApi,
  updateCourseDetailApi,
} = store;
const props = defineProps<{
  memuState: any;
  handmemuStateBtn: Function;
}>();

let search = ref("");
let showAddType = ref(false);
let showCourseFormRef = ref(false);
let coursetitle = ["產品名稱", "服務時長(Min)", "售價(NT)", "上架", "操作"];
courseDataList.value = [];
let showEditCourse: any = ref(false);
let editCourseInfo: any = ref([]);
let sortUpDown: string = "";
let filterCourseData: any = computed(() =>
  courseDataList.value.filter(getCourseFn)
);
function getCourseFn(data: any) {
  return (
    !search.value ||
    data.nameTw.toLowerCase().includes(search.value.toLowerCase())
  );
}
let addDetailTypeID = computed(() =>
  Number(courseTypesTabs.value[courseTypesTabsValue.value].lessonTypeId)
);

let changeTab = (index: number, item: any) => {
  courseTypesTabsValue.value = index;
  getCourseDetailApi(item.lessonTypeId, 0);
};
onBefore();
function onBefore() {
  getCourseTypeApi(0);
}
onMounted(() => { });

watchEffect(() => {
  courseTypesTabs.value;
});

//刪除類型
let delCourseTypeHdr = (index: number, itemId: number) => {
  delCourseTypeApi(itemId);
};

//改變課程狀態
let changeStutusHdr = (index: number, item: any) => {
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
  updateCourseDetailApi(curdata).then((res: any) => {
    setTimeout(() => {
      getCourseDetailApi(
        courseTypesTabs.value[courseTypesTabsValue.value].lessonTypeId,
        0
      );
    }, 1000);
  });
};
//刪除課程
let deleteHdr = (index: number, itemId: number) => {
  Alert.check("是否刪除", 1000, (data: any) => {
    if (data) {
      delCourseDetailApi(itemId).then((res: any) => {
        getCourseDetailApi(
          courseTypesTabs.value[courseTypesTabsValue.value].lessonTypeId,
          "0"
        );
      });
    } else {
    }
  });
};

function showEditUIFn(index: number, item: any) {
  editCourseInfo.value = item;
  showEditUI(true);
}

function showEditUI(state: boolean) {
  showEditCourse.value = state;
  getCourseDetailApi(
    courseTypesTabs.value[courseTypesTabsValue.value].lessonTypeId,
    0
  );
}
//新增分類-顯示
let showAddUIHdr = (state: boolean) => {
  showAddType.value = state;
  getCourseTypeApi(0);
};

//新增課程-顯示
let showAddDetailFn = (state: boolean) => {
  showCourseFormRef.value = state;
  getCourseDetailApi(
    courseTypesTabs.value[courseTypesTabsValue.value].lessonTypeId,
    0
  );
};
//排序明細
function sortthradFn(name: number) {
  let nameGroup = ["nameTw", "servicesTime", "price", "display"];
  let sortName = nameGroup[name];
  if (sortName)
    if (sortUpDown == sortName) {
      courseDataList.value.sort(function (a: any, b: any) {
        return a[sortName] > b[sortName] ? -1 : 1;
      });
      sortUpDown = "";
    } else {
      courseDataList.value.sort(function (a: any, b: any) {
        return a[sortName] > b[sortName] ? 1 : -1;
      });
      sortUpDown = sortName;
    }
}
</script>

<style lang="scss" scoped>
.course_div {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  position: relative;

  .top_box {
    display: flex;
    width: 100%;

    .top_menu {
      display: flex;
      position: relative;
      width: calc(100%);
      height: 29px;
      justify-content: right;
      top: 15px;
      right: 15px;

      >img {
        // margin-right: 10px;
        height: 29px;
        width: 29px;
      }
    }
  }

  >.customer-top {
    position: absolute;
    top: 80px;
    bottom: 10px;
    left: 0px;
    right: 0px;
    margin: 0px 40px;

    .customer-tab {
      display: flex;
      justify-content: space-between;
      height: 50px;
      width: 100%;
      overflow-x: scroll;
      overflow: hidden;

      .item-tab {
        overflow-x: scroll;
        overflow: hidden;
        display: -webkit-box;
        height: 100%;

        >button {
          white-space: nowrap;
          display: flex;
          justify-content: center;
          align-items: center;
          border: none;
          background-color: #faf9f8;
          font-weight: bold;
          font-family: HeitiTC;
          color: #717171;
          height: 100%;
          border-radius: 10px;
          font-size: 20px;
          min-width: 100px;
          border-radius: 10px 10px 0 0;
        }

        >button.active {
          background-color: #e6e2de;
        }
      }
    }

    >.course_table {
      display: block;
      height: calc(100% - 50px);

      >.header-tab {
        height: 50px;
        // width: 100%;
        font-weight: bold;
        display: flex;
        align-items: center;
        color: #717171;
        border: solid 1px #707070;
        box-sizing: border-box;
        background-color: #e6e2de;

        .btn-open {
          width: 90px;
          height: 33px;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          display: flex;
          border-radius: 6px;
          border: solid 1px #707070;
          box-sizing: border-box;
          background-color: #84715c;
        }

        >p {
          margin: 0 10px;
        }

        >input {
          width: 134px;
          height: 33px;
          border-radius: 6px;
          border: solid 1px #707070;
          box-sizing: border-box;
          background-color: #fff;
          margin-right: 10px;
        }
      }

      >table {
        // display: inline-block;
        padding: 10px 25px;
        width: 100%;
        font-family: STXihei;
        background-color: #faf9f8;
        border: solid 0.5px #ddd;
        box-sizing: border-box;
        color: #717171;
        height: calc(100% - 50px);
        overflow-y: scroll;

        // display: inline-table;
        >thead {
          display: inline-table;
          width: 100%;

          >tr>td>p {
            font-weight: bold;
          }

          >tr>td:nth-child(1) {
            width: 40%;
          }

          >tr>td:nth-child(2) {
            width: 15%;
          }

          >tr>td:nth-child(3) {
            width: 20%;
          }

          >tr>td:nth-child(4) {
            width: 10%;
          }

          >tr>td:nth-child(5) {
            width: 15%;
          }
        }

        >tbody {
          overflow-y: scroll;
          overflow: hidden;
          display: block;
          width: 100%;
          height: 90%;

          >tr {
            display: flex;
            width: 100%;
            border-bottom: 2px solid rgba(112, 112, 112, 0.5);

            >td {
              align-items: center;
              display: flex;
              height: 47px;
              padding: 2px;

              .edit_img {
                width: 30px;
                height: 30px;
              }

              >img {
                width: 40px;
                height: 40px;
                padding: 0 10px;
                border-radius: 45px;
              }

              >p {
                margin: 3px 5px;
              }

              >button {
                background-color: transparent;
                border: none;
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
                  box-sizing: border-box;
                  position: relative;
                  cursor: pointer;
                }

                label::before {
                  display: inline-block;
                  content: " ";
                  width: 12px;
                  border: 2px solid #fff;
                  box-sizing: border-box;
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
          }

          >tr>td:nth-child(1) {
            width: 40%;
          }

          >tr>td:nth-child(2) {
            width: 15%;
          }

          >tr>td:nth-child(3) {
            width: 20%;
          }

          >tr>td:nth-child(4) {
            width: 10%;
          }

          >tr>td:nth-child(5) {
            width: 15%;
            min-width: 85px;
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

.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.w_25p {
  width: 25%;
}
</style>
