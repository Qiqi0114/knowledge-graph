import request from "../utils/request"

//登录接口
export function loginAPI(
  param: {
    //用户手机号
    userPhone:string,
    //密码
    passWord:string
  }) {
  return request({
    url: '/user_service/userService/login/login',
    method: 'post',
    data:param
  })
}