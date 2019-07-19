import api_root from './base';
import axios from './http';

const AddressAjax = {
    // 22. 餐馆详情
    getAddress(id) {
        return axios.get(`${api_root}v1/users/${id}/addresses`)
    },
}

export default AddressAjax;