import Alert from "@/components/alertCmpt";
import { getToken } from "@/plugins/js-cookie";
import { showErrorMsg, showHttpsStatus } from "@/types/IMessage";
import axios from "axios"; // 參照axios

import { useCounterStore } from "@/stores/counter";
const counterStore = useCounterStore();
const { handLogOut } = counterStore;

const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  // headers: { "content-type": "application/json; charset=utf-8" },
});

export const updataToken = (instance: any) => {
  let token: any = getToken("token");
  instance.defaults.headers.common["Authorization"] =
    "bearer " + JSON.parse(token).token;
};

//get請求
export function getHttps(instance: any = httpRequest, url: any, params = {}) {
  updataToken(instance);
  // instance.defaults.withCredentials = true;
  return new Promise((resolve, reject) => {
    instance
      .get(url, params)
      .then((response: any) => {
        resolve(response);
      })
      .catch((err: any) => {
        errorFn(err);
        reject(err);
      });
  });
}
//post請求
export function postHttps(instance: any = httpRequest, url: any, data = {}) {
  updataToken(instance);
  return new Promise((resolve, reject) => {
    instance.post(url, data).then(
      (response: any) => {
        resolve(response.data);
      },
      (err: any) => {
        errorFn(err);
        reject(err);
      }
    );
  });
}
//post請求
export function putHttps(instance: any = httpRequest, url: any, data = {}) {
  updataToken(instance);
  return new Promise((resolve, reject) => {
    instance.put(url, data).then(
      (response: any) => {
        resolve(response.data);
      },
      (err: any) => {
        errorFn(err);
        reject(err);
      }
    );
  });
}

//post請求
export function deleteHttps(instance: any = httpRequest, url: any, data = {}) {
  updataToken(instance);
  return new Promise((resolve, reject) => {
    instance.delete(url, data).then(
      (response: any) => {
        resolve(response.data);
      },
      (err: any) => {
        errorFn(err);
        reject(err);
      }
    );
  });
}

//
function errorFn(err: any) {
  if (err && err.request && err.request.status) {
    if (err.request.status == 401) {
      setTimeout(() => {
        Alert.tip(showHttpsStatus(err.request.status), 1000, onAlertBtn);
      }, 200);
    } else {
      setTimeout(() => {
        Alert.warning(showHttpsStatus(err.request.status), 1000);
      }, 200);
    }
  }
}

const onAlertBtn = (err: any) => {
  console.log(err, "err");
  handLogOut();
};
