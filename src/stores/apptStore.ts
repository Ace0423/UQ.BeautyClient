import { apiGetMemberListRequest } from "@/api";
import {
  delCourseDetailReq,
  delCourseTypeReq,
  getApptDataRequest,
  getBeauticianReq,
  getCourseDetailReq,
  getCourseTypeReq,
  getOrderDetailReq,
  postAddApptDataReq,
  postAddUQLessonDetailReq,
  postAddUQLessonTypeReq,
  postEditApptDataReq,
  updateCourseDetailReq,
  updateLessonTypeOrderReq,
  updateLessonTypeReq,
} from "@/api/apptRequest";
import {
  addGoodsDetailReq,
  addGoodsTypeReq,
  delGoodsDetailReq,
  delGoodsTypeReq,
  getGoodsDetailReq,
  getGoodsTypeReq,
  updateGoodsDetailReq,
  updateGoodsTypeOrderReq,
  updateGoodsTypeReq,
} from "@/api/goodsRequest";
import Alert from "@/components/alertCmpt";
import type {
  IApptDetailVo,
  IBookingVo,
  IGoodsTypeVo,
  IMemberListVo,
  IServiceDetailVo,
  IServiceTypeVo,
} from "@/types/IDataVo";
import { showErrorMsg } from "@/types/IMessage";
import { defineStore } from "pinia";

