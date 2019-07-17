import { ADD_CART , REFRESH_CART } from './mutation-types';
import { setStore , getStore} from './../assets/js/utils';

export default {
    // 加入购物车
    [ADD_CART](state, {
        businessId, // 商家ID
        itemid, // 左侧菜单ID
        foodid, // 商品ID
        food, // 商品信息
    }) {
        let cart = state.cartList;

        console.log(businessId)
        console.log(cart)

        let shop = (cart[businessId] = cart[businessId] || {});
        let category = (shop[itemid] = shop[itemid] || {});
        if (category[foodid]) {
            console.log(111);
            category[foodid]["num"]++;
        } else {
            console.log(shop);
            console.log(category);
            // console.log(item);
            if (category[foodid]) {
                category[foodid]["num"]++;
            } else {
                category[foodid] = {
                    num: 1,
                    id: food.item_id,
                    name: food.name,
                    price: food.satisfy_rate
                };
            }

        }
        state.cartList = { ...cart };
        setStore('buyCart',state.cartList);
    },
    // 刷新购物车
    [REFRESH_CART](state) {
        let cartList = getStore('buyCart');
        state.cartList = {...cartList};
    }
}