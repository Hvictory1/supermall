import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters.js'
// mapGetters和mapActions 可以import进入 进行映射

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    // mutations 中尽可能放一些完成事件比较单一
    addCount(state, payload) {
      payload.count++
    },
    addToCart(state, payload) {
      state.cartList.push(payload)
    }
  },
  actions: {
    //添加到购物车
    /*----------- action可以返回一个Promise -------------*/
    addBuy(context, payload) {
      return new Promise((resolve, reject) => {
        let oldProduct = context.state.cartList.find(item => { return payload.iid === item.iid })
        // 判断oldproduct是否存在
        if (oldProduct) {
          context.commit('addCount', oldProduct)
          resolve('当前商品数量加1')
        } else {
          payload.count = 1
          context.commit('addToCart', payload)
          resolve('加入购物车成功')
        }
      })
    }

  },
  getters,

})

export default store