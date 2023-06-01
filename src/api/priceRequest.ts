import axios from "axios";
import { getToken } from "@/plugins/js-cookie";

const apptRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  headers: {
    // "Content-Type": "application/x-www-form-urlencoded; charset=utf-8;",
    // Authorization: "bearer " + JSON.parse(token).token,
  },
});
const apptRequest_formbody = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  headers: {
    // "Content-Type": "application/x-www-form-urlencoded; charset=utf-8;",
    // Authorization: "bearer " + JSON.parse(token).token,
  },
});

let token: any = getToken("token");
export const updataToken = () => {
  token = getToken("token");
  apptRequest.defaults.headers.common["Authorization"] =
    "bearer " + JSON.parse(token).token;
};

/**獲取折扣清單 */
export const getAllDiscountReq = (
  id: any = 0,
  page: any = 0,
  count: any = 0
) => {
  updataToken();
  return apptRequest.get(
    "/Discounts/Discount" +
      "?no=" +
      id +
      "&pageIndex=" +
      page +
      "&count=" +
      count,
    id
  );
};

export const postAddAllDiscountReq = (data: any) => {
  return apptRequest.post("/Discounts/Discount", data);
};

export const deleteAllDiscountReq = (id: any) => {
  return apptRequest.delete("/Discounts/Discount" + "?dcNo=" + id, id);
};

export const postEditApptDataReq = (data: any) => {
  return apptRequest.post("/Discounts/Discount", data);
};
