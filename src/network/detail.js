import { request } from './request'
export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}
//请求推荐recommend
export function getRecommend() {
  return request({
    url: '/recommend'
  })
}

// 商品
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.newPrice
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discount
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}
//店铺
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells
    this.score = shopInfo.score
    this.goodsCount = shopInfo.cGoods
  }
}

//参数信息
export class Param {
  constructor(info, rule) {
    this.info = info.set;
    this.rule = rule.tables;
  }
}
