import axios from "axios";
import { getToken } from "@/plugins/js-cookie";
const topUpCardRequest = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
});

export const getTopUpCardListRequest = (data: any) => {
    let token: any = getToken('token');
    topUpCardRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return topUpCardRequest.get("/Discounts/TopUpCard", { params: data });
}
export const addTopUpCardInfoRequest = (data: any) => {
    let token: any = getToken('token');
    topUpCardRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return topUpCardRequest.post("/Discounts/TopUpCard", data);
}
export const editTopUpCardInfoRequest = (data: any) => {
    let token: any = getToken('token');
    topUpCardRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return topUpCardRequest.put("/Discounts/TopUpCard?TUId=" + data.tuId, data);
}

