import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Axios from './plugins/axios';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import { createPinia } from 'pinia';
import '@/assets/css/main.less';
import EleEasyTableNext from 'ele-easy-table-next';

if (process.env.NODE_ENV !== 'production') {
  import('element-plus/dist/index.css');
}

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(ElementPlus, {
  locale: zhCn,
});
app.use(EleEasyTableNext);

app.config.globalProperties.$axios = Axios;

app.mount('#app');
