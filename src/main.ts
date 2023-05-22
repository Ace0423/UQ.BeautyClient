import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./layouts/default .vue";

import { createRouter, createWebHistory } from "vue-router";
import { setupLayouts } from "virtual:generated-layouts";
import generatedRoutes from "virtual:generated-pages";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import i18n from "./i18n/i18n";

const routes = setupLayouts(generatedRoutes);
const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus);
app.use(i18n);

app.mount("#app");
