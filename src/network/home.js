import { request } from "./request";

// 请求首页多个数据
export function getHomeMultidata() {
    return request({
        url: '/home/multidata'
    })
}
// 请求首页goods商品数据
export function getHomeGoods(type, page) {
    return request({
        url: '/home/data',
        params: {
            type,
            page,
        }
    })
}