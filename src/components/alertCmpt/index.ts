import { h, render, ref } from "vue";
import GlAlert from "./Alert.vue";
type Props = {
  type: number;
  message: string;
  duration?: number;
  onAlertBtn?: Function;
};
const div = document.createElement("div");
div.setAttribute("class", "gl-alert");
document.body.appendChild(div);
console.log("alert初始化");

// 定时器
let timer = ref<any>(null);
export default function Alert({
  type,
  message,
  onAlertBtn,
  duration = 3000,
}: Props) {
  const alertBtnHdr = (data: any) => {
    console.log("按鈕");
    if (onAlertBtn) onAlertBtn(data == 1);
    onClose();
  };
  const vNode = h(GlAlert, { type, message, alertBtnHdr });
  render(vNode, div);

  if (type == 2) {
    timer && clearTimeout(timer.value);
    timer.value = setTimeout(() => {
      onClose();
    }, duration);
  }
  const onClose = () => {
    setTimeout(() => {
      render(null, div);
    }, 200);
  };
}

Alert.sussess = (message: string, duration?: number) => {
  Alert({ type: 2, message, duration });
};
Alert.error = (message: string, duration?: number) => {
  Alert({ type: 2, message, duration });
};
Alert.warning = (message: string, duration?: number) => {
  Alert({ type: 2, message, duration });
};
//可用是否選擇 2按鈕
Alert.check = (message: string, duration?: number, onAlertBtn?: Function) => {
  Alert({ type: 0, message, duration: 0, onAlertBtn });
};
//提示  1按鈕
Alert.tip = (message: string, duration?: number, onAlertBtn?: Function) => {
  Alert({ type: 1, message, duration: 0, onAlertBtn });
};

//---------------------使用

// let alertBtnState: any = ref(false);
// const onAlertBtn = (data: any) => {
//   alertBtnState = data;
//   console.log(alertBtnState, "alertBtnState");
// };
// Alert({ type: 0, message: "登录失败", duration: 1000, onAlertBtn: onDelReturn });
// Alert.warning("登录失败", 1000);
