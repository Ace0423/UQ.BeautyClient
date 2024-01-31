import axios, { type AxiosInstance } from "axios";
import { getToken } from "@/plugins/js-cookie";
import { deleteHttps, getHttps, postHttps, putHttps } from "./sendHttps";

const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  headers: {},
});

//#region 全單折扣  
/**獲取全單折扣 */
export const getAllDiscountReq = (id: any = 0, page: any = 0, count: any = 0) =>
  getHttps(httpRequest, "/Discounts/Discount" + "?type=0&no=" + id + "&pageIndex=" + page + "&count=" + count, id);
/**新增全單折扣 */
export const postAddAllDiscountReq = (data: any) =>
  postHttps(httpRequest, "/Discounts/Discount", data);
/**編輯全單折扣 */
export const postUpdateAllDiscountReq = (data: any) =>
  putHttps(
    httpRequest,
    "/Discounts/Discount" + "?dcNo=" + data.discountNo,
    data
  );
/**刪除全單折扣 */
export const deleteAllDiscountReq = (data: any) =>
  deleteHttps(httpRequest, "/Discounts/Discount" + "?dcNo=" + data, data);
//#endregion


/**獲取單品折扣 */
export const getSingleDiscountReq = (id: any, page: any, count: any) =>
  getHttps(httpRequest, "/Discounts/Discount" + "?type=1&no=" + id + "&pageIndex=" + page + "&count=" + count, id);
/**新增單品折扣 */
export const postAddSingleDiscountReq = (data: any) =>
  postHttps(httpRequest, "/Discounts/Discount", data);
/**編輯單品折扣 */
export const postUpdateSingleDiscountReq = (data: any) =>
  putHttps(httpRequest, "/Discounts/Discount" + "?dcNo=" + data.discountNo, data);
/**刪除單品折扣 */
export const deleteSingleDiscountReq = (data: any) =>
  deleteHttps(httpRequest, "/Discounts/Discount" + "?dcNo=" + data, data);

/**獲取單品折扣 */
export const getSgDiscountByItemReq = (itemType: any, itemId: any, page: any, count: any) =>
  getHttps(httpRequest, "/Discounts/SgDiscount" + "?itemType=" + itemType + "&itemId=" + itemId + "&pageIndex=" + page + "&count=" + count, itemId);
//--------------------------------優惠券
//#region 優惠券  
/**獲取優惠券 */
export const getCouponReq = (
  id: any,
  select: any,
  type: any,
  page: any,
  count: any
) =>
  getHttps(
    httpRequest,
    "/Discounts/CouponCard" +
    "?CCId=" +
    id +
    "&select=" +
    select +
    "&type=" +
    type +
    "&pageIndex=" +
    page +
    "&count=" +
    count
  );

/**新增 */
export const addCouponReq = (data: any) =>
  postHttps(httpRequest, "/Discounts/CouponCard", data);
/**編輯 */
export const updateCouponReq = (data: any) =>
  putHttps(
    httpRequest,
    "/Discounts/CouponCard" + "?CCId=" + data.ccId,
    data
  );
/**刪除 */
export const deleteCouponReq = (data: any) =>
  deleteHttps(httpRequest, "/Discounts/CouponCard" + "?CCId=" + data, data);
//#endregion

//--------------------------------計次券
//#region 計次券  
/**獲取 */
export const getCountTicketReq = (id: any, select: any, type: any, page: any, count: any) =>
  getHttps(httpRequest, "/Discounts/ForFreeCard" + "?FFId=" + id + "&select=" + select + "&type=" + type + "&pageIndex=" + page + "&count=" + count);

/**新增 */
export const addCountTicketReq = (data: any) =>
  postHttps(httpRequest, "/Discounts/ForFreeCard", data);
/**編輯 */
export const updateCountTicketReq = (data: any) =>
  putHttps(
    httpRequest,
    "/Discounts/ForFreeCard" + "?FFId=" + data.ffId,
    data
  );
/**刪除 */
export const deleteCountTicketReq = (data: any) =>
  deleteHttps(httpRequest, "/Discounts/ForFreeCard" + "?FFId=" + data, data);
//#endregion


//#region 儲值卡  

/**獲取單品折扣 */
export const getTopUpUseDetailReq = (UId: any, page: any, count: any) =>
  getHttps(httpRequest, "/Discounts/TopUpUseDetail?UId=" + UId + "&pageIndex=" + page + "&count=" + count);
//#endregion

