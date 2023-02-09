import request from "../utils/request"

//获取用户管理信息列表
export function UserManagementAPI(
  param: {
    //分页参数
    pageNum:number,
    pageSize:number,
    //用户名称
    userName:string
  }) {
  return request({
    url: '/user_service/server/user/userListByPage',
    method: 'post',
    data:param
  })
}
//根据id查询用户信息
export function getUserManagementAPI(
  param: {
    //用户id
    id:string,
  }) {
  return request({
    url: '/user_service/server/user/getUserById',
    method: 'get',
    params:param
  })
}
//修改用户信息
export function updateUserManagementAPI(
  param: {
    //用户id
    id:string,
    //用户名称
    userName:string,
    //性别
    userSex:string,
    //电话
    userPhone:string,
    //邮箱
    userEmail:string,
    //用户状态
    userStatic:boolean,
  }) {
  return request({
    url: '/user_service/server/user',
    method: 'put',
    data:param
  })
}
//删除用户
export function deleteUserManagementAPI(
  param: any
  ) {
  return request({
    url: '/user_service/server/user/',
    method: 'delete',
    params:param
  })
}
//添加用户
export function addUserManagementAPI(
  param: {
    //用户名称
    userName:string,
    //性别
    userSex:string,
    //电话
    userPhone:string,
    //邮箱
    userEmail:string,
    //用户状态
    userStatic:boolean,
  }) {
  return request({
    url: '/user_service/server/user/',
    method: 'post',
    params:param
  })
}
//用户账号封禁 激活
export function getUserActivationStatusAPI(
  param: {
    //用户id
    id:string,
    //用户状态
    userStatic:boolean
  }) {
  return request({
    url: '/user_service/server/user/accountActivation',
    method: 'get',
    params:param
  })
}
//获取用户列表 无分页 无条件
export function getUserListNoPageAPI() {
  return request({
    url: '/user_service/server/user/userListNoPage',
    method: 'get',
  })
}