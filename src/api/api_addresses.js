import api_root from './base';
import axios from './http';

const AddressAjax = {
    // 22. 获取收货地址列表
    getAddress(id) {
        return axios.get(`${api_root}v1/users/${id}/addresses`)
    },
    // 28. 增加收货地址
    /**
     * 
     * @param {* 用户id int} id 
     * @param {* 地址 string} address 
     * @param {* 地址详情 string} address_detail 
     * @param {* 经纬度 string} geohash 
     * @param {* 收货人姓名 string} name 
     * @param {* 电话号码 string} phone 
     * @param {* 标签 string} tag 
     * @param {* 性别 1：男 2：女} sex 
     * @param {* 类型 默认：0} poi_type 
     * @param {* 备注电话} phone_bk 
     * @param {* 标签类型，2:家，3:学校，4:公司} tag_type 
     */

    addAddress(id,address,address_detail,geohash,name,phone,tag,sex,poi_type = 0,phone_bk,tag_type) {
        return axios.post(`${api_root}v1/users/${id}/addresses`,{
            user_id: id,
            address,
            address_detail,
            geohash,
            name,
            phone,
            tag,
            sex,
            poi_type,
            phone_bk,
            tag_type
        })
    },

    // 29. 删除收货地址
    deleteAddress(user_id,address_id) {
        return axios.delete(`${api_root}v1/users/${user_id}/addresses/${address_id}`)
    }

}

export default AddressAjax;