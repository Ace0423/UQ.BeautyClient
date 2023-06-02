import { defineStore } from "pinia";

import {
  getAllDiscountReq,
  postAddAllDiscountReq,
  deleteAllDiscountReq,
} from "@/api/priceRequest";
export const useApptStore = defineStore("priceStore", () => {
  let allDiscountList: any = ref([]);
  //取資料
  const getAllDiscountApi = async (
    id: any = "",
    page: any = 0,
    count: any = 0
  ) => {
    try {
      let res: any = await getAllDiscountReq(id, page, count);
      allDiscountList.value = [];
      if (res.data.data.table) allDiscountList.value = res.data.data.table;
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  //新增分類
  const addtAllDiscountApi = async (data: any) => {
    try {
      let res = await postAddAllDiscountReq(data);
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  //刪除資料
  const delAllDiscountApi = async (data: any) => {
    try {
      let res = await deleteAllDiscountReq(data);
      if (res) getAllDiscountApi();
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
  };
});
