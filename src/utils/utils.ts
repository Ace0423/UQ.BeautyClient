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

export const validateEmai = (value: any) => {
  if (!validateRequired) {
    return validateRequired;
  }
  // if the field is not a valid email
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!regex.test(value)) {
    return '請輸入有效的電子郵件格式';
  }
  return true;
}
export const validatePassword = (value: any) => {
  let msg: any
  if (validateRequired(value) != true) {
    let msg: any = validateRequired(value)
    return msg;
  }
  if (validateLength(value) != true) {
    let msg: any = validateLength(value)
    return msg;
  }
  if (validateCapital(value) != true) {
    let msg: any = validateCapital(value)
    return msg;
  }
  if (validateSpecial(value) != true) {
    let msg: any = validateSpecial(value)
    return msg;
  }
  return true;
}
export const validateRequired = (value: any) => {
  if (!value) {
    return '此欄位必填';
  }
  return true;
}
export const validateLength = (value: any, length: any = 6) => {
  if (value.length < length) {
    return '不得少於' + length + '位';
  }
  return true;
}
export const validateCapital = (value: any) => {
  const stringArray = value.split("");
  let capitalState = false;
  stringArray.forEach((t: any) => {
    if (/[A-Z]/.test(t)) {
      capitalState = true;
    }
  });
  if (!capitalState) {
    return '必須含一個大寫英文字母';
  }
  return capitalState;
}
export const validateSpecial = (value: any) => {
  let rep = new RegExp(
    "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"
  );
  if (!rep.test(value)) {
    return '必須含一個特殊字元';
  }
  return true;
}

// 计算时间（基准时间yyyy-MM-dd HH:mm:ss，增加或减少(add|minus)，天，小时，分钟，秒）
export function countTimeUtil(
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
export function formatDateTime(time: any) {
  let date = new Date(time);

  let YY = date.getFullYear();
  let MM = addZeroDateFn(date.getMonth(), 1);
  // date.getMonth() + 1 < 10
  //   ? "0" + (date.getMonth() + 1)
  //   : date.getMonth() + 1;
  let DD = addZeroDateFn(date.getDate());
  let hh = addZeroDateFn(date.getHours());
  let mm = addZeroDateFn(date.getMinutes());
  let ss = addZeroDateFn(date.getSeconds());

  // 这里可以修改返回的日期格式
  return YY + "-" + MM + "-" + DD + " " + hh + ":" + mm + ":" + ss;
}

export function addZeroDateFn(data: any, num: number = 0) {
  let numDate = parseInt(data) + num;
  return numDate < 10 ? "0" + numDate : numDate;
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


export const TopUpLimitDay: any = [
  {
    value: 1,
    label: '1周',
  },
  {
    value: 2,
    label: '2周',
  },
  {
    value: 3,
    label: '3周',
  },
  {
    value: 4,
    label: '1月',
  },
  {
    value: 5,
    label: '3月',
  },
  {
    value: 6,
    label: '6月',
  }
]

export const goodsUnitGroup: string[] = [
  "不選擇",
  "毫升",
  "公升",
  "功克",
  "公斤",
  "盎司",
  "片",
  "袋",
  "包",
  "個",
  "組",
  "式",
  "瓶",
  "罐",
];
export const bookingState: string[] = [
  "新預約",
  "已完成",
  "",
  "店家取消",
  "已結帳",
];

export const goods_basicImg = "data:image/jpeg;base64,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7qB6LRvq8D+jD91BA0WDam2jwRlKHDGjUg4EAjmgDTcAMNNxQTBs3kzlsxu0TzQSMUOuGnXryQWsY4EiU8L8PPegyUEX807N4QSQEBAQEBAQEBAQEBAQEBAQEBAQEBBW5mFka7/EoIOY4g3doQQbCJF7e3HZNBLkv4e34oJWHZdo8UAtIvI7QgWHZdo8UCw7LtHigWHZdo8UCw7LtHigWHZdo8UCw7LtHigWHZdo8UCw7LtHigWHZdo8UCw7LtHigWHZdo8UCw7LtHigWHZdo8UCw7LtHigWHZdo8UCw7LtHigiRI3i8d6C6w3LtPigoiQZhwaOkX7ZSQVtgy9YtlLp+PSgymAicxl3oJzEyMsdqAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgII2fWtT2bJIJICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICCvk+ns+KDgQgPpHpn+KCQZIgzw6PigmgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg/9k="




