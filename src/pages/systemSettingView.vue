<script setup lang="ts">
import Icon from "@/assets/Icon material-settings.svg";
import InfoIcon from "@/assets/Icon ionic-ios-list-box.svg";
import editIcon from "@/assets/Icon awesome-edit.svg";
import { useCounterStore } from "@/stores/manager";
import { storeToRefs } from "pinia";
const store = useCounterStore();
const { adminList, roleList } = storeToRefs(store);
const { getAdminList, getRoleList } = store;
const currentIndex = ref(0);
const addAdminManagerView = ref(false);
const selectAdminItem = ref();
const addRoleManagerView = ref(false);
const selectRoleItem = ref();
const addRoleInfoView = ref(false);
// const selectRoleItem = ref();
const keyWord = ref("");
const props = defineProps<{
  memuState: any;
  handmemuStateBtn: Function;
}>();
const changeTab = (index: number) => {
  currentIndex.value = index;
};
const handAddAdminManagerView = (item: any) => {
  selectAdminItem.value = item;
  addAdminManagerView.value = !addAdminManagerView.value;
};
const handAddRoleManagerView = (item: any) => {
  selectRoleItem.value = item;
  addRoleManagerView.value = !addRoleManagerView.value;
};
const handRoleInfoManagerView = (item: any) => {
  selectRoleItem.value = item;
  addRoleInfoView.value = !addRoleInfoView.value;
};
const filterAdminListData = computed(() => {
  const filter = adminList.value.data.filter(getAdminListFn);
  return filter;
});
const getAdminListFn = (data: any) => {
  return (
    !keyWord.value ||
    data.nameView.toLowerCase().includes(keyWord.value.toLowerCase())
  );
};
const filterRoleListData = computed(() => {
  const filter = roleList.value.data.filter(getAdminListFn);
  return filter;
});
const getRoleListFn = (data: any) => {
  return (
    !keyWord.value ||
    data.nameView.toLowerCase().includes(keyWord.value.toLowerCase())
  );
};
onMounted(() => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  let allAamin = {
    id: 0,
    pageindex: 0,
    count: 0,
  };
  getAdminList(allAamin);
  getRoleList(allAamin);
});
</script>

<template>
  <div class="container">
    <Header
      :Icon="Icon"
      :moduleType="'系統設定'"
      :memuState="props.memuState"
      :handmemuStateBtn="props.handmemuStateBtn"
    ></Header>
    <div class="customer-tab">
      <div class="item-tab">
        <button
          :class="currentIndex == 0 ? 'active' : ''"
          v-on:click="changeTab(0)"
        >
          系統管理員
        </button>
        <button
          :class="currentIndex == 1 ? 'active' : ''"
          v-on:click="changeTab(1)"
        >
          站台角色
        </button>
      </div>
      <div :class="currentIndex != 0 ? 'current' : ''">
        <table>
          <thead class="header-tab">
            <tr>
              <th>
                <p>管理員</p>
              </th>
              <th>
                <p>狀態</p>
              </th>
              <th>
                <input v-model="keyWord" />
              </th>
              <th>
                <button
                  class="header-btn"
                  v-on:click="handAddAdminManagerView('')"
                >
                  新增管理員
                </button>
              </th>
            </tr>
          </thead>
          <tbody class="content-tab">
            <tr v-for="item in filterAdminListData" :key="item.managerId">
              <td>
                <!-- <img :src="Icon" />
                <div> -->
                <p>{{ item.nameView }}</p>
                <!-- <p>{{ item.phone }}</p> -->
                <!-- </div> -->
              </td>
              <td>
                <p v-if="item.userLock">正常</p>
                <p v-if="!item.userLock">凍結</p>
              </td>
              <td>
                <!-- <p>{{ item.userLock }}</p> -->
              </td>
              <td class="td-btn">
                <button
                  class="header-btn"
                  v-on:click="handAddAdminManagerView(item)"
                >
                  <img :src="editIcon" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div :class="currentIndex != 1 ? 'current' : ''">
        <table>
          <thead class="header-tab">
            <tr>
              <th>
                <p>角色</p>
              </th>
              <th>
                <p>備註</p>
              </th>
              <th>
                <input v-model="keyWord" />
              </th>
              <th>
                <button class="header-btn" v-on:click="handAddRoleManagerView('')">
                  新增站台角色
                </button>
              </th>
            </tr>
          </thead>
          <tbody class="content-tab">
            <tr v-for="item in filterRoleListData" :key="item.roleId">
              <td>
                <p>{{ item.label }}</p>
              </td>
              <td>
                <p>{{ item.memo }}</p>
              </td>
              <td>
                <!-- <p>{{ item.userLock }}</p> -->
              </td>
              <td class="td-btn">
                   <button
                  class="header-btn"
                  v-on:click="handRoleInfoManagerView(item)"
                >
                  <img :src="InfoIcon" />
                </button>
                <button
                  class="header-btn"
                  v-on:click="handAddRoleManagerView(item)"
                >
                  <img :src="editIcon" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <AddAdminManager
    v-if="addAdminManagerView"
    :handAddAdminManagerView="handAddAdminManagerView"
    :selectAdminItem="selectAdminItem"
  />
  <AddRoleManager
    v-if="addRoleManagerView"
    :handAddRoleManagerView="handAddRoleManagerView"
    :selectRoleItem="selectRoleItem"
  />
   <RoleInfo
    v-if="addRoleInfoView"
    :handRoleInfoManagerView="handRoleInfoManagerView"
    :selectRoleItem="selectRoleItem"
  />
