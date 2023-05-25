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
// 定时器
let timer = ref<any>(null);
export default function Alert({
  type,
  message,
  onAlertBtn,
  duration = 3000,
}: Props) {
  const alertBtnHdr = (data: any) => {
    console.log(onAlertBtn);
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
Alert.check = (message: string, duration?: number, onAlertBtn?: Function) => {
  Alert({ type: 0, message, duration, onAlertBtn });
};

//---------------------使用

// let alertBtnState: any = ref(false);
// const onAlertBtn = (data: any) => {
//   alertBtnState = data;
//   console.log(alertBtnState, "alertBtnState");
// };
// Alert({ type: 0, message: "登录失败", duration: 1000, onAlertBtn });
// Alert.warning("登录失败", 1000);
