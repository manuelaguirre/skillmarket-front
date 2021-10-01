import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import './assets/tailwind.css';
import axios from 'axios';
import VueLogger from 'vuejs-logger';
import { IS_PRODUCTION } from './config';

axios.defaults.withCredentials = true;

Vue.config.productionTip = false;

const options = {
    isEnabled: true,
    logLevel: IS_PRODUCTION ? 'error' : 'debug',
    stringifyArguments: false,
    showLogLevel: true,
    showMethodName: true,
    separator: '|',
    showConsoleColors: true
};

Vue.use(VueLogger, options);

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
