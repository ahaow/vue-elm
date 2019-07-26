import api_root from './base';
import axios from './http';


const HomeAjax = {
    // 4. 根据经纬度详细定位
    geohashAddress(latitude,longitude) {
        return axios.get(`${api_root}v2/pois/${latitude},${longitude}`)
    },

    // 5. 食品分类列表
    foodsList() {
        return axios.get(`${api_root}v2/index_entry`)
    },
    // 6. 获取商铺列表
    shoppingList(latitude,longitude) {
        return axios.get(`${api_root}shopping/restaurants?latitude=${latitude}&longitude=${longitude}`)
    }
}


export default HomeAjax;


