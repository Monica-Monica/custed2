webpackJsonp([10],{SVzZ:function(e,t,i){var a=i("bMBF");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);i("8bSs")("46962e27",a,!0)},bMBF:function(e,t,i){(e.exports=i("BkJT")(!1)).push([e.i,"\n.flash-info-management-container .image {\n  width: 100%;\n  display: block;\n}\n.flash-info-management-container .detail-item-title {\n  font-weight: 600;\n  color: #409EFF;\n}\n",""])},k2E0:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("3cXf"),s=i.n(a),l=i("aA9S"),n=i.n(l),o=i("P9l9"),c={name:"flash-info-management",data:function(){return{flashNewsLists:[],newsType:2,total:0,tableKey:0,listLoading:!1,dialogType:"",detailDialogVisible:!1,updateDialogVisible:!1,deleteDialogVisible:!1,temp:{},updateForm:{},deleteTemp:{},isShow:{commentNum:!1,shareNum:!1,downNum:!1,status:!1,updateTime:!1,starNum:!1},listQuery:{page:1,limit:10,title:"",type:void 0,queryType:"",sort:"+id"},dialogTitle:{showUpdate:"修改",createUpdate:"创建"},formLabelWidth:"120px"}},methods:{handleSizeChange:function(e){this.listQuery.limit=e,this.getNewsList(this.listQuery.page,this.listQuery.limit,this.newsType)},handleCurrentChange:function(e){this.listQuery.page=e,this.getNewsList(this.listQuery.page,this.listQuery.limit,this.newsType)},showFlashDetail:function(e){this.dialogType="showDetail",this.getNewsDetail(e.newsId)},handleUpdatePlatform:function(e){this.dialogType="showUpdate",this.getNewsDetail(e.newsId)},handleCreate:function(){this.updateForm={title:"",content:"",type:""},this.dialogType="createUpdate",this.updateDialogVisible=!0},handleCommit:function(e){"showUpdate"===this.dialogType?this.updateNewsRequest(e):"createUpdate"===this.dialogType&&this.createNewsRequest(e)},handleDelete:function(e){this.deleteTemp=e,this.deleteDialogVisible=!0},handleDeleteCommit:function(e){this.deleteNewsRequest(e)},getNewsList:function(e,t,i){var a=this;this.listLoading=!0,Object(o.w)(e,t,i).then(function(e){console.log(e),0===e.data.code?(a.flashNewsLists=e.data.data.list,a.total=e.data.data.total):a.$message.error(e.data.msg),a.listLoading=!1}).catch(function(e){console.log(e.response),a.listLoading=!1})},getNewsDetail:function(e){var t=this;Object(o.v)(e).then(function(e){console.log(e),0===e.data.code?"showDetail"===t.dialogType?(t.temp=e.data.data,t.detailDialogVisible=!0):"showUpdate"===t.dialogType&&(t.updateTemp=e.data.data,t.updateForm=n()({},t.updateTemp),t.updateDialogVisible=!0):t.$message.error(e.data.msg)}).catch(function(e){console.log(e.response)})},updateNewsRequest:function(e){var t=this,i={title:"",content:"",bindId:"",abstract:""};i.title=e.title,i.content=e.content,i.bindId=e.bindId,Object(o.E)(e.newsId,s()(i)).then(function(e){console.log(e),0===e.data.code?(t.getNewsList(t.listQuery.page,t.listQuery.limit,t.newsType),t.$message({message:"修改成功",type:"success"})):t.$message.error(e.data.msg),t.updateDialogVisible=!1}).catch(function(e){console.log(e.response),t.updateDialogVisible=!1})},createNewsRequest:function(e){var t=this;Object(o.j)(e.title,e.content,this.newsType,"0","").then(function(e){console.log(e),0===e.data.code?(t.getNewsList(t.listQuery.page,t.listQuery.limit,t.newsType),t.$message({message:"创建成功",type:"success"})):t.$message.error(e.data.msg),t.updateDialogVisible=!1}).catch(function(e){console.log(e.response),t.updateDialogVisible=!1})},deleteNewsRequest:function(e){var t=this;Object(o.o)(e).then(function(e){console.log(e),0===e.data.code?(t.getNewsList(t.listQuery.page,t.listQuery.limit,t.newsType),t.$message({message:"删除成功",type:"success"})):t.$message.error(e.data.msg),t.deleteDialogVisible=!1}).catch(function(e){console.log(e.response),t.deleteDialogVisible=!1})}},created:function(){this.getNewsList(1,10,this.newsType)}},r={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"app-container flash-info-management-container"},[i("div",{staticClass:"filter-container"},[i("el-checkbox",{staticClass:"filter-item",staticStyle:{"margin-left":"15px","margin-bottom":"15px"},on:{change:function(t){e.tableKey=e.tableKey+1}},model:{value:e.isShow.commentNum,callback:function(t){e.$set(e.isShow,"commentNum",t)},expression:"isShow.commentNum"}},[e._v("评论数")]),e._v(" "),i("el-checkbox",{staticClass:"filter-item",staticStyle:{"margin-left":"15px","margin-bottom":"15px"},on:{change:function(t){e.tableKey=e.tableKey+1}},model:{value:e.isShow.shareNum,callback:function(t){e.$set(e.isShow,"shareNum",t)},expression:"isShow.shareNum"}},[e._v("分享数")]),e._v(" "),i("el-checkbox",{staticClass:"filter-item",staticStyle:{"margin-left":"15px","margin-bottom":"15px"},on:{change:function(t){e.tableKey=e.tableKey+1}},model:{value:e.isShow.downNum,callback:function(t){e.$set(e.isShow,"downNum",t)},expression:"isShow.downNum"}},[e._v("反对数")]),e._v(" "),i("el-checkbox",{staticClass:"filter-item",staticStyle:{"margin-left":"15px","margin-bottom":"15px"},on:{change:function(t){e.tableKey=e.tableKey+1}},model:{value:e.isShow.starNum,callback:function(t){e.$set(e.isShow,"starNum",t)},expression:"isShow.starNum"}},[e._v("点赞数")]),e._v(" "),i("el-checkbox",{staticClass:"filter-item",staticStyle:{"margin-left":"15px","margin-bottom":"15px"},on:{change:function(t){e.tableKey=e.tableKey+1}},model:{value:e.isShow.updateTime,callback:function(t){e.$set(e.isShow,"updateTime",t)},expression:"isShow.updateTime"}},[e._v("更新时间")]),e._v(" "),i("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-edit"},on:{click:e.handleCreate}},[e._v("创建快讯")])],1),e._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading.body",value:e.listLoading,expression:"listLoading",modifiers:{body:!0}}],key:e.tableKey,attrs:{data:e.flashNewsLists,"element-loading-text":"Loading",border:"",fit:"","highlight-current-row":""}},[i("el-table-column",{attrs:{align:"center",label:"序号"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.$index+1)+"\n      ")]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"标题"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.title)+"\n      ")]}}])}),e._v(" "),i("el-table-column",{attrs:{align:"center",label:"作者"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.author)+"\n      ")]}}])}),e._v(" "),e.isShow.commentNum?i("el-table-column",{attrs:{align:"center",label:"评论数"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.commentNum)+"\n      ")]}}])}):e._e(),e._v(" "),e.isShow.starNum?i("el-table-column",{attrs:{align:"center",label:"点赞数"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.starNum)+"\n      ")]}}])}):e._e(),e._v(" "),e.isShow.downNum?i("el-table-column",{attrs:{align:"center",label:"反对数"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.downNum)+"\n      ")]}}])}):e._e(),e._v(" "),e.isShow.shareNum?i("el-table-column",{attrs:{align:"center",label:"分享数"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.shareNum)+"\n      ")]}}])}):e._e(),e._v(" "),e.isShow.status?i("el-table-column",{attrs:{align:"center",label:"状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.status)+"\n      ")]}}])}):e._e(),e._v(" "),e.isShow.updateTime?i("el-table-column",{attrs:{align:"center",prop:"created_at",label:"更新时间",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("i",{staticClass:"el-icon-time"}),e._v(" "),i("span",[e._v(e._s(new Date(1e3*parseInt(t.row.updateTime)).toLocaleString()))])]}}])}):e._e(),e._v(" "),i("el-table-column",{attrs:{align:"center",label:"操作","class-name":"small-padding fixed-width",width:"300"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{attrs:{type:"primary",size:"mini",plain:""},on:{click:function(i){e.showFlashDetail(t.row)}}},[e._v("详情")]),e._v(" "),i("el-button",{attrs:{type:"warning",size:"mini",plain:""},on:{click:function(i){e.handleUpdatePlatform(t.row)}}},[e._v("修改")]),e._v(" "),i("el-button",{attrs:{size:"mini",type:"danger",plain:""},on:{click:function(i){e.handleDelete(t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),i("div",{staticClass:"pagination-container"},[i("el-pagination",{attrs:{background:"","current-page":e.listQuery.page,"page-sizes":[10,20,30,50],"page-size":e.listQuery.limit,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),i("el-dialog",{attrs:{title:"详情",visible:e.detailDialogVisible,width:"50%"},on:{"update:visible":function(t){e.detailDialogVisible=t}}},[i("div",{staticClass:"detail-item"},[i("img",{staticClass:"image",attrs:{src:e.temp.cover}})]),e._v(" "),i("div",{staticClass:"detail-item"},[i("span",{staticClass:"detail-item-title"},[e._v("标题: ")]),i("span",[e._v(e._s(e.temp.title))])]),e._v(" "),i("div",{staticClass:"detail-item"},[i("span",{staticClass:"detail-item-title"},[e._v("作者: ")]),i("span",[e._v(e._s(e.temp.author))])]),e._v(" "),i("div",{staticClass:"detail-item"},[i("span",{staticClass:"detail-item-title"},[e._v("点赞数: ")]),i("span",[e._v(e._s(e.temp.starNum))])]),e._v(" "),i("div",{staticClass:"detail-item"},[i("span",{staticClass:"detail-item-title"},[e._v("反对数: ")]),i("span",[e._v(e._s(e.temp.downNum))])]),e._v(" "),i("div",{staticClass:"detail-item"},[i("span",{staticClass:"detail-item-title"},[e._v("评论数: ")]),i("span",[e._v(e._s(e.temp.commentNum))])]),e._v(" "),i("div",{staticClass:"detail-item"},[i("span",{staticClass:"detail-item-title"},[e._v("分享数: ")]),i("span",[e._v(e._s(e.temp.shareNum))])]),e._v(" "),i("div",{staticClass:"detail-item"},[i("span",{staticClass:"detail-item-title"},[e._v("更新时间: ")]),i("span",[e._v(e._s(new Date(1e3*parseInt(e.temp.updateTime)).toLocaleString()))])]),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:function(t){e.detailDialogVisible=!1}}},[e._v("关闭")])],1)]),e._v(" "),i("el-dialog",{attrs:{title:e.dialogTitle[e.dialogType]+"快讯",visible:e.updateDialogVisible},on:{"update:visible":function(t){e.updateDialogVisible=t}}},[i("el-form",{attrs:{model:e.updateForm}},[i("el-form-item",{attrs:{label:"标题","label-width":e.formLabelWidth}},[i("el-input",{attrs:{"auto-complete":"on"},model:{value:e.updateForm.title,callback:function(t){e.$set(e.updateForm,"title",t)},expression:"updateForm.title"}})],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.updateDialogVisible=!1}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:function(t){e.handleCommit(e.updateForm)}}},[e._v(e._s(e.dialogTitle[e.dialogType]))])],1)],1),e._v(" "),i("el-dialog",{attrs:{title:"提示",visible:e.deleteDialogVisible,width:"50%"},on:{"update:visible":function(t){e.deleteDialogVisible=t}}},[i("span",[e._v("确定删除: ")]),i("span",{staticStyle:{color:"#409EFF"}},[e._v(e._s(e.deleteTemp.title))]),i("span",[e._v(" ?")]),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.deleteDialogVisible=!1}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:function(t){e.handleDeleteCommit(e.deleteTemp.newsId)}}},[e._v("确 定")])],1)])],1)},staticRenderFns:[]};var d=i("/Xao")(c,r,!1,function(e){i("SVzZ")},null,null);t.default=d.exports}});