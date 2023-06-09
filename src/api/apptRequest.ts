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
//-----------------------------------------Order
/**獲取訂單資訊 */
export const getOrderDetailReq = (Group: any, id: any) =>
  getHttps(httpRequest, "Lesson/Detail?id=" + Group + "&lid=" + id);
