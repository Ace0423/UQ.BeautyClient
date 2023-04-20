import { defineStore } from "pinia";
import {
  apiPostLoginRequest,
  apiGetUserNameRequest,
  apiGetMenberDataRequest,
  apiPostMenberDataRequest,
} from "@/api/index";
import { setToken } from "@/plugins/js-cookie";
import {
  delCourseDetailReq,
  delCourseTypeReq,
  getCourseDetailReq,
  getCourseTypeReq,
  postAddUQLessonDetailReq,
  postAddUQLessonTypeReq,
  updateCourseDetailReq,
} from "@/api/authRequest";

export const useCounterStore = defineStore("counter", () => {
  const isLogin = ref(false);
  const memberList: any = reactive({ data: [] });

  const authHandler = async (data: any) => {
    const { username, password } = data;
    setIsLogin(true);
    try {
      // const res = await apiPostLoginRequest({ username, password });
      // const token = {
      //   token: res.data.token,
      // };
      // setToken("token", token);
      // setIsLogin(true);
      // getUserName();
    } catch (error) {
      console.log(error);
    }
  };

  const getUserName = async () => {
    try {
      const res = await apiGetUserNameRequest();
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const setIsLogin = (bool: boolean) => {
    isLogin.value = bool;
  };

  const getMemberData = async () => {
    try {
      const dataRequest = reactive({
        id: 0,
        pageindex: 0,
        count: 0,
      });
      const res = await apiGetMenberDataRequest(dataRequest);
      memberList.data = res.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  const createMember = async (data: any) => {
    try {
      const res = await apiPostMenberDataRequest(data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  //---------------------------------

  const courseTypesTabsValue = ref(1);
  let courseTypesTabs: any = ref([]);
  //取分類
  const getCourseTypeApi = async (data: any) => {
    try {
      let curData: any = await getCourseTypeReq(data);
      courseTypesTabs.value = [];
      for (let i = 0; i < curData.data.data.length; i++) {
        let element = curData.data.data[i];
        courseTypesTabs.value.push(element);
      }

      getCourseDetailApi(
        courseTypesTabs.value[courseTypesTabsValue.value].lessonTypeId,
        "0"
      );
    } catch (error) {
      console.log(error);
    }
  };

  let courseData: any = ref([]);
  //取資料
  const getCourseDetailApi = async (g: any, id: any) => {
    try {
      let curData: any = await getCourseDetailReq(g, id);
      courseData.value = curData.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  //刪除分類
  const delCourseTypeApi = async (data: any) => {
    try {
      let res = await delCourseTypeReq(data);
      if (res) getCourseTypeApi(0);
    } catch (error) {
      console.log(error);
    }
  };
  //刪除資料
  const delCourseDetailApi = async (data: any) => {
    try {
      let res = await delCourseDetailReq(data);
      if (res)
        getCourseDetailApi(
          courseTypesTabs.value[courseTypesTabsValue.value].lessonTypeId,
          "0"
        );
    } catch (error) {
      console.log(error);
    }
  };
  //新增分類
  const addCourseTypeApi = async (data: any) => {
    try {
      let res = await postAddUQLessonTypeReq(data);
      if (res) getCourseTypeApi(0);
    } catch (error) {
      console.log(error);
    }
  };
  //新增資料
  const addCourseDetailApi = async (data: any) => {
    try {
      let res = await postAddUQLessonDetailReq(data);
      if (res) getCourseDetailApi(data.lessonTypeId, 0);
    } catch (error) {
      console.log(error);
    }
  };
  //更新資料
  const updateCourseDetailApi = async (data: any) => {
    try {
      let res = await updateCourseDetailReq(data);
      if (res) getCourseDetailApi(data.lessonTypeId, 0);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    isLogin,
    setIsLogin,
    authHandler,
    getMemberData,
    memberList,
    createMember,
    //--------------------
    getCourseTypeApi,
    courseTypesTabs,
    delCourseTypeApi,
    getCourseDetailApi,
    courseData,
    addCourseTypeApi,
    addCourseDetailApi,
    courseTypesTabsValue,
    delCourseDetailApi,
    updateCourseDetailApi,
  };
});
