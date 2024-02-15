<script setup lang="ts">
import { useMemberStore } from "@/stores/member";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
import { showErrorMsg, showHttpsStatus } from "@/types/IMessage";

const memberStore = useMemberStore();
const { createMemberData, editMemberData, groupListData, getGroupData } =
  memberStore;
const alertState = ref(false);
const alertInformation = reactive({
  messageText: "", // 提示內容
  buttonState: 0, //按鈕顯示狀態 0:全部 1:只顯示確定按鈕 2:不顯示按鈕
  timerVal: 0, //時間計時器
});
const title = ref("新增顧客");

const newMember: any = reactive({
  userId: 0,
  email: "",
  phone: "",
  nameFirst: "",
  nameLast: "",
  nameView: "",
  birthday: "",
  sex: 1,
  poto: "",
  memo: "",
  FromWhere: 0,
  groupList: [],
});

const props = defineProps<{
  selectMemberItem: any;
  handAddMemberView: Function;
}>();

const handAlertView = (msg: string, btnState: number, timer: number) => {
  alertInformation.messageText = msg;
  alertInformation.buttonState = btnState;
  alertInformation.timerVal = timer;
  alertState.value = !alertState.value;
};
const state: any = reactive({
  form_items: {
    name: {
      label: "姓名",
      component: "input",
      type: "text",
      icon: "fa-solid fa-user",
      placeholder: "請輸入名稱",
      is_readonly: false,
      value: "",
      tip: "",
      rules: {
        required: {
          warn: "此項目為必填",
        },
      },
      is_error: false,
      warn: "",
      is_show: true,
    },
    email: {
      label: "信箱",
      component: "input",
      type: "text",
      icon: "fa-solid fa-user",
      placeholder: "輸入使用者信箱",
      is_readonly: false,
      value: "",
      tip: "",
      rules: {
        required: {
          warn: "此項目為必填",
        },
        email: {
          warn: "email格式不符",
        },
      },
      is_error: false,
      warn: "",
      is_show: true,
    },
    cellphone: {
      label: "手機",
      component: "input",
      type: "text",
      icon: "fas fa-mobile-alt",
      is_readonly: false,
      value: "",
      tip: "",
      rules: {
        required: {
          warn: "此項目為必填",
        },
        cellphone: {
          warn: "手機格式錯誤",
        },
      },
      is_error: false,
      warn: "",
      is_show: true,
    },
  },
});
let { form_items } = toRefs(state);
const verify_methods: any = {
  required(component: any) {
    if (!component.value) {
      component.is_error = true;
      component.warn = component.rules.required?.warn || "";
      return false;
    } else {
      component.is_error = false;
      component.warn = "";
      return true;
    }
  },
  cellphone(component: any) {
    let rep = /^(09)[0-9]{8}$/;
    if (!rep.test(component.value)) {
      component.is_error = true;
      component.warn = component.rules.cellphone?.warn || "";
      return false;
    } else {
      component.is_error = false;
      component.warn = "";
      return true;
    }
  },
  email(component: any) {
    let rep = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!rep.test(component.value)) {
      component.is_error = true;
      component.warn = component.rules.email?.warn || "";
      return false;
    } else {
      component.is_error = false;
      component.warn = "";
      return true;
    }
  },
  capital(component: any) {
    const stringArray = component.value.split("");
    let capitalState = false;
    stringArray.forEach((t: any) => {
      if (/[A-Z]/.test(t)) {
        component.is_error = false;
        component.warn = "";
        capitalState = true;
      }
    });
    if (!capitalState) {
      component.is_error = true;
      component.warn = component.rules.capital?.warn || "";
    }
    return capitalState;
  },
  special(component: any) {
    let rep = new RegExp(
      "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"
    );
    if (rep.test(component.value)) {
      component.is_error = false;
      component.warn = "";
      return true;
    } else {
      component.is_error = true;
      component.warn = component.rules.special?.warn || "";
      return false;
    }
  },
  length(component: any) {
    if (
      component.value.length < (component.rules.length?.min || 0) ||
      component.value.length > (component.rules.length?.max || 10000)
    ) {
      component.is_error = true;
      component.warn = component.rules.length?.warn || "";
      return false;
    } else {
      component.is_error = false;
      component.warn = "";
      return true;
    }
  },
};
const verify_all = () => {
  let is_valid = true;
  for (let component in state.form_items) {
    let item = state.form_items[component];
    if (component == "password" && item.value == undefined) {
      break;
    }
    for (let rule in item.rules) {
      if (!verify_methods[rule](item)) {
        is_valid = false;
        break;
      }
    }
  }
  return is_valid;
};

const handSubmit = () => {
  if (!verify_all()) return;
  newMember.email = state.form_items.email.value;
  newMember.nameFirst = state.form_items.name.value;
  newMember.phone = state.form_items.cellphone.value;
  newMember.birthday = newMember.birthday.split("T")[0];
  if (props.selectMemberItem) {
    newMember.nameView = newMember.nameFirst;
    editMemberData(newMember)
      .then((res) => {
        if (res.state == 1) {
          handAlertView("修改成功", 2, 1);
          setTimeout(() => {
            props.handAddMemberView();
          }, 1000);
        } else {
          handAlertView(showErrorMsg(res.msg), 2, 1);
        }
      })
      .catch((e: any) => {
        handAlertView(showHttpsStatus(e.response.status), 2, 1);
      });
  } else {
    newMember.nameView = newMember.nameFirst;
    createMemberData(newMember)
      .then((res) => {
        if (res.state == 1) {
          handAlertView("新增成功", 2, 1);
          setTimeout(() => {
            props.handAddMemberView();
          }, 1000);
        } else {
          handAlertView(showErrorMsg(res.msg), 2, 1);
        }
      })
      .catch((e: any) => {
        handAlertView(showHttpsStatus(e.response.status), 2, 1);
      });
  }
};

