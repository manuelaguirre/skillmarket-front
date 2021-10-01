import axios from 'axios';
import { API_URL } from '../../config';


const LOGGED_IN_TOKEN_KEY = 'loggedInToken';

export default {
    state: {
        status: '',
        token: localStorage.getItem(LOGGED_IN_TOKEN_KEY) || '',
        errors: [],
    },
    mutations: {
        auth_request(state) {
            state.status = 'loading';
        },
        auth_success(state, token) {
            state.status = 'success';
            state.token = token;
            state.errors = [];
        },
        auth_error(state, response) {
            state.status = 'error';
            state.token = '';
            state.errors = [ response ];
        },
        logout(state) {
            state.status = '';
            state.token = '';
            state.user = {};
            state.errors = [];
        },
        clear_errors(state) {
            state.errors = [];
        }
    },
    actions: {
        async clearErrors({ commit }) {
            commit('clear_errors');
        },
        async login({ commit }, user) {
            try {
                commit('auth_request');

                // TODO: don't hardcode URLS, and use HTTPS
                const response = await axios.post(`${API_URL}/login`, user);

                const { status } = response;

                if (status === 200) {
                    const token = 'loggedIn';
                    localStorage.setItem(LOGGED_IN_TOKEN_KEY, token);
                    commit('auth_success', token);
                    return true;
                } else {
                    throw Error(JSON.stringify(response));
                }
            } catch (err) {
                commit('auth_error', err.message);
                localStorage.removeItem(LOGGED_IN_TOKEN_KEY);
            }
            return false;
        },
        async register({ commit }, user) {
            commit('auth_request');

            // TODO: don't hardcode URLS, and use HTTPS
            try {
                const response = await axios.post(`${API_URL}/register`, user);

                const { status } = response;

                if (status === 200) {
                    const token = 'loggedIn';
                    localStorage.setItem(LOGGED_IN_TOKEN_KEY, token);
                    commit('auth_success', token);
                    return true;
                } else {
                    throw Error(JSON.stringify(response));
                }
            } catch (err) {
                let message = err.message;
                if (err.response && err.response.data && err.response.data.message) {
                    message += ': ' + err.response.data.message;
                }
                commit('auth_error', message);
                localStorage.removeItem(LOGGED_IN_TOKEN_KEY);
            }
            return false;
        },
        async logout({ commit }) {
            // TODO: don't hardcode URLS, and use HTTPS
            try {
                const response = await axios.post(`${API_URL}/logout`);

                const { status } = response;

                if (status === 200) {
                    commit('logout');
                    localStorage.removeItem(LOGGED_IN_TOKEN_KEY);
                } else {
                    throw Error(JSON.stringify(response));
                }
            } catch (err) {
                commit('auth_error', err.message);
                localStorage.removeItem(LOGGED_IN_TOKEN_KEY);
            }
        },
    },
    getters: {
        isLoggedIn: state => !!state.token,
        status: state => state.status,
        errors: state => state.errors,
    },
};