</template>

<style scoped lang="scss">
.container {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  position: relative;

  > .customer-tab {
    position: absolute;
    top: 80px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    margin: 2px 40px;

    > .item-tab {
      position: absolute;
      top: 0px;
      bottom: 0px;
      left: 0px;
      right: 0px;
      display: flex;

      > button {
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        width: 160px;
        height: 45px;
        border-radius: 10px 10px 0 0;
        background-color: #faf9f8;
        font-size: 20px;
        font-weight: bold;
        font-family: HeitiTC;
        color: #717171;
      }

      > button.active {
        background-color: #e6e2de;
      }
    }

    > div {
      position: absolute;
      top: 45px;
      bottom: 10px;
      left: 0px;
      right: 0px;

      > table {
        width: 100%;
        height: 100%;
        background-color: #faf9f8;
        border: solid 0.5px #ddd;
        font-family: STXihei;
        color: #717171;

        > .header-tab {
          display: block;
          height: 50px;
          color: #717171;
          border: solid 1px #707070;
          background-color: #e6e2de;
          box-sizing: border-box;

          > tr {
            display: flex;
            align-items: center;
            height: 100%;
            justify-content: space-between;
            margin: 0 10px;

            > th {
              width: 25%;

              > p {
                min-width: 78px;
                text-align: left;
              }

              > input {
                // width: 134px;
                width: 60%;
                height: 30px;
                border-radius: 6px;
                border: solid 1px #707070;
                background-color: #fff;
                margin-right: 10px;
              }
              > button {
                border-radius: 6px;
                height: 30px;
                min-width: 78px;
                border: solid 1px #707070;
                background-color: #84715c;
                color: #fff;
              }
            }
          }
        }

        > .content-tab {
          position: absolute;
          width: 100%;
          top: 52px;
          bottom: 0px;
          overflow: auto;
          display: flex;
          flex-direction: column;

          tr {
            display: flex;
            padding: 5px 0;
            align-items: center;
            justify-content: space-between;
            border-bottom: 2px #717171 solid;
            > td {
              display: flex;
              width: 25%;

              > img {
                padding: 0 10px;
              }

              > button {
                height: 100%;
                background-color: transparent;
                border: none;
                padding: 0 0 0 0;
                margin: 0 2px;

                > img {
                  cursor: pointer;
                  width: 40px;
                  height: 40px;
                  vertical-align: middle;
                }
              }

              > div {
                > p {
                  cursor: pointer;
                  margin: 0 0;
                }
              }
            }

            .td-btn {
              justify-content: center;
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
</style>