export const useApptStore = defineStore("apptStore", () => {
  function alertStateFn(res: any, apiName: string = "") {
    if (res.state == 1) {
      setTimeout(() => {
        Alert.sussess("成功", 1000);
      }, 200);
      return true;
    } else {
      setTimeout(() => {
        Alert.error("失敗(" + showErrorMsg(res.msg) + ")", 1000);
      }, 200);
      return false;
    }
  }
  const onAlertBtn = (err: any) => {
    console.log(err, "err");
  };
  //---------------------------------course
  const beauticianList: any = ref([{ userId: 0, nameView: "不指定" }]);
  /**獲取美容師 */
  const getBeauticianApi = async (data: any) => {
    try {
      const res: any = await getBeauticianReq(data).then((res: any) => {
        if (res.data.data)
          for (let i = 0; i < res.data.data.table.length; i++) {
            const element = res.data.data.table[i];
            beauticianList.value.push(element);
          }
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const courseTypesTabsValue = ref(0);
  let courseTypesTabs: any = ref([
    {
      lessonTypeId: 0,
      order: 0,
      display: true,
      nameTw: "全部",
    },
  ]);
  /**獲取服務類型 */
  const getCourseTypeApi = async (data: any = 0) => {
    try {
      courseDataList.value = [];
      courseTypesTabs.value = [
        {
          lessonTypeId: 0,
          display: true,
          nameTw: "全部",
          order: 0,
        },
      ];
      let res: any = await getCourseTypeReq(data).then((res: any) => {
        if (res.data.data) {
          let tableVo: IServiceTypeVo[] = res.data.data.table;
          for (let i = 0; i < tableVo.length; i++) {
            let element = tableVo[i];
            // element.orderCheck = element.order;
            element.editState = false;
            element.lessonTypeId = element.lessonTypeId;
            element.editNameTw = element.nameTw;
            element.editState = false;
            courseTypesTabs.value.push(element);
          }
          courseTypesTabs.value.sort(function (a: any, b: any) {
            return a.order > b.order ? 1 : -1;
          });
          getCourseDetailApi(
            courseTypesTabs.value[courseTypesTabsValue.value].lessonTypeId,
            "0"
          );
        }
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  /**新增服務類型 */
  const addCourseTypeApi = async (data: any) => {
    try {
      let res = await postAddUQLessonTypeReq(data).then((res: any) => {
        alertStateFn(res, "新增服務類型");
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  /**更新服務類型 */
  const editCourseTypeApi = async (data: any) => {
    try {
      let res = await updateLessonTypeReq(data).then((res: any) => {
        alertStateFn(res, "更新服務類型");
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  /**更新服務類型排序 */
  const editCourseTypeOrderApi = async (data: any) => {
    try {
      let res = await updateLessonTypeOrderReq(data).then((res: any) => {
        alertStateFn(res, "更新服務類型排序");
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  /**刪除服務類型 */
  const delCourseTypeApi = async (data: any) => {
    try {
      let res = await delCourseTypeReq(data).then((res: any) => {
        alertStateFn(res, "刪除服務類型");
        // if (alertStateFn(res, "刪除服務類型")) getCourseTypeApi(0);
        return res;
      });
    } catch (error) {
      console.log(error);
    }
  };
  const onDeleteAlertBtn = (data: any) => {
    console.log("2000");
  };
  let courseDataList: any = ref([]);
  /**獲取服務資料 */
  const getCourseDetailApi = async (g: any = 0, id: any = 0) => {
    try {
      courseDataList.value = [];
      let res: any = await getCourseDetailReq(g, id).then((res: any) => {
        if (res.data.data) {
          let detailVo: IServiceDetailVo = res.data.data.table;
          courseDataList.value = detailVo;
        }
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  /**新增服務資料 */
  const addCourseDetailApi = async (data: any) => {
    try {
      let res = await postAddUQLessonDetailReq(data).then((res: any) => {
        alertStateFn(res, "新增服務資料");
        if (res)
          // setTimeout(() => {
          //   getCourseDetailApi(0, 0);
          // }, 1000);
          return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  /**更新服務資料 */
  const updateCourseDetailApi = async (data: any) => {
    try {
      let res = await updateCourseDetailReq(data).then((res: any) => {
        alertStateFn(res, "更新服務資料");
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  /**刪除服務資料 */
  const delCourseDetailApi = async (data: any) => {
    try {
      let res = await delCourseDetailReq(data).then((res: any) => {
        alertStateFn(res, "刪除服務資料");
        return res;
      });
    } catch (error) {
      console.log(error);
    }
  };
  //------------------apptt

  let timeGroup: any = ref([
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
  ]);
  let bookingList: any = ref([]);
  let tuiBookingListRef: any = ref([]);
  const memberList: any = ref([]);
  /**獲取會員資料 */
  const getMemberData = async () => {
    try {
      const dataRequest = reactive({
        id: 0,
        pageindex: 0,
        count: 0,
      });
      const res = await apiGetMemberListRequest(dataRequest).then(
        (res: any) => {
          if (res.data.data) {
            let listVo: IMemberListVo = res.data.data.table;
            memberList.value = listVo;
          }
          return res;
        }
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  /**獲取預約資料 */
  const getApptDataApi = async (year: any, month: any) => {
    try {
      bookingList.value = [];
      //重製預約
      for (let i = 0; i < timeGroup.value.length; i++) {
        const element = timeGroup.value[i];
        bookingList.value.push({
          timeView: timeGroup.value[i],
          timePeriod_tw: timeGroup.value[i],
          timePeriod: timeGroup.value[i],
          things: [],
        });
      }
      let data = "?year=" + year + "&month=" + month + "&pageIndex=0&count=0";
      let res: any = await getApptDataRequest(data).then((res: any) => {
        //插入預約
        if (res.data.data) {
          let DetailVo: IApptDetailVo = res.data.data.table;
          tuiBookingListRef.value = res.data.data.table.filter(function (
            value: any,
            index: any,
            arr: any
          ) {
            return value.state != 3;
          });

          for (let i = 0; i < res.data.data.table.length; i++) {
            const bookingListEmt = res.data.data.table[i];
            if (bookingListEmt.state == 3) {
              continue;
            }
            for (let j = 0; j < bookingList.value.length; j++) {
              const timeEmt = bookingList.value[j];
              let curDateTime = bookingListEmt.dateBooking.split("T");
              let curTime =
                curDateTime[1].split(":")[0] +
                ":" +
                curDateTime[1].split(":")[1];
              if (curTime == timeEmt.timePeriod && bookingListEmt.lesson) {
                let bookingData: IBookingVo = {
                  id: bookingListEmt.bookingNo,
                  timePeriod: curTime, //hh:mm
                  date: curDateTime[0], //yyyy-mm-dd
                  range:
                    bookingListEmt.timer > 30 ? bookingListEmt.timer / 30 : 1,
                  userId: bookingListEmt.userId,
                  bookingNo: bookingListEmt.bookingNo,
                  beautyTherapist: bookingListEmt.beautyTherapist,
                  bookingMemo: bookingListEmt.bookingMemo,
                  customer: bookingListEmt.customer,
                  dateBooking: bookingListEmt.dateBooking,
                  dateCreate: bookingListEmt.dateCreate,
                  discount: bookingListEmt.discount,
                  lesson: bookingListEmt.lesson,
                  lessonId: bookingListEmt.lessonId,
                  price: bookingListEmt.price,
                  serverId: bookingListEmt.serverId,
                  state: bookingListEmt.state,
                  timer: bookingListEmt.timer,
                  tradeDone: bookingListEmt.tradeDone,
                };

                bookingList.value[j].things.push(bookingData);
              }
            }
          }
        }
        return res;
      });
      return res;
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };
  /**新增預約資料 */
  const postAddApptDataApi = async (data: any) => {
    try {
      let res = await postAddApptDataReq(data).then((res: any) => {
        alertStateFn(res, "新增預約資料");
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  /**更新預約資料 */
  const postEditApptDataApi = async (data: any) => {
    try {
      let res = await postEditApptDataReq(data).then((res: any) => {
        alertStateFn(res, "更新預約資料");
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  //--------------------goods
  /**獲取商品分類 */
  const goodsTypesListValueRef = ref(0);
  let goodsTypesListRef: any = ref([]);
  const getGoodsTypeApi = async (data: any = 0) => {
    try {
      goodsDetailListRef.value = [];
      goodsTypesListRef.value = [];
      goodsTypesListRef.value = [
        {
          pgId: 0,
          display: true,
          pgTitle: "全部",
          order: 0,
          isList: 0,
        },
      ];
      let res: any = await getGoodsTypeReq(data, 0).then((res: any) => {
        if (res.data.data) {
          let typeVo: IGoodsTypeVo = res.data.data.table;
          for (let i = 0; i < res.data.data.table.length; i++) {
            let element = res.data.data.table[i].group;
            element.editState = false;
            element.isList = 0;
            element.pIdList = [];
            element.pgId = parseInt(element.pgId);
            element.editNameTw = element.pgTitle;
            goodsTypesListRef.value.push(element);
          }
          goodsTypesListRef.value.sort(function (a: any, b: any) {
            return a.pgId > b.pgId ? 1 : -1;
          });
        }
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  /**新增商品分類 */
  const addGoodsTypeApi = async (data: any) => {
    try {
      let res = await addGoodsTypeReq(data).then((res: any) => {
        alertStateFn(res, "新增商品分類");
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  /**更新商品分類 */
  const updataGoodsTypeApi = async (data: any) => {
    try {
      let res = await updateGoodsTypeReq(data).then((res: any) => {
        alertStateFn(res, "更新商品分類");
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  /**更新商品分類排序 */
  const updataGoodsTypeOrderApi = async (data: any) => {
    try {
      let res = await updateGoodsTypeOrderReq(data).then((res: any) => {
        alertStateFn(res, "更新商品分類排序");
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  /**刪除商品分類 */
  const delGoodsTypeApi = async (data: any) => {
    try {
      let res = await delGoodsTypeReq(data).then((res: any) => {
        alertStateFn(res, "刪除商品分類");
        // if (res) getGoodsTypeApi(0);
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  let goodsDetailListRef: any = ref([]);
  /**獲取商品資料 */
  const getGoodsDetailApi = async (group: any = 0, id: any = 0) => {
    try {
      let res: any = null;
      goodsDetailListRef.value = [];
      if (group == 0) {
        //查全部
        res = await getGoodsDetailReq(group, id).then((res: any) => {
          if (res.data.data.table) {
            let dataDetail = res.data.data.table;
            for (let i = 0; i < dataDetail.length; i++) {
              const element = dataDetail[i];
              goodsDetailListRef.value.push(element);
            }
          }
          return res;
        });
      } else {
        //查群組
        goodsDetailListRef.value = [];
        res = await getGoodsTypeReq(group, 1).then((res: any) => {
          if (res.data.data.table) {
            let curProductList = res.data.data.table[0].productList;
            for (let i = 0; i < curProductList.length; i++) {
              const element = curProductList[i];
              element.groupList = [{ pgId: group }];
              element.discountList = [];
              element.providerList = [];
            }
            goodsDetailListRef.value = res.data.data.table[0].productList;
          }
        });
        return res;
      }
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  /**新增商品資料 */
  const addGoodsDetailApi = async (data: any) => {
    try {
      let res = await addGoodsDetailReq(data).then((res: any) => {
        alertStateFn(res, "新增商品資料");
        // setTimeout(() => {
        //   if (res) getGoodsDetailApi(0, 0);
        // }, 1000);
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  /**更新商品資料 */
  const updateGoodsDetailApi = async (data: any) => {
    try {
      let res = await updateGoodsDetailReq(data).then((res: any) => {
        alertStateFn(res, "更新商品資料");
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  /**刪除商品資料 */
  const delGoodsDetailApi = async (data: any, pgId: any) => {
    try {
      let res = await delGoodsDetailReq(data, pgId).then((res: any) => {
        alertStateFn(res, "刪除商品資料");
        // setTimeout(() => {
        //   if (res) getGoodsDetailApi(pgId, 0);
        // }, 1000);
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  //-------------------------------------------------------------------

  let orderDetailListRef: any = ref([]);
  /**獲取訂單資料 */
  const getOrderDetailApi = async (g: any, id: any) => {
    try {
      let res: any = await getOrderDetailReq(g, id).then((res: any) => {
        if (res.data.data) {
          let curData = res.data.data.table;
          for (let i = 0; i < curData.length; i++) {
            const element = curData[i];
            element.state = 0;
            orderDetailListRef.value.push(element);
          }
        }
        return res;
      });
      orderDetailListRef.value = [];
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  return {
    //--------------------course
    getCourseTypeApi,
    courseTypesTabs,
    delCourseTypeApi,
    getCourseDetailApi,
    courseDataList,
    addCourseTypeApi,
    addCourseDetailApi,
    courseTypesTabsValue,
    delCourseDetailApi,
    updateCourseDetailApi,
    editCourseTypeApi,
    editCourseTypeOrderApi,
    //--------------------appt
    getMemberData,
    getApptDataApi,
    postAddApptDataApi,
    postEditApptDataApi,
    getBeauticianApi,
    bookingList,
    tuiBookingListRef,
    beauticianList,
    memberList,
    timeGroup,
    //--------------------goods
    goodsTypesListValueRef,
    goodsTypesListRef,
    getGoodsTypeApi,
    goodsDetailListRef,
    getGoodsDetailApi,
    addGoodsTypeApi,
    updataGoodsTypeApi,
    updataGoodsTypeOrderApi,
    delGoodsTypeApi,
    addGoodsDetailApi,
    updateGoodsDetailApi,
    delGoodsDetailApi,
    //--------------------Order
    getOrderDetailApi,
    orderDetailListRef,
  };
});
