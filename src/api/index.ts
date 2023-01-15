import request from "../utils/request"

//登录接口
export function loginAPI(params: {userPhone:string,passWord:string}) {
  return request({
    url: '/userService/login/login',
    method: 'post',
    params
  })
}
//获取用户管理信息列表
export function UserManagementAPI(params: {pageNum:number,pageSize:number,userName:string}) {
  return request({
    url: '/server/user/userListByPage',
    method: 'post',
    params
  })
}