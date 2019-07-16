import api_root from './base';
import axios from './http';

const BusinessAjax = {
    // 11. 餐馆详情
    getShopDetal(id) {
        return axios.get(`${api_root}shopping/restaurant/${id}`)
    },
    // 16. 获取食品列表
    getMenu(id) {
        return axios.get(`${api_root}shopping/v2/menu?restaurant_id=${id}`);
    },
    // 17. 获取评价信息
    getRestaurants(id) {
        return axios.get(` ${api_root}ugc/v2/restaurants/${id}/ratings`);
    },
    // 18. 获取评价分数
    getRatingsScores(id) {
        return axios.get(`${api_root}ugc/v2/restaurants/${id}/ratings/scores`);
    }
}

export default BusinessAjax;