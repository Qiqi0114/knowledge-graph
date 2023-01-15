import request from "../utils/request"

//登录接口
export function loginAPI(
  params: {
    //用户手机号
    userPhone:string,
    //密码
    passWord:string
  }) {
  return request({
    url: '/userService/login/login',
    method: 'post',
    params
  })
}