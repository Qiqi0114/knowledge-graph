import request from "../utils/request"

export function mallGoodsDetailAPI(params: object) {
  return request({
    url: '/server/user/userListByPage',
    method: 'post',
    params
  })
}
