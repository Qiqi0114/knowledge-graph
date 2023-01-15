import request from "../utils/request"

//获取用户管理信息列表
export function UserManagementAPI(
  params: {
    //分页参数
    pageNum:number,
    pageSize:number,
    //用户名称
    userName:string
  }) {
  return request({
    url: '/server/user/userListByPage',
    method: 'post',
    params
  })
}
//根据id查询用户信息
export function getUserManagementAPI(
  params: {
    //用户id
    id:string,
  }) {
  return request({
    url: '/server/user/1',
    method: 'get',
    params
  })
}
//修改用户信息
export function updateUserManagementAPI(
  params: {
    //用户id
    id:string,
    //用户名称
    userName:string,
    //性别
    userSex:string,
    //密码
    passWord:string,
    //电话
    userPhone:string,
    //邮箱
    userEmail:string,
    //用户状态
    userStatic:boolean,
  }) {
  return request({
    url: '/server/user',
    method: 'post',
    params
  })
}
//删除用户
export function deleteUserManagementAPI(
  param: any
  ) {
  return request({
    url: '/server/user/',
    method: 'delete',
    params:param
  })
}
//添加用户
export function addUserManagementAPI(
  params: {
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
    url: '/server/user/',
    method: 'post',
    params
  })
}
//用户账号封禁 激活
export function getUserActivationStatusAPI(
  params: {
    //用户id
    id:string,
    //用户状态
    userStatic:boolean
  }) {
  return request({
    url: '/server/user/accountActivation',
    method: 'get',
    params
  })
}