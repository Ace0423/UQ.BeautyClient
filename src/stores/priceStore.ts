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
} from "@/api/priceRequest";
import Alert from "@/components/alertCmpt";
import { showErrorMsg } from "@/types/IMessage";
export const useApptStore = defineStore("priceStore", () => {
  let allDiscountList: any = ref([]);
  let singleDiscountListRef: any = ref([]);

  function alertStateFn(res: any, apiName: string = "") {
    if (res.state == 1) {
      Alert.sussess("成功", 1000);
    } else {
      Alert.error("失敗(" + showErrorMsg(res.msg) + ")", 1000);
    }
  }

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
        getAllDiscountApi();
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  //--------------------------------單品

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
        getAllDiscountApi();
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  //--------------------------------優惠券

  //獲取
  let couponListRef: any = ref([]);
  const getCouponApi = async (
    id: any = 0,
    select: any = 0,
    type: any = -1,
    page: any = 0,
    count: any = 0
  ) => {
    try {
      couponListRef.value = [];
      let res: any = await getCouponReq(id, select, type, page, count).then(
        (res: any) => {
          if (res.data.data.table) {
            couponListRef.value = res.data.data.table;
          }
          return res;
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

  //刪除優惠券折扣資料
  const delCouponApi = async (data: any) => {
    try {
      let res = await deleteCouponReq(data).then((res: any) => {
        alertStateFn(res, "刪除全單折扣資料");
        getCouponApi();
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };

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
    //--------------------------------優惠券
    getCouponApi,
    couponListRef,
    addCouponApi,
    updateCouponApi,
    delCouponApi,
  };
});
