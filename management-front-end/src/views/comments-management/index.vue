<template>
  <div class="comment-management-container">

    <div class="filter-container top-filter">
      <el-checkbox class="filter-item" style='margin-left:15px;' @change='tableKey=tableKey+1' v-model="isShow.commentNum">评论数</el-checkbox>
      <el-checkbox class="filter-item" style='margin-left:15px;' @change='tableKey=tableKey+1' v-model="isShow.starNum">点赞数</el-checkbox>
      <el-checkbox class="filter-item" style='margin-left:15px;' @change='tableKey=tableKey+1' v-model="isShow.updateTime">更新时间</el-checkbox>
    </div>

    <el-table :key='tableKey' :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='评论人ID'>
        <template slot-scope="scope">
          {{scope.row.userId}}
        </template>
      </el-table-column>
      <el-table-column label='评论人'>
        <template slot-scope="scope">
          <span>{{scope.row.nickname}}</span>
          <img :src="scope.row.avatar" class="image">
        </template>
      </el-table-column>
      <el-table-column align="center" label='内容' width="300">
        <template slot-scope="scope">
          {{scope.row.content}}
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
      <el-table-column v-if="isShow.updateTime" align="center" prop="created_at" label="发表时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{new Date(parseInt(scope.row.createTime)*1000).toLocaleString()}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" class-name="small-padding fixed-width" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" plain @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container" style="margin: 10px;">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="deleteDialogVisible"
      width="50%">
      <span>确定删除: </span><span style="color: #409EFF">{{ deleteTemp.nickname }}</span><span> 的跟帖?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDeleteCommit(deleteTemp.postId)">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import { commentsList, deletePostNews } from '../../api/api'

  export default {
    name: 'comment-management',
    data() {
      return {
        total: 0,
        list: [],
        tableKey: 0,
        listLoading: false,
        deleteDialogVisible: false,
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
    computed: {
      commentQuery() {
        return this.$store.getters.commentQuery
      }
    },
    methods: {
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getCommentsList(this.commentQuery.newsId, this.listQuery.page, this.listQuery.limit)
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getCommentsList(this.commentQuery.newsId, this.listQuery.page, this.listQuery.limit)
      },
      // 删除跟帖
      handleDelete(row) {
        this.deleteTemp = row
        this.deleteDialogVisible = true
      },
      // 删除跟帖确定逻辑
      handleDeleteCommit(id) {
        this.deletePostNewsRequest(id)
      },
      // 获取更贴列表
      getCommentsList(id, page, limit) {
        console.log('dddd', this.commentQuery)
        if (id) {
          commentsList(id, page, limit).then(res => {
            console.log(res)
            if (res.data.code === 0) {
              this.total = res.data.data.total
              this.list = res.data.data.list
              // console.log('duixiang', this.list)
              this.$message({
                message: '评论获取成功',
                type: 'success'
              })
            } else {
              this.$message.error(res.data.msg)
            }
          })
            .catch(error => {
              console.log(error.response)
            })
        } else {
          this.$message.error('请重新选择一个资讯')
          this.$router.push({ name: 'Important' })
        }
      },
      // 删除跟帖列表
      deletePostNewsRequest(id) {
        deletePostNews(id).then(res => {
          if (res.data.code === 0) {
            this.getCommentsList(this.commentQuery.newsId, this.listQuery.page, this.listQuery.limit)
            this.$message({
              message: '删除成功成功',
              type: 'success'
            })
            this.deleteDialogVisible = false
          } else {
            this.$message.error(res.data.msg)
            this.deleteDialogVisible = false
          }
        })
          .catch(error => {
            console.log(error.response)
            this.deleteDialogVisible = false
          })
      }
    },
    created() {
      this.getCommentsList(this.commentQuery.newsId, 1, 10)
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .comment-management-container{
    .top-filter{
      margin: 10px;
    }
    .image {
      width: 20px;
      display: inline-block;
      vertical-align: center;
    }
  }
</style>
