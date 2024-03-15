import axios from "axios";

const authRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

export const postLoginRequest = (data: any) =>
  authRequest.post("/Auth/signin", data);

export const getUserNameRequest = () => authRequest.get("/username");

export const postSendPasswordEmailRequest = (data: any) => {
  return authRequest.post("/Mail/SendPasswordEmail", data);
}
export const postResetPasswordRequest = (data: any) => {
  return authRequest.post("/Auth/ResetPassword", data);
}
