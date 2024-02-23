import axios from "axios";
import { getToken } from "@/plugins/js-cookie";
const bookingRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

export const getBookingByUIdRequest = (data: any) => {
  let token: any = getToken('token');
  bookingRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
  return bookingRequest.get("/Booking/BookingByUId", { params: data });
}
