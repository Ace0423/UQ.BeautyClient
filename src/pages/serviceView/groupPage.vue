
<template>
  <div class="container">
    <div class="header"></div>
    <div class="content">
      <div class="content-topBar">
        <p>群組(全部{{ filterServiceType.length }}個)</p>
        <div>
          <input v-model="search" class="search-control" placeholder="搜尋名稱" />
          <div class="btn-open" @click="showAddGroupHdr(true)">
            {{ $t("AddGroups") }}
          </div>
        </div>
      </div>
      <div class="content-main">
        <el-table :data="filterServiceType" id="dragTable" style="width: 100%; height: 100%; " :cell-style="rowStyle"
          :header-cell-style="headerRowStyle">
          <el-table-column prop="sgTitle" label="群組名稱" min-width="60%" />
          <el-table-column prop="sIdList.length" label="服務數量" min-width="20%" align="center"/>
          <el-table-column label="操作" min-width="20%">
            <template #default="scope">
              <div class="handle-drag">
                <el-icon>
                  <Sort />
                </el-icon>
                <img class="edit_img" :src="Icon_edit" style=" width: 27px; margin:0px 10px ;"
                  @click="selectDataFn(scope.row)" />
                <img class="del_img" :src="Icon_del" @click="deleteHdr(scope.$index, filterServiceType[scope.$index])" />
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
  <AddGroupServiceUI v-if="showAddGroup" :showAddForm="showAddGroupHdr" />
  <EditGroupServiceUI v-if="showEditGroup" :showEditForm="showEditGroupHdr" :selData="selectDataRef" />
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { useApptStore } from "@/stores/apptStore";
import { Sort } from '@element-plus/icons-vue'
import Icon_edit from "@/assets/Ico_edit.svg";
import Icon_del from "@/assets/Icon material-delete.svg";
import Sortable from "sortablejs";
import Alert from "@/components/alertCmpt";

let store = useApptStore();
let { serviceGroupList } =
  storeToRefs(store);
let {
  getServiceGroupApi,
  delServiceGroupApi,
  updateGroupOrderApi,
} = store;

let showAddGroup = ref(false);
let showEditGroup = ref(false);


let search = ref("");
let filterServiceType: any = computed(() =>
  serviceGroupList.value.filter(getServiceFn)
);
function getServiceFn(data: any) {
  let Sdata = (
    !search.value ||
    data.nameTw.toLowerCase().includes(search.value.toLowerCase())
  );

  return Sdata;
}
onBeforeFn();
function onBeforeFn() {
  getServiceGroupsFn();
}

function getServiceGroupsFn(data: any = 0) {
  serviceGroupList.value = [];
  getServiceGroupApi();
}

onMounted(() => {
  // console.log('onMounted');
  setSort()
});
function setSort() {
  const el = document.querySelector('#dragTable table tbody')
  new Sortable(el, {
    sort: true,
    handle: '.handle-drag',
    ghostClass: 'sortable-ghost',
    onEnd: (e: any) => {
      const targetRow = filterServiceType.value.splice(e.oldIndex, 1)[0]
      filterServiceType.value.splice(e.newIndex, 0, targetRow)
      OrderGroupFn();
    },
  })
}
function OrderGroupFn() {
  let orderApiData = [];
  for (let i = 0; i < filterServiceType.value.length; i++) {
    const element = filterServiceType.value[i];
    element.order = i;
    orderApiData.push({
      sgId: element.sgId,
      order: i
    })
  }
  console.log(filterServiceType.value);
  console.log(orderApiData);

  updateGroupOrderApi(orderApiData).then((res: any) => {
    getServiceGroupsFn();
  });
}

let selItem: any = [];
//新增分類-顯示
let showAddGroupHdr = (state: boolean) => {
  showAddGroup.value = state;
  if (!state)
    getServiceGroupsFn();
};
//新增分類-顯示
let showEditGroupHdr = (state: boolean) => {
  showEditGroup.value = state;
  if (!state)
    getServiceGroupsFn();
};

