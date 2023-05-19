import request from "../utils/request"
//获取书籍列表
export function BookManagementAPI(
    params: {
      //分页参数
      pageNum:number,
      pageSize:number,
      //书籍名称
      bookName:string
    }) {
    return request({
      url: '/service_book/service/book/getPageBookByBookName',
      method: 'post',
      params
    })
  }

  //删除书籍
  export function deleteBookManagementAPI(
    params:{
      id:string,
    }
  ) {
    return request({
      url: '/service_book//service/book/'+params.id,
      method: 'delete',
    })
  }

  //书籍上架下架
  export function getBookOnAndOffAPI(
    params: {
      //用户id
      id:string,
      //书籍状态
      bookStatic:boolean
    }) {
    return request({
      url: '/service_book/service/book/bookShelf/'+params.id+'/'+params.bookStatic,
      method: 'put',
    })
  }

    //下载json
    export function getUploadJsonAPI(
      params: {
        //id
        id:string,
        //类型
        type:string
      }) {
      return request({
        url: '/service_book/service/entry/getJsonText'+'?id='+params.id+'&type='+params.type,
        method: 'get',
      })
    }

    //查看图谱
    export function getPhotoAPI(
      params: {
        //id
        id:string,
      }) {
      return request({
        url: '/service_book/service/entry/getEntryTreeByBook'+'?id='+params.id,
        method: 'get',
      })
    }