import request from "../utils/request"

//分页条件查询任务列表
export function getTakeListByPageAPI(
  param: {
    //分页参数
    pageNum:number,
    pageSize:number,
    //创建时间
    taskCreateTime:string,
    //结束时间
    taskLoadTime:string,
    //书籍名称
    bookName:string,
    //角色名称
    userName:string,
  }) {
  return request({
    url: '/service_book/server/task/takeListByPage',
    method: 'post',
    data:param
  })
}
//删除任务
export function deleteTaskAPI(
  param:{
      //任务id
      id:string,
  }) {
  return request({
    url: '/service_book/server/task/deleteTask',
    method: 'delete',
    params:param
  })
}
//任务延长
export function prolongTaskAPI(
    param: {
      //id
      id:string,
      //延长时间
      taskLoadTime:string,
    }) {
    return request({
      url: '/service_book/server/task/prolongTask',
      method: 'post',
      data:param
    })
  }
  
//获取单个用户的任务
export function getTaskUserByIdAPI(
    param: {
      //用户id
      id:string,
    }) {
    return request({
      url: '/service_book/server/task/taskUserById',
      method: 'get',
      params:param
    })
}
//书籍列表 无分页 无条件
export function getBooKListAPI() {
    return request({
      url: '/service_book//server/task/booKList',
      method: 'get',
    })
}
//根据书籍id获取章节列表
export function getDirectoryListAPI(
    param: {
      //书籍id
      id:string,
    }) {
    return request({
      url: '/service_book/server/task/directoryList',
      method: 'get',
      params:param
    })
}
//分配任务
export function allocationTaskAPI(
    param: {
      //任务创建时间
      taskCreateTime:string,
      //任务结束时间
      taskLoadTime:string,
      //用户id
      userId:string,
      //书籍id
      bookId:string,
      //章节id
      directoryId:string,
    }) {
    return request({
      url: '/service_book/server/task/allocationTask',
      method: 'post',
      data:param
    })
  }