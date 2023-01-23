import request from "../utils/request"

//分页查询角色列表
export function getRoleByPageAPI(
  param: {
    //分页参数
    pageNum:number,
    pageSize:number,
    //角色名称
    roleName:string
  }) {
  return request({
    url: '/user_service/server/role/getRoleByPage',
    method: 'post',
    data:param
  })
}
//根据角色id 获取用户列表
export function getRoleListByUserIdAPI(
    param: {
      //角色id
      id:string,
    }) {
    return request({
      url: '/user_service/server/role/roleListByUserId',
      method: 'get',
      params:param
    })
  }
//添加角色
export function addRoleManagementAPI(
    param: {
      //角色名称
      roleName:string,
    }) {
    return request({
      url: '/user_service/server/role',
      method: 'post',
      params:param
    })
  }
//角色删除 注 如果当前角色存在员工则无法删除
export function deleteRoleManagementAPI(
    param:{
        //角色id
        id:string,
    }) {
    return request({
      url: '/user_service/server/role',
      method: 'delete',
      params:param
    })
  }
//角色下添加用户
export function addRolePutUserListAPI(
    param: {
      //角色id
      roleId:string,
      //用户id集合
      userIdList:string[],
    }) {
    return request({
      url: '/user_service/server/role/rolePutUserList',
      method: 'put',
      data:param
    })
  }