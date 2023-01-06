import { createRouter, createWebHistory } from "vue-router";
import DataManage from "@/views/DataManage/index.vue";
import ErrorList from "@/views/ErrorList/index.vue";
import UserManage from "@/views/UserManage/index.vue";

const routes = [
    {
        path: "/data_manage",
        component: DataManage,
        children: [
            {
                path: "basic",
                name: "basic_list",
                component: () => import("@/views/DataManage/basicInfo.vue")
            }, {
                path: "specific",
                name: "specific_list",
                component: () => import("@/views/DataManage/specificInfo.vue")
            }, {
                path: "black",
                name: "black_list",
                component: () => import("@/views/DataManage/blackList.vue")
            }
        ]
    }, {
        path: "/errorlist",
        component: ErrorList,
        children: [
            {
                path: "basic",
                name: "error_basic",
                component: () => import("@/views/ErrorList/basicErroe.vue")
            }, {
                path: "specific",
                name: "error_specific",
                component: () => import("@/views/ErrorList/specificError.vue")
            }, {
                path: "movie",
                name: "error_movie",
                component: () => import("@/views/ErrorList/movieUrlError.vue")
            }
        ]
    }, {
        path: "/user_manage",
        component: UserManage,
        children: [
            {
                path: "userlist",
                name: "userlist",
                component: () => import("@/views/UserManage/userList.vue")
            }
        ]
    }, {
        path: "/",
        redirect: "/data_manage/basic"
    }, {
        path: "/:catchAll(.*)",
        component: () => import("@/views/Empty/index.vue")
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;