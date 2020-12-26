 // 逻辑判断和异步操作最好放在actions里面

 export default {
     addCart(context, payload) {
         // 先判断cartlist是否有当前添加的product，通过find函数比较两个product的iid来,，
         // 如果两个iid相等，则find函数返回oldProduct=true
         let oldProduct = context.state.cartList.find(item => {
                 return item.iid === payload.iid
             })
             // 判断是否存在oldproduct，若存在count属性加一，反之count=1
         if (oldProduct) {
             // oldProduct.count+=1
             context.commit('addCounter', oldProduct)
         } else {
             payload.count = 1
                 // state.cartList.push(payload)
             context.commit('addToCart', payload)
         }

     }
 }