<template>
  <div class="popup-mask" v-on:click.self="showCServiceUIFn(false)">
    <div class="popup-content">
      <div class="top-content">
        <p>加入服務</p>
      </div>
      <div class="main-content">
        <p>已選擇({{ formInputRef.service.length }})項服務</p>
        <input v-model="formInputRef.search" />
        <div class="div-item" >
          <div v-if="filterServiceData.length>0">
            <label class="label-group">
              <input class="input-group" type="checkbox" id="sId" value="item" v-model="clickGroupRef"
                @click="clickAll" />
              <label for="sId"></label>
              <span> 全選 </span>
            </label>
          </div>
          <div v-for="item in filterServiceData" :key="item">
            <label class="label-item" :value="item">
              <input class="input-item" type="checkbox" :id="'CheckboxService_' + item.sId" :value="item.sId"
                v-model="formInputRef.service" @click="clickItem" />
              <label :for="'CheckboxService_' + item.sId"></label>
              <div>
                <span value="{{item}}" name="{{item.name}}">{{
                  item.name
                }}</span>
                <span class="timer-msg" value="{{item}}" name="{{item.name}}">{{ item.servicesTime + " Min" }}</span>
              </div>
            </label>
          </div>
        </div>
      </div>
      <div class="bottom-content">
        <button class="submit-btn" @click="submitBtn()">確認</button>
        <button class="cancle-btn" @click="showCServiceUIFn(false)">
          取消
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useApptStore } from "@/stores/apptStore";
import search_ico from "@/assets/images/icon_search.png";

let store = useApptStore();
let { serviceDetailList } = storeToRefs(store);
let { getServiceDetailApi } = store;

const props = defineProps<{
  showCServiceUIFn: Function;
  getDataFn: Function;
  selData: any;
  //   addDetailTypeID?: any;
}>();
let clickGroupRef = ref(false);

let formInputRef: any = ref({
  name: "",
  search: "",
  service: [],
});
onBeforeFn();
function onBeforeFn() {
  getServiceDetailApi();
  for (let i = 0; i < props.selData.length; i++) {
    const element = props.selData[i];
    element.sId = element.sId ? element.sId : element.lid;
    formInputRef.value.service.push(element.sId);
  }
}

let filterServiceData: any = computed(() =>
  serviceDetailList.value.filter(getRuleFn)
);

function getRuleFn(data: any) {
  return (
    data.display &&
    (!formInputRef.value.search ||
      data.nameTw
        .toLowerCase()
        .includes(formInputRef.value.search.toLowerCase()))
  );
}

function clickAll() {
  let curService = formInputRef.value.service;

  if (curService.length > 0) {
    formInputRef.value.service = [];
  } else {
    for (let i = 0; i < filterServiceData.value.length; i++) {
      const element = filterServiceData.value[i];
      formInputRef.value.service.push(element.sId);
    }
  }
}
watchEffect(() => {
  clickGroupRef.value = formInputRef.value.service.length > 0;
});

function clickItem() {

}

function submitBtn() {
  let curServiceData = [];
  for (let i = 0; i < formInputRef.value.service.length; i++) {
    const element = formInputRef.value.service[i];
    for (let j = 0; j < filterServiceData.value.length; j++) {
      const element2 = filterServiceData.value[j];
      let Lid = element2.pId ? element2.pId : element2.sId;
      if (Lid == element) {
        element2.giftTotal = 1;
        curServiceData.push(element2);
        break;
      }
    }
  }
  props.getDataFn(curServiceData);
}
</script>

<style scoped lang="scss">
.popup-mask {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1003;
  background: rgba(255, 255, 255, 0.5);

  display: flex;
  align-items: center;
  justify-content: center;

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

        // overflow: hidden;
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
}</style>
