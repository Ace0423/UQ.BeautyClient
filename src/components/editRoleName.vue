<script setup lang="ts">
import { useManagerStore } from "@/stores/manager";
import { storeToRefs } from "pinia";
import Alert from "@/components/alertCmpt";
import { showHttpsStatus, showErrorMsg } from "@/types/IMessage";
import { useCounterStore } from "@/stores/counter";
const counterStore = useCounterStore();
const { handLogOut } = counterStore;
const managerStore = useManagerStore();
const { editRoleData } = managerStore;
const { roleList } = storeToRefs(managerStore);
const title = ref("調整權限名稱");
const roleNameList: any = reactive([]);
const props = defineProps<{
  handEditRoleNameView: Function;
}>();


const handSubmit = () => {
  editRoleData(roleNameList)
    .then((res: any) => {
      if (res.state == 1) {
        Alert.warning('修改成功', 2000);
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

onMounted(() => {
  for (let index = 0; index < roleList.value.data.length; index++) {
    let roleName = {
      name: roleList.value.data[index].label,
      memo: roleList.value.data[index].memo,
      Id: roleList.value.data[index].roleId
    }
    roleNameList.push(roleName);
  }
});
</script>

<template>
  <div class="popup-mask" v-on:click.self="handEditRoleNameView()">
    <!-- 提示弹窗 -->
    <div class="popup-content">
      <h1>{{ title }}</h1>
      <div class="content" v-for="item in roleNameList" :key="item.roleId">
        <div class="labe-txt">
          <p>{{ item.name }}</p>
        </div>
        <div class="edit-name">
          <input v-model="item.memo" />
        </div>
      </div>
      <button class="btn" type="submit" v-on:click="handSubmit()">確認儲存</button>
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
    width: 40%;
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

    >.content {
      display: flex;
      background-color: #faf9f8;
      border: solid 0.5px #ddd;

      >.labe-txt {
        width: 30%;
      }

      >.edit-name {
        display: flex;
        width: 70%;

        >input {
          display: inline-block;
          width: 100%;
          border: transparent
        }
      }
    }

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
</style>