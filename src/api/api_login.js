import api_root from './base';
import axios from './http';
import qs from 'qs';

const LoginAjax = {
    // 25. 登录接口
    loginIn(params) {
        console.log(params);
        return axios.post(`${api_root}v2/login`,qs.stringify(params));
    },
    // 23. 获取验证码
    getCaptchas() {
        return axios.post(`${api_root}v1/captchas`);
    }
}

export default LoginAjax;