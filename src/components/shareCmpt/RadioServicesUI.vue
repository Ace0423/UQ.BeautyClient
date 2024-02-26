<template>
  <div class="popup-detailService" v-on:click.self="showServiceUIFn(0)">
    <div class="popup-content">
      <div class="header-content">
        <span>服務</span>
        <img :src="icon_closeX" v-on:click="showServiceUIFn(0)" />
      </div>
      <div class="main-content">
        <input placeholder="搜尋" v-model="formInputRef.search" />
        <div class="list-content">
          <div v-for="item in filterCourseData" :key="item">
            <label class="label-item" :value="item">
              <input class="input-item" type="radio" :key="item" :value="item" :id="'RadioServicesUI_' + item"
                v-model="formInputRef.courses" @click="clickItem(item, item.SId)" />
              <!-- <label :for="'RadioServicesUI_' + item.SId"></label> -->
              <div class="title-input">
                <span>{{
                  item.name
                }}</span>
                <span class="pCode-msg" v-if="item.servicesTime==0">{{getServicesTimeMin(item.subList)  + "分起" }}</span>
                <span class="pCode-msg" v-else>{{ item.servicesTime + "分" }}</span>
              </div>
              <div class="price-input">
                <span v-if="item.servicesTime==0">{{ "$" +getServicesPriceMin(item.subList)+"起"}}</span>
                <span v-else>{{ "$" + item.price }}</span>
              </div>
            </label>
          </div>
        </div>
      </div>
      <div class="bottom-content">
      </div>
    </div>
  </div>
  <RdServiceSubUI v-if="showRdServiceSubUIRef" :selData="formInputRef.courses" :getDataFn="getRdSubIdFn"
    :showRdSubFn="showRdSubFn"></RdServiceSubUI>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useApptStore } from "@/stores/apptStore";
import search_ico from "@/assets/images/icon_search.png";
import icon_right_arrow from "@/assets/images/icon_right_arrow.png";
import icon_closeX from "@/assets/images/icon_closeX.png";
import { RFC_2822 } from "moment";

let store = useApptStore();
let { serviceDetailList } = storeToRefs(store);
let { getServiceDetailApi } = store;

const props = defineProps<{
  showServiceUIFn: Function;
  getDataFn: Function;
  selData: any;
}>();
let formInputRef: any = ref({
  name: "",
  search: "",
  courses: null,
  serviceSub: null,
});
let showRdServiceSubUIRef = ref(false);

onBeforeFn();
function onBeforeFn() {
  getServiceDetailApi();
}
onMounted(() => {
  // console.log('onMounted');
});
if (props.selData) {
  formInputRef.value.courses = props.selData;
}
let filterCourseData: any = computed(() =>
  serviceDetailList.value.filter(getCourseFn)
);
function getCourseFn(data: any) {
  return (
    data.display &&
    (!formInputRef.value.search ||
      data.name
        .toLowerCase()
        .includes(formInputRef.value.search.toLowerCase()))
  );
}
let getServicesMax2: any = computed((params:any) =>{
  Math.max.apply(null, params.map(function (o:any) {
    return o.servicesTime;
}))
});

function getServicesPriceMin(params:any) {
 return Math.max(...params.map((a:any) => a.price))
}
function getServicesTimeMin(params:any) {
 return Math.max(...params.map((a:any) => a.servicesTime))
}

function submitBtn() {
  props.getDataFn(formInputRef.value.courses);
  props.showServiceUIFn(0)
}

function clickItem(item: any, id: number) {
  formInputRef.value.courses = item;
  if (formInputRef.value.courses.subList.length > 0) {
    showRdSubFn(true);
  } else {
    props.getDataFn(formInputRef.value.courses);
    // props.showServiceUIFn(0)
  }
}

function getRdSubIdFn(data: any) {
  showRdSubFn(false);
  formInputRef.value.serviceSub = data;
  formInputRef.value.courses.SubList = data
  props.getDataFn(formInputRef.value.courses);

}

function showRdSubFn(type: boolean) {
  showRdServiceSubUIRef.value = type;

  if (!type) {
    // formInputRef.value.courses.SubList = formInputRef.value.courses.SubList.length ? formInputRef.value.courses.SubList : null;
  }
}

</script>

<style scoped lang="scss">
.popup-detailService {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1003;
  background: rgba(80, 80, 80, 0.8);

  display: flex;
  align-items: center;
  justify-content: space-around;

  .popup-content {
    width: 500px;
    height: 70%;
    background-color: #ffffff;
    // padding: 15px 50px;
    font-size: 20px;
    font-family: HeitiTC;
    color: #84715c;
    font-weight: bold;
    border-radius: 12px;

    .header-content {
      display: flex;
      height: 70px;
      width: calc(100%);
      border-bottom: solid 1px #ddd;
      box-sizing: border-box;

      >span {
        position: absolute;
        display: flex;
        width: calc(100%);
        justify-content: center;
        align-items: center;
        font-size: 28px;
        height: 70px;
        justify-content: center;
        left: 0;
        right: 0;

      }

      >img {
        position: relative;
        width: 41px;
        height: 38px;
        top: 15px;
        left: 15px;
      }


      >button {
        position: relative;
        width: 41px;
        height: 38px;
        top: 15px;
        right: 15px;
      }

    }

    .main-content {
      display: block;
      height: calc(100% - 40px - 65px);
      width: 90%;
      margin-left: 5%;

      >input {
        box-sizing: border-box;
        width: 100%;
        height: 45px;

        border-radius: 6px;
        border: solid 1px #707070;
        box-sizing: border-box;
        margin-top: 10px;
        background: #fff url("@/assets/images/icon_search.png") no-repeat;
        background-position: 97%;
        background-origin: content-box;
        text-indent: 5px;
      }

      >input::placeholder {
        position: relative;
        left: 0px;
        top: 1px;
      }

      .list-content {
        height: calc(100% - 45px);
        box-sizing: border-box;
        overflow-y: auto;

        >div {
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

          .label-item {
            display: flex;
            align-items: center;
            width: calc(100% - 15px - 15px);
            margin-left: 15px;
            border-bottom: solid 1px #8b6f6d;
            box-sizing: border-box;
            padding: 5px;

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

              .pCode-msg {
                font-size: 15px;
              }
            }

            .title-input {
              flex: 1;
            }

            .price-input {
              display: flex;
              justify-content: right;
              width: 100px;
            }
          }
        }
      }
    }

    .bottom-content {
      display: flex;
      align-items: end;
      justify-content: center;

      // height: calc(65px);
      // width: 100px;
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
        width: 100px;
      }

      .cancle-btn {
        display: block;
        width: 100px;
      }
    }
  }
}
</style>
