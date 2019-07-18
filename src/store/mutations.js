import { ADD_CART, DECREASE_CART, REFRESH_CART, BUSINESS_CART } from './mutation-types';
import { setStore, getStore } from './../assets/js/utils';

export default {
    // 加入购物车
    [ADD_CART](state, {
        businessId, // 商家ID
        itemid, // 左侧菜单ID
        foodid, // 商品ID
        food, // 商品信息
    }) {
        let cart = state.cartList;
        // console.log(businessId)
        // console.log(cart)
        let shop = (cart[businessId] = cart[businessId] || {});
        let category = (shop[itemid] = shop[itemid] || {});
        if (category[foodid]) {
            category[foodid]["num"]++;
        } else {
            // console.log(shop);
            // console.log(category);
            if (category[foodid]) {
                category[foodid]["num"]++;
            } else {
                category[foodid] = {
                    num: 1,
                    item_id: food.item_id,
                    name: food.name,
                    satisfy_rate: food.satisfy_rate
                };
            }

        }
        state.cartList = { ...cart };
        setStore('buyCart', state.cartList);
    },
    // 减少购物车
    [DECREASE_CART](state, {
        businessId, // 商家ID
        itemid, // 左侧菜单ID
        foodid, // 商品ID
        food, // 商品信息
    }) {

        let cart = state.cartList;
        let shop = (cart[businessId] = cart[businessId] || {});
        let category = (shop[itemid] = shop[itemid] || {});
        if (category && category[foodid]) {
            if (category[foodid]['num'] > 0) {
                // console.log(category[foodid]);
                category[foodid]['num']--;
                state.cartList = { ...cart };
                setStore('buyCart', state.cartList);
                if (category[foodid]['num'] == 0) {
                    delete category[foodid];
                    state.cartList = { ...cart };
                    setStore('buyCart', state.cartList);
                }
            }
        }
    },
    // 刷新购物车
    [REFRESH_CART](state) {
        let cartList = getStore('buyCart');
        state.cartList = { ...cartList };
    },
    // 商家对应的购物车
    [BUSINESS_CART](state, id) {
        let businessList = state.businessList;
        businessList = [];
        let cartList = state.cartList;
        let arr = [];
        for (let i in cartList) {
            if (i == id) {
                let businessItem = cartList[i]
                for (let k in businessItem) {
                    let item = businessItem[k]
                    for (let v in item) {
                        businessList.push(item[v])
                        console.log(businessList)
                        businessList.map(item => {
                            if (item.num >= 1) {
                                return arr.push(item)
                            }
                        })
                        arr = Array.from(new Set(arr));
                    }
                }
            }
        }
        businessList = [...arr]
        state.businessList = businessList;
    }
}