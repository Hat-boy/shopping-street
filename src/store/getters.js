export default {
    // 获取购物车长度的方法
    cartLength(state) {
        return state.cartList.length
    },
    // 获取购物车商品的方法
    cartList(state) {
        return state.cartList
    }
}