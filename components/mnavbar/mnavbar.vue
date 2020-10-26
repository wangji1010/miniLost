<template>
    <view class="prohibition">
        <view class="demo" :style="'height:' +  demo.height + 'px;' + 'padding-top:' + demo.top + 'px;padding-bottom:10rpx'">
            <view class="left" :style="'top:' + demo.top + 'px'">
                <uni-icons color="#a8a8a8" type="forward" size="24"></uni-icons>
            </view>
            测试辣
        </view>
    </view>
</template>

<script>
    export default {
        data () {
            return {
                demo: {
                    top: 0,
                    height: 76
                }
            }
        },
        created () {
            const demo = uni.getMenuButtonBoundingClientRect()
            this.demo.top = demo.top
            this.demo.height = demo.height
        }
    }
</script>

<style lang="scss">
    .demo{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        font-size: 26rpx;
        .left{
            float: left;
            position: absolute;
            width: max-content;
            height: max-content;
            top: 0;
            bottom: 0;
            left: 20rpx;
            margin: auto;
            .iconfont{
                color: #3C3C3C;
            }
        }
    }
</style>