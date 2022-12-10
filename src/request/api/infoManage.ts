import axios from "../index";

// id 顺序 排列 返回 基础信息


// id 顺序 排列 返回 详细信息


// 已id来搜索 单条数据


// 更新某条数据


// BlackList 请求 数据返回的接口类型
interface BlackListType {
    code: string,
    message: string
}
// 将某条数据添加至黑名单
async function setBlackList(id: number): Promise<BlackListType> {
    try{
        const res: BlackListType = await axios.post("/request/set/black_list", {
            data: {
                id
            }
        });
        return res
    } catch(err) {
        console.error(err);
        return {
            code: "400",
            message: "出现未知错误！"
        }
    }
};
// 将某条数据从黑名单移除
async function delectBlackList(id: number): Promise<BlackListType> {
    try{
        const res: BlackListType = await axios.post("/request/delete/black_list", {
            data: {
                id
            }
        });
        return res
    } catch(err) {
        console.error(err);
        return {
            code: "400",
            message: "出现未知错误！"
        }
    }
}

export default {
    setBlackList,
    delectBlackList
}