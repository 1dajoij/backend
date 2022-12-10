import axios from "axios";

axios.interceptors.response.use(function (res) {
    const data = res.data;
    if (res.status === 200) {
        return data
    } else {
        console.error(res)
        return Promise.reject(res)
    }
}, function (error) {
    return Promise.reject(error);
});

export default axios;