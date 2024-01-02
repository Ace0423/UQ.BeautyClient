import axios from "axios";
import { deleteHttps, getHttps, postHttps, putHttps } from "./sendHttps";
import { getToken } from "@/plugins/js-cookie";

const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  headers: {
    // "Content-Type": "application/x-www-form-urlencoded; charset=utf-8;",
    // "Content-Type": "multipart/form-data",
  },
});
/**獲取預約 */
export const getApptDataRequest = (data: any) =>
  getHttps(httpRequest, "/Booking" + data, data);
/**新增預約 */
export const postAddApptDataReq = (data: any) =>
  postHttps(httpRequest, "/Booking/Booking", data);
/**更新預約 */
export const postEditApptDataReq = (data: any) =>
  postHttps(httpRequest, "/Booking/update", data);
/**更新預約狀態 */
export const postEditApptStateReq = (data: any) =>
  postHttps(httpRequest, "/Booking/UpdateState", data);
//-----------------------------------------
/**獲取課程資料 */
export const getCourseDetailReq = (Group: any, id: any) =>
  getHttps(httpRequest, "Lesson/Detail?id=" + Group + "&lid=" + id);
/**獲取課程類型 */
export const getCourseTypeReq = (data: any) =>
  getHttps(httpRequest, "/Lesson/Group?id=" + data);
/**獲取治療師 */
export const getBeauticianReq = (data: any) =>
  getHttps(httpRequest, "member/Beautician?id=" + data);

/**新增服務類型 */
export const postAddUQLessonTypeReq = (data: any) =>
  postHttps(httpRequest, "/Lesson/Group", data);
/**新增服務資訊 */
export const postAddUQLessonDetailReq = (data: any) =>
  postHttps(httpRequest, "/Lesson/Detail", data);

/**更新服務類型 */
export const updateLessonTypeReq = (data: any) =>
  postHttps(httpRequest, "/Lesson/GroupUpdate", data);
/**更新服務資訊 */
export const updateCourseDetailReq = (data: any) =>
  postHttps(httpRequest, "/Lesson/DetailUpdate", data);
/**更新服務類型排序 */
export const updateLessonTypeOrderReq = (data: any) =>
  postHttps(httpRequest, "/Lesson/GroupUpdateOrder", data);

/**刪除服務類型 */
export const delCourseTypeReq = (data: any) =>
  deleteHttps(httpRequest, "/Lesson/Group/" + data);
/**刪除服務資訊 */
export const delCourseDetailReq = (data: any) =>
  deleteHttps(httpRequest, "/Lesson/Detail/" + data);
//-----------------------------------------服務
/**新增群組 */
export const addServiceGroupReq = (data: any) =>
  postHttps(httpRequest, "/Service/ServiceGroup", data);
/**獲取明細 */
export const getServiceDetailReq = (id: any, isList: any) =>
  getHttps(httpRequest, "/Service/ServiceInfo?sid=" + id + "&isList=" + isList + "&pageIndex=" + 0 + "&count=" + 0);
/**新增服務資訊 */
export const addServiceDetailReq = (data: any) =>
  postHttps(httpRequest, "/Service/ServiceInfo", data);
/**更新明細 */
export const updateServiceDetailReq = (data: any) =>
  putHttps(
    httpRequest,
    "/Service/ServiceInfo?sId=" + data.sId,
    data
  );
/**刪除明細 */
export const deleteServiceDetailReq = (id: any) =>
  deleteHttps(httpRequest, "/Service/ServiceInfo/" + id, id);
/**獲取群組 */
export const getServiceGroupReq = (id: any, isList: any) =>
  getHttps(httpRequest, "/Service/ServiceGroup?sgid=" + id + "&isList=" + isList + "&pageIndex=" + 0 + "&count=" + 0);

/**刪除群組*/
export const deleteServiceGroupReq = (id: any) =>
  deleteHttps(httpRequest, "/Service/ServiceGroup/" + id, id);
/**更新群組 */
export const updateServiceGroupReq = (data: any) =>
  putHttps(
    httpRequest,
    "/Service/ServiceGroup?sgId=" + data.sgId,
    data
  );
/**更新群組排序 */
export const updateGroupOrderReq = (data: any) =>
  postHttps(httpRequest, "Service/GroupUpdateOrder", data);

//-----------------------------------------Order
/**獲取訂單資訊 */
export const getOrderDetailReq = (Group: any, id: any) =>
  getHttps(httpRequest, "Lesson/Detail?id=" + Group + "&lid=" + id);

//-----------------------------------------管理員

/**獲取明細 */
export const getManagerListReq = (id: any) =>
  getHttps(httpRequest, "/manager/Admin?id=" + id + "&pageIndex=" + 0 + "&count=" + 0);
export const addRestReq = (data: any) =>
  postHttps(httpRequest, "/manager/WorkingHours", data);

  
//-----------------------------------------結帳

/**新增服務資訊 */
export const addCheckOutReq = (data: any) =>
  postHttps(httpRequest, "/CheckOut/CheckOutInfo", data);













