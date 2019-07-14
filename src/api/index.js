// eslint-disable-next-line no-unused-vars
const api_root = 'https://elm.cangdu.org/';

const home_api = {
    index_entry: api_root + 'v2/index_entry', // 5. 食品分类列表
    index_restaurants: api_root + 'shopping/restaurants', // 6. 获取商铺列表
}

const business_api = {
    menu: api_root + 'shopping/v2/menu?restaurant_id=', // 16. 获取食品列表
    ratings_scores: api_root + 'ugc/v2/restaurants/', // 18. 获取评价分数
    restaurants: api_root + 'ugc/v2/restaurants/', // 17. 获取评价信息
}

const search_api = {
    restaurants: api_root + 'v4/restaurants', // 7. 搜索餐馆
}

const login_api = {
    login: api_root + 'v2/login', // 25. 登录接口
    captchas: api_root + 'v1/captchas', // 23. 获取验证码
}

const user_api = {
    getUser: api_root + 'v1/user', // 24. 获取用户信息
}



export {
    home_api,
    search_api,
    login_api,
    user_api,
    business_api
}