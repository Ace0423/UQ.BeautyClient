<template>
  <div class="popup">
    <div class="popup-content">
      <div class="top-content">
        <p>顏色</p>
      </div>
      <div class="main-content">
        <div class="userinfo">
          <div class="formcolor">
            <!-- <span>顏色</span> -->
            <div class="color-group">
              <input class="color-btn" :class="colorIndex == 1 ? 'selected' : 'noselected'" type="button"
                style="background-color: #fb9ea6" @click="clickColorFn(1)" />
              <input class="color-btn" :class="colorIndex == 2 ? 'selected' : 'noselected'" type="button"
                style="background-color: #f7bf9a" @click="clickColorFn(2)" />
              <input class="color-btn" :class="colorIndex == 3 ? 'selected' : 'noselected'" type="button"
                style="background-color: #eddb9d" @click="clickColorFn(3)" />
              <input class="color-btn" :class="colorIndex == 4 ? 'selected' : 'noselected'" type="button"
                style="background-color: #c3eda0" @click="clickColorFn(4)" />
              <input class="color-btn" :class="colorIndex == 5 ? 'selected' : 'noselected'" type="button"
                style="background-color: #98e8eb" @click="clickColorFn(5)" />
              <input class="color-btn" :class="colorIndex == 6 ? 'selected' : 'noselected'" type="button"
                style="background-color: #aac9e2" @click="clickColorFn(6)" />
              <input class="color-btn" :class="colorIndex == 7 ? 'selected' : 'noselected'" type="button"
                style="background-color: #abadd7" @click="clickColorFn(7)" />
              <input class="color-btn" :class="colorIndex == 8 ? 'selected' : 'noselected'" type="button"
                style="background-color: #d8baea" @click="clickColorFn(8)" />
              <input class="color-btn" :class="colorIndex == 9 ? 'selected' : 'noselected'" type="button"
                style="background-color: #e7b1e6" @click="clickColorFn(9)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { usePriceStore } from "@/stores/priceStore";
import search_ico from "@/assets/images/icon_search.png";

let store = usePriceStore();
let { allDiscountList } = storeToRefs(store);
let { getAllDiscountApi } = store;
let colorIndex = ref(0)
const props = defineProps<{
  updataColorFn: Function;
  selColorIndex: any;
  // updataColorFn?: any;
}>();

colorIndex.value = props.selColorIndex

onMounted(() => {
  // console.log('onMounted');
});
let formInputRef: any = ref({
  name: "",
});

function clickColorFn(data: any) {
  // props.selColorIndex = data
  colorIndex.value = data
  props.updataColorFn(colorIndex.value)
  console.log("提交", colorIndex.value);
}
</script>

<style scoped lang="scss">
.popup {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;

  .popup-content {
    width: 100%;

    .top-content {
      display: block;

      >p {
        display: flex;
        padding: 0px 15px;
        color: #877059;
      }
    }

    .main-content {
      display: block;
      width: 100%;

      .userinfo {
        width: 100%;

        .formcolor {
          width: 100%;
          padding: 0px 15px;

          .color-group {
            display: flex;
            width: 100%;

            .color-btn {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              border: none;
              background-color: #fc0505;
            }

            .selected {
              border: 2px solid rgb(251, 255, 0);
            }

            .noselected {
              border: 0px solid rgb(251, 255, 0);
            }
          }
        }
      }
    }

    .bottom-content {
      display: block;
    }
  }
}
</style>
