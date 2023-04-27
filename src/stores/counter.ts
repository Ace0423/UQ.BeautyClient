import { defineStore } from "pinia";
import {
  apiPostLoginRequest,
  apiGetUserNameRequest,
  apiGetMemberListRequest,
  apiPostMemberDataRequest,
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
import router from "@/router/index";
import {
  getApptDataRequest,
  postAddApptDataReq,
  postEditApptDataReq,
  postEditCourseDataReq,
} from "@/api/apptRequest";
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
      const res = await apiGetMemberListRequest(dataRequest);
      memberList.data = res.data.data;
      // console.log(memberList);
    } catch (error) {
      console.log(error);
    }
  };
  const createMember = async (data: any) => {
    try {
      const res = await apiPostMemberDataRequest(data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  //---------------------------------course

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

  let courseDataList: any = ref([]);
  //取資料
  const getCourseDetailApi = async (g: any, id: any) => {
    try {
      let curData: any = await getCourseDetailReq(g, id);
      courseDataList.value = curData.data.data;
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
  //------------------apptt

  let timeList: any = [
    "10:00:00",
    "11:00:00",
    "12:00:00",
    "13:00:00",
    "14:00:00",
    "15:00:00",
    "16:00:00",
    "17:00:00",
    "18:00:00",
  ];
  let timePeriodList: any = ref([
    {
      timePeriod_tw: "上午10點",
      timePeriod: "10:00:00",
      things: [],
    },
    {
      timePeriod_tw: "上午11點",
      timePeriod: "11:00:00",
      things: [],
    },
    {
      timePeriod_tw: "下午12點",
      timePeriod: "12:00:00",
      things: [],
    },
    {
      timePeriod_tw: "下午13點",
      timePeriod: "13:00:00",
      things: [],
    },
    {
      timePeriod_tw: "上午14點",
      timePeriod: "14:00:00",
      things: [],
    },
    {
      timePeriod_tw: "下午15點",
      timePeriod: "15:00:00",
      things: [],
    },
    {
      timePeriod_tw: "下午16點",
      timePeriod: "16:00:00",
      things: [],
    },
    {
      timePeriod_tw: "下午17點",
      timePeriod: "17:00:00",
      things: [],
    },
    {
      timePeriod_tw: "下午18點",
      timePeriod: "18:00:00",
      things: [],
    },
  ]);
  const getApptDataApi = async (year: any, month: any) => {
    try {
      let data = "?year=" + year + "&month=" + month;
      let res = await getApptDataRequest(data);
      //重製預約
      for (let i = 0; i < timePeriodList.value.length; i++) {
        const element = timePeriodList.value[i];
        element.things = [];
      }
      //插入預約
      for (let i = 0; i < res.data.data.length; i++) {
        const element = res.data.data[i];
        for (let j = 0; j < timePeriodList.value.length; j++) {
          const element2 = timePeriodList.value[j];
          let curTime = element.dateBooking.split("T");
          for (let k = 0; k < memberList.data.length; k++) {
            const memberData = memberList.data[k];
            if (memberData.userId == element.userId) {
              if (curTime[1] == element2.timePeriod && element.lesson) {
                let bookingData: any = {
                  id: element.bookingNo,
                  timePeriod: curTime[1],
                  date: curTime[0],
                  userId: memberData.userId,
                  name: memberData.nameView,
                  phone: memberData.phone,
                  course: element.lesson,
                  state: element.state,
                  range: element.timer / 60,

                  lessonId: element.lessonId,
                  serverId: element.serverId,
                  dateBooking: element.dateBooking,
                  timer: element.timer,
                  tradeDone: element.tradeDone,
                  price: element.price,
                  discount: element.discount,
                  dateCreate: element.dateCreate,
                  bookingMemo: element.bookingMemo,
                };

                timePeriodList.value[j].things.push(bookingData);
              }
            }
          }
        }
      }
      //   getCurWeek();

      return timePeriodList;
    } catch (error) {
      console.log(error);
    }
  };

  const postAddApptDataApi = async (data: any) => {
    try {
      let res = await postAddApptDataReq(data);
      if (res) {
        // getApptDataApi('','')
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postEditApptDataApi = async (data: any) => {
    try {
      console.log(data);

      let res = await postEditApptDataReq(data);
      if (res) {
        // getApptDataApi('','')
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postEditCourseDataApi = async (data: any) => {
    try {
      console.log(data);

      let res = await postEditCourseDataReq(data);
      if (res) {
        // getApptDataApi('','')
      }
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
    //--------------------appt
    getApptDataApi,
    timePeriodList,
    postAddApptDataApi,
    postEditApptDataApi,
  };
});
