<template>
  <div class="popup-mask" v-on:click.self="showUIFn(false)">
    <div class="popup-content">
      <div class="top-content">
        <p>加入顧客</p>
      </div>
      <div class="main-content">
        <input v-model="formInputRef.search" />
        <div class="box-item">
          <div v-for="item in filterMemberData" :key="item">
            <div class="div-item" @click="submitBtn(item)">
              <img class="customer-img" :src="icon_customer" />
              <div>
                <span>{{ item.nameView }}</span>
                <span>{{ item.phone }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-content">
        <!-- <button class="submit-btn" @click="submitBtn()">確認</button>
        <button class="cancle-btn" @click="showUIFn(false)">取消</button> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useApptStore } from "@/stores/apptStore";
import search_ico from "@/assets/images/icon_search.png";
import icon_customer from "@/assets/images/icon_customer.png";

let store = useApptStore();
let { memberList } = storeToRefs(store);
let {} = store;

const props = defineProps<{
  showUIFn: Function;
  getDataFn: Function;
  selData: any;
}>();

// let filterMemberData: any = computed(() => memberList.value.filter(getMemberFn));

let filterMemberData: any = computed(() =>
  memberList.value.filter(getMemberFn)
);

function getMemberFn(data: any) {
  return (
    !formInputRef.value.search ||
    data.nameView
      .toLowerCase()
      .includes(formInputRef.value.search.toLowerCase())
  );
}

onMounted(() => {
  // console.log('onMounted');
});
let formInputRef: any = ref({
  name: "",
  search: "",
});

function submitBtn(data: any) {
  props.getDataFn(data);
  props.showUIFn(false);
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
    max-width: 360px;
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
      .box-item {
        height: 250px;
        overflow-y: auto;
        > div {
          .div-item {
            border-bottom: 1px solid #ffffff;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            > div {
              display: grid;
              margin-left: 2%;
            }
            > img {
              width: 33px;
              height: 39px;
            }
          }
        }
      }
    }
    .bottom-content {
      display: flex;
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
