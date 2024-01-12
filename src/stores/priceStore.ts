import { defineStore } from "pinia";

import {
  getAllDiscountReq,
  postAddAllDiscountReq,
  deleteAllDiscountReq,
  getSingleDiscountReq,
  postAddSingleDiscountReq,
  deleteSingleDiscountReq,
  postUpdateAllDiscountReq,
  postUpdateSingleDiscountReq,
  getCouponReq,
  updateCouponReq,
  deleteCouponReq,
  addCouponReq,
  getCountTicketReq,
  addCountTicketReq,
  updateCountTicketReq,
  deleteCountTicketReq,
  getSgDiscountByItemReq,
} from "@/api/priceRequest";
import Alert from "@/components/alertCmpt";
import { showErrorMsg } from "@/types/IMessage";
import {
  apiGetTopUpCardListRequest,
  apiAddTopUpCardInfoRequest,
  apiEditTopUpCardInfoRequest,
} from "@/api/index";
export const usePriceStore = defineStore("priceStore", () => {
  let allDiscountList: any = ref([]);
  let singleDiscountListRef: any = ref([]);

  function alertStateFn(res: any, apiName: string = "") {
    if (res.state == 1) {
      setTimeout(() => {
        Alert.sussess("成功", 1000);
      }, 200);
    } else {
      setTimeout(() => {
        Alert.error("失敗(" + showErrorMsg(res.msg) + ")", 1000);
      }, 200);
    }
  }

  //#region 全單折扣
  //取全單折扣資料
  const getAllDiscountApi = async (
    id: any = "",
    page: any = 0,
    count: any = 0
  ) => {
    try {
      allDiscountList.value = [];
      let res: any = await getAllDiscountReq(id, page, count).then(
        (res: any) => {
          if (res.data.data.table) allDiscountList.value = res.data.data.table;
          return res;
        }
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  //新增全單折扣分類
  const addAllDiscountApi = async (data: any) => {
    try {
      let res = await postAddAllDiscountReq(data).then((res: any) => {
        alertStateFn(res, "新增全單折扣分類");
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  //更新全單折扣分類
  const updateAllDiscountApi = async (data: any) => {
    try {
      let res = await postUpdateAllDiscountReq(data).then((res: any) => {
        alertStateFn(res, "新增全單折扣分類");
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  //刪除全單折扣資料
  const delAllDiscountApi = async (data: any) => {
    try {
      let res = await deleteAllDiscountReq(data).then((res: any) => {
        alertStateFn(res, "刪除全單折扣資料");
        // getAllDiscountApi();
        return res;
      });
    } catch (error) {
      console.log(error);
    }
  };
  //#endregion
  
  //#region 單品
  //取單品折扣資料
  const getSingleDiscountApi = async (
    id: any = "",
    page: any = 0,
    count: any = 0
  ) => {
    try {
      singleDiscountListRef.value = [];
      let res: any = await getSingleDiscountReq(id, page, count).then(
        (res: any) => {
          if (res.data.data.table) {
            singleDiscountListRef.value = res.data.data.table;
          }
          return res;
        }
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  //新增取單品折扣資料分類
  const addSingleDiscountApi = async (data: any) => {
    try {
      let res = await postAddSingleDiscountReq(data).then((res: any) => {
        alertStateFn(res, "新增取單品折扣資料分類");
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  //更新單品折扣分類
  const updateSingleDiscountApi = async (data: any) => {
    try {
      let res = await postUpdateSingleDiscountReq(data).then((res: any) => {
        alertStateFn(res, "更新單品折扣分類");
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  //刪除全單折扣資料
  const delSingleDiscountApi = async (data: any) => {
    try {
      let res = await deleteSingleDiscountReq(data).then((res: any) => {
        alertStateFn(res, "刪除全單折扣資料");
        // getAllDiscountApi();
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  let sgDcListByItemRef: any = ref([]);
  const getSgDiscountByItemApi = async (itemType: any = 0,id: any = 0,page: any = 0,count: any = 0
  ) => {
    try {
      sgDcListByItemRef.value = [];
      let res: any = await getSgDiscountByItemReq(itemType,id, page, count).then(
        (res: any) => {
          if (res.data.data.table) {
            sgDcListByItemRef.value = res.data.data.table;
          }
          return res;
        }
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  //#endregion

  //#region 優惠券
  //獲取
  let couponListRef: any = ref([]);
  let selectCouponRef: any = ref([]);
  const getCouponApi = async (
    id: any = 0,
    select: any = 1,
    type: any = -1,
    page: any = 0,
    count: any = 0
  ) => {
    try {
      let res: any = await getCouponReq(id, select, type, page, count).then(
        (res: any) => {
          if (res.data.data.table) {
            if (id == 0) {
              couponListRef.value = [];
              couponListRef.value = res.data.data.table;
            } else {
              selectCouponRef.value = [];
              selectCouponRef.value = res.data.data.table;
            }
            if (select == 1) {
              for (let i = 0; i < couponListRef.value.length; i++) {
                const element = couponListRef.value[i];
                element.groupMaps = element.groupList;
                element.productMaps = element.productList;
                element.serviceMaps = element.servicesList;
              }
            } else {
            }
          }
          return res.data.data;
        }
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  //新增
  const addCouponApi = async (data: any) => {
    try {
      let res = await addCouponReq(data).then((res: any) => {
        alertStateFn(res, "新增取優惠券折扣資料分類");
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  //更新
  const updateCouponApi = async (data: any) => {
    try {
      let res = await updateCouponReq(data).then((res: any) => {
        alertStateFn(res, "更新優惠券折扣分類");
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  //刪除
  const delCouponApi = async (data: any) => {
    try {
      let res = await deleteCouponReq(data).then((res: any) => {
        alertStateFn(res, "刪除全單折扣資料");
        // getCouponApi();
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  //#endregion

  //#region 計次券
  //獲取
  let countTicketListRef: any = ref([]);
  let selectCountTicketRef: any = ref([]);
  const getCountTicketApi = async (
    id: any = 0,
    select: any = 1,
    type: any = -1,
    page: any = 0,
    count: any = 0
  ) => {
    try {
      let res: any = await getCountTicketReq(
        id,
        select,
        type,
        page,
        count
      ).then((res: any) => {
        if (res.data.data.table) {
          if (id == 0) {
            countTicketListRef.value = [];
            countTicketListRef.value = res.data.data.table;
          } else {
            selectCountTicketRef.value = [];
            selectCountTicketRef.value = res.data.data.table;
            console.log(selectCountTicketRef.value);
          }
        }
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  //新增
  const addCountTicketApi = async (data: any) => {
    try {
      let res = await addCountTicketReq(data).then((res: any) => {
        alertStateFn(res, "新增計次券資料");
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  //更新
  const updateCountTicketApi = async (data: any) => {
    try {
      let res = await updateCountTicketReq(data).then((res: any) => {
        alertStateFn(res, "更新計次券");
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  //刪除
  const delCountTicketApi = async (data: any) => {
    try {
      let res = await deleteCountTicketReq(data).then((res: any) => {
        alertStateFn(res, "刪除計次券");
        // getCountTicketApi();
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  //#endregion

  //#region 儲值卡
  const topUpCardList: any = reactive({ data: [] });
  const getTopUpCardList = async (data: any) => {
    try {
      const res = await apiGetTopUpCardListRequest(data);
      if (res.data.state == 1) {
        if (data.select == 0) {
          topUpCardList.data = res.data.data.table;
          return res.data;
        } else if (data.select == 1 || data.select == 2) {
          return res.data.data;
        }
      } else if (res.data.state == 2) {
        return res.data;
      }
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };
  const addTopUpCardInfo = async (data: any) => {
    try {
      const res = await apiAddTopUpCardInfoRequest(data);
      if (res.data.state == 1) {
        updataTopUpCardList(res.data.data.table[0]);
      }
      return res.data;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };
  const editTopUpCardInfo = async (data: any) => {
    try {
      const res = await apiEditTopUpCardInfoRequest(data);
      if (res.data.state == 1) {
        updataTopUpCardList(res.data.data.table[0]);
      }
      return res.data;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };
  const updataTopUpCardList = (data: any) => {
    if (topUpCardList.data.filter((item: any) => item.tuId == data.tuId).length > 0) {
      topUpCardList.data.findIndex((item: any) => {
        if (item.tuId == data.tuId) {
          item.tuTitle = data.tuTitle;
          item.tuContext = data.tuContext;
          item.tuType = data.tuType;
          item.tuImage = data.tuImage;
          item.tuSellCount = data.tuSellCount;
          item.tuSellPrice = data.tuSellPrice;
          item.tuViewPrice = data.tuViewPrice;
          item.tudType = data.tudType;
          item.tuddType = data.tuddType;
          item.tuddPrice = data.tuddPrice;
          item.tuLimitType = data.tuLimitType;
          item.tuLimitDay = data.tuLimitDay;
          item.tuColor = data.tuColor;
          item.utShared = data.utShared;
          item.topUpCardMapProducts = data.topUpCardMapProducts;
          item.topUpCardMapServices = data.topUpCardMapServices;
          item.topUpCardFreeProducts = data.topUpCardFreeProducts;
          item.topUpCardFreeServices = data.topUpCardFreeServices;
        }
      });
    } else {
      topUpCardList.data.push(data);
    }
  };
  //#endregion
  return {
    getAllDiscountApi,
    allDiscountList,
    addAllDiscountApi,
    delAllDiscountApi,
    updateAllDiscountApi,
    //--------------------------------單品
    getSingleDiscountApi,
    singleDiscountListRef,
    addSingleDiscountApi,
    delSingleDiscountApi,
    updateSingleDiscountApi,
    getSgDiscountByItemApi,
    sgDcListByItemRef,
    //--------------------------------優惠券
    getCouponApi,
    couponListRef,
    selectCouponRef,
    addCouponApi,
    updateCouponApi,
    delCouponApi,
    //--------------------------------計次券
    getCountTicketApi,
    countTicketListRef,
    selectCountTicketRef,
    addCountTicketApi,
    updateCountTicketApi,
    delCountTicketApi,
    //--------------------------------儲值卡
    topUpCardList,
    getTopUpCardList,
    addTopUpCardInfo,
    editTopUpCardInfo,
  };
});
