<template>
    <div class="add-address">
        <header class="header">
            <i class="iconfont icon-right" @click='handleBack'></i>
            <span>添加地址</span>
        </header>
        
        <section class="user">
            <div class="user-left">联系人</div>
            <div class="user-right">
                <input type="text" name='name' placeholder="你的名字">
                <ul class="choose-sex">
                    <li
                        v-for='item in sexArr'
                        :key="item.id"
                        @click='handleChangeSex(item.id)'
                    >
                        <i :class="item.id == sexIndex ? 'iconfont icon-xuanzhong current' : 'iconfont icon-xuanzhong'"></i>
                        <span>{{item.name}}</span>
                    </li>
                </ul>
            </div>
        </section>

        <section class="phone">
            <span class="phone-text">联系电话</span>
            <input type="text" name='phone' placeholder="你的手机号">
        </section>

        <section class="address">
            <span>送餐地址</span>
            <div class="address-content">
                <input type="text" name='area' placeholder="小区/写字楼/学校等">
                <input type="text" name='address' placeholder="详细地址(如门牌号码等)">
            </div>
        </section>

         <section class="phone">
            <span class="phone-text">标签</span>
            <input type="text" name='phone' placeholder="无/家/学校/公司">
        </section>

        <button class="submit">确定</button>
    </div>
</template>

<script>
export default {
    name: 'addAddress',
    data() {
        return {
            sexIndex: 0,
            sexArr: [{
                id: 0,
                name: '男士'
            },{
                id: 1,
                name: '女士'
            }]
        }
    },
    methods: {
        handleBack() {
            this.$router.back();
        },
        handleChangeSex(id) {
            console.log(id);
            this.sexIndex = id;
        }
        
    }
}
</script>

<style lang="scss">
@import './../../assets/scss/utils.scss';
.add-address {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 100;
    background-color: #fff;
    .header {
        position: relative;
        width: 100%;
        height: 1.34rem;
        background-color: $elemColor;
        line-height: 1.34rem;
        text-align: center;
        color: #fff;
        i {
            position: absolute;
            left: 10px;
            font-size: 22px;
            transform: rotate(180deg);
        }
        span {
            font-size: 16px;
            font-weight: 600;
        }
    }
    .user {
        display: flex;
        padding: 0 .53rem .3rem;
        border-bottom: 1px solid #f5f5f5;
        .user-left {
            flex: 2;
            line-height: 1.8rem;
            vertical-align: text-top;
            font-size: 16px;
        }
        .user-right {
            margin-top: .267rem;
            flex: 5;
            input[name='name'] {
                width: 100%;
                height: 1.2rem;
                font-size: 16px;
                color: #333;
                border-color: transparent;
                &::-webkit-input-placeholder {
                    color: #999;
                    letter-spacing: 1px;
                }
            }
            .choose-sex {
                border-top: 1px solid #f5f5f5;
                padding-top: 10px;
                margin-top: 10px;
                li {
                    display: inline-block;
                    font-size: 16px;
                    margin-right: 20px;
                    i {
                        font-size: 22px;
                        vertical-align: middle;
                        color: #999;
                        &.current {
                            color: #4cd964;
                        }
                    }
                    span {
                        margin-left: 5px;
                        vertical-align: middle;
                    }
                }
            }
        }
    }
    .phone {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: .27rem ;
        font-size: 16px;    
        border-bottom: 1px solid #f5f5f5;
        .phone-text {
            flex: 0 0 2.7rem
        }
        input[name='phone'] {
            flex: 1;
            padding: .27rem;
            border-color: transparent;
        }
    }
    .address {
        padding: .27rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        border-bottom: 1px solid #f5f5f5;
        span {
            flex: 0 0 2.7rem
        }
        .address-content {
            flex: 1;
            input {
                width: 100%;
                padding: .13rem;
                margin: .13rem 0;
                border-color: transparent;
            }
        }

    }
    .submit {
        width: 90%;
        height: 1.12rem;
        margin-top: .53rem;
        margin-left: 50%;
        transform: translateX(-50%);
        border: none;
        background-color: #4cd964;
        color: #fff;
        font-size: 16px;
        border-radius: 4px;
    }
}
</style>



