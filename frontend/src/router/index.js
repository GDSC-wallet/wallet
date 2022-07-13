import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Search from '../views/Search.vue'
import Chart from '../views/Chart.vue'
import Setting from '../views/Setting.vue'
import Login from '../views/Login.vue'
import CallbackSignup from '../views/Callback/Signup.vue'
import CallbackLogin from '../views/Callback/Login.vue'

import store from '@/store';

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: true },
    },
    {
        path: '/search',
        name: 'Search',
        component: Search
    },
    {
        path: '/chart',
        name: 'Chart',
        component: Chart,
        meta: { requiresAuth: true },
    },
    {
        path: '/setting',
        name: 'Setting',
        component: Setting,
        meta: { requiresAuth: true },
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { requiresAuth: false }, // 不需驗證
    },
    {
        path: '/callback/signup',
        name: 'CallbackSignup',
        component: CallbackSignup,
        meta: { requiresAuth: false }, // 不需驗證
    },
    {
        path: '/callback/login',
        name: 'CallbackLogin',
        component: CallbackLogin,
        meta: { requiresAuth: false }, // 不需驗證
    },
]

const router = new VueRouter({
    mode: 'history',
    base: import.meta.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    // console.log('to=', to.fullPath, '| from=', from.fullPath);
    const isAuthenticated = store.getters['auth/isLoggedin'];
    //const isReady = store.getters['auth/isReady'];
    console.log(isAuthenticated)
    if (to.matched.some(record => record.meta.requiresAuth)) {
        !isAuthenticated ? next({ path: '/login' }) : next();
    } else {
        next();
    }
});

export default router