//刪除課程
let deleteHdr = (index: number, item: any) => {
  Alert.check("是否刪除", 1000, (data: any) => {
    onDeleteAlertBtn(data, item.sgId)
  });
};
let selectDataRef = ref([])
function selectDataFn(params: any) {
  selectDataRef = params;
  showEditGroupHdr(true);
}

const onDeleteAlertBtn = (state: any, id: any) => {
  if (state) {
    delServiceGroupApi(id).then((res: any) => { getServiceGroupsFn(); });
  } else {
    console.log("取消刪除");
  }
  selItem.value = [];
};
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
//排序明細
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
      width: 100%;
      height: calc(100% );

      >el-table {
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

        >thead {
          display: inline-table;
          width: 100%;

          >tr>td:nth-child(1) {
            width: 70%;
          }

          >tr>td:nth-child(2) {
            width: 20%;
          }

          >tr>td:nth-child(3) {
            width: 10%;
          }
        }

        >tbody {
          overflow-y: scroll;
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

                .edit_img {
                  height: 27px;
                  height: 27px;
                }

                .delete_img {
                  width: 21px;
                  height: 27px;
                }
              }

              >input {}

              .checked_status {
                width: 27px;
                height: 27px;
                display: flex;
                justify-content: center;
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

            .checkbox_state {
              [type="checkbox"] {
                width: 2rem;
                height: 2rem;
                color: #84715c;
                vertical-align: middle;
                -webkit-appearance: none;
                background: none;
                border: 0;
                outline: 0;
                flex-grow: 0;
                border-radius: 50%;
                background-color: #ffffff;
                transition: background 300ms;
                cursor: pointer;
              }

              /* Pseudo element for check styling */

              [type="checkbox"]::before {
                content: "";
                color: transparent;
                display: block;
                width: inherit;
                height: inherit;
                border-radius: inherit;
                border: 0;
                background-color: transparent;
                background-size: contain;
                box-shadow: inset 0 0 0 1px #ccd3d8;
              }

              /* Checked */

              [type="checkbox"]:checked {
                background-color: currentcolor;
              }

              [type="checkbox"]:checked::before {
                box-shadow: none;
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E %3Cpath d='M15.88 8.29L10 14.17l-1.88-1.88a.996.996 0 1 0-1.41 1.41l2.59 2.59c.39.39 1.02.39 1.41 0L17.3 9.7a.996.996 0 0 0 0-1.41c-.39-.39-1.03-.39-1.42 0z' fill='%23fff'/%3E %3C/svg%3E");
              }

              /* Disabled */

              [type="checkbox"]:disabled {
                background-color: #ccd3d8;
                opacity: 0.84;
                cursor: not-allowed;
              }

              /* IE */

              [type="checkbox"]::-ms-check {
                content: "";
                color: transparent;
                display: block;
                width: inherit;
                height: inherit;
                border-radius: inherit;
                border: 0;
                background-color: transparent;
                background-size: contain;
                box-shadow: inset 0 0 0 1px #ccd3d8;
              }

              [type="checkbox"]:checked::-ms-check {
                box-shadow: none;
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E %3Cpath d='M15.88 8.29L10 14.17l-1.88-1.88a.996.996 0 1 0-1.41 1.41l2.59 2.59c.39.39 1.02.39 1.41 0L17.3 9.7a.996.996 0 0 0 0-1.41c-.39-.39-1.03-.39-1.42 0z' fill='%23fff'/%3E %3C/svg%3E");
              }
            }
          }

          >tr>td:nth-child(1) {
            width: 70%;
          }

          >tr>td:nth-child(2) {
            width: 20%;
          }

          >tr>td:nth-child(3) {
            width: 10%;
          }
        }
      }
    }
  }


}
</style>