import {IRequest} from "./namespace";
import axios from "../index";

// 以id 顺序排列 返回 基础信息 | 详细信息
export async function getAllInfo(
    type?: 1 | 2,
    offset?: number,
    limit?: number,
): Promise<IRequest.IinfoList | IRequest.Irequest> {
    const res: IRequest.IinfoList = await axios.post("/api/get/backend/info_list", {
        type, offset, limit
    });
    return res;
};
// 获取黑名单列表
export async function getBlackMovie(offset?: number, limit?: number): Promise<IRequest.IblackList | IRequest.Irequest> {
    const res: IRequest.IblackList | IRequest.Irequest =  await axios.post("/api/get/backend/black_list", {
        offset, limit
    });
    return res
}
// 已id来搜索 单条数据
export async function getId(id: number, type: 1 | 2 = 1): Promise<IRequest.IidInfo | IRequest.Irequest> {
    const res: IRequest.IidInfo | IRequest.Irequest = await axios.post("/api/get/backend/id_search", {
        id, type
    });
    return res
}
// 将某条数据添加至黑名单
export async function setBlackList(id: number): Promise<IRequest.Irequest> {
    const res: IRequest.Irequest = await axios.post("/api/set/black_list", {
        id
    });
    return res
};
// 将某条数据从黑名单移除 -- 之后需要添加身份验证
export async function delectBlackList(id: number, type?:"delete"): Promise<IRequest.Irequest> {
    const res: IRequest.Irequest = await axios.post("/api/delete/black_list", {
        id, type
    });
    return res
};
// 更新某条数据的某一个字段 --- key - 字段名  type - 表名
export async function updateSingleField(
    id: number,
    key: string,
    newvalue: unknown,
    type?: 1 | 2
): Promise<IRequest.Irequest> {
    const res: IRequest.Irequest = await axios.post("/api/set/updata_info", {
        id, key, newvalue, type
    });
    return res;
};
// 筛选
export async function getFilterData(
    key: string,
    word: string,
    offset?: number,
    limit?: number,
    type?: 1 | 2
): Promise<IRequest.IinfoList | IRequest.Irequest> {
    const res: IRequest.IinfoList = await axios.post("/api/get/backend/filter", {
        key, word, offset, limit, type
    });
    return res;
}