import axios from "axios";
import { showLoading, hideLoading } from "@/plugins/loading";
import { ElNotification  } from 'element-plus'

axios.interceptors.request.use(config => {
    showLoading();
    return config;
}, err => {
    console.error(err);
    ElNotification({
        title: 'Error',
        message: '发生未知错误，请稍后重试',
        type: 'error',
    });
    return Promise.reject(err);
})

axios.interceptors.response.use(function (res) {
    hideLoading();
    const data = res.data;
    if (res.status === 200) {
        if(data.code != 200) {
            ElNotification({
                title: 'Error',
                message: data.message || "发生未知错误，请稍后重试",
                type: 'error',
            });
        }
        return data
    } else {
        console.error(res)
        ElNotification({
            title: 'Error',
            message: '发生未知错误，请稍后重试',
            type: 'error',
        });
        return {
            code: 400,
            message: "请稍后重试！"
        }
    }
}, function (error) {
    hideLoading();
    console.error(error)
    ElNotification({
        title: 'Error',
        message: '发生未知错误，请稍后重试',
        type: 'error',
    });
    return {
        code: 400,
        message: "请稍后重试！"
    }
});

export default axios;