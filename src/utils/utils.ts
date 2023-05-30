export const myGlobalMethod = () => {
  console.log("This is my global method.");
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
