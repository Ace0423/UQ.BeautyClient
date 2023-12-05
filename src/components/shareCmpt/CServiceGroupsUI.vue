<template>
  <div class="popup-mask" v-on:click.self="showCGroupsUIFn(false)">
    <div class="popup-content">
      <div class="top-content">
        <p>加入服務</p>
      </div>
      <div class="main-content">
        <p>已選擇({{ formInputRef.serviceGroups.length }})項服務</p>
        <input v-model="formInputRef.search" />
        <div class="div-item">
          <div>
            <label class="label-group">
              <input class="input-group" type="checkbox" id="allCService" value="item" v-model="clickAllRef"
                @click="clickAll" />
              <label for="allCService"></label>
              <span> 全選(商品) </span>
            </label>
          </div>
          <div v-for="(item, key, index) in filterServiceGroups" :key="index">
            <label class="label-item" :value="item">
              <input type="checkbox" :key="item.sgId.sgId" :id="'CServiceGroups_' + item.sgId" :value="item.sgId"
                v-model="formInputRef.serviceGroups" />
              <label :for="'CServiceGroups_' + item.sgId"></label>
              <div>
                <span value="{{item}}" name="{{item.sgTitle}}">{{
                  item.sgTitle
                }}</span>
              </div>
            </label>
          </div>
        </div>
      </div>
      <div class="bottom-content">
        <button class="submit-btn" @click="submitBtn()">確認</button>
        <button class="cancle-btn" @click="showCGroupsUIFn(false)">取消</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useApptStore } from "@/stores/apptStore";

let store = useApptStore();
let { serviceGroupList } =
  storeToRefs(store);
let {
  getServiceGroupApi,
} = store;

const props = defineProps<{
  showCGroupsUIFn: Function;
  getDataFn: Function;
  selData: any;
}>();
let clickAllRef = ref(false);

let formInputRef: any = ref({
  name: "",
  search: "",
  serviceItems: [],
  serviceGroups: [],
});
onBeforeFn();

function onBeforeFn() {
  // getCourseTypeApi();
  formInputRef.value.groups = [];
  getServiceGroupApi().then((res: any) => {
    formInputRef.value.serviceGroups = props.selData;
  });
}

let filterServiceGroups: any = computed(() =>
  serviceGroupList.value.filter(getRuleFn)
);
function getRuleFn(data: any) {
  return (
    (!formInputRef.value.search ||
      data.sgTitle
        .toLowerCase()
        .includes(formInputRef.value.search.toLowerCase()))
  );
}
function clickAll() {
  let curGoods = formInputRef.value.serviceGroups;
  if (curGoods.length > 0) {
    formInputRef.value.serviceItems = [];
    formInputRef.value.serviceGroups = [];
  } else {
    for (let i = 0; i < filterServiceGroups.value.length; i++) {
      const element = filterServiceGroups.value[i];
      formInputRef.value.serviceGroups.push(element.sgId);
      formInputRef.value.serviceItems.push(element);
    }
  }
}

watchEffect(() => {
  clickAllRef.value = formInputRef.value.serviceGroups.length > 0;
});

function submitBtn() {
  let curGoodsData = formInputRef.value.serviceGroups;
  props.getDataFn(curGoodsData);
}
</script>

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
    width: 325px;
    height: 450px;
    background-color: #e6e2de;
    padding: 15px 50px;
    font-size: 20px;
    font-family: HeitiTC;
    color: #84715c;
    font-weight: bold;

    .top-content {
      display: block;

      >p {
        display: flex;
        justify-content: center;
      }
    }

    .main-content {
      display: block;

      >p {
        display: flex;
        justify-content: center;
      }

      >input {
        width: 97%;
      }

      .div-item {
        width: 100%;
        height: 250px;
        overflow-y: auto;

        >div {
          display: flex;
          align-items: center;
          height: 50px;
          border-bottom: 1px solid #fff;
          width: 100%;

          .label-item {
            display: flex;
            align-items: center;
            width: 100%;
            margin-left: 15px;

            input {
              display: none;
            }

            >label {
              display: inline-block;
              width: 20px;
              height: 20px;
              border-radius: 5px;
              border: 1px solid #8b6f6d;
              position: relative;
              cursor: pointer;
            }

            >label::before {
              display: inline-block;
              content: " ";
              width: 12px;
              border: 2px solid #fff;
              height: 4px;
              border-top: none;
              border-right: none;
              transform: rotate(-45deg);
              top: 5px;
              left: 3px;
              position: absolute;
              opacity: 0;
            }

            >input:checked+label {
              background: #8b6f6d;
            }

            >input:checked+label::before {
              opacity: 1;
              transform: all 0.5s;
            }

            >span {
              margin-left: 10px;
            }

            >div {
              display: grid;
              margin-left: 10px;

              .timer-msg {
                font-size: 15px;
              }
            }
          }

          .label-group {
            display: flex;
            align-items: center;
            width: 100%;
            margin-left: 5px;

            input {
              display: none;
              width: 100%;
            }

            label {
              display: inline-block;
              width: 17px;
              height: 17px;
              border-radius: 5px;
              border: 1px solid #8b6f6d;
              position: relative;
              cursor: pointer;
            }

            label::before {
              display: inline-block;
              content: " ";
              width: 10px;
              border: 2px solid #fff;
              height: 4px;
              border-top: none;
              border-right: none;
              transform: rotate(-45deg);
              top: 4px;
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

            >span {
              margin-left: 10px;
              font-size: 17px;
            }
          }
        }
      }
    }

    .bottom-content {
      display: flex;
      justify-content: center;

      >button {
        position: relative;
        width: 100px;
        height: 45px;
        margin: 10px;
        border-radius: 10px;
        font-size: 20px;
        font-weight: bold;
        color: #717171;
        background-color: #fff;
      }

      .submit-btn {
        display: block;
      }

      .cancle-btn {
        display: block;
      }
    }
  }
}
</style>
