import { defineStore } from "pinia";

import {
  getAllDiscountReq,
  postAddAllDiscountReq,
  deleteAllDiscountReq,
  getSingleDiscountReq,
  postAddSingleDiscountReq,
  deleteSingleDiscountReq,
} from "@/api/priceRequest";
import Alert from "@/components/alertCmpt";
import { showErrorMsg } from "@/types/IMessage";
export const useApptStore = defineStore("priceStore", () => {
  let allDiscountList: any = ref([]);
  let singleDiscountListRef: any = ref([]);

  function alertStateFn(res: any, apiName: string = "") {
    console.log(res.state);
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
  const addtAllDiscountApi = async (data: any) => {
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
          if (res.data.data.table)
            singleDiscountListRef.value = res.data.data.table;
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
  return {
    getAllDiscountApi,
    allDiscountList,
    addtAllDiscountApi,
    delAllDiscountApi,
    //--------------------------------單品
    getSingleDiscountApi,
    singleDiscountListRef,
    addSingleDiscountApi,
    delSingleDiscountApi,
  };
});
