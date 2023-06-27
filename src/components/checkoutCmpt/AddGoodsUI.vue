<template>
  <div class="popup-mask" v-on:click.self="showGoodsUIFn(0)">
    <div class="popup-content">
      <div class="top-content">
        <img :src="icon_closeX" v-on:click="showGoodsUIFn(0)" />
        <span>商品</span>
      </div>
      <div class="main-content">
        <input placeholder="搜尋" v-model="formInputRef.search" />
        <div class="group-content">
          <div>
            <label class="label-group">
              <input
                class="input-group"
                type="checkbox"
                id="pId"
                value="item"
                v-model="clickGroupRef"
                @click="clickGroup"
              />
              <label for="pId"></label>
              <span> 全選 </span>
            </label>
          </div>
          <div v-for="item in filterGoodsData" :key="item">
            <label class="label-item" :value="item">
              <input
                class="input-item"
                type="checkbox"
                :key="item"
                :id="item.pId"
                :value="item.pId"
                v-model="formInputRef.goods"
                @click="clickItem(item, item.pId)"
              />
              <label :for="item.pId"></label>
              <div>
                <span value="{{item}}" name="{{item.pName}}">{{
                  item.pName
                }}</span>
                <span
                  class="pCode-msg"
                  value="{{item}}"
                  name="{{item.pName}}"
                  >{{ item.pCode }}</span
                >
              </div>
            </label>
            <!-- <input type="checkbox" name="item_001" value="1" />1 -->
          </div>
        </div>
      </div>
      <div class="bottom-content" v-show="false">
        <button class="submit-btn" @click="submitBtn()">確認</button>
        <button class="cancle-btn" @click="showGoodsUIFn(0)">取消</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useApptStore } from "@/stores/apptStore";
import search_ico from "@/assets/images/icon_search.png";
import icon_right_arrow from "@/assets/images/icon_right_arrow.png";
import icon_closeX from "@/assets/images/icon_closeX.png";

let store = useApptStore();
let { goodsDetailListRef } = storeToRefs(store);
let { getGoodsDetailApi } = store;

const props = defineProps<{
  showGoodsUIFn: Function;
  //   formInfo: any;
  //   addDetailTypeID?: any;
}>();

let clickGroupRef = ref(false);
onMounted(() => {
  // console.log('onMounted');
});
let formInputRef: any = ref({
  name: "",
  search: "",
  goods: [],
});

setUI();
function setUI() {
  getGoodsDetailApi(0, 0);
  // for (let i = 0; i < props.selData.length; i++) {
  //   const element = props.selData[i];
  //   element.pId = element.pId ? element.pId : element.pid;
  //   formInputRef.value.goods.push(element.pId);
  // }
  // formInputRef.value.goods = goodsDetailListRef.value;
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
  // console.log(formInputRef.value.goods);
}
function submitBtn() {
  console.log("提交");
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
  .popup-content {
    width: 400px;
    height: 450px;
    background-color: #e6e2de;
    padding: 15px;
    font-size: 20px;
    font-family: HeitiTC;
    color: #84715c;
    font-weight: bold;
    .top-content {
      display: flex;
      height: 50px;
      width: 100%;
      border: solid 1px #ddd;
      box-sizing: border-box;
      > span {
        display: flex;
        // width: 200px;
        align-items: center;
        font-size: 30px;
        height: 40px;
        position: absolute;
        left: calc(50% - 41px);
      }
      > img {
        position: relative;
        width: 41px;
        height: 38px;
        top: 0px;
        left: 0px;
      }
    }
    .main-content {
      display: block;
      height: calc(100% - 40px - 65px);
      > input {
        box-sizing: border-box;
        width: 100%;
        height: 35px;

        border-radius: 6px;
        border: solid 1px #707070;
        box-sizing: border-box;
        margin-right: 10px;
        background: #fff url("@/assets/images/icon_search.png") no-repeat;
        background-position: 3%;
        background-origin: content-box;
        text-indent: 5px;
      }
      > input::placeholder {
        position: relative;
        left: 33px;
        top: 1px;
      }
      .group-content {
        height: calc(100% - 35px);
        border: solid 1px #ff0000;
        box-sizing: border-box;
        > div {
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
              .pCode-msg {
                font-size: 15px;
              }
            }
          }
        }
      }
    }
    .bottom-content {
      display: flex;
      align-items: end;
      justify-content: center;
      height: calc(65px);
      width: 100px;
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
