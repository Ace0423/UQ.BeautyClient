import axios from "axios";
import { getToken } from "@/plugins/js-cookie";
let token: any = getToken("token");

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
  updataToken();
  return apptRequest.post("/Discounts/Discount", data);
};

export const deleteAllDiscountReq = (id: any) => {
  updataToken();
  return apptRequest.delete("/Discounts/Discount" + "?dcNo=" + id, id);
};

export const postEditApptDataReq = (data: any) => {
  updataToken();
  return apptRequest.post("/Discounts/Discount", data);
};
