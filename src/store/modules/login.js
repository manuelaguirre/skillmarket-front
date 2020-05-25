import axios from 'axios';

const LOGGED_IN_TOKEN_KEY = 'loggedInToken';

export default {
    state: {
        status: '',
        token: localStorage.getItem(LOGGED_IN_TOKEN_KEY) || '',
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
            state.user = {};
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
                localStorage.setItem(LOGGED_IN_TOKEN_KEY, token);
                commit('auth_success', token);
            } else {
                commit('auth_error');
                localStorage.removeItem(LOGGED_IN_TOKEN_KEY);
            }
        },
        async register({commit}, user) {
            commit('auth_request');

            // TODO: don't hardcode URLS, and use HTTPS
            const response = await axios.post('http://localhost:3000/register', user);

            const {status} = response;

            if (status === 200) {
                const token = 'loggedIn';
                localStorage.setItem(LOGGED_IN_TOKEN_KEY, token);
                commit('auth_success', token);
            } else {
                commit('auth_error');
                localStorage.removeItem(LOGGED_IN_TOKEN_KEY);
            }
        },
        async logout({commit}) {
            // TODO: don't hardcode URLS, and use HTTPS
            const response = await axios.post('http://localhost:3000/logout');

            const {status} = response;

            if (status === 200) {
                commit('logout');
                localStorage.removeItem(LOGGED_IN_TOKEN_KEY);
            } else {
                commit('auth_error');
                localStorage.removeItem(LOGGED_IN_TOKEN_KEY);
            }
        },
    },
    getters : {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
    },
};
