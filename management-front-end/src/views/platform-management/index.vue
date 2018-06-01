<template>
  <div class="app-container platform-management-container">

    <div class="filter-container">
      <el-checkbox class="filter-item" style='margin-left:15px; margin-bottom: 15px;' @change='tableKey=tableKey+1' v-model="isShow.description">描述</el-checkbox>
      <el-checkbox class="filter-item" style='margin-left:15px; margin-bottom: 15px;' @change='tableKey=tableKey+1' v-model="isShow.pair">交易对</el-checkbox>
      <el-checkbox class="filter-item" style='margin-left:15px; margin-bottom: 15px;' @change='tableKey=tableKey+1' v-model="isShow.deal">24小时成交量</el-checkbox>
      <el-checkbox class="filter-item" style='margin-left:15px; margin-bottom: 15px;' @change='tableKey=tableKey+1' v-model="isShow.accessKey">accessKey</el-checkbox>
      <el-checkbox class="filter-item" style='margin-left:15px; margin-bottom: 15px;' @change='tableKey=tableKey+1' v-model="isShow.secretKey">secretKey</el-checkbox>
      <el-checkbox class="filter-item" style='margin-left:15px; margin-bottom: 15px;' @change='tableKey=tableKey+1' v-model="isShow.updateTime">更新时间</el-checkbox>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreatePlatform">创建平台</el-button>
    </div>

    <el-table :key='tableKey' :data="lists" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='排名'>
        <template slot-scope="scope">
          {{scope.row.rank}}
        </template>
      </el-table-column>
      <el-table-column label='平台名称' align="center">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column align="center" label='国家'>
        <template slot-scope="scope">
          {{scope.row.country}}
        </template>
      </el-table-column>
      <el-table-column v-if="isShow.description" align="center" label='描述'>
        <template slot-scope="scope">
          {{scope.row.description}}
        </template>
      </el-table-column>
      <el-table-column align="center" label='网站'>
        <template slot-scope="scope">
          <a :href="scope.row.page">{{scope.row.page}}</a>
        </template>
      </el-table-column>
      <el-table-column v-if="isShow.pair" align="center" label='交易对'>
        <template slot-scope="scope">
          {{scope.row.pair}}
        </template>
      </el-table-column>
      <el-table-column v-if="isShow.deal" align="center" label='24小时成交量'>
        <template slot-scope="scope">
          {{scope.row.deal}}
        </template>
      </el-table-column>
      <el-table-column v-if="isShow.accessKey" align="center" label='accessKey'>
        <template slot-scope="scope">
          {{scope.row.accessKey}}
        </template>
      </el-table-column>
      <el-table-column v-if="isShow.secretKey" align="center" label='secretKey'>
        <template slot-scope="scope">
          {{scope.row.secretKey}}
        </template>
      </el-table-column>
      <el-table-column v-if="isShow.updateTime" align="center" prop="created_at" label="更新时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{new Date(parseInt(scope.row.updateTime)*1000).toLocaleString()}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" class-name="small-padding fixed-width" width="330">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" plain @click="showPlatformDetail(scope.row)">详情</el-button>
          <el-button type="warning" size="mini" plain @click="handleUpdatePlatform(scope.row)">修改</el-button>
          <el-button size="mini" type="danger" plain @click="handleDelete(scope.row)">删除</el-button>
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
        <span class="detail-item-title">排名: </span><span class="info">{{ temp.rank }}</span>
      </div>
      <div class="detail-item">
        <span class="detail-item-title">平台名称: </span><span class="info">{{ temp.name }}</span>
      </div>
      <div class="detail-item">
        <span class="detail-item-title">描述: </span><a :herf="temp.page" class="info">{{ temp.description }}</a>
      </div>
      <div class="detail-item">
        <span class="detail-item-title">国家: </span><span class="info">{{ temp.country }}</span>
      </div>
      <div class="detail-item">
        <span class="detail-item-title">网站: </span><a :herf="temp.page">{{ temp.page }}</a>
      </div>
      <div class="detail-item">
        <span class="detail-item-title">交易对: </span><span class="info">{{ temp.pair }}</span>
      </div>
      <div class="detail-item">
        <span class="detail-item-title">24小时交易量: </span><span class="info">{{ temp.deal }}</span>
      </div>
      <div class="detail-item">
        <span class="detail-item-title">accessKey: </span><span>{{ temp.accessKey }}</span>
      </div>
      <div class="detail-item">
        <span class="detail-item-title">secretKey: </span><span>{{ temp.secretKey }}</span>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="detailDialogVisible = false">关闭</el-button>
  </span>
    </el-dialog>

    <el-dialog :title="dialogTitle[dialogType] + '平台'" :visible.sync="updateDialogVisible">
      <el-form :model="updateForm">
        <el-form-item label="平台名称" :label-width="formLabelWidth">
          <el-input v-model="updateForm.name" auto-complete="on"></el-input>
        </el-form-item>
        <el-form-item label="国家" :label-width="formLabelWidth">
          <el-input v-model="updateForm.country" auto-complete="on"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="updateForm.description" auto-complete="on"></el-input>
        </el-form-item>
        <el-form-item label="排名" :label-width="formLabelWidth">
          <el-input v-model="updateForm.rank" auto-complete="on"></el-input>
        </el-form-item>
        <el-form-item label="交易对" :label-width="formLabelWidth">
          <el-input v-model="updateForm.pair" auto-complete="on"></el-input>
        </el-form-item>
        <el-form-item label="24小时交易量" :label-width="formLabelWidth">
          <el-input v-model="updateForm.deal" auto-complete="on"></el-input>
        </el-form-item>
        <el-form-item label="accessKey" :label-width="formLabelWidth">
          <el-input v-model="updateForm.accessKey" auto-complete="on"></el-input>
        </el-form-item>
        <el-form-item label="secretKey" :label-width="formLabelWidth">
          <el-input v-model="updateForm.secretKey" auto-complete="on"></el-input>
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
      <span>确定删除平台: </span><span style="color: #409EFF">{{ deleteTemp.name }}</span><span> ?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDeleteCommit(deleteTemp.id)">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import { platformList, platformDetail, updatePlatform, createPlatform, deletePlatform } from '../../api/api'

  export default {
    name: 'platform-management',
    data() {
      return {
        lists: [],
        total: 0,
        tableKey: 0,
        listLoading: false,
        isShow: {
          deal: false,
          pair: false,
          description: false,
          updateTime: false,
          accessKey: false,
          secretKey: false
        },
        listQuery: {
          page: 1,
          limit: 10,
          title: '',
          type: undefined,
          queryType: '',
          sort: '+id'
        },
        dialogType: '',
        updateDialogVisible: false,
        detailDialogVisible: false,
        deleteDialogVisible: false,
        temp: {},
        updateTemp: {},
        updateForm: {
          name: '',
          country: '',
          description: '',
          rank: 0,
          pair: '',
          accessKey: '',
          secretKey: ''
        },
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
        this.getPlatformList(this.listQuery.page, this.listQuery.limit)
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getPlatformList(this.listQuery.page, this.listQuery.limit)
      },
      // 查看平台详情
      showPlatformDetail(row) {
        this.dialogType = 'showDetail'
        this.getPlatformDetail(row.id)
      },
      // dialog确定逻辑
      handleCommit(data) {
        if (this.dialogType === 'showUpdate') {
          this.updatePlatformRequest(data)
        } else if (this.dialogType === 'createUpdate') {
          this.createPlatformRequest(data)
        }
      },
      // 删除平台
      handleDelete(row) {
        this.deleteTemp = row
        this.deleteDialogVisible = true
      },
      // 删除平台dialog确定逻辑
      handleDeleteCommit(id) {
        this.deletePlatformRequest(id)
      },
      // 更新平台信息
      handleUpdatePlatform(row) {
        this.dialogType = 'showUpdate'
        this.getPlatformDetail(row.id)
      },
      // 创建新平台
      handleCreatePlatform() {
        this.updateForm = { name: '', country: '', description: '', rank: '', pair: '', accessKey: '', secretKey: '' }
        this.dialogType = 'createUpdate'
        this.updateDialogVisible = true
      },
      // 获取平台列表
      getPlatformList(page, limit) {
        this.listLoading = true
        platformList(page, limit).then(res => {
          console.log(res)
          if (res.data.code === 0) {
            this.total = res.data.data.total
            this.lists = res.data.data.list
          } else {
            this.$message.error(res.data.msg)
          }
          this.listLoading = false
        })
          .catch(error => {
            console.log(error.response)
            this.listLoading = false
          })
      },
      // 获取平台详情
      getPlatformDetail(id) {
        this.listLoading = true
        platformDetail(id).then(res => {
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
      // 更新平台信息
      updatePlatformRequest(data) {
        const postData = { name: '', country: '', description: '', rank: 0, pair: '', accessKey: '', secretKey: '' }
        postData.name = data.name
        postData.country = data.country
        postData.description = data.description
        postData.rank = data.rank
        postData.pair = data.pair
        postData.deal = data.deal
        postData.accessKey = data.accessKey
        postData.secretKey = data.secretKey
        updatePlatform(data.id, JSON.stringify(postData)).then(res => {
          console.log(res)
          if (res.data.code === 0) {
            this.getPlatformList(1, 10)
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
      // 创建平台
      createPlatformRequest(data) {
        const postData = { name: '', country: '', description: '', rank: 0, pair: '', accessKey: '', secretKey: '' }
        postData.name = data.name
        postData.country = data.country
        postData.description = data.description
        postData.rank = data.rank
        postData.pair = data.pair
        postData.deal = data.deal
        postData.accessKey = data.accessKey
        postData.secretKey = data.secretKey
        createPlatform(JSON.stringify(postData)).then(res => {
          console.log(res)
          if (res.data.code === 0) {
            this.getPlatformList(1, 10)
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
      // 删除平台
      deletePlatformRequest(id) {
        deletePlatform(id).then(res => {
          if (res.data.code === 0) {
            this.getPlatformList(1, 10)
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
      this.getPlatformList(1, 10)
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .platform-management-container{
    .detail-item-title{
      font-weight: 600;
      color: #409EFF;
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
