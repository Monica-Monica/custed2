<template>
  <div class="currency-management-container">

    <div class="filter-container">
      <el-checkbox class="filter-item" style='margin-left:15px; margin-bottom: 15px;' @change='tableKey=tableKey+1' v-model="isShow.description">描述</el-checkbox>
      <el-checkbox class="filter-item" style='margin-left:15px; margin-bottom: 15px;' @change='tableKey=tableKey+1' v-model="isShow.marketValue">市值</el-checkbox>
      <el-checkbox class="filter-item" style='margin-left:15px; margin-bottom: 15px;' @change='tableKey=tableKey+1' v-model="isShow.currency">流通量</el-checkbox>
      <el-checkbox class="filter-item" style='margin-left:15px; margin-bottom: 15px;' @change='tableKey=tableKey+1' v-model="isShow.total">总量</el-checkbox>
      <el-checkbox class="filter-item" style='margin-left:15px; margin-bottom: 15px;' @change='tableKey=tableKey+1' v-model="isShow.maxCurrency">最大量</el-checkbox>
      <el-checkbox class="filter-item" style='margin-left:15px; margin-bottom: 15px;' @change='tableKey=tableKey+1' v-model="isShow.turnover">ICO成本</el-checkbox>
      <el-checkbox class="filter-item" style='margin-left:15px; margin-bottom: 15px;' @change='tableKey=tableKey+1' v-model="isShow.updateTime">更新时间</el-checkbox>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">创建货币</el-button>
    </div>

    <el-table :key='tableKey' :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='排名' width="50">
        <template slot-scope="scope">
          {{scope.row.rank}}
        </template>
      </el-table-column>
      <el-table-column label='名称' align="center">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column align="center" label='图标' width="50">
        <template slot-scope="scope">
          <img :src="scope.row.icon" class="image">
        </template>
      </el-table-column>
      <el-table-column v-if="isShow.description" align="center" label='描述'>
        <template slot-scope="scope">
          {{scope.row.description}}
        </template>
      </el-table-column>
      <el-table-column align="center" label='官网'>
        <template slot-scope="scope">
          <a :href="scope.row.webpage">{{scope.row.webpage}}</a>
        </template>
      </el-table-column>
      <el-table-column v-if="isShow.marketValue" align="center" label='市值'>
        <template slot-scope="scope">
          {{scope.row.marketValue}}
        </template>
      </el-table-column>
      <el-table-column v-if="isShow.currency" align="center" label='流通量'>
        <template slot-scope="scope">
          {{scope.row.currency}}
        </template>
      </el-table-column>
      <el-table-column v-if="isShow.total" align="center" label='总量'>
        <template slot-scope="scope">
          {{scope.row.total}}
        </template>
      </el-table-column>
      <el-table-column v-if="isShow.maxCurrency" align="center" label='最大量'>
        <template slot-scope="scope">
          {{scope.row.maxCurrency}}
        </template>
      </el-table-column>
      <el-table-column v-if="isShow.turnover" align="center" label='ICO成本'>
        <template slot-scope="scope">
          {{scope.row.turnover}}
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
        <span class="detail-item-title">排名: </span><span class="info">{{ temp.rank }}</span>
      </div>
      <div class="detail-item">
        <span class="detail-item-title">货币名称: </span><span class="info">{{ temp.name }}<img :src="temp.icon" style="width: 20px;"></span>
      </div>
      <div class="detail-item">
        <span class="detail-item-title">描述: </span><span class="info">{{ temp.description }}</span>
      </div>
      <div class="detail-item">
        <span class="detail-item-title">官网: </span><a :herf="temp.webpage">{{ temp.webpage }}</a>
      </div>
      <div class="detail-item">
        <span class="detail-item-title">市值: </span><span class="info">{{ temp.marketValue }}</span>
      </div>
      <div class="detail-item">
        <span class="detail-item-title">流通量: </span><span class="info">{{ temp.currency }}</span>
      </div>
      <div class="detail-item">
        <span class="detail-item-title">总量: </span><span class="info">{{ temp.total }}</span>
      </div>
      <div class="detail-item">
        <span class="detail-item-title">最大量: </span><span class="info">{{ temp.maxCurrency }}</span>
      </div>
      <div class="detail-item">
        <span class="detail-item-title">ICO成本: </span><span class="info">{{ temp.turnover }}</span>
      </div>
      <div class="detail-item">
        <span class="detail-item-title">更新时间: </span><span class="info">{{ new Date(parseInt(temp.updateTime)*1000).toLocaleString() }}</span>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="detailDialogVisible = false">关闭</el-button>
  </span>
    </el-dialog>

    <el-dialog :title="dialogTitle[dialogType] + '货币'" :visible.sync="updateDialogVisible">
      <el-form :model="updateForm">
        <el-form-item label="排名" :label-width="formLabelWidth">
          <el-input v-model="updateForm.rank" auto-complete="on"></el-input>
        </el-form-item>
        <el-form-item label="货币名称" :label-width="formLabelWidth">
          <el-input v-model="updateForm.name" auto-complete="on"></el-input>
        </el-form-item>
        <el-form-item label="图标" :label-width="formLabelWidth">
          <el-input v-model="updateForm.icon" auto-complete="on"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="updateForm.description" auto-complete="on"></el-input>
        </el-form-item>
        <el-form-item label="官网" :label-width="formLabelWidth">
          <el-input v-model="updateForm.webpage" auto-complete="on"></el-input>
        </el-form-item>
        <el-form-item label="市值" :label-width="formLabelWidth">
          <el-input v-model="updateForm.marketValue" auto-complete="on"></el-input>
        </el-form-item>
        <el-form-item label="流通量" :label-width="formLabelWidth">
          <el-input v-model="updateForm.currency" auto-complete="on"></el-input>
        </el-form-item>
        <el-form-item label="总量" :label-width="formLabelWidth">
          <el-input v-model="updateForm.total" auto-complete="on"></el-input>
        </el-form-item>
        <el-form-item label="最大量" :label-width="formLabelWidth">
          <el-input v-model="updateForm.maxCurrency" auto-complete="on"></el-input>
        </el-form-item>
        <el-form-item label="ICO成本" :label-width="formLabelWidth">
          <el-input v-model="updateForm.turnover" auto-complete="on"></el-input>
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
      <span>确定删除货币: </span><span style="color: #409EFF">{{ deleteTemp.name }}</span><span> ?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDeleteCommit(deleteTemp.coinId)">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import { coinList, coinDetail, updateCoin, deleteCoin, createCoin } from '../../api/api'

  export default {
    name: 'currency-management',
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
        this.getCoinList(this.listQuery.page, this.listQuery.limit)
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getCoinList(this.listQuery.page, this.listQuery.limit)
      },
      // 跳转相关资讯
      handleComments(row) {
        this.$store.dispatch('SetBindQuery', row).then(() => {
          this.$router.push({
            name: 'BindInfo'
          })
        }).catch(() => {
          console.log(222)
        })
      },
      // 查看详情
      showDetail(row) {
        this.dialogType = 'showDetail'
        this.getCoinDetail(row.coinId)
      },
      // 更新信息
      handleUpdate(row) {
        this.dialogType = 'showUpdate'
        this.getCoinDetail(row.coinId)
      },
      // 创建新信息
      handleCreate() {
        this.updateForm = { name: '', icon: '', description: '', rank: 0, webpage: '', marketValue: '', currency: '', total: '', maxCurrency: '', turnover: '' }
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
        this.deletePlatformRequest(id)
      },
      // dialog确定逻辑
      handleCommit(data) {
        if (this.dialogType === 'showUpdate') {
          this.updateRequest(data)
        } else if (this.dialogType === 'createUpdate') {
          this.createPlatformRequest(data)
        }
      },
      // 获取货币列表
      getCoinList(page, limit) {
        coinList(page, limit).then(res => {
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
      getCoinDetail(id) {
        this.listLoading = true
        coinDetail(id).then(res => {
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
        const postData = { name: '', icon: '', description: '', rank: 0, webpage: '', marketValue: '', currency: '', total: '', maxCurrency: '', turnover: '' }
        postData.name = data.name
        postData.icon = data.icon
        postData.description = data.description
        postData.rank = data.rank
        postData.webpage = data.webpage
        postData.marketValue = data.marketValue
        postData.currency = data.currency
        postData.total = data.total
        postData.maxCurrency = data.maxCurrency
        postData.turnover = data.turnover
        updateCoin(data.coinId, JSON.stringify(postData)).then(res => {
          console.log(res)
          if (res.data.code === 0) {
            this.getCoinList(this.listQuery.page, this.listQuery.limit)
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
      createPlatformRequest(data) {
        const postData = { name: '', icon: '', description: '', rank: 0, webpage: '', marketValue: '', currency: '', total: '', maxCurrency: '', turnover: '' }
        postData.name = data.name
        postData.icon = data.icon
        postData.description = data.description
        postData.rank = data.rank
        postData.webpage = data.webpage
        postData.marketValue = data.marketValue
        postData.currency = data.currency
        postData.total = data.total
        postData.maxCurrency = data.maxCurrency
        postData.turnover = data.turnover
        createCoin(JSON.stringify(postData)).then(res => {
          console.log(res)
          if (res.data.code === 0) {
            this.getCoinList(this.listQuery.page, this.listQuery.limit)
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
      deletePlatformRequest(id) {
        deleteCoin(id).then(res => {
          if (res.data.code === 0) {
            this.getCoinList(this.listQuery.page, this.listQuery.limit)
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
      this.getCoinList(1, 10)
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .currency-management-container{
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
