import axios from './http';

const OrderAjax = {
    // 31. 订单列表
    getOrderList(id) {
        return axios.get(`https://elm.cangdu.org/bos/v2/users/${id}/orders?limit=10&offset=0`);
    },
    // 32、订单详情
    getOderDetail(userid,orderid) {
        return axios.get(`https://elm.cangdu.org/bos/v1/users/${userid}/orders/${orderid}/snapshot`);
    }
}

export default OrderAjax;