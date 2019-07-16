import api_root from './base';
import axios from './http';

const UserAjax = {
     // 24. 获取用户信息
    getUser() {
        return axios.get(`${api_root}v1/user`);
    },
}

export default UserAjax;