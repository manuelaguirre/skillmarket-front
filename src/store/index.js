import Vue from 'vue';
import Vuex from 'vuex';
import login from './modules/login';

Vue.use(Vuex);

// TODO: fix auth token expiration https://blog.sqreen.com/authentication-best-practices-vue/
export default new Vuex.Store({
    modules: {
        login
    }
});
