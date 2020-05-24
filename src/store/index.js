import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
    },
    mutations: {
        auth_request(state) {
            state.status = 'loading';
        },
        auth_success(state, token) {
            state.status = 'success';
            state.token = token;
        },
        auth_error(state) {
            state.status = 'error';
        },
        logout(state) {
            state.status = '';
            state.token = '';
        },
    },
    actions: {
        async login({ commit }, user) {
            commit('auth_request');

            // TODO: don't hardcode URLS, and use HTTPS
            const response = await axios.post('http://localhost:3000/login', user);

            const { status } = response;

            if (status === 200) {
                const token = 'loggedIn';
                localStorage.setItem('loggedInToken', token);
                commit('auth_success', token);
            } else {
                commit('auth_error');
                localStorage.removeItem('token');
            }
        },
        async register({commit}, user) {
            commit('auth_request');

            // TODO: don't hardcode URLS, and use HTTPS
            const response = await axios.post('http://localhost:3000/register', user);

            const {status} = response;

            if (status === 200) {
                const token = 'loggedIn';
                localStorage.setItem('token', token);
                commit('auth_success', token);
            } else {
                commit('auth_error');
                localStorage.removeItem('token');
            }
        },
        async logout({commit}) {
            // TODO: don't hardcode URLS, and use HTTPS
            const response = await axios.post('http://localhost:3000/logout');

            const {status} = response;

            if (status === 200) {
                commit('logout');
                localStorage.removeItem('token');
            } else {
                commit('auth_error');
                localStorage.removeItem('token');
            }
        },
    },
    getters : {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
    },
    modules: {
    }
});
