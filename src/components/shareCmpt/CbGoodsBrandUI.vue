<template>
  <div class="popup-mask" v-on:click.self="showCbUIFn(false)">
    <div class="popup-content">
      <div class="top-content">
        <p>加入品牌</p>
      </div>
      <div class="main-content">
        <p>已選擇({{ formInputRef.groups.length }})項品牌</p>
        <input v-model="formInputRef.search" />
        <div class="div-item">
          <div>
            <label class="label-group">
              <input class="input-group" type="checkbox" id="pbId" value="item" v-model="clickGoodssBrandRef"
                @click="clickGoodssBrand" />
              <label for="pbId"></label>
              <span> 全選(品牌) </span>
            </label>
          </div>
          <div v-for="item in filterGoodsBrandData" :key="item.pbId">
            <label class="label-item" :value="item">
              <input class="input-item" type="checkbox" :id="'CheckboxBrand_' + item.pbId" :key="item.pbId"
                :value="item.pbId" v-model="formInputRef.groups" @click="clickItem" />
              <label :for="'CheckboxBrand_' + item.pbId"></label>
              <div>
                <span value="{{item}}" name="{{item.pbTitle}}">{{
                  item.pbTitle
                }}</span>
              </div>
            </label>
            <!-- <input type="checkbox" name="item_001" value="1" />1 -->
          </div>
        </div>
      </div>
      <div class="bottom-content">
        <button class="submit-btn" @click="submitBtn()">確認</button>
        <button class="cancle-btn" @click="showCbUIFn(false)">取消</button>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useApptStore } from "@/stores/apptStore";
import search_ico from "@/assets/images/icon_search.png";

let store = useApptStore();
let { goodsBrandListRef } = storeToRefs(store);
let { getGoodsBrandApi } = store;

const props = defineProps<{
  showCbUIFn: Function;
  getDataFn: Function;
  selData: any;
}>();
let clickServicesBrandRef = ref(false);
let clickGoodssBrandRef = ref(false);

let formInputRef: any = ref({
  name: "",
  search: "",
  service: [],
  groups: [],
});
onBeforeFn();
function onBeforeFn() {
  // getCourseTypeApi();
  getGoodsBrandApi().then((res: any) => {

  });
  formInputRef.value.groups = [];
  for (let i = 0; i < props.selData.length; i++) {
    const eleSelData = props.selData[i];
    //pbId原本  pGid編輯數據名稱不同
    eleSelData.pbId = eleSelData.pbId ? eleSelData.pbId : eleSelData.pGid;
    formInputRef.value.groups.push(eleSelData.pbId);
  }
}

let filterCourseTypesData: any = computed(() => {
  let mixData: any = goodsBrandListRef.value;
  return mixData.filter(function (item: any) {
    return item.lessonTypeId != 0; // 取得陣列中雙數的物件
  });
});
let filterGoodsBrandData: any = computed(() => {
  let mixData: any = goodsBrandListRef.value;
  return mixData.filter(function (item: any) {
    return item.pbId != 0; // 取得陣列中雙數的物件
  });
});
function clickGoodssBrand() {
  let curGoods = formInputRef.value.groups;
  if (curGoods.length > 0) {
    formInputRef.value.groups = [];
  } else {
    for (let i = 0; i < filterGoodsBrandData.value.length; i++) {
      const element = filterGoodsBrandData.value[i];
      formInputRef.value.groups.push(element.pbId);
    }
  }
}

watchEffect(() => {
  clickServicesBrandRef.value = formInputRef.value.service.length > 0;
  clickGoodssBrandRef.value = formInputRef.value.groups.length > 0;
});

function clickItem() {
}

function submitBtn() {
  let curGoodsData = formInputRef.value.groups;
  let curPbItemList = [];
  for (let i = 0; i < formInputRef.value.groups.length; i++) {
    const eleSel = formInputRef.value.groups[i];
    for (let j = 0; j < filterGoodsBrandData.value.length; j++) {
      const eleAll = filterGoodsBrandData.value[j];
      if (eleSel == eleAll.pbId) {
        curPbItemList.push(eleAll)
      }
    }
    // curPgItemList.push(hasGoodsBrandFn(eleSel))
  }
  props.getDataFn(curPbItemList, curGoodsData);
}
function hasGoodsBrandFn(pbId: any) {
  return (item: any) => item.pbId === pbId;
}

</script>
  
<style scoped lang="scss">
.popup-mask {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1003;
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
  