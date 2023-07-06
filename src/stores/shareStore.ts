import {
  addApiTestReq,
  deleteApiTestReq,
  getApiTestReq,
  updateApiTestReq,
} from "@/api/shareRequest";
import Alert from "@/components/alertCmpt";
import { showErrorMsg } from "@/types/IMessage";
import { defineStore } from "pinia";

export const useApptStore = defineStore("shareStore", () => {
  //--------------------------------計次券

  function alertStateFn(res: any, apiName: string = "") {
    if (res.state == 1) {
      Alert.sussess("成功", 1000);
    } else {
      Alert.error("失敗(" + showErrorMsg(res.msg) + ")", 1000);
    }
  }

  //獲取
  let countTicketListRef: any = ref([]);
  let selectCountTicketRef: any = ref([]);
  const getApiTestApi = async (url = "", page: any = 0, count: any = 0) => {
    try {
      let res: any = await getApiTestReq(url, page, count).then((res: any) => {
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  //新增
  const addApiTestApi = async (url: any,data: any) => {
    try {
      let res = await addApiTestReq(url, data).then((res: any) => {
        alertStateFn(res, "新增");
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  //更新
  const updateApiTestApi = async (url: any, data: any) => {
    try {
      let res = await updateApiTestReq(url, data).then((res: any) => {
        alertStateFn(res, "更新");
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  //刪除
  const delApiTestApi = async (url: any) => {
    try {
      let res = await deleteApiTestReq(url).then((res: any) => {
        alertStateFn(res, "刪除");
        return res;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  return {
    getApiTestApi,
    addApiTestApi,
    updateApiTestApi,
    delApiTestApi,
  };
});
