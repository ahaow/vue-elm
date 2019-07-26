import api_root from './base';
import axios from './http';

const CityAjax = {
    // 1、获取城市列表
    getCity(type) {
        return axios.get(`${api_root}v1/cities?type=${type}`)
    },
    // 2、获取所选城市信息
    getCities(id) {
        return axios.get(`${api_root}v1/cities/${id}`)
    },
    // 3、搜索地址
    getSearchAddress(city_id,keyword) {
        return axios.get(`${api_root}v1/pois?city_id=${city_id}&keyword=${keyword}&type=search`)
    }
}

export default CityAjax;