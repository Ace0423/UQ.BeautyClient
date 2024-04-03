import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import App from "./layouts/default .vue";

import { setupLayouts } from "virtual:generated-layouts";
import generatedRoutes from "virtual:generated-pages";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import i18n from "./i18n/i18n";
import VueCropper from 'vue-cropper';
import 'vue-cropper/dist/index.css';
import * as echarts from 'echarts';
// import "default-passive-events";

// import('jquery').then(res => {
//   window.$ = res
// })

const routes = setupLayouts(generatedRoutes);
const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.config.globalProperties.$echarts = echarts;
app.use(createPinia());
app.use(router);
app.use(ElementPlus);
app.use(i18n);
app.use(VueCropper);
app.mount("#app");
