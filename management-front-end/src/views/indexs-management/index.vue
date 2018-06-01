<template>
  <div class="indexs-management-container">

    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">创建指数</el-button>
    </div>

    <el-table :key='tableKey' :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="50">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label='名称' align="center">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column align="center" label='描述'>
        <template slot-scope="scope">
          {{scope.row.description}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="更新时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{new Date(parseInt(scope.row.updateTime)*1000).toLocaleString()}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" class-name="small-padding fixed-width" width="330">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" plain @click="showDetail(scope.row)">详情</el-button>
          <el-button type="warning" size="mini" plain @click="handleUpdate(scope.row)">修改</el-button>
          <el-button size="mini" type="danger" plain @click="handleDelete(scope.row)">删除</el-button>
          <el-button size="mini" type="info" plain @click="handleComments(scope.row)">相关资讯</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog
      title="详情"
      :visible.sync="detailDialogVisible"
      width="50%">
      <div class="detail-item">
        <span class="detail-item-title">指数名称: </span><span class="info">{{ temp.name }}</span>
      </div>
      <div class="detail-item">
        <span class="detail-item-title">描述: </span><span class="info">{{ temp.description }}</span>
      </div>
      <div class="detail-item">
        <span class="detail-item-title">更新时间: </span><span class="info">{{ new Date(parseInt(temp.updateTime)*1000).toLocaleString() }}</span>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="detailDialogVisible = false">关闭</el-button>
  </span>
    </el-dialog>

    <el-dialog :title="dialogTitle[dialogType] + '指数'" :visible.sync="updateDialogVisible">
      <el-form :model="updateForm">
        <el-form-item label="指数名称" :label-width="formLabelWidth">
          <el-input v-model="updateForm.name" auto-complete="on"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="updateForm.description" auto-complete="on"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCommit(updateForm)">{{ dialogTitle[dialogType] }}</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="deleteDialogVisible"
      width="30%">
      <span>确定删除指数: </span><span style="color: #409EFF">{{ deleteTemp.name }}</span><span> ?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDeleteCommit(deleteTemp.id)">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import { indexsList, indexsDetail, updateIndex, deleteIndex, createIndex } from '../../api/api'

  export default {
    name: 'indexs-management',
    data() {
      return {
        list: [],
        total: 0,
        tableKey: 0,
        listLoading: false,
        updateDialogVisible: false,
        detailDialogVisible: false,
        deleteDialogVisible: false,
        dialogType: '',
        isShow: {
          currency: false,
          marketValue: false,
          description: false,
          updateTime: false,
          total: false,
          maxCurrency: false,
          turnover: false
        },
        listQuery: {
          page: 1,
          limit: 10,
          title: '',
          type: undefined,
          queryType: '',
          sort: '+id'
        },
        temp: {},
        updateTemp: {},
        updateForm: {},
        deleteTemp: {},
        dialogTitle: {
          showUpdate: '修改',
          createUpdate: '创建'
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getIndexList(this.listQuery.page, this.listQuery.limit)
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getIndexList(this.listQuery.page, this.listQuery.limit)
      },
      // 跳转相关资讯
      handleComments(row) {
        this.$store.dispatch('SetBindQuery', row).then(() => {
          this.$router.push({
            name: 'IndexBindInfo'
          })
        }).catch(() => {
          console.log(222)
        })
      },
      // 查看详情
      showDetail(row) {
        this.dialogType = 'showDetail'
        this.getIndexDetail(row.id)
      },
      // 更新信息
      handleUpdate(row) {
        this.dialogType = 'showUpdate'
        this.getIndexDetail(row.id)
      },
      // 创建新信息
      handleCreate() {
        this.updateForm = { name: '', description: '' }
        this.dialogType = 'createUpdate'
        this.updateDialogVisible = true
      },
      // 删除信息
      handleDelete(row) {
        this.deleteTemp = row
        this.deleteDialogVisible = true
      },
      // 删除dialog确定逻辑
      handleDeleteCommit(id) {
        this.deleteRequest(id)
      },
      // dialog确定逻辑
      handleCommit(data) {
        if (this.dialogType === 'showUpdate') {
          this.updateRequest(data)
        } else if (this.dialogType === 'createUpdate') {
          this.createRequest(data)
        }
      },
      // 获取货币列表
      getIndexList(page, limit) {
        indexsList(page, limit).then(res => {
          console.log(res)
          if (res.data.code === 0) {
            this.list = res.data.data.list
            this.total = res.data.data.total
          } else {
            this.$message.error(res.data.msg)
          }
        })
          .catch(error => {
            console.log(error.response)
          })
      },
      // 获取详情
      getIndexDetail(id) {
        this.listLoading = true
        indexsDetail(id).then(res => {
          console.log(res)
          if (res.data.code === 0) {
            if (this.dialogType === 'showDetail') {
              this.temp = res.data.data
              this.detailDialogVisible = true
            } else if (this.dialogType === 'showUpdate') {
              this.updateTemp = res.data.data
              this.updateForm = Object.assign({}, this.updateTemp) // copy obj
              this.updateDialogVisible = true
            }
            this.listLoading = false
          } else {
            this.$message.error(res.data.msg)
          }
        })
          .catch(error => {
            console.log(error.response)
            this.listLoading = false
          })
      },
      // 更新信息
      updateRequest(data) {
        const postData = { name: '', description: '' }
        postData.name = data.name
        postData.description = data.description
        updateIndex(data.id, JSON.stringify(postData)).then(res => {
          console.log(res)
          if (res.data.code === 0) {
            this.getIndexList(this.listQuery.page, this.listQuery.limit)
            this.$message({
              message: '修改成功',
              type: 'success'
            })
          } else {
            this.$message.error(res.data.msg)
          }
          this.updateDialogVisible = false
        })
          .catch(error => {
            console.log(error.response)
            this.updateDialogVisible = false
          })
      },
      // 创建信息
      createRequest(data) {
        const postData = { name: '', description: '' }
        postData.name = data.name
        postData.description = data.description
        createIndex(JSON.stringify(postData)).then(res => {
          console.log(res)
          if (res.data.code === 0) {
            this.getIndexList(this.listQuery.page, this.listQuery.limit)
            this.$message({
              message: '创建成功',
              type: 'success'
            })
          } else {
            this.$message.error(res.data.msg)
          }
          this.updateDialogVisible = false
        })
          .catch(error => {
            console.log(error.response)
            this.updateDialogVisible = false
          })
      },
      // 删除信息
      deleteRequest(id) {
        deleteIndex(id).then(res => {
          if (res.data.code === 0) {
            this.getIndexList(this.listQuery.page, this.listQuery.limit)
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          } else {
            this.$message.error(res.data.msg)
          }
          this.deleteDialogVisible = false
        })
          .catch(error => {
            console.log(error.response)
            this.deleteDialogVisible = false
          })
      }
    },
    created() {
      this.getIndexList(1, 10)
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .indexs-management-container{
    .image{
      display: inline-block;
      width: 20px;
    }
    .detail-item{
      width: 95%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      margin: 5px 0;
      .detail-item-title{
        width: 30%;
        font-weight: 600;
        color: #409EFF;
      }
      .info{
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        border: 1px solid #ddd;
        padding: 2px 10px;
        border-radius: 5px;
      }
    }
  }
</style>
