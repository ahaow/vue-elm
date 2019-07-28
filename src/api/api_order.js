import axios from './http';

const OrderAjax = {
    // 31. 订单列表
    getOrderList(id) {
        return axios.get(`https://elm.cangdu.org/bos/v2/users/${id}/orders?limit=10&offset=0`);
    },
    // 32、订单详情
    getOderDetail(id) {
        return axios.get(`https://elm.cangdu.org/bos/v1/users/${id}/orders/1/snapshot`);
    }
}

export default OrderAjax;