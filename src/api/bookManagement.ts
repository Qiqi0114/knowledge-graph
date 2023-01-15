import request from "../utils/request"
//获取用户管理信息列表
export function BookManagementAPI(
    params: {
      //分页参数
      pageNum:number,
      pageSize:number,
      //书籍名称
      bookName:string
    }) {
    return request({
      url: '/service/book/getPageBookByBookName',
      method: 'post',
      params
    })
  }

  //删除书籍
  export function deleteBookManagementAPI(
    param: any
    ) {
    return request({
      url: '/service/book',
      method: 'delete',
      params:param
    })
  }

  //用户账号封禁 激活
  export function getBookOnAndOffAPI(
    params: {
      //用户id
      id:string,
      //书籍状态
      bookStatic:boolean
    }) {
    return request({
      url: '/service/book/bookShelf',
      method: 'put',
      params
    })
  }