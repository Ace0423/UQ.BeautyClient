<template>
  <div class="popup-mask" v-on:click.self="showUIFn(false)">
    <div class="popup-content">
      <div class="top-content">
        <p>加入服務</p>
      </div>
      <div class="main-content">
        <p>已選擇({{ formInputRef.courses.length }})項服務</p>
        <input v-model="formInputRef.search" />
        <div class="div-item">
          <div v-for="item in filterCourseData" :key="item">
            <label class="label-item" :value="item">
              <input
                class="input-item"
                type="checkbox"
                :id="item.lessonId"
                :value="item"
                v-model="formInputRef.courses"
              />
              <label :for="item.lessonId"></label>
              <span value="{{item}}" name="{{item.nameTw}}">{{
                item.nameTw + "(" + item.servicesTime + ")"
              }}</span>
            </label>
            <!-- <input type="checkbox" name="item_001" value="1" />1 -->
          </div>
        </div>
      </div>
      <div class="bottom-content">
        <button class="submit-btn" @click="submitBtn()">確認</button>
        <button class="cancle-btn" @click="showUIFn(false)">取消</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useApptStore } from "@/stores/apptStore";
import search_ico from "@/assets/images/icon_search.png";

let store = useApptStore();
let { courseDataList } = storeToRefs(store);
let { getCourseDetailApi } = store;

const props = defineProps<{
  showUIFn: Function;
  //   formInfo: any;
  //   addDetailTypeID?: any;
}>();
let search = ref("");

let formInputRef: any = ref({
  name: "",
  search: "",
  courses: [],
});
getCourseDetailApi();

let filterCourseData: any = computed(() =>
  courseDataList.value.filter(getCourseFn)
);
function getCourseFn(data: any) {
  return (
    data.display &&
    (!search.value ||
      data.nameTw.toLowerCase().includes(search.value.toLowerCase()))
  );
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
      > p {
        display: flex;
        justify-content: center;
      }
      .div-item {
        max-height: 300px;
        overflow-y: auto;
        > div {
          display: flex;
          align-items: center;
          height: 50px;
        }
        .label-item {
          display: flex;
          align-items: center;
          input {
            display: none;
          }
          label {
            display: inline-block;
            width: 20px;
            height: 20px;
            border-radius: 5px;
            border: 1px solid #8b6f6d;
            position: relative;
            cursor: pointer;
          }
          label::before {
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
          input:checked + label {
            background: #8b6f6d;
          }
          input:checked + label::before {
            opacity: 1;
            transform: all 0.5s;
          }

          > span {
            margin-left: 10px;
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
