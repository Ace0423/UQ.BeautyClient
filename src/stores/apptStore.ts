import { apiGetMemberListRequest } from "@/api";
import {
  addCheckOutReq,
  addRestReq,
  addServiceDetailReq,
  addServiceGroupReq,
  delCourseDetailReq,
  delCourseTypeReq,
  deleteServiceDetailReq,
  deleteServiceGroupReq,
  getApptDataRequest,
  getBeauticianReq,
  getCourseDetailReq,
  getCourseTypeReq,
  getManagerListReq,
  getMemberListReq,
  getOrderDetailReq,
  getServiceDetailReq,
  getServiceGroupReq,
  postAddApptDataReq,
  postAddUQLessonDetailReq,
  postAddUQLessonTypeReq,
  postEditApptDataReq,
  postEditApptStateReq,
  updateCourseDetailReq,
  updateGroupOrderReq,
  updateLessonTypeOrderReq,
  updateLessonTypeReq,
  updateServiceDetailReq,
  updateServiceGroupReq,
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
  IServiceGroupVo,
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
  //#region 服務項目Service
  let serviceGroupList: any = ref([]);
  /**獲取群組 */
  const getServiceGroupApi = async (id: any = 0, isList: any = 0) => {
    try {
      serviceGroupList.value = [];
      let res: any = await getServiceGroupReq(id, isList).then((res: any) => {
        if (res.data.data && !id) {
          let detailVo: IServiceGroupVo = res.data.data.table;
          serviceGroupList.value = detailVo;
          serviceGroupList.value.sort(function (a: any, b: any) {
            return a.order > b.order ? 1 : -1;
          });
          return serviceGroupList.value;
        } else {
          return res.data.data.table;
        }
      });
      return res
    } catch (error) {
      console.log(error);
    }
  };
  let serviceDetailList: any = ref([]);
  /**獲取明細 */
  const getServiceDetailApi = async (id: any = 0, isList: any = 0) => {
    try {
      serviceDetailList.value = [];
      let res: any = await getServiceDetailReq(id, isList).then((res: any) => {
        if (res.data.data && !id) {
          let detailVo: IServiceDetailVo = res.data.data.table;
          serviceDetailList.value = detailVo;
          return serviceDetailList.value;
        } else {
          return res.data.data.table;
        }
      });
      return res
    } catch (error) {
      console.log(error);
    }
  };
  /**新增群組 */
  const addServiceDetailApi = async (data: any) => {
    try {
      let res = await addServiceDetailReq(data).then((res: any) => {
        alertStateFn(res, "新增服務明細");
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  //更新群組
  const updateServiceGroupApi = async (data: any) => {
    try {
      let res = await updateServiceGroupReq(data).then((res: any) => {
        alertStateFn(res, "更新服務群組");
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  //更新明細
  const updateServiceDetailApi = async (data: any) => {
    try {
      let res = await updateServiceDetailReq(data).then((res: any) => {
        alertStateFn(res, "更新服務明細");
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  //刪除明細
  const delServiceDetailApi = async (data: any) => {
    try {
      let res = await deleteServiceDetailReq(data).then((res: any) => {
        alertStateFn(res, "刪除服務明細");
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  /**新增群組 */
  const addServiceGroupApi = async (data: any) => {
    try {
      let res = await addServiceGroupReq(data).then((res: any) => {
        alertStateFn(res, "新增服務群組");
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  //更新群組排序
  const updateGroupOrderApi = async (data: any) => {
    try {
      let res = await updateGroupOrderReq(data).then((res: any) => {
        alertStateFn(res, "更新群組排序");
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  //刪除群組
  const delServiceGroupApi = async (data: any) => {
    try {
      let res = await deleteServiceGroupReq(data).then((res: any) => {
        alertStateFn(res, "刪除服務群組");
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  //#endregion

  //#region 課程項目course
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
      courseTypesTabs.value = [];
      courseDataList.value = [];
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
            0,
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
  //#endregion

  //#region 預約
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
  const getMemberListApi = async (id: any = 0,
    pageindex: any = 0,
    count: any = 0,) => {
    try {
      const dataRequest = reactive({
        id: id,
        pageindex: pageindex,
        count: count,
      });
      const res = await getMemberListReq(dataRequest).then(
        (res: any) => {
          if (res.data.data) {
            let listVo: IMemberListVo[] = res.data.data.table;
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
  const getApptDataApi = async (bNo: any = "", year: any = 0, month: any = 0) => {
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

      let data = "?bNo=" + bNo + "&year=" + year + "&month=" + month + "&pageIndex=0&count=0";
      let res: any = await getApptDataRequest(data).then((res: any) => {
        //插入預約
        if (res.data.data) {
          if (bNo == "") {// 指定時間
            tuiBookingListRef.value = res.data.data.table.filter(function (
              item: any,
              index: any,
              arr: any
            ) {
              //處理數據
              if (item.serverId == 0) {
                item.managerInfo = { managerId: 0, nameView: "不指定" }
              }
              item.serviceInfo[0].subList = [];
              if (item.subList)
                item.serviceInfo[0].subList.push(item.subList);
              item.serverName = item.managerInfo.nameView;
              return item.state != 3
            });
            return res.data.data.table;
          } else {//  指定編號
            let curItem = res.data.data.table[0];
            if (curItem.serverId == 0) {
              curItem.managerInfo = { managerId: 0, nameView: "不指定" }
              curItem.serverName = curItem.managerInfo.nameView;
            }
            curItem.serviceInfo[0].subList = [];
            if (curItem.subList)
              curItem.serviceInfo[0].subList.push(curItem.subList);
            return curItem
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
  /**更新預約資料 */
  const postEditApptStateApi = async (data: any) => {
    try {
      let res = await postEditApptStateReq(data).then((res: any) => {
        alertStateFn(res, "更新預約資料");
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  //#endregion

  //#region  商品

  /**獲取商品分類 */
  const goodsTypesListValueRef = ref(0);
  let goodsTypesListRef: any = ref([]);
  const getGoodsTypeApi = async (data: any = 0) => {
    try {
      goodsDetailListRef.value = [];
      goodsTypesListRef.value = [];
      // goodsTypesListRef.value = [
      //   {
      //     pgId: 0,
      //     display: true,
      //     pgTitle: "全部",
      //     order: 0,
      //     isList: 0,
      //   },
      // ];
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
            return a.order > b.order ? 1 : -1;
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
  const delGoodsDetailApi = async (pId: any) => {
    try {
      let res = await delGoodsDetailReq(pId).then((res: any) => {
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
  //#endregion 

  //#region Order

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

  //#endregion

  //#region 管理員

  let managerList: any = ref([]);
  const getManagerListApi = async (id: any = 0, level: any = 0, pageIndex: number = 0, count: number = 0) => {
    try {
      const res = await getManagerListReq(id).then((res: any) => {
        if (res.data.data) {
          if (level == 0)
            managerList.value = res.data.data.table
          else
            managerList.value = res.data.data.table.filter((item: any) => item.roleList[0].roleId == level);
        }
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };
  //更新明細
  const addRestApi = async (data: any) => {
    try {
      let res = await addRestReq(data).then((res: any) => {
        alertStateFn(res, "更新服務明細");
        return res;
      });
    } catch (error) {
      console.log(error);
    }
  };

  //#endregion

  //#region 結帳

  /**新增群組 */
  const addCheckOutApi = async (data: any) => {
    try {
      let res = await addCheckOutReq(data).then((res: any) => {
        alertStateFn(res, "新增服務明細");
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  //#endregion


  //#region  訂單

  let orderList: any = ref([]);
  /**獲取明細 */
  const getOrderListApi = async (id: any = 0, isList: any = 0) => {
    try {
      orderList.value = [];
      let res: any = await getOrderListReq(id, isList).then((res: any) => {
        if (res.data.data && !id) {
          let detailVo: IServiceDetailVo = res.data.data.table;
          orderList.value = detailVo;
          return orderList.value;
        } else {
          return res.data.data.table;
        }
      });
      return res
    } catch (error) {
      console.log(error);
    }
  };
  //#endregion
  return {
    //--------------------service
    addServiceGroupApi,
    addServiceDetailApi,
    getServiceGroupApi,
    getServiceDetailApi,
    serviceGroupList,
    serviceDetailList,
    delServiceDetailApi,
    delServiceGroupApi,
    updateServiceGroupApi,
    updateServiceDetailApi,
    updateGroupOrderApi,
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
    getApptDataApi,
    postAddApptDataApi,
    postEditApptDataApi,
    postEditApptStateApi,
    getBeauticianApi,
    bookingList,
    tuiBookingListRef,
    beauticianList,
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
    //--------------------管理員
    managerList,
    getManagerListApi,
    addRestApi,
    //--------------------會員
    memberList,
    getMemberListApi,
    //--------------------結帳
    addCheckOutApi,
    //--------------------訂單
    getOrderListApi

  };
});
