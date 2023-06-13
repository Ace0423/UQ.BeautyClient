import axios, { type AxiosInstance } from "axios";
import { getToken } from "@/plugins/js-cookie";
import { deleteHttps, getHttps, postHttps, putHttps } from "./sendHttps";

const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  headers: {},
});

/**獲取全單折扣 */
export const getAllDiscountReq = (id: any = 0, page: any = 0, count: any = 0) =>
  getHttps(
    httpRequest,
    "/Discounts/Discount" +
      "?type=0&no=" +
      id +
      "&pageIndex=" +
      page +
      "&count=" +
      count,
    id
  );
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

/**獲取單品折扣 */
export const getSingleDiscountReq = (id: any, page: any, count: any) =>
  getHttps(
    httpRequest,
    "/Discounts/Discount" +
      "?type=1&no=" +
      id +
      "&pageIndex=" +
      page +
      "&count=" +
      count,
    id
  );
/**新增單品折扣 */
export const postAddSingleDiscountReq = (data: any) =>
  postHttps(httpRequest, "/Discounts/Discount", data);
/**編輯單品折扣 */
export const postUpdateSingleDiscountReq = (data: any) =>
  putHttps(
    httpRequest,
    "/Discounts/Discount" + "?dcNo=" + data.discountNo,
    data
  );
/**刪除單品折扣 */
export const deleteSingleDiscountReq = (data: any) =>
  deleteHttps(httpRequest, "/Discounts/Discount" + "?dcNo=" + data, data);
