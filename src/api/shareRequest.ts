//--------------------------------test

import axios from "axios";
import { deleteHttps, getHttps, postHttps, putHttps } from "./sendHttps";

const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  headers: {},
});

/**獲取 */
export const getApiTestReq = (data: any, page: any, count: any) =>
  getHttps(httpRequest, data + "&pageIndex=" + page + "&count=" + count);

/**新增 */
export const addApiTestReq = (url: any, data: any) =>
  postHttps(httpRequest, url, data);
/**編輯 */
export const updateApiTestReq = (url: any, data: any) =>
  putHttps(httpRequest, url, data);
/**刪除 */
export const deleteApiTestReq = (url: any) =>
  deleteHttps(httpRequest, url);
