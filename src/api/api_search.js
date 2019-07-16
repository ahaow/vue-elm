import api_root from './base';
import axios from './http';

const SearchAjax = {
    // 7. 搜索餐馆
    searchList(searchVal) {
        return axios.get(`${api_root}v4/restaurants?geohash=31.22967,121.4762&keyword=${searchVal}`)
    }
}

export default SearchAjax;