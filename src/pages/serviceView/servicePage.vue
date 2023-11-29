
<template>
  <div class="container">
    <div class="header"></div>
    <div class="content">
      <div class="content-topBar">
        <p>商品(全部{{ filterServiceData.length }}個)</p>
        <div>
          <input v-model="search" class="search-control" placeholder="搜尋名稱" />
          <div class="btn-open" @click="showAddUIHdr(true)">
            {{ $t("AddService") }}
          </div>
        </div>
      </div>
      <div class="content-main">
        <!-- <table>
          <thead>
            <tr>
              <td v-for="(item, value) in serviceTitle" :key="item">
                <p @click="sortthreadFn(value)">{{ item }}</p>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in filterServiceData" :key="item.lessonId">
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
                  <img class="edit_img" :src="Icon_del" />
                </button>
              </td>
            </tr>
          </tbody>
        </table> -->
        <el-table :data="filterServiceData" id="dragTable" style="width: 100%; height: 100%; " :cell-style="rowStyle"
          :header-cell-style="headerRowStyle" @sort-change="goclick">
          <el-table-column prop="nameTw" label="產品名稱" width="400" :sort-by="['nameTw']" sortable />
          <el-table-column prop="servicesTime" label="服務時長(Min)" width="200" sortable />
          <el-table-column prop="price" label="售價(NT)" width="200" sortable />
          <el-table-column prop="display" label="上架" width="150">
            <template #default="scope">
              <div class="handle-drag">
                <div class="checked_state">
                  <input class="checked_status" type="checkbox" name="sub" value=""
                    :id="filterServiceData[scope.$index].lessonId"
                    :checked="filterServiceData[scope.$index].display == true"
                    v-on:click="changeStutusHdr(scope.$index, scope.row.name)" />
                  <label :for="filterServiceData[scope.$index].lessonId"></label>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template #default="scope">
              <div class="handle-drag">
                <img class="edit_img" :src="Icon_edit" style=" width: 27px; margin:0px 10px ;" />
                <img class="del_img" :src="Icon_del" @click="deleteHdr(scope.$index, filterServiceData[scope.$index])" />
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div>
      </div>
    </div>
    <div class="footer">
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { useApptStore } from "@/stores/apptStore";
import Alert from "@/components/alertCmpt";
import { Sort } from '@element-plus/icons-vue'
import Icon_edit from "@/assets/Ico_edit.svg";
import Icon_del from "@/assets/Icon material-delete.svg";

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

let showAddType = ref(false);
let showEditService: any = ref(false);
let serviceTitle = ["產品名稱", "服務時長(Min)", "售價(NT)", "上架", "操作"];
let editServiceInfo: any = ref([]);


let search = ref("");
let filterServiceData: any = computed(() =>
  courseDataList.value.filter(getServiceFn)
);
function getServiceFn(data: any) {
  return (
    !search.value ||
    data.nameTw.toLowerCase().includes(search.value.toLowerCase())
  );
}


onBefore();
function onBefore() {
  getCourseTypeApi(0);
}
onMounted(() => { });

watchEffect(() => {
  courseTypesTabs.value;
});



//新增分類-顯示
let showAddUIHdr = (state: boolean) => {
  showAddType.value = state;
  getCourseTypeApi(0);
};
function showEditUIFn(index: number, item: any) {
  editServiceInfo.value = item;
  showEditUI(true);
}
function showEditUI(state: boolean) {
  showEditService.value = state;
  getCourseDetailApi(
    courseTypesTabs.value[courseTypesTabsValue.value].lessonTypeId,
    0
  );
}

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
        0,
        0
      );
    }, 1000);
  });
};

let selItem: any = [];
//刪除課程
let deleteHdr = (index: number, itemId: any) => {
  Alert.check("是否刪除", 1000, (data: any) => {
    onDeleteAlertBtn(data, itemId.lessonId)
  });
};

const onDeleteAlertBtn = (state: any, itemId: any) => {
  if (state) {
    delCourseDetailApi(itemId).then((res: any) => {
      getCourseDetailApi(
        0,
        "0"
      );
    });
  } else {
    console.log("取消刪除");
  }
  selItem.value = [];
};

function goclick(row: any) {
  console.log(row)
}
//排序明細
let sortUpDown: string = "";
function sortthreadFn(name: number) {
  console.log(name);

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
//-------------------------------------------------------------------------表格css
//內容css
const rowStyle = ({ row, column, rowIndex, columnIndex }: any) => {
  return {
    backgroundColor: '#fff',
    color: '#717171',
    fontSize: "16px",
    fontWeight: "bold",
    margin: "3px 5px",
    fontFamily: " STXihei",
    borderBottom: "2px solid rgba(112, 112, 112, 0.5)"
  }
}
//標頭css
const headerRowStyle = ({ row, column, rowIndex, columnIndex }: any) => {
  return {
    height: "50px",
    backgroundColor: '#fff',
    fontSize: "20px",
    borderBottom: "0px solid rgba(112, 112, 112, 0.5)"
  }
}
</script>
<style lang="scss" scoped>
.container {
  position: absolute;
  top: 45px;
  bottom: 10px;
  left: 0px;
  right: 0px;
  width: 100%;
  background-color: #faf9f8;
  border: solid 0.5px #ddd;
  font-family: STXihei;
  color: #717171;

  .content {
    display: block;
    height: calc(100% - 50px);

    .content-topBar {
      height: 50px;
      width: calc(100%);
      font-weight: bold;
      display: flex;
      align-items: center;
      color: #717171;
      border: solid 1px #707070;
      box-sizing: border-box;
      background-color: #e6e2de;

      >div {
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: right;
        width: 88%;

        .search-control {
          width: auto;
          height: 60%;
          border-radius: 6px;
          border: solid 1px #707070;
          box-sizing: border-box;
          background-color: #fff;
          margin-right: 10px;

          background: url("@/assets/images/icon_search.png") no-repeat;
          background-color: #fff;
          background-position: 97%;
          background-origin: content-box;
          text-indent: 5px;
        }

        >.btn-open {
          width: 90px;
          height: 30px;
          margin: 0;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          display: flex;
          // padding: 7px 11px 6px;
          border-radius: 6px;
          border: solid 1px #707070;
          box-sizing: border-box;
          background-color: #84715c;
          color: #ffffff;
        }
      }
    }

    .content-main {
      // display: block;
      // height: calc(100% - 50px);
      height: 100%;

      >table {
        // display: inline-block;
        padding: 10px 25px;
        width: 100%;
        font-family: STXihei;
        background-color: #faf9f8;
        border: solid 0.5px #ddd;
        box-sizing: border-box;
        color: #717171;
        height: 100%;
        overflow-y: scroll;

        // display: inline-table;
        >thead {
          display: inline-table;
          width: 100%;
          height: 50px;

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
          height: calc(100% - 50px);

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
  }


}
</style>


<style lang="scss" scoped>
.el-table {

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

  .edit_img {
    width: 27px;
    height: 27px;
  }

  .del_img {
    width: 20px;
    height: 27px;
  }
}
</style>