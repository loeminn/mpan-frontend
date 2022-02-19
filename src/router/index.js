import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/auth',
        meta: {title: '登录', noAuth: true},
        component: () => import("@/views/auth/Auth")
    },
    {
        path: '/',
        meta: {title: 'MPan'},
        component: () => import("@/views/disk/Disk"),
        children: [
            {
                path: '',
                component: () => import("@/views/allFile/AllFile")
            },
            {
                path: 'category/:categoryCode',
                component: () => import("@/views/category/Category")
            },
            {
                path: 'recycle',
                component: () => import("@/views/recycle/Recycle")
            },
            {
                path: 'share',
                component: () => import("@/views/share/Share")
            },
        ]
    },
    {
        path: '/s/:shortLink',
        meta: {title: 'MPan-分享', noAuth: true},
        component: () => import("@/views/shareContent/ShareContent")
    },
    {
        path: '/ucenter',
        meta: {title: 'MPan-个人中心'},
        component: () => import("@/views/ucenter/UserCenter"),
        children: [
            {
                path: 'personalInfo',
                component: () => import("@/views/ucenter/childComps/PersonalInfo")
            },
            {
                path: 'setPassword',
                component: () => import("@/views/ucenter/childComps/SetPassword")
            },
            {
                path: 'bindEmail',
                component: () => import("@/views/ucenter/childComps/BindEmail")
            },
            {
                path: '',
                redirect: '/ucenter/personalInfo'
            }
        ]
    },
    // {
    //     path: '/:pathMatch(.*)',
    //     redirect: '/'
    // }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("authorization")
    if (!to.meta.noAuth) {
        if (!token) {
            next({path: '/auth', replace: true})
            return
        }
    }
    if (to.path === '/auth') {
        if (token) {
            next({path: '/', replace: true})
            return
        }
    }
    window.document.title = to.meta.title
    next()
})
export default router
