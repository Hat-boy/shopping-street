import { debounce } from './utils'

export const itemImgListenerMixin = {
    data() {
        return {
            itemImgListener: null,
        }
    },
    mounted() {
        // 监听图片加载事件
        const refresh = debounce(this.$refs.scroll.refresh, 200)
            // 保存itemImglistener事件
        this.itemImgListener = () => {
                refresh()
            }
            //  在数据总线中监听itemimgload图片加载完成事件
            // 调用scroll组件里的scroll对象里的refresh方法，每加载一张图片就重新计算滚动区域高度
        this.$bus.$on('itemimgload', this.itemImgListener)
    }
}