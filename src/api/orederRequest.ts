import axios from "axios";
import { getToken } from "@/plugins/js-cookie";
const orderRequest = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
});

export const getOrderByUIdRequest = (data: any) => {
    let token: any = getToken('token');
    orderRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return orderRequest.get("/Order/OrderListByUId", { params: data });
}
