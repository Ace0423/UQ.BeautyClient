
<template>
  <div class="container">
    <div class="header"></div>
    <div class="content">
      <div class="content-topBar">
        <p>服務(全部{{ filterServiceData.length }}個)</p>
        <div>
          <input v-model="search" class="search-control" placeholder="搜尋名稱" />
          <div class="btn-open" @click="showAddDetailHdr(true)">
            {{ $t("AddService") }}
          </div>
        </div>
      </div>
      <div class="content-main">
        <el-table :data="filterServiceData" id="dragTable" style="width: 100%; height: 100%; " :cell-style="rowStyle"
          :header-cell-style="headerRowStyle" @sort-change="goclick">
          <el-table-column prop="name" label="產品名稱" min-width="30%" :sort-by="['name']" sortable />
          <el-table-column prop="servicesTime" label="服務時長" min-width="30%" sortable>
            <template #default="scope">
              <div class="handle-drag">
                <span v-if="scope.row.servicesTime == 0">{{ 0 + '(' + MathMinServiceTimeFn(scope.row.subList) + '起)'
                }}</span>
                <span v-else>{{ scope.row.servicesTime }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="售價" min-width="20%" sortable>
            <template #default="scope">
              <div class="handle-drag">
                <span v-if="scope.row.servicesTime == 0">{{ 0 + '(' + MathMinPriceFn(scope.row.subList) + '起)'
                }}</span>
                <span v-else>{{ scope.row.servicesTime }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="display" label="上架" min-width="20%">
            <template #default="scope">
              <div class="handle-drag">
                <div class="checked_state">
                  <input class="checked_status" type="checkbox" name="sub" value="" :id="'servicePage_' + scope.$index"
                    :checked="filterServiceData[scope.$index].display == true"
                    @change="changeStutusHdr(scope.$index, scope.row)" />
                  <label :for="'servicePage_' + scope.$index"></label>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template #default="scope">
              <div class="handle-drag">
                <img class="edit_img" :src="Icon_edit" style=" width: 27px; margin:0px 10px ;"
                  @click="selectDataFn(scope.row)" />
                <img class="del_img" :src="Icon_del" @click="deleteHdr(scope.$index, scope.row)" />
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
  <AddDetailServiceUI v-if="showAddDetail" :showAddForm="showAddDetailHdr" />
  <EditDetailServiceUI v-if="showEditDetail" :showEditForm="showEditDetailHdr" :selData="selectDataRef" />
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
let { serviceDetailList } =
  storeToRefs(store);
let {
  getServiceDetailApi,
  delServiceDetailApi,
  updateServiceDetailApi,
} = store;

let showAddDetail = ref(false);
let showEditDetail: any = ref(false);
let serviceTitle = ["產品名稱", "服務時長(Min)", "售價(NT)", "上架", "操作"];
let editServiceInfo: any = ref([]);


let search = ref("");
let filterServiceData: any = computed(() =>
  serviceDetailList.value.filter(getServiceFn)
);
function getServiceFn(data: any) {
  return (
    !search.value ||
    data.name.toLowerCase().includes(search.value.toLowerCase())
  );
}


onBefore();
function onBefore() {
  getServiceDetailApi(0);
}
onMounted(() => { });

watchEffect(() => {

});



//新增分類-顯示
let showAddDetailHdr = (state: boolean) => {
  showAddDetail.value = state;
  getServiceDetailApi(0);
};
function showEditUIFn(index: number, item: any) {
  editServiceInfo.value = item;
  showEditDetailHdr(true);
}
function showEditDetailHdr(state: boolean) {
  showEditDetail.value = state;
  if (!state)
    getServiceDetailApi(0);
}

//改變課程狀態
let changeStutusHdr = (index: number, item: any) => {
  let curSgIdList = [];
  for (let i = 0; i < item.sgIdList.length; i++) {
    const element = item.sgIdList[i];
    curSgIdList.push(element.sgId);
  }

  let curdata: any = {
    sId: item.sId,
    display: !item.display,
    color: item.color,
    isBonusOpen: item.isBonusOpen,
    isEditAccounting: item.isEditAccounting,
    memo: item.memo,
    nickName: item.nickName,
    sgIdList: curSgIdList,
    subType: item.subType,
    name: item.name,
    servicesTime: item.servicesTime,
    price: item.price,
    subList: item.subList,
  };

  updateServiceDetailApi(curdata).then((res: any) => {
    getServiceDetailApi(0);
  });
}

let selItem: any = [];
//刪除課程
let deleteHdr = (index: number, item: any) => {
  Alert.check("是否刪除", 1000, (data: any) => {
    onDeleteAlertBtn(data, item.sId)
  });
};

let selectDataRef = ref([])
function selectDataFn(params: any) {
  selectDataRef = params;
  showEditDetailHdr(true);
}

const onDeleteAlertBtn = (state: any, id: number) => {
  if (state) {
    delServiceDetailApi(id).then((res: any) => {
      getServiceDetailApi(0);
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
      serviceDetailList.value.sort(function (a: any, b: any) {
        return a[sortName] > b[sortName] ? -1 : 1;
      });
      sortUpDown = "";
    } else {
      serviceDetailList.value.sort(function (a: any, b: any) {
        return a[sortName] > b[sortName] ? 1 : -1;
      });
      sortUpDown = sortName;
    }
}

function MathMinServiceTimeFn(data: any) {
  let least = Math.min(...data.map((a: any) => a.servicesTime)) //12
  return least;
}
function MathMinPriceFn(data: any) {
  let least = Math.min(...data.map((a: any) => a.price)) //12
  return least;
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