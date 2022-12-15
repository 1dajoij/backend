import {IRequest} from "./namespace";
import axios from "../index";


// 以id 顺序排列 返回 基础信息 | 详细信息
async function getAllInfo(
    type?: 1 | 2,
    offset?: number,
    limit?: number,
): Promise<IRequest.IinfoList | IRequest.Irequest> {
    const res: IRequest.IinfoList = await axios.post("/request/get/backend/info_list", {
        type, offset, limit
    });
    return res;
}

async function getBlackMovie(): Promise<IRequest.IblackList | IRequest.Irequest> {
    const res: IRequest.IblackList | IRequest.Irequest =  await axios.post("/request/get/backend/black_list");
    return res
}

// 已id来搜索 单条数据
async function getId(id: number, type: 1 | 2 = 1): Promise<IRequest.IidInfo | IRequest.Irequest> {
    const res: IRequest.IidInfo | IRequest.Irequest = await axios.post("/request/get/backend/id_search", {
        id, type
    });
    return res
}

// 更新某条数据 --- ?



// 将某条数据添加至黑名单
async function setBlackList(id: number): Promise<IRequest.Irequest> {
    const res: IRequest.Irequest = await axios.post("/request/set/black_list", {
        data: {
            id
        }
    });
    return res
};
// 将某条数据从黑名单移除
async function delectBlackList(id: number): Promise<IRequest.Irequest> {
    const res: IRequest.Irequest = await axios.post("/request/delete/black_list", {
        data: {
            id
        }
    });
    return res
}

export default {
    getId,
    getAllInfo,
    getBlackMovie,
    setBlackList,
    delectBlackList,
}