onMounted(() => {
  getGroupData();
  if (props.selectMemberItem) {
    newMember.userId = props.selectMemberItem.userId;
    state.form_items.email.value = props.selectMemberItem.email;
    state.form_items.cellphone.value = props.selectMemberItem.phone;
    state.form_items.name.value = props.selectMemberItem.nameFirst;
    newMember.nameLast = props.selectMemberItem.nameLast;
    newMember.nameView = props.selectMemberItem.nameView;
    newMember.birthday = props.selectMemberItem.birthday;
    newMember.sex = props.selectMemberItem.sex;
    newMember.poto = props.selectMemberItem.poto;
    newMember.memo = props.selectMemberItem.memo;
    newMember.groupList = props.selectMemberItem.groupList;
    title.value = "修改顧客";
  }
});
</script>

<template>
  <div class="popup-mask" v-on:click.self="handAddMemberView()">
    <!-- 提示弹窗 -->
    <div class="popup-content">
      <h1>{{ title }}</h1>
      <div>
        <span>姓名</span>
        <div>
          <input class="input-name-first" v-model="form_items.name.value" />
          <p v-if="form_items.name.is_error">{{ form_items.name.warn }}</p>
        </div>

        <!-- <input class="input-name-last" v-model="newMember.nameLast" /> -->
      </div>
      <div>
        <span>性別</span>
        <div>
          <label><input type="radio" name="gender" value="1" v-model="newMember.sex" />男</label>
          <label><input type="radio" name="gender" value="0" v-model="newMember.sex" />女</label>
        </div>
      </div>
      <div>
        <span>標籤</span>
        <div style="height: 30px;">
          <el-select v-model="newMember.groupList" value-key="groupId" multiple collapse-tags collapse-tags-tooltip
            style="width: 100%" size="large">
            <el-option v-for="item in groupListData.data" :key="item.groupId" :label="item.label" :value="item" />
          </el-select>
          <!-- <multiselect
            v-model="newMember.groupList"
            :options="groupListData.data"
            :multiple="true"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            placeholder=""
            label="label"
            track-by="groupId"
            :preselect-first="false"
            :maxHeight="200"
          >
          </multiselect> -->
        </div>
      </div>
      <div>
        <span>電話</span>
        <div>
          <input v-model="form_items.cellphone.value" />
          <p v-if="form_items.cellphone.is_error">
            {{ form_items.cellphone.warn }}
          </p>
        </div>
      </div>
      <div>
        <span>生日</span>
        <div><input type="date" v-model="newMember.birthday" /></div>
      </div>
      <div>
        <span>信箱</span>
        <div>
          <input type="email" v-model="form_items.email.value" />
          <p v-if="form_items.email.is_error">{{ form_items.email.warn }}</p>
        </div>
      </div>
      <div>
        <span>備註</span>
        <div><textarea v-model="newMember.memo"></textarea></div>
      </div>

      <button class="sub-btn" type="submit" v-on:click="handSubmit()">確認</button>

    </div>
  </div>
  <Alert v-if="alertState" :alert-information="alertInformation" :hand-alert-view="handAlertView"></Alert>
</template>

<style scoped lang="scss">
.popup-mask {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 3;
  background: rgba(255, 255, 255, 0.5);

  display: flex;
  align-items: center;
  justify-content: space-around;

  .popup-content {
    max-width: 360px;
    background-color: #e6e2de;
    padding: 15px 50px;
    font-size: 20px;
    font-family: HeitiTC;
    color: #84715c;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;

    >h1 {
      text-align: center;
      font-size: 20px;
    }

    >div {
      //   margin-top: 15px;
      display: flex;
      // justify-content: end;
      margin: 10px;
      width: 90%;

      >span {
        min-width: 40px;
        margin: 3px 10px;
      }

      >div {
        position: relative;
        flex: 1;

        >input {
          max-width: 200px;
          height: 30px;
          text-align: center;
          border-radius: 6px;
          border: solid 1px #707070;
        }

        >label {
          margin: 0 10px;
        }

        >p {
          position: absolute;
          margin: 0 0 0 0;
          font-size: 12px;
          color: red;
        }

        >textarea {
          width: 200px;
          height: 100px;
          // text-align: center;
          border-radius: 6px;
          border: solid 1px #707070;
        }

        >input::placeholder {
          color: #e6e2de;
        }

        // >.input-name-first {
        //     width: 40px;
        // }

        >.input-name-last {
          margin: 0 5px;
          // width: 40px;
        }

        >.multiselectcheckbox {
          max-width: 320px;
          border-radius: 6px;
          border: solid 1px #707070;
        }
      }
    }

    >.sub-btn {
      width: 72px;
      padding: 10px 10px;
      font-size: 20px;
      color: #84715c;
      border-radius: 10px;
      background-color: #faf9f8;
      border: solid 1px #707070;
    }
  }
}
</style>