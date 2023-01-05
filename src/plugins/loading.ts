import { ElLoading } from 'element-plus';

let loadingCount: number = 0;
let loading: any;

function startLoading(): void {
    loading = ElLoading.service({
        lock: true,
        fullscreen: false,
        target: "#main"
    })
};

function endLoading(): void {
    loading && loading.close();
};

export function showLoading(): void {
    if(loadingCount === 0) {
        startLoading()
    };
    loadingCount++;
};

export function hideLoading(): void {
    if(loadingCount <= 0) return;
    loadingCount--;
    if(loadingCount === 0) {
        endLoading();
    }
};