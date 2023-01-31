import request from "../utils/request"

//分页查询关系
export function getRelationshipListAPI(
  param: {
    //分页参数
    pageNum:number,
    pageSize:number,
    //关系名称
    relationshipName:string
  }) {
  return request({
    url: '/service_book/sever/Relationship/getRelationshipList',
    method: 'post',
    data:param
  })
}

//添加关系
export function addRelationshipAPI(
    param: {
      //关系名称
      relationshipName:string,
    }) {
    return request({
      url: '/service_book/sever/Relationship',
      method: 'post',
      data:param
    })
  }

//修改关系
export function updateRelationshipAPI(
  param: {
    //关系id
    id:string,
    //关系名称
    relationshipName:string,
  }) {
  return request({
    url: '/service_book/sever/Relationship/',
    method: 'put',
    data:param
  })
}
//删除关系
export function deleteRelationshipAPI(
  param: {
    //关系id
    id:string,
  }) {
  return request({
    url: '/service_book/sever/Relationship/',
    method: 'delete',
    params:param
  })
}
