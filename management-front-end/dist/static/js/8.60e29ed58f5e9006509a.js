webpackJsonp([8],{DFPh:function(e,t,a){var n=a("SNJA");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a("8bSs")("649f6494",n,!0)},Enz2:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("3cXf"),i=a.n(n),l=a("P9l9"),o={name:"banner-management",data:function(){return{lists:[],total:0,dialogType:"",dialogTitle:{showUpdate:"修改",createUpdate:"创建"},listQuery:{page:1,limit:10,title:"",type:void 0,queryType:"",sort:"+id"},updateDialogVisible:!1,deleteDialogVisible:!1,updateForm:{},deleteTemp:{},formLabelWidth:"120px"}},methods:{handleSizeChange:function(e){this.listQuery.limit=e,this.getBannerList(this.listQuery.page,this.listQuery.limit)},handleCurrentChange:function(e){this.listQuery.page=e,this.getBannerList(this.listQuery.page,this.listQuery.limit)},handleUpdateBanner:function(e){this.dialogType="showUpdate",this.getBannerDetail(e)},handleCreatePlatform:function(){this.updateForm={cover:"",url:""},this.dialogType="createUpdate",this.updateDialogVisible=!0},handleCommit:function(e){"showUpdate"===this.dialogType?this.updateBannerRequest(e):"createUpdate"===this.dialogType&&this.createBannerRequest(e)},handleDelete:function(e){this.deleteTemp=e,this.deleteDialogVisible=!0},handleDeleteCommit:function(e){this.deleteBannerRequest(e)},getBannerList:function(e,t){var a=this;Object(l.b)(e,t).then(function(e){console.log(e.data),0===e.data.code&&(a.total=e.data.data.total,a.lists=e.data.data.list)}).catch(function(e){console.log(e.response)})},getBannerDetail:function(e){var t=this;Object(l.a)(e).then(function(e){console.log(e),0===e.data.code&&(t.updateForm=e.data.data,console.log("对象",t.updateForm),t.updateDialogVisible=!0)}).catch(function(e){console.log(e.response)})},updateBannerRequest:function(e){var t=this,a={cover:"",url:""};a.cover=e.cover,a.url=e.url,Object(l.B)(e.id,i()(a)).then(function(e){console.log(e),0===e.data.code?(t.getBannerList(t.listQuery.page,t.listQuery.limit),t.$message({message:"修改成功",type:"success"})):t.$message.error(e.data.msg),t.updateDialogVisible=!1}).catch(function(e){console.log(e.response),t.updateDialogVisible=!1})},createBannerRequest:function(e){var t=this,a={cover:"",url:""};a.cover=e.cover,a.url=e.url,Object(l.g)(i()(a)).then(function(e){console.log(e),0===e.data.code?(t.getBannerList(1,10),t.$message({message:"创建成功",type:"success"})):t.$message.error(e.data.msg),t.updateDialogVisible=!1}).catch(function(e){console.log(e.response),t.updateDialogVisible=!1})},deleteBannerRequest:function(e){var t=this;Object(l.l)(e).then(function(e){0===e.data.code?(t.getBannerList(t.listQuery.page,t.listQuery.limit),t.$message({message:"删除成功",type:"success"})):t.$message.error(e.data.msg),t.deleteDialogVisible=!1}).catch(function(e){console.log(e.response),t.deleteDialogVisible=!1})}},created:function(){this.getBannerList(1,10)}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"banner-management-container"},[a("div",{staticClass:"filter-container"},[a("el-button",{staticClass:"filter-item",staticStyle:{margin:"10px"},attrs:{type:"primary",icon:"el-icon-edit"},on:{click:e.handleCreatePlatform}},[e._v("创建Banner")])],1),e._v(" "),a("el-row",{staticStyle:{margin:"10px"}},e._l(e.lists,function(t,n){return a("el-col",{key:n,staticStyle:{margin:"5px"},attrs:{span:7}},[a("el-card",{attrs:{"body-style":{padding:"0px"}}},[a("img",{staticClass:"image",attrs:{src:t.cover}}),e._v(" "),a("div",{staticStyle:{padding:"14px"}},[a("span",{staticStyle:{color:"#66b1ff"}},[e._v("ID: ")]),e._v(" "),a("span",[e._v(e._s(t.id))]),e._v(" "),a("div",{staticClass:"bottom clearfix"},[a("span",{staticStyle:{color:"#66b1ff","font-size":"12px"}},[e._v("URL: ")]),e._v(" "),a("span",{staticStyle:{"font-size":"12px"}},[e._v(e._s(t.url))]),e._v(" "),a("el-button",{staticClass:"button",staticStyle:{color:"#f56c6c"},attrs:{type:"text"},on:{click:function(a){e.handleDelete(t)}}},[e._v("删除")]),e._v(" "),a("el-button",{staticClass:"button",attrs:{type:"text"},on:{click:function(a){e.handleUpdateBanner(t.id)}}},[e._v("修改")])],1)])])],1)})),e._v(" "),a("div",{staticClass:"pagination-container"},[a("el-pagination",{attrs:{background:"","current-page":e.listQuery.page,"page-sizes":[5,10],"page-size":e.listQuery.limit,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),a("el-dialog",{attrs:{title:e.dialogTitle[e.dialogType]+"Banner",visible:e.updateDialogVisible,width:"60%"},on:{"update:visible":function(t){e.updateDialogVisible=t}}},[a("el-form",{attrs:{model:e.updateForm}},["showUpdate"===e.dialogType?a("el-form-item",{attrs:{label:"BannerID","label-width":e.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"on"},model:{value:e.updateForm.id,callback:function(t){e.$set(e.updateForm,"id",t)},expression:"updateForm.id"}})],1):e._e(),e._v(" "),a("el-form-item",{attrs:{label:"封面","label-width":e.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"on"},model:{value:e.updateForm.cover,callback:function(t){e.$set(e.updateForm,"cover",t)},expression:"updateForm.cover"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"链接","label-width":e.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"on"},model:{value:e.updateForm.url,callback:function(t){e.$set(e.updateForm,"url",t)},expression:"updateForm.url"}})],1),e._v(" "),"showUpdate"===e.dialogType?a("div",{staticClass:"detail-item"},[a("span",{staticClass:"detail-item-title"},[e._v("创建时间: ")]),a("span",[e._v(e._s(new Date(1e3*parseInt(e.updateForm.createTime)).toLocaleString()))])]):e._e()],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.updateDialogVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.handleCommit(e.updateForm)}}},[e._v(e._s(e.dialogTitle[e.dialogType]))])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"提示",visible:e.deleteDialogVisible,width:"30%"},on:{"update:visible":function(t){e.deleteDialogVisible=t}}},[a("span",[e._v("确定删除Banner")]),a("span",{staticStyle:{color:"#409EFF","font-weight":"600"}},[e._v(" ID: "+e._s(e.deleteTemp.id))]),a("span",[e._v("?")]),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.deleteDialogVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.handleDeleteCommit(e.deleteTemp.id)}}},[e._v("确 定")])],1)])],1)},staticRenderFns:[]};var r=a("/Xao")(o,s,!1,function(e){a("DFPh")},null,null);t.default=r.exports},SNJA:function(e,t,a){(e.exports=a("BkJT")(!1)).push([e.i,'\n.banner-management-container .time {\n  font-size: 13px;\n  color: #999;\n}\n.banner-management-container .bottom {\n  margin-top: 13px;\n  line-height: 12px;\n}\n.banner-management-container .button {\n  padding: 0;\n  float: right;\n}\n.banner-management-container .image {\n  width: 100%;\n  display: block;\n}\n.banner-management-container .clearfix:before,\n.banner-management-container .clearfix:after {\n  display: table;\n  content: "";\n}\n.banner-management-container .clearfix:after {\n  clear: both;\n}\n.banner-management-container .detail-item-title {\n  font-weight: 600;\n  color: #409EFF;\n}\n',""])}});