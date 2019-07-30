import api_root from './base';
import axios from './http';
import qs from 'qs';
const UserAjax = {
     // 24. 获取用户信息
    getUser() {
        return axios.get(`${api_root}v1/user`);
    },
    // 27. 修改密码
    changePsw(params) {
        return axios.post(`${api_root}v2/changepassword`,qs.stringify(params))
    }
}

export default UserAjax;