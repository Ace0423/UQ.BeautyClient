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
  getApptDataByUserReq,
  getApptDataRequest,
  getBeauticianReq,
  getCourseDetailReq,
  getCourseTypeReq,
  getManagerListReq,
  getMemberListReq,
  getOrderApptDetailReq,
  getOrderDetailReq,
  getOrderListReq,
  getPayTypeListReq,
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
  getDayOffReq,
  getRestReq,
  getNoticeListReq,
  updateNoticeIsReadReq,
  getExpenseInfoReq,
  getNoticeCountReq,
  getExportListReq,
  getPickUpListReq,
  addPickUpNoticeReq,
} from "@/api/apptRequest";
import {
  addGoodsBrandReq,
  addGoodsDetailReq,
  addGoodsGroupReq,
  delGoodsBrandReq,
  delGoodsDetailReq,
  delGoodsGroupReq,
  getGoodsDetailReq,
  getGoodsGroupReq,
  updateGoodsBrandOrderReq,
  updateGoodsBrandReq,
  updateGoodsDetailReq,
  updateGoodsGroupReq,
  updateGoodsGroupOrderReq,
  getGoodsBrandReq,
  updateGoodsStateReq,
} from "@/api/goodsRequest";
import Alert from "@/components/alertCmpt";
import type {
  IApptDetailVo,
  IBookingVo,
  IGoodsGroupVo,
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
        Alert.error("失敗\n(" + showErrorMsg(res.msg) + ")", 1000);
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
        if (res.data.data) {
          if (!id) {
            let detailVo: IServiceGroupVo = res.data.data.table;
            serviceGroupList.value = detailVo;
            serviceGroupList.value.sort(function (a: any, b: any) {
              return a.order > b.order ? 1 : -1;
            });
            return serviceGroupList.value;
          } else {
            return res.data.data.table;
          }
        } else {
          return res.data.data;
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
        if (res.data.data) {
          if (!id) {
            let detailVo: IServiceDetailVo = res.data.data.table;
            serviceDetailList.value = detailVo;
            return serviceDetailList.value;
          } else {
            return res.data.data.table;
          }
        } else {
          return res.data.data;
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
            if (!element.userLock)
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
  let timeGroup: any = ref(["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00",
    "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00",
    "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30",]);
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
  let expenseInfoRef: any = ref();
  /**獲取會員預約統計 */
  const getExpenseInfoApi = async (uid: any, pageindex: any = 0, count: any = 0,) => {
    try {
      const res = await getExpenseInfoReq(uid).then(
        (res: any) => {
          console.log(666, res);
          if (res.data.data) {
            expenseInfoRef = res.data.data.table;
            return res.data.data.table;
          }
        }
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  /**獲取預約資料 */
  const getApptDataApi = async (bkNo: any = "", blNo: any = "", year: any = 0, month: any = 0) => {
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

      let data = "?bkNo=" + bkNo + "&blNo=" + blNo + "&year=" + year + "&month=" + month + "&pageIndex=0&count=0";
      let res: any = await getApptDataRequest(data).then((res: any) => {
        //插入預約
        if (res.data.data) {
          if (bkNo == "" && blNo == "") {// 指定時間
            // tuiBookingListRef.value = res.data.data.table.filter(function (item: any,index: any,arr: any) {
            //   //處理數據
            //   if (item.managerId == 0) {
            //     item.managerInfo = { managerId: 0, nameView: "不指定" }
            //   }
            //   item.serviceInfo.subList = [];
            //   if (item.serviceInfo.subInfo){
            //     item.serviceInfo.subList.push(item.serviceInfo.subInfo);
            //   }
            //   item.serverName = item.managerInfo.nameView;
            //   console.log(333);
            //   return item.state != 3
            // });

            tuiBookingListRef.value = res.data.data.table.filter(function (item: any, index: any, arr: any) {
              // //處理數據
              // if (item.managerId == 0) {
              //   item.managerInfo = { managerId: 0, nameView: "不指定" }
              // }
              // item.serviceInfo.subList = [];
              // if (item.serviceInfo.subInfo){
              //   item.serviceInfo.subList.push(item.serviceInfo.subInfo);
              // }
              item.serverName = item.managerInfo.nameView;
              // console.log(333);
              return item.state != 3
            });
            return res.data.data.table;
          } else if (bkNo != "") {//  指定明細編號
            // let curItem = res.data.data.table[0];
            // if (curItem.managerId == 0) {
            //   curItem.managerInfo = { managerId: 0, nameView: "不指定" }
            //   curItem.serverName = curItem.managerInfo.nameView;
            // }
            // curItem.serviceInfo.subList = [];
            // if (curItem.subList)
            //   curItem.serviceInfo.subList.push(curItem.subList);
            // return curItem
            let curItems = [];
            for (let i = 0; i < res.data.data.table.length; i++) {
              const element = res.data.data.table[i];
              if (element.managerId == 0) {
                element.managerInfo = { managerId: 0, nameView: "不指定" }
                element.serverName = element.managerInfo.nameView;
              }
              element.serviceInfo.subList = [];
              if (element.serviceInfo.subList)
                element.serviceInfo.subList.push(element.serviceInfo.subList);
              curItems.push(element);
            }
            return curItems
          } else {//  指定列表編號
            let curItems = [];
            for (let i = 0; i < res.data.data.table.length; i++) {
              const element = res.data.data.table[i];
              if (element.managerId == 0) {
                element.managerInfo = { managerId: 0, nameView: "不指定" }
                element.serverName = element.managerInfo.nameView;
              }
              element.serviceInfo.subList = [];
              if (element.serviceInfo.subList)
                element.serviceInfo.subList.push(element.serviceInfo.subList);
              curItems.push(element);
            }
            return curItems
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
  /**獲取預約資料 */
  const getApptDataByUserApi = async (UId: any, bTime: any) => {
    try {
      let data = "?UId=" + UId + "&bTime=" + bTime + "&pageIndex=0&count=0";
      let res: any = await getApptDataByUserReq(data).then((res: any) => {
        //插入預約
        if (res.data.data) {
          return res.data.data.table;
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

  //#region 群組

  let goodsGroupList: any = ref([]);
  const getGoodsGroupApi = async (id: any = 0, isList: any = 0) => {
    try {
      goodsGroupList.value = [];
      let res: any = await getGoodsGroupReq(id, isList).then((res: any) => {
        if (res.data.data) {
          if (!id) {
            let detailVo: IServiceGroupVo = res.data.data.table;
            goodsGroupList.value = detailVo;
            goodsGroupList.value.sort(function (a: any, b: any) {
              return a.order > b.order ? 1 : -1;
            });
            return goodsGroupList.value;
          } else {
            return res.data.data.table;
          }
        } else {
          return res.data.data;
        }
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  /**新增商品分類 */
  const addGoodsGroupApi = async (data: any) => {
    try {
      let res = await addGoodsGroupReq(data).then((res: any) => {
        alertStateFn(res, "新增商品分類");
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  /**更新商品分類 */
  const updateGoodsGroupApi = async (data: any) => {
    try {
      let res = await updateGoodsGroupReq(data).then((res: any) => {
        alertStateFn(res, "更新商品分類");
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  /**更新商品分類排序 */
  const updateGoodsGroupOrderApi = async (data: any) => {
    try {
      let res = await updateGoodsGroupOrderReq(data).then((res: any) => {
        alertStateFn(res, "更新商品分類排序");
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  /**刪除商品分類 */
  const delGoodsGroupApi = async (data: any) => {
    try {
      let res = await delGoodsGroupReq(data).then((res: any) => {
        alertStateFn(res, "刪除商品分類");
        // if (res) getGoodsGroupApi(0);
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  //#endregion

  //#region 品牌
  /**獲取商品品牌 */
  let goodsBrandListRef: any = ref([]);
  const getGoodsBrandApi = async (id: any = 0, isList: any = 0) => {
    try {
      goodsBrandListRef.value = [];
      let res: any = await getGoodsBrandReq(id, isList).then((res: any) => {
        if (res.data.data) {
          if (!id) {
            let detailVo: IServiceGroupVo = res.data.data.table;
            goodsBrandListRef.value = detailVo;
            goodsBrandListRef.value.sort(function (a: any, b: any) {
              return a.order > b.order ? 1 : -1;
            });
            return goodsBrandListRef.value;
          } else {
            return res.data.data.table;
          }
        } else {
          return res.data.data;
        }
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  /**新增商品分品牌 */
  const addGoodsBrandApi = async (data: any) => {
    try {
      let res = await addGoodsBrandReq(data).then((res: any) => {
        alertStateFn(res, "新增商品品牌");
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  /**更新商品品牌 */
  const updateGoodsBrandApi = async (data: any) => {
    try {
      let res = await updateGoodsBrandReq(data).then((res: any) => {
        alertStateFn(res, "更新商品分類");
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  /**更新商品品牌排序 */
  const updateGoodsBrandOrderApi = async (data: any) => {
    try {
      let res = await updateGoodsBrandOrderReq(data).then((res: any) => {
        alertStateFn(res, "更新商品分類排序");
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  /**刪除商品品牌 */
  const delGoodsBrandApi = async (data: any) => {
    try {
      let res = await delGoodsBrandReq(data).then((res: any) => {
        alertStateFn(res, "刪除商品分類");
        // if (res) getGoodsGroupApi(0);
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  //#endregion 

  //#region 明細
  let goodsDetailListRef: any = ref([]);
  /**獲取商品資料 */
  const getGoodsDetailApi = async (id: any = 0) => {
    try {
      let res: any = null;
      goodsDetailListRef.value = [];
      //查全部
      res = await getGoodsDetailReq(id).then((res: any) => {
        if (res.data.data) {
          if (!id) {
            let detailVo: any = res.data.data.table;
            goodsDetailListRef.value = detailVo;
            return goodsDetailListRef.value;
          } else {
            return res.data.data.table;
          }
        } else {
          return res.data.data;
        }
      });
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
  /**更新商品狀態 */
  const updateGoodsStateApi = async (data: any) => {
    try {
      let res = await updateGoodsStateReq(data).then((res: any) => {
        alertStateFn(res, "更新商品狀態");
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

  //#endregion 

  //#region Order

  let orderDetailListRef: any = ref([]);
  /**獲取訂單資料 */
  const getOrderApptDetailApi = async (g: any, id: any) => {
    try {
      let res: any = await getOrderApptDetailReq(g, id).then((res: any) => {
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
            managerList.value = res.data.data.table.filter((item: any) => item.roleList[0].roleId == level && !item.userLock);
          return managerList.value;
        }
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
  /**獲取訂單主表 */
  const getOrderListApi = async (id: any = 0, startDate: any = "", endDate: any = "", isList: any = 0) => {
    try {
      orderList.value = [];
      let res: any = await getOrderListReq(id, startDate, endDate, isList).then((res: any) => {
        if (res.data.data) {
          if (!id) {
            let detailVo: any = res.data.data.table;
            orderList.value = detailVo;
            return orderList.value;
          } else {
            return res.data.data.table;
          }
        } else {
          return res.data.data;
        }
      });
      return res
    } catch (error) {
      console.log(error);
    }
  };

  let orderInfoRef: any = ref([]);
  /**獲取訂單明細 */
  const getOrderInfoApi = async (id: any = "", bkListNo = "", isList: any = 0) => {
    try {
      orderInfoRef.value = [];
      let res: any = await getOrderDetailReq(id, bkListNo, isList).then((res: any) => {
        if (res.data.data && (id != "" || bkListNo != "")) {
          let detailVo: any = res.data.data.table[0];
          orderInfoRef.value = detailVo;
          return orderInfoRef.value;
        } else {
          return res.data.data.table;
        }
      });
      return res
    } catch (error) {
      console.log(error);
    }
  };
  let payTypeListRef: any = ref([]);
  /**獲取訂單明細 */
  const getPayTypeListApi = async (id: any = 0) => {
    try {
      payTypeListRef.value = [];
      let res: any = await getPayTypeListReq(id).then((res: any) => {
        if (res.data.data && id == 0) {
          let dataVo: any = res.data.data.table;
          payTypeListRef.value = dataVo;
          return payTypeListRef.value;
        } else {
          return res.data.data.table;
        }
      });
      return res
    } catch (error) {
      console.log(error);
    }
  };

  let pickUpList: any = ref([]);
  /**獲取取貨紀錄 */
  const getPickUpListApi = async (id: any = 0, startDate: any = "", endDate: any = "", isList: any = 0) => {
    try {
      pickUpList.value = [];
      let res: any = await getPickUpListReq(id, startDate, endDate, isList).then((res: any) => {
        if (res.data.data) {
          if (!id) {
            let detailVo: any = res.data.data.table;
            pickUpList.value = detailVo;
            return pickUpList.value;
          } else {
            return res.data.data.table;
          }
        } else {
          return res.data.data;
        }
      });
      return res
    } catch (error) {
      console.log(error);
    }
  };
  let exportList: any = ref([]);
  /**獲取匯出紀錄 */
  const getExportListApi = async (id: any = 0, startDate: any = "", endDate: any = "", isList: any = 0) => {
    try {
      exportList.value = [];
      let res: any = await getExportListReq(id, startDate, endDate, isList).then((res: any) => {
        if (res.data.data) {
          if (!id) {
            let detailVo: any = res.data.data.table;
            exportList.value = detailVo;
            return exportList.value;
          } else {
            return res.data.data.table;
          }
        } else {
          return res.data.data;
        }
      });
      return res
    } catch (error) {
      console.log(error);
    }
  };

  
  /**新增通知 */
  const addPickUpNoticeApi = async (data: any) => {
    try {
      let res = await addPickUpNoticeReq(data).then((res: any) => {
        alertStateFn(res, "新增服務群組");
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  //#endregion

  //#region 排休

  /**獲取預約資料 */
  const getDayOffApi = async (id: any = "", yy: any = 0, mm: any = 0, dd: any = 0) => {
    try {
      bookingList.value = [];
      let res: any = await getDayOffReq(id, yy, mm, dd).then((res: any) => {
        let tableVo = []
        if (res.data.state == 2 && res.data.msg == 'DE03') {
          tableVo = [];
        } else if (res.data.data && res.data.state == 1) {
          tableVo = res.data.data.table;
        }
        return tableVo;
      });
      return res;
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };
  const getRestApi = async (id: any = "", yy: any = 0, mm: any = 0, dd: any = 0) => {
    try {
      bookingList.value = [];
      let res: any = await getRestReq(id, yy, mm, dd).then((res: any) => {
        let tableVo = []
        if (res.data.state == 2 && res.data.msg == 'DE03') {
          tableVo = [];
        } else if (res.data.data && res.data.state == 1) {
          tableVo = res.data.data.table;
        }
        return tableVo;
      });
      return res;
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };
  //#endregion

  //#region 明細
  let noticeListRef: any = ref([]);
  /**獲取訊息明細 */
  const getNoticeListApi = async (uid: any = 0) => {
    try {
      let res: any = null;
      noticeListRef.value = [];
      //查全部
      res = await getNoticeListReq(uid).then((res: any) => {
        if (res.data.data && !uid) {
          let detailVo: any = res.data.data.table;
          noticeListRef.value = detailVo;
          return noticeListRef.value;
        } else {
          return res.data.data.table;
        }
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  /**獲取未讀訊息 */
  const getNoticeCountApi = async (uid: any = 0) => {
    try {
      let res: any = null;
      noticeListRef.value = [];
      //查全部
      res = await getNoticeCountReq(uid).then((res: any) => {
        if (res.data.data && !uid) {
          let detailVo: any = res.data.data.table;
          return detailVo;
        } else {
          return res.data.data;
        }
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  /**更新通知閱讀狀態 */
  const updateNoticeIsReadApi = async (data: any) => {
    try {
      let res = await updateNoticeIsReadReq(data).then((res: any) => {
        // alertStateFn(res, "更新通知讀取狀態");
        return res;
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    //--------------------服務S
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
    //--------------------舊課程c
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
    //--------------------預約
    getApptDataApi,
    postAddApptDataApi,
    postEditApptDataApi,
    postEditApptStateApi,
    getBeauticianApi,
    bookingList,
    tuiBookingListRef,
    beauticianList,
    timeGroup,
    getApptDataByUserApi,
    //--------------------商品
    goodsGroupList,
    getGoodsGroupApi,
    addGoodsGroupApi,
    updateGoodsGroupApi,
    updateGoodsGroupOrderApi,
    delGoodsGroupApi,
    goodsDetailListRef,
    getGoodsDetailApi,
    addGoodsDetailApi,
    updateGoodsDetailApi,
    delGoodsDetailApi,
    goodsBrandListRef,
    getGoodsBrandApi,
    addGoodsBrandApi,
    updateGoodsBrandApi,
    updateGoodsBrandOrderApi,
    delGoodsBrandApi,
    updateGoodsStateApi,
    //--------------------Order
    getOrderApptDetailApi,
    orderDetailListRef,
    //--------------------管理員
    managerList,
    getManagerListApi,
    addRestApi,
    //--------------------會員
    memberList,
    getMemberListApi,
    expenseInfoRef,
    getExpenseInfoApi,
    //--------------------結帳
    addCheckOutApi,
    //--------------------訂單
    getOrderListApi,
    orderList,
    getOrderInfoApi,
    orderInfoRef,
    getPayTypeListApi,
    payTypeListRef,
    getPickUpListApi,
    pickUpList,
    getExportListApi,
    exportList,
    addPickUpNoticeApi,
    //-----------------休息日
    getDayOffApi,
    getRestApi,
    //-----------------通知
    getNoticeListApi,
    noticeListRef,
    updateNoticeIsReadApi,
    getNoticeCountApi
  };
});
