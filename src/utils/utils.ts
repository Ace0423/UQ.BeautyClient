export const colorValues = [
  "#000000",
  "#fb9ea6",
  "#f7bf9a",
  "#eddb9d",
  "#c3eda0",
  "#98e8eb",
  "#aac9e2",
  "#abadd7",
  "#d8baea",
  "#e7b1e6",
];

export const serviceTimer = [
  "30", "60", "90", "120", "150", "180", "210", "240"
];

export const getColorNum = (data: string) => {
  let cNum = colorValues.indexOf(data) == -1 ? 0 : colorValues.indexOf(data);
  return cNum
};


export const myGlobalMethod = () => {
  console.log("This is my global method.");
};


export const checkVerify_all = (ruleLists: any) => {
  let is_valid = true;
  for (let component in ruleLists.ruleItem) {
    let item = ruleLists.ruleItem[component];
    for (let rule in item.rules) {
      if (!verify_methods[rule](item)) {
        is_valid = false;
        break;
      }
    }
  }
  return is_valid;
};

export const verify_methods: any = {
  required(component: any) {
    if (!component.value) {
      component.is_error = true;
      component.warn = component.rules.required?.warn || "";
      return false;
    } else {
      component.is_error = false;
      component.warn = "";
      return true;
    }
  },
  cellphone(component: any) {
    let rep = /^(09)[0-9]{8}$/;
    if (!rep.test(component.value)) {
      component.is_error = true;
      component.warn = component.rules.cellphone?.warn || "";
      return false;
    } else {
      component.is_error = false;
      component.warn = "";
      return true;
    }
  },
  email(component: any) {
    let rep = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!rep.test(component.value)) {
      component.is_error = true;
      component.warn = component.rules.email?.warn || "";
      return false;
    } else {
      component.is_error = false;
      component.warn = "";
      return true;
    }
  },
  capital(component: any) {
    const stringArray = component.value.split("");
    let capitalState = false;
    stringArray.forEach((t: any) => {
      if (/[A-Z]/.test(t)) {
        component.is_error = false;
        component.warn = "";
        capitalState = true;
      }
    });
    if (!capitalState) {
      component.is_error = true;
      component.warn = component.rules.capital?.warn || "";
    }
    return capitalState;
  },
  special(component: any) {
    let rep = new RegExp(
      "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"
    );
    if (rep.test(component.value)) {
      component.is_error = false;
      component.warn = "";
      return true;
    } else {
      component.is_error = true;
      component.warn = component.rules.special?.warn || "";
      return false;
    }
  },
  length(component: any) {
    if (
      component.value.length < (component.rules.length?.min || 0) ||
      component.value.length > (component.rules.length?.max || 10000)
    ) {
      component.is_error = true;
      component.warn = component.rules.length?.warn || "";
      return false;
    } else {
      component.is_error = false;
      component.warn = "";
      return true;
    }
  },
};

// 计算时间（基准时间yyyy-MM-dd HH:mm:ss，增加或减少(add|minus)，天，小时，分钟，秒）
export function computeDate(
  times: any,
  type: any,
  days: any = 0,
  hours: any = 0,
  minutes: any = 0,
  seconds: any = 0
) {
  // 全部需要减掉的时间戳
  // console.log(times);

  let all_time = new Date(times).getTime();
  // console.log(all_time);
  switch (type) {
    case "add":
      all_time +=
        days * 24 * 60 * 60 * 1000 +
        hours * 60 * 60 * 1000 +
        minutes * 60 * 1000 +
        seconds * 1000;
      break;
    case "minus":
      all_time -=
        days * 24 * 60 * 60 * 1000 +
        hours * 60 * 60 * 1000 +
        minutes * 60 * 1000 +
        seconds * 1000;
      break;
  }
  // 转换时间戳格式
  return formatDateTime(all_time);
}

//时间戳转换方法yyyy-MM-dd HH:mm:ss(时间戳)
function formatDateTime(time: any) {
  let date = new Date(time);

  let YY = date.getFullYear();
  let MM =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  let DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  let hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let mm = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  let ss = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

  // 这里可以修改返回的日期格式
  return YY + "-" + MM + "-" + DD + " " + hh + ":" + mm + ":" + ss;
}

export function formatZeroDate(data: any) {
  return data < 10 ? "0" + data : data;
}

function GetRandomNum(Min: number, Max: number): Number {
  var Range = Max - Min;
  var Rand = Math.random();
  return Min + Math.round(Rand * Range);
}

export function GetRandomNumStr(Min: number, Max: number): string {
  var randomNum = GetRandomNum(Min, Max).toString();
  var zero = "";
  for (let i = 0; i < Max.toString().length - randomNum.length; i++) {
    zero += "0";
  }
  return zero + randomNum;
}

export function GetRandomChar(total: number): string {
  // 先合併大小寫字母
  // const arr = upperChars.concat(lowerChars)
  const arr = upperChars;
  let randomChar = "";
  console.log(randomChar); // A (隨機)
  for (let i = 0; i < total; i++) {
    randomChar += arr[Math.floor(Math.random() * 26)];
  }
  return randomChar;
}
let upperChars = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];


export const mathDiscount = (data: any) => {
  return (100 - parseInt(data)).toString().replace("0", "")
};
