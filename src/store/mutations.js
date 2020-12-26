export default {
    addCounter(state, payload) {
        payload.count++
    },
    addToCart(state, payload) {
        payload.isChecked = true
        state.cartList.push(payload)
    }
}