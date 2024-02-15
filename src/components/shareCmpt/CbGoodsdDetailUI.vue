<template>
  <div class="popup-mask" v-on:click.self="showCGoodsUIFn(false)">
    <div class="popup-content">
      <div class="top-content">
        <p>加入商品</p>
      </div>
      <div class="main-content">
        <p>已選擇({{ formInputRef.goods.length }})項服務</p>
        <input v-model="formInputRef.search" />
        <div class="div-item">
          <div>
            <label class="label-group">
              <input class="input-group" type="checkbox" id="pId" value="item" v-model="clickGroupRef"
                @click="clickGroup" />
              <label for="pId"></label>
              <span> 全選 </span>
            </label>
          </div>
          <div v-for="item in filterGoodsData" :key="item">
            <label class="label-item" :value="item">
              <input class="input-item" type="checkbox" :key="item" :id="'CheckboxGoods_' + item.pId" :value="item.pId"
                v-model="formInputRef.goods" @click="clickItem(item, item.pId)" />
              <label :for="'CheckboxGoods_' + item.pId"></label>
              <div>
                <span value="{{item}}" name="{{item.pName}}">{{
                  item.pName
                }}</span>
                <span class="pCode-msg" value="{{item}}" name="{{item.pName}}">{{ item.pCode }}</span>
              </div>
            </label>
            <!-- <input type="checkbox" name="item_001" value="1" />1 -->
          </div>
        </div>
      </div>
      <div class="bottom-content">
        <button class="submit-btn" @click="submitBtn()">確認</button>
        <button class="cancle-btn" @click="showCGoodsUIFn(false)">取消</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useApptStore } from "@/stores/apptStore";
import search_ico from "@/assets/images/icon_search.png";

let store = useApptStore();
let { goodsDetailListRef } = storeToRefs(store);
let { getGoodsDetailApi } = store;

const props = defineProps<{
  showCGoodsUIFn: Function;
  getDataFn: Function;
  selData: any;
  //   addDetailTypeID?: any;
}>();
let clickGroupRef = ref(false);

let formInputRef: any = ref({
  name: "",
  search: "",
  goods: [],
});

onBeforeFn();
function onBeforeFn() {
  getGoodsDetailApi(0);
  for (let i = 0; i < props.selData.length; i++) {
    const element = props.selData[i];
    element.pId = element.pId ? element.pId : element.pid;
    formInputRef.value.goods.push(element.pId);
  }
}
let filterGoodsData: any = computed(() =>
  goodsDetailListRef.value.filter(getGoodsFn)
);
function getGoodsFn(data: any) {
  return (
    data.display &&
    (!formInputRef.value.search ||
      data.pName
        .toLowerCase()
        .includes(formInputRef.value.search.toLowerCase()))
  );
}

function clickGroup() {
  let curGoods = formInputRef.value.goods;
  if (curGoods.length > 0) {
    formInputRef.value.goods = [];
  } else {
    for (let i = 0; i < filterGoodsData.value.length; i++) {
      const element = filterGoodsData.value[i];
      formInputRef.value.goods.push(element.pId);
    }
  }
}
watchEffect(() => {
  clickGroupRef.value = formInputRef.value.goods.length > 0;
});

function clickItem(item: any, id: number) {
}

function submitBtn() {
  let curGoodsData = [];
  for (let i = 0; i < formInputRef.value.goods.length; i++) {
    const element = formInputRef.value.goods[i];
    for (let j = 0; j < filterGoodsData.value.length; j++) {
      const element2 = filterGoodsData.value[j];
      let Lid = element2.pId;
      if (Lid == element) {
        element2.giftTotal = 1;
        curGoodsData.push(element2);
        break;
      }
    }
  }
  props.getDataFn(curGoodsData,formInputRef.value.goods);
  props.showCGoodsUIFn(false);
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
    padding: 15px 50px;
    background-color: #e6e2de;
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
        // max-height: 300px;
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
              width: 100%;
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

              .pCode-msg {
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
