<template>
  <div class="app-container important-info-management-container">

    <div class="filter-container top-filter">
      <el-checkbox class="filter-item" style='margin-left:15px; margin-bottom: 15px;' @change='tableKey=tableKey+1' v-model="isShow.commentNum">评论数</el-checkbox>
      <el-checkbox class="filter-item" style='margin-left:15px; margin-bottom: 15px;' @change='tableKey=tableKey+1' v-model="isShow.shareNum">分享数</el-checkbox>
      <el-checkbox class="filter-item" style='margin-left:15px; margin-bottom: 15px;' @change='tableKey=tableKey+1' v-model="isShow.downNum">反对数</el-checkbox>
      <el-checkbox class="filter-item" style='margin-left:15px; margin-bottom: 15px;' @change='tableKey=tableKey+1' v-model="isShow.starNum">点赞数</el-checkbox>
      <el-checkbox class="filter-item" style='margin-left:15px; margin-bottom: 15px;' @change='tableKey=tableKey+1' v-model="isShow.updateTime">更新时间</el-checkbox>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreateNews">创建资讯</el-button>
    </div>

    <el-table :key='tableKey' :data="importantNewsLists" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号'>
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label='标题'>
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column align="center" label='作者'>
        <template slot-scope="scope">
          {{scope.row.author}}
        </template>
      </el-table-column>
      <el-table-column v-if="isShow.commentNum" align="center" label='评论数'>
        <template slot-scope="scope">
          {{scope.row.commentNum}}
        </template>
      </el-table-column>
      <el-table-column v-if="isShow.starNum" align="center" label='点赞数'>
        <template slot-scope="scope">
          {{scope.row.starNum}}
        </template>
      </el-table-column>
      <el-table-column v-if="isShow.downNum" align="center" label='反对数'>
        <template slot-scope="scope">
          {{scope.row.downNum}}
        </template>
      </el-table-column>
      <el-table-column v-if="isShow.shareNum" align="center" label='分享数'>
        <template slot-scope="scope">
          {{scope.row.shareNum}}
        </template>
      </el-table-column>
      <el-table-column v-if="isShow.status" align="center" label='状态'>
        <template slot-scope="scope">
          {{scope.row.status}}
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
          <el-button type="primary" size="mini" plain @click="showFlashDetail(scope.row)">查看</el-button>
          <el-button type="warning" size="mini" plain @click="handleUpdateImportantNews(scope.row)">修改</el-button>
          <el-button size="mini" type="danger" plain @click="handleDelete(scope.row)">删除</el-button>
          <el-button size="mini" type="info" plain @click="handlePostNews(scope.row)">跟帖管理</el-button>
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
      width="80%">
      <div class="detail-item">
        <img :src="temp.cover" class="image">
      </div>
      <div class="detail-item">
        <span class="detail-item-title">标题: </span><span>{{ temp.title }}</span>
      </div>
      <div class="detail-item">
        <span class="detail-item-title">作者: </span><span>{{ temp.author }}</span>
      </div>
      <div class="detail-item">
        <span class="detail-item-title">点赞数: </span><span>{{ temp.starNum }}</span>
      </div>
      <div class="detail-item">
        <span class="detail-item-title">反对数: </span><span>{{ temp.downNum }}</span>
      </div>
      <div class="detail-item">
        <span class="detail-item-title">评论数: </span><span>{{ temp.commentNum }}</span>
      </div>
      <div class="detail-item">
        <span class="detail-item-title">分享数: </span><span>{{ temp.shareNum }}</span>
      </div>
      <div class="detail-item" style="margin-bottom: 20px">
        <span class="detail-item-title">更新时间: </span><span>{{new Date(parseInt(temp.updateTime)*1000).toLocaleString()}}</span>
      </div>
      <hr/>
      <div class="detail-item">
        <span v-html="temp.content"></span>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="detailDialogVisible = false">关闭</el-button>
  </span>
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="deleteDialogVisible"
      width="50%">
      <span>确定删除: </span><span style="color: #409EFF">{{ deleteTemp.title }}</span><span> ?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDeleteCommit(deleteTemp.newsId)">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import { newsList, deleteNews, newsDetail } from '../../api/api'

  export default {
    name: 'important-info-management',
    data() {
      return {
        importantNewsLists: [],
        newsType: 1,
        total: 0,
        tableKey: 0,
        listLoading: false,
        dialogType: '',
        detailDialogVisible: false,
        updateDialogVisible: false,
        deleteDialogVisible: false,
        temp: {},
        updateForm: {},
        deleteTemp: {},
        isShow: {
          commentNum: false,
          shareNum: false,
          downNum: false,
          status: false,
          updateTime: false,
          starNum: false
        },
        listQuery: {
          page: 1,
          limit: 10,
          title: '',
          type: undefined,
          queryType: '',
          sort: '+id'
        }
      }
    },
    methods: {
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getNewsList(this.listQuery.page, this.listQuery.limit, this.newsType)
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getNewsList(this.listQuery.page, this.listQuery.limit, this.newsType)
      },
      // 查看要闻详情
      showFlashDetail(row) {
        this.dialogType = 'showDetail'
        this.getNewsDetail(row.newsId)
      },
      // 创建要闻
      handleCreateNews() {
        const newsData = {
          title: '',
          content: '',
          type: '1',
          bindId: '',
          abstract: '',
          editType: 'create'
        }
        this.$store.dispatch('SetNewsData', newsData).then(() => {
          // console.log('dddd', this.$store.getters.newsData)
          this.$router.push({ name: 'tinymce' })
        }).catch(() => {
          console.log(222)
        })
      },
      // 更新要闻
      handleUpdateImportantNews(row) {
        this.dialogType = 'showUpdate'
        this.getNewsDetail(row.newsId)
      },
      // 删除要闻
      handleDelete(row) {
        this.deleteTemp = row
        this.deleteDialogVisible = true
      },
      // 删除要闻确定逻辑
      handleDeleteCommit(id) {
        this.deleteNewsRequest(id)
      },
      // 跳转跟帖管理
      handlePostNews(row) {
        this.$store.dispatch('SetPostNewsQuery', row).then(() => {
          this.$router.push({
            name: 'PostNews'
          })
        }).catch(() => {
          console.log(222)
        })
      },
      getNewsList(page, limit) {
        this.listLoading = true
        newsList(page, limit).then(res => {
          console.log(res)
          if (res.data.code === 0) {
            this.importantNewsLists = res.data.data.list
            this.total = res.data.data.total
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
      // 获取资讯详情
      getNewsDetail(id) {
        newsDetail(id).then(res => {
          console.log(res)
          if (res.data.code === 0) {
            if (this.dialogType === 'showDetail') {
              this.temp = res.data.data
              this.detailDialogVisible = true
            } else if (this.dialogType === 'showUpdate') {
              this.updateTemp = res.data.data
              this.updateForm = Object.assign({}, this.updateTemp) // copy obj
              this.$store.dispatch('SetNewsData', res.data.data).then(() => {
                console.log(this.$store.getters.newsData)
                this.$router.push({ name: 'tinymce' })
              }).catch(() => {
                console.log(222)
              })
              this.updateDialogVisible = true
            }
          } else {
            this.$message.error(res.data.msg)
          }
        })
          .catch(error => {
            console.log(error.response)
          })
      },
      // 删除资讯
      deleteNewsRequest(id) {
        deleteNews(id).then(res => {
          console.log(res)
          if (res.data.code === 0) {
            this.getNewsList(this.listQuery.page, this.listQuery.limit, this.newsType)
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
      this.getNewsList(1, 10, this.newsType)
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .important-info-management-container{
    .time {
      font-size: 13px;
      color: #999;
    }

    .bottom {
      margin-top: 13px;
      line-height: 12px;
    }

    .button {
      padding: 0;
      float: right;
    }

    .image {
      width: 100%;
      display: block;
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }

    .clearfix:after {
      clear: both
    }
  }
</style>
