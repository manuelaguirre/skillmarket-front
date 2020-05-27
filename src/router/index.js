import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store';
import Profile from '@/components/Profile.vue';
import SignUp from '@/components/SignUp.vue';
import LogIn from '@/components/LogIn.vue';
import Explore from '@/components/Explore.vue';
import Match from '@/components/Match.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/profile',
        name: 'User Profile Page',
        component: Profile,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/Match',
        name: 'Match Page',
        component: Match,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/signup',
        name: 'Sign Up',
        component: SignUp,
    },
    {
        path: '/login',
        name: 'Log In',
        component: LogIn,
    },
    {
        path: '/explore',
        name: 'Explore',
        component: Explore,
        meta: {
            requiresAuth: true
        }
    },
];

const router = new VueRouter({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next();
            return;
        }
        next('/login');
    } else {
        next();
    }
});

export default router;
