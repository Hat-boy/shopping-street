import { request } from './request'

export function getDetail(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}
// 请求detail组件的推荐数据
export function getRecommend() {
    return request({
        url: '/recommend',

    })
}

// 自定义对象，方便获取抽离的数据
export class GoodsInfo {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.discount = itemInfo.discountDesc
        this.columns = columns
        this.services = services
        this.realPrice = itemInfo.lowNowPrice
    }
}

export class Shop {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods
    }
}

export class GoodsParams {
    constructor(info, rule) {
        // 注：有些商品参数信息可能没有图片
        this.image = info.images ? info.images[0] : ''
        this.infos = info.set
        this.sizes = rule.tables

    }
}