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
  getBeauticianReq,
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
  const beauticianList: any = ref([{ userId: 0, nameView: "不指定" }]);
  const getBeauticianApi = async (data: any) => {
    try {
      const res = await getBeauticianReq(data);
      for (let i = 0; i < res.data.data.length; i++) {
        const element = res.data.data[i];
        beauticianList.value.push(element);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      courseDataList.value = [];
      for (let i = 0; i < curData.data.data.length; i++) {
        const element = curData.data.data[i];
        if (element.display) courseDataList.value.push(element);
      }
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

  let timeGroup: any = ref([
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
  ]);
  let bookingList: any = ref([]);
  const getApptDataApi = async (year: any, month: any) => {
    try {
      let data = "?year=" + year + "&month=" + month;
      let res = await getApptDataRequest(data);
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
      //插入預約
      for (let i = 0; i < res.data.data.length; i++) {
        const bookingListEmt = res.data.data[i];
        if (bookingListEmt.state == 3) {
          continue;
        }
        for (let j = 0; j < bookingList.value.length; j++) {
          // const timeEmt = timeList[j];
          const timeEmt = bookingList.value[j];
          let curDateTime = bookingListEmt.dateBooking.split("T");
          let curTime =
            curDateTime[1].split(":")[0] + ":" + curDateTime[1].split(":")[1];
          let things = [];
          for (let k = 0; k < memberList.data.length; k++) {
            const memberData = memberList.data[k];
            if (memberData.userId == bookingListEmt.userId) {
              if (curTime == timeEmt.timePeriod && bookingListEmt.lesson) {
                let bookingData: any = {
                  id: bookingListEmt.bookingNo,
                  timePeriod: curTime, //hh:mm
                  date: curDateTime[0], //yyyy-mm-dd
                  phone: memberData.phone,
                  range: bookingListEmt.timer / 30,

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
                // things.push(bookingData);
              }
            }
          }
        }
      }
      //   getCurWeek();

      return bookingList;
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
    bookingList,
    postAddApptDataApi,
    postEditApptDataApi,
    getBeauticianApi,
    beauticianList,
    timeGroup,
  };
});
