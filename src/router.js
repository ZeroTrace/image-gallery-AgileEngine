import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const GridView = () => import(/* webpackChunkName: "grid-view" */ '@/views/Grid')

const router = new Router({
    mode: 'history',
    routes: [
        {path: '/', name: 'grid-view', component: GridView},
    ]
})

router.beforeEach((to, from, next) => {
    window.scrollTo(0, 0)
    next()
})

export default router