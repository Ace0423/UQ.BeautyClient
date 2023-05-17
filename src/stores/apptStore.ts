import { apiGetMemberListRequest } from "@/api";
import {
  getApptDataRequest,
  postAddApptDataReq,
  postEditApptDataReq,
  postEditCourseDataReq,
} from "@/api/apptRequest";
import {
  delCourseDetailReq,
  delCourseTypeReq,
  getBeauticianReq,
  getCourseDetailReq,
  getCourseTypeReq,
  postAddUQLessonDetailReq,
  postAddUQLessonTypeReq,
  updateCourseDetailReq,
  updateLessonTypeOrderReq,
  updateLessonTypeReq,
} from "@/api/authRequest";
import { defineStore } from "pinia";

export const useApptStore = defineStore("apptStore", () => {
  //---------------------------------course
  const beauticianList: any = ref([{ userId: 0, nameView: "不指定" }]);
  const getBeauticianApi = async (data: any) => {
    try {
      const res = await getBeauticianReq(data);
      if (res.data.data)
        for (let i = 0; i < res.data.data.table.length; i++) {
          const element = res.data.data.table[i];
          beauticianList.value.push(element);
        }
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
  //取分類
  const getCourseTypeApi = async (data: any) => {
    try {
      let res: any = await getCourseTypeReq(data);
      courseTypesTabs.value = [
        {
          lessonTypeId: 0,
          display: true,
          nameTw: "全部",
          order: 0,
        },
      ];
      courseDataList.value = [];
      if (res.data.data.table) {
        for (let i = 0; i < res.data.data.table.length; i++) {
          let element = res.data.data.table[i];
          // element.orderCheck = element.order;
          element.editState = false;
          (element.editNameTw = element.nameTw),
            courseTypesTabs.value.push(element);
        }
        courseTypesTabs.value.sort(function (a: any, b: any) {
          return a.order > b.order ? 1 : -1;
        });
        getCourseDetailApi(
          courseTypesTabs.value[courseTypesTabsValue.value].lessonTypeId,
          "0"
        );
      }
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  let courseDataList: any = ref([]);
  //取資料
  const getCourseDetailApi = async (g: any, id: any) => {
    try {
      let res: any = await getCourseDetailReq(g, id);
      courseDataList.value = [];
      if (res.data.data.table) courseDataList.value = res.data.data.table;
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  //刪除分類
  const delCourseTypeApi = async (data: any) => {
    try {
      let res = await delCourseTypeReq(data);
      if (res) getCourseTypeApi(0);
      return res;
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
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  //新增分類
  const addCourseTypeApi = async (data: any) => {
    try {
      let res = await postAddUQLessonTypeReq(data);
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  //更新分類
  const editCourseTypeApi = async (data: any) => {
    try {
      let res = await updateLessonTypeReq(data);
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  //更新分類排序
  const editCourseTypeOrderApi = async (data: any) => {
    try {
      let res = await updateLessonTypeOrderReq(data);
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  //新增資料
  const addCourseDetailApi = async (data: any) => {
    try {
      let res = await postAddUQLessonDetailReq(data);
      if (res) getCourseDetailApi(data.lessonTypeId, 0);
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  //更新資料
  const updateCourseDetailApi = async (data: any) => {
    try {
      console.log(data);

      let res = await updateCourseDetailReq(data);
      if (res) getCourseDetailApi(data.lessonTypeId, 0);
      return res;
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
  const memberList: any = reactive({ data: [] });

  const getMemberData = async () => {
    try {
      const dataRequest = reactive({
        id: 0,
        pageindex: 0,
        count: 0,
      });
      const res = await apiGetMemberListRequest(dataRequest);
      memberList.data = res.data.data.table;
      return res;
    } catch (error) {
      console.log(error);
    }
  };
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
      if (res.data.data.table)
        for (let i = 0; i < res.data.data.table.length; i++) {
          const bookingListEmt = res.data.data.table[i];
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
            // for (let k = 0; k < memberList.data.length; k++) {
            //   const memberData = memberList.data[k];
            //   if (memberData.userId == bookingListEmt.userId) {
            if (curTime == timeEmt.timePeriod && bookingListEmt.lesson) {
              let bookingData: any = {
                id: bookingListEmt.bookingNo,
                timePeriod: curTime, //hh:mm
                date: curDateTime[0], //yyyy-mm-dd
                range:
                  bookingListEmt.timer > 30 ? bookingListEmt.timer / 30 : 1,

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
            }
          }
          //   }
          // }
        }
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const postAddApptDataApi = async (data: any) => {
    try {
      let res = await postAddApptDataReq(data);
      return res;
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
      return res;
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
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  return {
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
    getMemberData,
    getApptDataApi,
    postAddApptDataApi,
    postEditApptDataApi,
    getBeauticianApi,
    bookingList,
    beauticianList,
    memberList,
    timeGroup,
  };
});