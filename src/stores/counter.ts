import { defineStore } from "pinia";
import {
  apiPostLoginRequest,
  apiGetUserNameRequest,
  apiGetMemberListRequest,
  apiPostMemberDataRequest,
} from "@/api/index";
import { setToken, getToken, delToken } from "@/plugins/js-cookie";
export const useCounterStore = defineStore("counter", () => {
  const isLogin = ref(false);
  const memberList: any = reactive({ data: [] });
  const userInfo: any = reactive({});
  const authHandler = async (data: any) => {
    const { username, password } = data;
    // setIsLogin(true);
    try {
      const res = await apiPostLoginRequest({ username, password });
      if (res.data.state == 1) {
        const token = {
          token: res.data.data.token,
        };
        setToken("token", token);
        res.data.data.userData.email = res.data.data.email;
        setToken("userData", res.data.data.userData);
        userInfo.user = res.data.data.userData.user;
        userInfo.name = res.data.data.userData.name;
        userInfo.phone = res.data.data.userData.phone;
        userInfo.roleMgrMappings = res.data.data.userData.roleMgrMappings;
        userInfo.email = res.data.data.userData.email;
        setIsLogin(true);
      }
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const handLogOut = () => {
    delToken("token");
    delToken("userData");
    setIsLogin(false);
    location.reload()
  }
  const setUserData = () => {
    let val: any = getToken("userData");
    let userData = JSON.parse(val);
    userInfo.user = userData.user;
    userInfo.name = userData.name;
    userInfo.phone = userData.phone;
    userInfo.roleMgrMappings = userData.roleMgrMappings;
    userInfo.email = userData.email;
  };

  const setIsLogin = (bool: boolean) => {
    isLogin.value = bool;
  };

  const getMemberData = async () => {
    try {
      const dataRequest = reactive({
        id: 0,
        pageindex: 0,
        count: 0,
      });
      const res = await apiGetMemberListRequest(dataRequest);
      memberList.data = res.data.data.table;
    } catch (error) {
      console.log(error);
    }
  };
  const createMember = async (data: any) => {
    try {
      const res = await apiPostMemberDataRequest(data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isLogin,
    setIsLogin,
    authHandler,
    getMemberData,
    memberList,
    createMember,
    userInfo,
    setUserData,
    handLogOut
  };
});
