import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "normalize.css";
import "@/assets/style/style.scss";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const instanse = createApp(App);

instanse.use(store).use(ElementPlus).mount("#app");

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  instanse.component(key, component);
}
