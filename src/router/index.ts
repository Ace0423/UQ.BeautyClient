import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from "virtual:generated-layouts";
import generatedRoutes from "virtual:generated-pages";
const routes = setupLayouts(generatedRoutes);
routes.findIndex((item: any) => {
  
  // if (item.children[0].path == '/') {
  //   console.log(item.children[0].name);
  //   item.children[0].name = 'appointmentView';
  //   console.log(item.children[0].name);
  //   // item.redirect = '/appointmentView'
  // }
})
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
