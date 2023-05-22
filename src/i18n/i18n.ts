import { createI18n } from "vue-i18n";
import zh from "./zh-TW.json";
import en from "./en-US.json";

type MessageSchema = typeof zh;

const i18n = createI18n<[MessageSchema], "zh-TW" | "en-US">({
  legacy: false, // 要把 legacy 設為 false，才可以使用 Composition API
  locale: "zh-TW",
  fallbackLocale: "zh-TW",
  globalInjection: true,
  messages: {
    "zh-TW": zh,
    "en-US": en,
  },
});

export default i18n;

// 1.用法
// <template>{{ $t("typeMgmt") }}</template>
// 2.ts
// import i18n from "@/i18n/i18n";
// const { t } = i18n.global;
// console.log(t("typeMgmt"));

// 3.語系切換

// <select @change="handleChangeLanguage">
// <option value="zh-TW">中文</option>
// <option value="en-US">English</option>
// </select>

// import { useI18n } from 'vue-i18n'
// const { locale } = useI18n()
// const handleChangeLanguage = (e:any) => {
//   locale.value = e.target.value
// }
