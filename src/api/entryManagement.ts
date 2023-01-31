import request from "../utils/request"
//词条分页查询
export function getEntryListPageAPI(
    params: {
      //分页参数 
      pageNum:number,
      pageSize:number,
      //词条名称
      entryName:string
    }) {
    return request({
      url: '/service_book/service/entry/getEntryListPage',
      method: 'post',
      params
    })
  }

  //删除词条
  export function deleteEntryAPI(
    params:{
      id:string,
    }
  ) {
    return request({
      url: '/service_book/service/entry'+params.id,
      method: 'delete',
    })
  }

  //词条下的所属关系树
  export function getEntryTreeListAPI(
    param: {
      //词条id
      id:string,
      //词条父id
      parentId:string
    }) {
    return request({
      url: '/service_book/service/entry/entryTreeList',
      method: 'get',
      params:param
    })
  }