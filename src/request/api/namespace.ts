export namespace IRequest {
    // 正确信息一般不会带message
    export interface Irequest {
        code: number,
        message?: string
    };
    interface IbasicInfo {
        id:number,
        name: string,
        largest_amount: number | null,
        release_data: string,
        score: number,
        picUrl: string,
        finish_state: string,
        starring: string,
        hot: number,
        type: string
    };
    interface IspecificInfo {
        id: number,
        director: string,
        brief_introduction: string,
        same_type_list: string,
        last_updata_time: string,
        episodes: string,
        isUpdate: string,
        region: string
    };
    // 基础信息与详细信息的 和类型
    export interface IinfoList extends Irequest {
        infoList: Array<IbasicInfo | IspecificInfo>,
        allLength: number
    };
    export interface IidInfo extends Irequest {
        list: Array<IbasicInfo | IspecificInfo>
    };
    export interface IblackList extends Irequest {
        blacklist: {id: number}[]
    };
};