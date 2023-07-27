<template>
  <div class="popup-mask" v-on:click.self="showCGroupsUIFn(false)">
    <div class="popup-content">
      <div class="top-content">
        <p>加入服務</p>
      </div>
      <div class="main-content">
        <p>已選擇({{ formInputRef.groups.length }})項服務</p>
        <input v-model="formInputRef.search" />
        <div class="div-item">
          <div>
            <label class="label-group">
              <input
                class="input-group"
                type="checkbox"
                id="pgId"
                value="item"
                v-model="clickGoodssGroupRef"
                @click="clickGoodssGroup"
              />
              <label for="pgId"></label>
              <span> 全選(商品) </span>
            </label>
          </div>
          <div v-for="item in filterGoodsTypesData" :key="item">
            <label class="label-item" :value="item">
              <input
                class="input-item"
                type="checkbox"
                :key="item.pgId"
                :id="item.pgId"
                :value="item"
                v-model="formInputRef.groups"
                @click="clickItem"
              />
              <label :for="item.pgId"></label>
              <div>
                <span value="{{item}}" name="{{item.pgTitle}}">{{
                  item.pgTitle
                }}</span>
              </div>
            </label>
            <!-- <input type="checkbox" name="item_001" value="1" />1 -->
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
import search_ico from "@/assets/images/icon_search.png";

let store = useApptStore();
let { courseTypesTabs, goodsTypesListRef } = storeToRefs(store);
let { getGoodsTypeApi } = store;

const props = defineProps<{
  showCGroupsUIFn: Function;
  getDataFn: Function;
  selData: any;
}>();
let clickServicesGroupRef = ref(false);
let clickGoodssGroupRef = ref(false);

let formInputRef: any = ref({
  name: "",
  search: "",
  service: [],
  groups: [],
});
onBeforeFn();
function onBeforeFn() {
  // getCourseTypeApi();
  formInputRef.value.groups = [];
  getGoodsTypeApi().then((res: any) => {
    for (let i = 0; i < props.selData.length; i++) {
      const eleSelData = props.selData[i];
      //pgId原本  pGid編輯數據名稱不同
      eleSelData.pgId = eleSelData.pgId ? eleSelData.pgId : eleSelData.pGid;
      for (let j = 0; j < goodsTypesListRef.value.length; j++) {
        const eleData = goodsTypesListRef.value[j];
        if (eleSelData.pgId == eleData.pgId) {
          formInputRef.value.groups.push(eleData);
        }
      }
    }
  });
}

let filterCourseTypesData: any = computed(() => {
  let mixData: any = courseTypesTabs.value;
  return mixData.filter(function (item: any) {
    return item.lessonTypeId != 0; // 取得陣列中雙數的物件
  });
});
let filterGoodsTypesData: any = computed(() => {
  let mixData: any = goodsTypesListRef.value;
  return mixData.filter(function (item: any) {
    return item.pgId != 0; // 取得陣列中雙數的物件
  });
});
function clickGoodssGroup() {
  let curGoods = formInputRef.value.groups;
  if (curGoods.length > 0) {
    formInputRef.value.groups = [];
  } else {
    for (let i = 0; i < filterGoodsTypesData.value.length; i++) {
      const element = filterGoodsTypesData.value[i];
      formInputRef.value.groups.push(element.pgId);
    }
  }
}

watchEffect(() => {
  clickServicesGroupRef.value = formInputRef.value.service.length > 0;
  clickGoodssGroupRef.value = formInputRef.value.groups.length > 0;
});

function clickItem() {
  // console.log(formInputRef.value.courses);
}

function submitBtn() {
  let curGoodsData = formInputRef.value.groups;

  props.getDataFn(curGoodsData);
  props.showCGroupsUIFn(false);
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
      > p {
        display: flex;
        justify-content: center;
      }
    }
    .main-content {
      display: block;
      > p {
        display: flex;
        justify-content: center;
      }
      > input {
        width: 97%;
      }
      .div-item {
        width: 100%;
        height: 250px;
        overflow-y: auto;
        > div {
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
            > label {
              display: inline-block;
              width: 20px;
              height: 20px;
              border-radius: 5px;
              border: 1px solid #8b6f6d;
              position: relative;
              cursor: pointer;
            }
            > label::before {
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
            > input:checked + label {
              background: #8b6f6d;
            }
            > input:checked + label::before {
              opacity: 1;
              transform: all 0.5s;
            }

            > span {
              margin-left: 10px;
            }
            > div {
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
            input:checked + label {
              background: #8b6f6d;
            }
            input:checked + label::before {
              opacity: 1;
              transform: all 0.5s;
            }

            > span {
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
      > button {
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
